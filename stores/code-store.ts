import { create } from "zustand";

interface Language {
    name: string;
    version: string;
}

interface CodeStoreState {
    code: string;
    language: Language;
    running: boolean;
    output: string[];
    error: boolean;
    editorLoading: boolean;
    isSaving: boolean;
    snapId: string;
    lastSavedCode: string;
    setCode: (code: string) => void;
    setLanguage: (language: Language) => void;
    setRunning: (running: boolean) => void;
    setOutput: (output: string[]) => void;
    setError: (error: boolean) => void;
    setEditorLoading: (editorLoading: boolean) => void;
    setIsSaving: (isSaving: boolean) => void;
    setSnapId: (snapId: string) => void;
    setLastSavedCode: (lastSavedCode: string) => void;
    availableLanguages: string[];
    setAvailableLanguages: (languages: string[]) => void;
}

export const useCodeStore = create<CodeStoreState>((set) => ({
    code: "",
    language: { name: "", version: "" },
    running: false,
    output: [],
    error: false,
    editorLoading: true,
    isSaving: false,
    snapId: "",
    lastSavedCode: "",
    availableLanguages: [],
    setCode: (code) => set({ code }),
    setLanguage: (language) => set({ language }),
    setRunning: (running) => set({ running }),
    setOutput: (output) => set({ output }),
    setError: (error) => set({ error }),
    setEditorLoading: (editorLoading: boolean) => set({ editorLoading }),
    setIsSaving: (isSaving: boolean) => set({ isSaving }),
    setSnapId: (snapId: string) => set({ snapId }),
    setLastSavedCode: (lastSavedCode: string) => set({ lastSavedCode }),
    setAvailableLanguages: (languages: string[]) =>
        set({ availableLanguages: languages }),
}));
