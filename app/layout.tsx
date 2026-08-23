import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import React from "react";
import { Inter } from "next/font/google";
// import { SpeedInsights } from "@vercel/speed-insights/next";
// import { Analytics } from "@vercel/analytics/react";

import { Providers } from "./providers";

import TopLoader from "@/components/top-loader";
import CustomToaster from "@/components/custom-toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "SnapCode - Create, Run & Share Code Instantly",
    description:
        "SnapCode is a simple platform for running and sharing code snippets quickly and easily. Create, share, and run code snippets with just a link.",
    keywords:
        "SnapCode, code sharing, code execution, snippets, instant code sharing, developers, programming, run code, share code, code snippets, coding tools",
    authors: {
        name: "Ranit Manik",
        url: "https://github.com/RanitManik",
    },
    metadataBase: new URL("https://codesnap.pro/"),
    openGraph: {
        title: "SnapCode - Create, Run & Share Code Instantly",
        description:
            "Create, Run and share code snippets quickly and easily with SnapCode. Create and view code snippets with a single link.",
        url: "https://codesnap.pro/",
        type: "website",
        images: [
            {
                url: "/OG.png",
                width: 2400,
                height: 1260,
                alt: "SnapCode - Create, Run & Share Code Instantly",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "SnapCode - Create, Run & Share Code Instantly",
        description:
            "Easily run and share code snippets with SnapCode. Create, share, and run code with a simple link.",
        images: ["/OG.png"],
    },
};

export const viewport: Viewport = {
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "white" },
        { media: "(prefers-color-scheme: dark)", color: "black" },
    ],
};

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers
                    themeProps={{
                        attribute: "class",
                        defaultTheme: "dark",
                    }}
                >
                    <div className="relative min-h-svh">{children}</div>
                </Providers>
                {/* Vercel Analytics for Web Performance Monitoring */}
                {/* <Analytics />
                {/* Vercel Speed Insights for Page Speed Analysis */}
                {/* <SpeedInsights /> */}
                {/* TopLoader for loading animation */}
                <TopLoader />
                {/* Toast notifications for user feedback */}
                <CustomToaster />
            </body>
        </html>
    );
}
