"use client";

import { Home } from "lucide-react";
import { Button } from "@nextui-org/button";
import { Tooltip } from "@nextui-org/tooltip";

import { usePRouter } from "@/components/custom-router";

export const BackToHomeButton = () => {
    const router = usePRouter();

    return (
        <Tooltip content="Home">
            <Button
                className="flex h-8 min-w-8 items-center justify-center gap-0.5 rounded px-1 py-0"
                variant="light"
                onClick={() => {
                    router.push("/");
                }}
            >
                <Home size={16} strokeWidth={1.5} />
                <span className="sr-only">Go to Home</span>
            </Button>
        </Tooltip>
    );
};
