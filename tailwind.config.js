import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-sans)"],
                mono: ["var(--font-mono)"],
            },
            animation: {
                "slide-up": "slide-up 1s ease-out forwards",
            },
            keyframes: {
                "slide-up": {
                    "0%": {
                        transform: "translate(-50%, 100%)",
                        opacity: 0,
                    },
                    "100%": {
                        transform: "translate(-50%, 0)",
                        opacity: 1,
                    },
                },
            },
            colors: {
                danger: {
                    DEFAULT: "#ff4d4f",
                    dark: "#ff4d4f",
                    light: "#ff4d4f",
                },
                success: {
                    DEFAULT: "#007d4e",
                    dark: "#007d4e",
                    light: "#007d4e",
                },
            },
        },
    },
    darkMode: "class",
    plugins: [
        nextui({
            layout: {
                radius: {
                    small: "4px",
                    medium: "6px",
                    large: "8px",
                },
            },
        }),
    ],
};
