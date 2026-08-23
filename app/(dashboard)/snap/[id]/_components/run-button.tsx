"use client";

import { LoaderCircle, Play } from "lucide-react";
import { Button } from "@nextui-org/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { useCodeStore } from "@/stores";
import { ExecuteCode } from "@/actions/execute-code";

export default function RunButton() {
    const {
        code,
        language,
        running,
        setRunning,
        setOutput,
        setError,
        availableLanguages,
    } = useCodeStore();

    const handleRun = async () => {
        if (!code || !language.name) return;

        // Check runtime availability
        const isAvailable =
            availableLanguages.length === 0 || // optimistic if not loaded
            availableLanguages.includes(language.name.toLowerCase());

        if (!isAvailable) {
            toast(`${language.name} will be available soon.`);

            return;
        }

        setRunning(true);
        setOutput(["Running..."]);
        setError(false);

        const result = await ExecuteCode({
            language: language.name,
            version: language.version,
            files: [{ content: code }],
        });

        if (result.success) {
            // JDoodle combines stdout and stderr into output
            const lines = result.output.split("\n");
            const hasStderr = result.error;

            setOutput(lines);
            setError(hasStderr);
            if (hasStderr) {
                toast.error("Compile / Runtime error");
            } else {
                toast.success("Ran successfully");
            }
        } else {
            // Piston unreachable, env not configured, unknown language, etc.
            setOutput([result.error]);
            setError(true);
            toast.error("Execution failed");
        }

        setRunning(false);
    };

    return (
        <>
            <Button
                className="h-8 justify-self-center text-sm font-semibold text-white"
                color="success"
                isDisabled={running}
                size="sm"
                startContent={
                    running ? (
                        <LoaderCircle
                            className="animate-spinner-linear-spin"
                            size={16}
                        />
                    ) : (
                        <Play fill="currentColor" size={16} />
                    )
                }
                onPress={handleRun}
            >
                Run
            </Button>
        </>
    );
}
