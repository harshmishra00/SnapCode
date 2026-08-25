"use client";

import { Trophy } from "lucide-react";
import { usePRouter } from "@/components/custom-router";

export function FriendCodingChallenge() {
    const router = usePRouter();

    return (
        <>
            <button
                className="friend-challenge-btn"
                onClick={() => router.push("/challenge")}
            >
                <Trophy size={14} className="fcc-icon" />
                <span>Friend Coding Challenge</span>
            </button>

            <style jsx global>{`
                .friend-challenge-btn {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    padding: 7px 14px;
                    border-radius: 999px;
                    border: none;
                    background: linear-gradient(135deg, #6d28d9, #db2777);
                    color: #fff;
                    font-size: 13px;
                    font-weight: 600;
                    cursor: pointer;
                    position: relative;
                    overflow: hidden;
                    white-space: nowrap;
                    box-shadow: 0 0 18px rgba(139, 92, 246, 0.45);
                    transition: transform 0.18s, box-shadow 0.18s;
                }
                .friend-challenge-btn::before {
                    content: "";
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(135deg, #7c3aed, #ec4899);
                    opacity: 0;
                    transition: opacity 0.22s;
                }
                .friend-challenge-btn:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 0 26px rgba(139, 92, 246, 0.72);
                }
                .friend-challenge-btn:hover::before { opacity: 1; }
                .friend-challenge-btn span,
                .fcc-icon {
                    position: relative;
                    z-index: 1;
                }
            `}</style>
        </>
    );
}
