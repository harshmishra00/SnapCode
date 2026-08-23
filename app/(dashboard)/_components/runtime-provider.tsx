"use client";

import { useEffect } from "react";

import { useCodeStore } from "@/stores";
import { GetAvailableRuntimes } from "@/actions/get-available-runtimes";

export function RuntimeProvider({ children }: { children: React.ReactNode }) {
    const { setAvailableLanguages } = useCodeStore();

    useEffect(() => {
        GetAvailableRuntimes().then((runtimes) => {
            setAvailableLanguages(runtimes);
        });
    }, [setAvailableLanguages]);

    return <>{children}</>;
}
