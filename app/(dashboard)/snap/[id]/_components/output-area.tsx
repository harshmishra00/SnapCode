"use client";

import { Terminal } from "lucide-react";
import { useEffect, useState } from "react";

import { useCodeStore } from "@/stores";
import OutputAreaSkeleton from "@/app/(dashboard)/snap/[id]/_components/output-area-skeleton";

const TerminalLoader = () => {
    const [frame, setFrame] = useState(0);
    const frames = ["⣾", "⣷", "⣯", "⣟", "⡿", "⢿", "⣻", "⣽"];

    useEffect(() => {
        const interval = setInterval(() => {
            setFrame((prev) => (prev + 1) % frames.length);
        }, 100);

        return () => clearInterval(interval);
    }, []);

    return (
        <p className="flex items-center gap-2 font-mono text-yellow-500">
            {frames[frame]} Running...
        </p>
    );
};

export default function OutputArea() {
    const { output, error, running, editorLoading } = useCodeStore();

    if (running) return <TerminalLoader />;

    if (editorLoading) return <OutputAreaSkeleton />;

    // TODO: Reserve history for output and give remove history functionality
    return (
        <div className="relative h-full w-full overflow-auto">
            {output.length !== 0 ? (
                <div className="flex gap-2">
                    <span className="text-yellow-500">$</span>
                    <div className={error ? "text-danger" : ""}>
                        {output.map((item) => {
                            return (
                                <span key={item} className="block">
                                    {item}
                                </span>
                            );
                        })}
                    </div>
                </div>
            ) : (
                <div className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center">
                    <Terminal
                        className="mx-auto mb-2 text-yellow-500"
                        size={40}
                    />
                    <h2 className="text-lg font-semibold">Run your code</h2>
                    <span className="text-sm opacity-80">
                        Results of your code will appear here when you{" "}
                        <strong className="text-success">Run</strong> the
                        project.
                    </span>
                </div>
            )}
        </div>
    );
}
