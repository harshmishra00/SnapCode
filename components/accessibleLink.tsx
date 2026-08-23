import { Link, LinkProps as NextUILinkProps } from "@nextui-org/link";
import React, { ReactNode } from "react";
import clsx from "clsx";

interface AccessibleLinkProps extends NextUILinkProps {
    href: string;
    children: ReactNode;
}

export default function AccessibleLink({
    href,
    children,
    className,
    ...rest
}: AccessibleLinkProps) {
    return (
        <Link
            className={clsx("font-semibold text-primary-500", className)}
            href={href}
            {...rest}
        >
            {children}
        </Link>
    );
}
