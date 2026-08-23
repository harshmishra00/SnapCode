"use client";

import { FC } from "react";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { SwitchProps, useSwitch } from "@nextui-org/switch";
import { useTheme } from "next-themes";
import { useIsSSR } from "@react-aria/ssr";
import clsx from "clsx";
import { Moon, Sun } from "lucide-react";

export interface ThemeSwitchProps {
    className?: string;
    classNames?: SwitchProps["classNames"];
    size?: number;
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({
    className,
    classNames,
    size,
}) => {
    const { theme, setTheme } = useTheme();
    const isSSR = useIsSSR();

    const onChange = () => {
        theme === "light" ? setTheme("dark") : setTheme("light");
    };

    const {
        Component,
        slots,
        isSelected,
        getBaseProps,
        getInputProps,
        getWrapperProps,
    } = useSwitch({
        isSelected: theme === "light" || isSSR,
        "aria-label": `Switch to ${theme === "light" || isSSR ? "dark" : "light"} mode`,
        onChange,
    });

    return (
        <Component
            {...getBaseProps({
                className: clsx(
                    "px-px cursor-pointer",
                    className,
                    classNames?.base,
                ),
            })}
        >
            <VisuallyHidden>
                <input {...getInputProps()} />
            </VisuallyHidden>
            <div
                {...getWrapperProps()}
                className={slots.wrapper({
                    class: clsx(
                        [
                            "h-auto w-auto",
                            "bg-transparent",
                            "rounded-lg",
                            "flex items-center justify-center",
                            "group-data-[selected=true]:bg-transparent",
                            "group-data-[selected=true]:text-default-500",
                            "group-data-[hover=true]:text-foreground",
                            "pt-px",
                            "px-0",
                            "mx-0",
                        ],
                        classNames?.wrapper,
                    ),
                })}
            >
                {!isSelected || isSSR ? (
                    <Sun size={size || 16} />
                ) : (
                    <Moon size={size || 16} />
                )}
            </div>
        </Component>
    );
};
