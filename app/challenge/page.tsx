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
        desc: "Watch your opponent's progress as you race to finish.",
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
        <div className="challenge-page">
            {/* Subtle background */}
            <div className="background-grid" />

            {/* Back button */}
            <motion.button
                className="back-btn"
                onClick={() => router.back()}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35 }}
            >
                <ArrowLeft size={16} />
                <span>Back</span>
            </motion.button>

            <main className="page-inner">
                {/* Small status */}
                <motion.div
                    className="status"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <span className="status-dot" />
                    <span>Coming soon</span>
                </motion.div>

                {/* Trophy */}
                <motion.div
                    className="trophy-wrap"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.45 }}
                >
                    <div className="trophy-circle">
                        <Trophy size={32} strokeWidth={1.7} />
                    </div>
                </motion.div>

                {/* Heading */}
                <motion.h1
                    className="page-title"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.45 }}
                >
                    Friend Coding
                    <span> Challenge</span>
                </motion.h1>

                {/* Description */}
                <motion.p
                    className="page-sub"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.45 }}
                >
                    Compete with your friends in real-time coding duels.
                    <br />
                    Solve problems, race the clock, and climb the leaderboard.
                </motion.p>

                {/* Features */}
                <motion.section
                    className="features-grid"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    {FEATURES.map((feature, index) => {
                        const Icon = feature.icon;

                        return (
                            <motion.div
                                key={feature.title}
                                className="feature-card"
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: 0.3 + index * 0.06,
                                    duration: 0.35,
                                }}
                                whileHover={{
                                    y: -3,
                                }}
                            >
                                <div className="card-icon">
                                    <Icon size={19} strokeWidth={1.8} />
                                </div>

                                <div className="card-content">
                                    <h3>{feature.title}</h3>
                                    <p>{feature.desc}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.section>

                {/* CTA */}
                <motion.section
                    className="cta-section"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.4 }}
                >
                    <motion.button
                        className={`notify-btn ${
                            notified ? "notified" : ""
                        }`}
                        onClick={() => setNotified(true)}
                        disabled={notified}
                        whileTap={{ scale: 0.98 }}
                    >
                        {notified ? (
                            <>
                                <Star size={16} fill="currentColor" />
                                <span>You're on the list</span>
                            </>
                        ) : (
                            <>
                                <Zap size={16} />
                                <span>Notify me when it launches</span>
                            </>
                        )}
                    </motion.button>

                    <p className="cta-hint">
                        No spam. Just a notification when challenges are ready.
                    </p>
                </motion.section>
            </main>

            <style jsx global>{`
                * {
                    box-sizing: border-box;
                    margin: 0;
                    padding: 0;
                }

                html,
                body {
                    min-height: 100%;
                }

                body {
                    background: #0b0b0c;
                }

                .challenge-page {
                    min-height: 100vh;
                    width: 100%;
                    position: relative;
                    overflow-x: hidden;

                    display: flex;
                    justify-content: center;

                    padding: 92px 24px 70px;

                    background:
                        radial-gradient(
                            circle at 50% -20%,
                            rgba(255, 255, 255, 0.045),
                            transparent 35%
                        ),
                        #0b0b0c;

                    color: #f4f4f5;

                    font-family:
                        Inter,
                        ui-sans-serif,
                        system-ui,
                        -apple-system,
                        BlinkMacSystemFont,
                        "Segoe UI",
                        sans-serif;
                }

                /* --------------------------------
                   Background
                -------------------------------- */

                .background-grid {
                    position: fixed;
                    inset: 0;

                    pointer-events: none;

                    opacity: 0.22;

                    background-image:
                        linear-gradient(
                            rgba(255, 255, 255, 0.025) 1px,
                            transparent 1px
                        ),
                        linear-gradient(
                            90deg,
                            rgba(255, 255, 255, 0.025) 1px,
                            transparent 1px
                        );

                    background-size: 48px 48px;

                    mask-image: linear-gradient(
                        to bottom,
                        black,
                        transparent 75%
                    );

                    -webkit-mask-image: linear-gradient(
                        to bottom,
                        black,
                        transparent 75%
                    );
                }

                /* --------------------------------
                   Back button
                -------------------------------- */

                .back-btn {
                    position: fixed;
                    top: 22px;
                    left: 24px;
                    z-index: 20;

                    display: inline-flex;
                    align-items: center;
                    gap: 7px;

                    height: 34px;
                    padding: 0 12px;

                    border: 1px solid #242426;
                    border-radius: 8px;

                    background: #111113;

                    color: #a1a1aa;

                    font-size: 13px;
                    font-weight: 500;

                    cursor: pointer;

                    transition:
                        color 0.2s ease,
                        border-color 0.2s ease,
                        background 0.2s ease;
                }

                .back-btn:hover {
                    color: #f4f4f5;
                    border-color: #343438;
                    background: #151517;
                }

                /* --------------------------------
                   Main
                -------------------------------- */

                .page-inner {
                    position: relative;
                    z-index: 1;

                    width: 100%;
                    max-width: 920px;

                    display: flex;
                    flex-direction: column;
                    align-items: center;

                    text-align: center;
                }

                /* --------------------------------
                   Status
                -------------------------------- */

                .status {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;

                    margin-bottom: 28px;

                    color: #a1a1aa;

                    font-size: 12px;
                    font-weight: 500;

                    letter-spacing: 0.01em;
                }

                .status-dot {
                    width: 6px;
                    height: 6px;

                    border-radius: 50%;

                    background: #a1a1aa;

                    box-shadow: 0 0 0 3px rgba(161, 161, 170, 0.08);
                }

                /* --------------------------------
                   Trophy
                -------------------------------- */

                .trophy-wrap {
                    margin-bottom: 24px;
                }

                .trophy-circle {
                    width: 64px;
                    height: 64px;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    border: 1px solid #2a2a2d;
                    border-radius: 16px;

                    background: #111113;

                    color: #d4d4d8;

                    box-shadow:
                        0 10px 35px rgba(0, 0, 0, 0.25),
                        inset 0 1px 0 rgba(255, 255, 255, 0.035);
                }

                /* --------------------------------
                   Heading
                -------------------------------- */

                .page-title {
                    max-width: 760px;

                    color: #f4f4f5;

                    font-size: clamp(2.5rem, 6vw, 4.5rem);
                    font-weight: 650;

                    line-height: 1.05;

                    letter-spacing: -0.055em;

                    margin-bottom: 20px;
                }

                .page-title span {
                    color: #71717a;
                }

                .page-sub {
                    max-width: 590px;

                    margin-bottom: 56px;

                    color: #8b8b93;

                    font-size: 15px;
                    font-weight: 400;

                    line-height: 1.75;

                    letter-spacing: -0.005em;
                }

                /* --------------------------------
                   Feature cards
                -------------------------------- */

                .features-grid {
                    width: 100%;

                    display: grid;
                    grid-template-columns: repeat(3, 1fr);

                    gap: 10px;

                    margin-bottom: 44px;
                }

                .feature-card {
                    min-height: 150px;

                    display: flex;
                    flex-direction: column;

                    align-items: flex-start;

                    text-align: left;

                    padding: 20px;

                    border: 1px solid #222225;
                    border-radius: 12px;

                    background: #101012;

                    transition:
                        border-color 0.2s ease,
                        background 0.2s ease,
                        transform 0.2s ease;
                }

                .feature-card:hover {
                    border-color: #303034;
                    background: #121214;
                }

                .card-icon {
                    width: 34px;
                    height: 34px;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    margin-bottom: 18px;

                    border: 1px solid #29292c;
                    border-radius: 8px;

                    background: #151517;

                    color: #a1a1aa;
                }

                .card-content {
                    width: 100%;
                }

                .card-content h3 {
                    margin-bottom: 7px;

                    color: #e4e4e7;

                    font-size: 14px;
                    font-weight: 600;

                    letter-spacing: -0.01em;
                }

                .card-content p {
                    color: #71717a;

                    font-size: 12.5px;
                    font-weight: 400;

                    line-height: 1.6;
                }

                /* --------------------------------
                   CTA
                -------------------------------- */

                .cta-section {
                    display: flex;
                    flex-direction: column;
                    align-items: center;

                    gap: 13px;
                }

                .notify-btn {
                    height: 42px;

                    display: inline-flex;
                    align-items: center;
                    justify-content: center;

                    gap: 8px;

                    padding: 0 20px;

                    border: 1px solid #3a3a3e;
                    border-radius: 8px;

                    background: #e4e4e7;

                    color: #111113;

                    font-size: 13px;
                    font-weight: 600;

                    cursor: pointer;

                    transition:
                        background 0.2s ease,
                        border-color 0.2s ease,
                        transform 0.2s ease;
                }

                .notify-btn:hover {
                    background: #ffffff;
                    border-color: #52525b;
                }

                .notify-btn:disabled {
                    cursor: default;
                }

                .notify-btn.notified {
                    background: #18181b;
                    border-color: #303034;
                    color: #a1a1aa;
                }

                .cta-hint {
                    color: #52525b;

                    font-size: 11.5px;
                    line-height: 1.5;
                }

                /* --------------------------------
                   Responsive
                -------------------------------- */

                @media (max-width: 800px) {
                    .features-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }

                @media (max-width: 560px) {
                    .challenge-page {
                        padding: 80px 16px 50px;
                    }

                    .back-btn {
                        top: 16px;
                        left: 16px;
                    }

                    .page-title {
                        font-size: 2.55rem;
                    }

                    .page-sub {
                        font-size: 14px;
                        margin-bottom: 40px;
                    }

                    .features-grid {
                        grid-template-columns: 1fr;
                    }

                    .feature-card {
                        min-height: auto;
                    }

                    .trophy-circle {
                        width: 58px;
                        height: 58px;
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    *,
                    *::before,
                    *::after {
                        animation-duration: 0.01ms !important;
                        animation-iteration-count: 1 !important;
                        transition-duration: 0.01ms !important;
                    }
                }
            `}</style>
        </div>
    );
}