"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
    Trophy,
    Zap,
    Users,
    Code2,
    Clock,
    Star,
    ArrowLeft,
} from "lucide-react";

const FEATURES = [
    {
        icon: Users,
        title: "1v1 Duels",
        desc: "Challenge friends to head-to-head coding battles in real time.",
    },
    {
        icon: Zap,
        title: "Live Progress",
        desc: "Watch your opponent&apos;s progress as you race to finish.",
    },
    {
        icon: Code2,
        title: "Multiple Languages",
        desc: "Compete using Python, JavaScript, Go, Rust, and more.",
    },
    {
        icon: Clock,
        title: "Timed Rounds",
        desc: "Race against the clock and finish before your opponent.",
    },
    {
        icon: Star,
        title: "Leaderboard",
        desc: "Track your position among friends and the wider community.",
    },
    {
        icon: Trophy,
        title: "Trophies & Badges",
        desc: "Earn achievements as you win more coding challenges.",
    },
];

export default function ChallengePage() {
    const router = useRouter();
    const [notified, setNotified] = useState(false);

    return (
        <div className="relative flex min-h-screen w-full justify-center overflow-x-hidden bg-[#0b0b0c] px-4 pb-[70px] pt-[92px] text-[#f4f4f5] sm:px-6">
            {/* Subtle background */}
            <div
                aria-hidden="true"
                className="pointer-events-none fixed inset-0 z-0 opacity-20 [-webkit-mask-image:linear-gradient(to_bottom,black,transparent_75%)] [background-image:linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_75%)]"
            />

            {/* Back button */}
            <motion.button
                animate={{ opacity: 1, x: 0 }}
                className="fixed left-4 top-4 z-20 inline-flex h-9 items-center gap-1.5 rounded-lg border border-[#242426] bg-[#111113] px-3 text-xs font-medium text-[#a1a1aa] transition-colors hover:border-[#343438] hover:bg-[#151517] hover:text-[#f4f4f5] sm:left-6 sm:top-[22px]"
                initial={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.35 }}
                onClick={() => router.back()}
            >
                <ArrowLeft size={16} />
                <span>Back</span>
            </motion.button>

            <main className="relative z-10 flex w-full max-w-[920px] flex-col items-center text-center">
                {/* Small status */}
                <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-7 inline-flex items-center gap-2 text-xs font-medium text-[#a1a1aa]"
                    initial={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.4 }}
                >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#a1a1aa] shadow-[0_0_0_3px_rgba(161,161,170,0.08)]" />
                    <span>Coming soon</span>
                </motion.div>

                {/* Trophy */}
                <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6"
                    initial={{ opacity: 0, y: 10 }}
                    transition={{ delay: 0.1, duration: 0.45 }}
                >
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#2a2a2d] bg-[#111113] text-[#d4d4d8] shadow-[0_10px_35px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.035)]">
                        <Trophy size={32} strokeWidth={1.7} />
                    </div>
                </motion.div>

                {/* Heading */}
                <motion.h1
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-5 max-w-[760px] text-4xl font-semibold tracking-tight text-[#f4f4f5] sm:text-6xl"
                    initial={{ opacity: 0, y: 15 }}
                    transition={{ delay: 0.15, duration: 0.45 }}
                >
                    Friend Coding
                    <span className="text-[#71717a]"> Challenge</span>
                </motion.h1>

                {/* Description */}
                <motion.p
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 max-w-[590px] text-sm leading-relaxed text-[#8b8b93] sm:text-[15px]"
                    initial={{ opacity: 0, y: 15 }}
                    transition={{ delay: 0.2, duration: 0.45 }}
                >
                    Compete with your friends in real-time coding duels.
                    <br />
                    Solve problems, race the clock, and climb the leaderboard.
                </motion.p>

                {/* Features */}
                <motion.section
                    animate={{ opacity: 1 }}
                    className="mb-11 grid w-full grid-cols-1 gap-2.5 sm:grid-cols-2 md:grid-cols-3"
                    initial={{ opacity: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    {FEATURES.map((feature, index) => {
                        const Icon = feature.icon;

                        return (
                            <motion.div
                                key={feature.title}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex min-h-[150px] flex-col items-start rounded-xl border border-[#222225] bg-[#101012] p-5 text-left transition-colors hover:border-[#303034] hover:bg-[#121214]"
                                initial={{ opacity: 0, y: 15 }}
                                transition={{
                                    delay: 0.3 + index * 0.06,
                                    duration: 0.35,
                                }}
                                whileHover={{
                                    y: -3,
                                }}
                            >
                                <div className="mb-4 flex h-[34px] w-[34px] items-center justify-center rounded-lg border border-[#29292c] bg-[#151517] text-[#a1a1aa]">
                                    <Icon size={19} strokeWidth={1.8} />
                                </div>

                                <div className="w-full">
                                    <h3 className="mb-1.5 text-sm font-semibold text-[#e4e4e7]">
                                        {feature.title}
                                    </h3>
                                    <p className="text-[12.5px] leading-relaxed text-[#71717a]">
                                        {feature.desc}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.section>

                {/* CTA */}
                <motion.section
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center gap-3"
                    initial={{ opacity: 0, y: 10 }}
                    transition={{ delay: 0.7, duration: 0.4 }}
                >
                    <motion.button
                        className={`inline-flex h-10 items-center justify-center gap-2 rounded-lg border px-5 text-xs font-semibold transition-colors ${
                            notified
                                ? "cursor-default border-[#303034] bg-[#18181b] text-[#a1a1aa]"
                                : "border-[#3a3a3e] bg-[#e4e4e7] text-[#111113] hover:border-[#52525b] hover:bg-white"
                        }`}
                        disabled={notified}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setNotified(true)}
                    >
                        {notified ? (
                            <>
                                <Star fill="currentColor" size={16} />
                                <span>You&apos;re on the list</span>
                            </>
                        ) : (
                            <>
                                <Zap size={16} />
                                <span>Notify me when it launches</span>
                            </>
                        )}
                    </motion.button>

                    <p className="text-[11.5px] text-[#52525b]">
                        No spam. Just a notification when challenges are ready.
                    </p>
                </motion.section>
            </main>
        </div>
    );
}
