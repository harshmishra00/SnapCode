"use server";

import { languageOptions } from "@/config/languages";

export async function GetAvailableRuntimes(): Promise<string[]> {
    try {
        const availableLanguages = new Set<string>();

        for (const runtime of languageOptions) {
            if (runtime.available) {
                availableLanguages.add(runtime.name.toLowerCase());
                availableLanguages.add(runtime.monacoEditorLang.toLowerCase());
            }
        }

        return Array.from(availableLanguages);
    } catch (error) {
        console.error("Error fetching runtimes:", error);

        return [];
    }
}
