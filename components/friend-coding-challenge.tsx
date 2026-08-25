"use client";

import { Trophy } from "lucide-react";

import { usePRouter } from "@/components/custom-router";

export function FriendCodingChallenge() {
    const router = usePRouter();

    return (
        <button
            className="group relative flex items-center gap-1.5 whitespace-nowrap rounded-full border-none bg-gradient-to-br from-purple-700 to-pink-600 px-3.5 py-1.5 text-[13px] font-semibold text-white shadow-[0_0_18px_rgba(139,92,246,0.45)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_26px_rgba(139,92,246,0.72)]"
            onClick={() => router.push("/challenge")}
        >
            <span className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-600 to-pink-500 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
            <Trophy className="relative z-10" size={14} />
            <span className="relative z-10">Friend Coding Challenge</span>
        </button>
    );
}
