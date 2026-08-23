"use client";

import { Editor } from "@monaco-editor/react";
import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

import CodeEditorSkeleton from "@/app/(dashboard)/snap/[id]/_components/code-editor-skeleton";
import { useCodeStore } from "@/stores";
import { UpdateSnap } from "@/actions/update-snap";

type StandaloneCodeEditor = Parameters<
    NonNullable<React.ComponentProps<typeof Editor>["onMount"]>
>[0];

export default function CodeEditor({
    initialCode,
    language,
    version,
    snapId,
}: {
    initialCode?: string;
    language?: string;
    version?: string;
    snapId: string;
}) {
    const { theme } = useTheme();
    const editorRef = useRef<StandaloneCodeEditor | null>(null);
    const {
        code,
        setCode,
        setLanguage,
        setOutput,
        setEditorLoading,
        isSaving,
        setIsSaving,
        setSnapId,
        setLastSavedCode,
    } = useCodeStore();

    // Ref to track the current code in the editor (to avoid stale closures in interval)
    const codeRef = useRef(code);

    // Sync codeRef with state
    useEffect(() => {
        codeRef.current = code;
    }, [code]);

    useEffect(() => {
        setOutput([]);
        setSnapId(snapId);
        // Initialize codeRef with initialCode on mount
        if (initialCode) {
            codeRef.current = initialCode;
            setLastSavedCode(initialCode);
        }
    }, [snapId, setSnapId, initialCode, setOutput, setLastSavedCode]);

    const saveCode = async (currentCode: string, isAutoSave = false) => {
        if (isSaving) return;
        setIsSaving(true);
        try {
            await UpdateSnap(snapId, currentCode);
            setLastSavedCode(currentCode);
            if (!isAutoSave) {
                toast.success("Snap saved manually!");
            }
        } catch (error) {
            toast.error("Failed to save snap.");
        } finally {
            setIsSaving(false);
        }
    };

    // Auto-save polling
    useEffect(() => {
        const interval = setInterval(() => {
            // Check against store's lastSavedCode
            // We need to access the LATEST value of lastSavedCode.
            // Since we are in an effect with [], we might have stale closure if we use variable 'lastSavedCode'.
            // However, useCodeStore functions (getState) could be used, or just trust 'lastSavedCode' if we rely on re-renders,
            // but interval doesn't re-run.
            // Better to use useCodeStore.getState().
            const currentStore = useCodeStore.getState();

            if (codeRef.current !== currentStore.lastSavedCode) {
                saveCode(codeRef.current, true);
            }
        }, 5000); // Check every 5 seconds

        return () => clearInterval(interval);
    }, []);

    // Keyboard shortcut (Ctrl/Cmd + S)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === "s") {
                e.preventDefault();
                saveCode(codeRef.current);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Warn before unload if unsaved changes
    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            const currentStore = useCodeStore.getState();

            if (codeRef.current !== currentStore.lastSavedCode) {
                e.preventDefault();
                e.returnValue = "";
            }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () =>
            window.removeEventListener("beforeunload", handleBeforeUnload);
    }, []);

    function handleEditorDidMount(editor: StandaloneCodeEditor) {
        editorRef.current = editor;
        editor.focus();
        setCode(initialCode || "");
        setLastSavedCode(initialCode || "");
        codeRef.current = initialCode || "";
        setLanguage({ name: language || "", version: version || "" });
        setEditorLoading(false);
    }

    function handleOnchange(value: string | undefined) {
        if (value) {
            setCode(value);
        }
    }

    return (
        <Editor
            language={language}
            loading={<CodeEditorSkeleton />}
            options={{
                fontSize: 18,
                minimap: {
                    enabled: false,
                },
                padding: {
                    top: 20,
                },
                wordWrap: "on",
            }}
            theme={theme === "dark" ? "vs-dark" : "light"}
            value={code}
            onChange={handleOnchange}
            onMount={handleEditorDidMount}
        />
    );
}
