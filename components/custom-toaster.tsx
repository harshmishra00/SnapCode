"use client";

import { Toaster } from "sonner";
import { CircleAlert, CircleX, Loader, TriangleAlert } from "lucide-react";

export default function CustomToaster() {
    return (
        <Toaster
            expand={true}
            icons={{
                info: <CircleAlert height={20} width={20} />,
                warning: <TriangleAlert height={20} width={20} />,
                error: <CircleX height={20} width={20} />,
                loading: (
                    <Loader
                        className="animate-spinner-ease-spin"
                        height={20}
                        width={20}
                    />
                ),
            }}
            position="bottom-center"
            theme={`dark`}
            toastOptions={{
                classNames: {
                    toast: "rounded-md items-start gap-2 border-none bg-[#707070] data-[type=success]:bg-[#007d4e] data-[type=error]:bg-[#d71913] data-[type=info]:bg-[#0367e0] data-[type=warning]:bg-[#8a3800]",
                    icon: "mt-[2px]",
                    title: "text-sm font-normal text-white",
                    /* OTHER PROPS TO STYLE */
                    // actionButton: "bg-zinc-400",
                    // cancelButton: "bg-orange-400",
                    // closeButton: "bg-lime-400",
                },
            }}
            visibleToasts={2}
        />
    );
}
