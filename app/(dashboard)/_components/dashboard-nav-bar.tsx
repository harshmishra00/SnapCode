"use client";

import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { Chip } from "@nextui-org/chip";

import BrandLogo from "@/components/brand-logo";
// import Logo from "@/components/logo";
import { NavMenu } from "@/components/nav-menu";
import { FriendCodingChallenge } from "@/components/friend-coding-challenge";

export default function DashboardNavBar() {
    return (
        <Navbar isBordered maxWidth="2xl">
            <NavbarBrand>
                <Link className="hover:opacity-1" href="/">
                    <BrandLogo className="mx-2" />
                    <h1 className="font-monoton text-xl font-bold text-black dark:text-white">
                        SnapCode
                    </h1>
                    &nbsp;&nbsp;
                </Link>
                <Chip
                    classNames={{
                        base: "bg-gradient-to-br from-indigo-500 to-pink-500",
                        content: "text-white",
                    }}
                    size="sm"
                >
                    {" "}
                    Premium{" "}
                </Chip>
                <p className="pl-1 text-sm text-gray-500">(beta)</p>
            </NavbarBrand>
            <NavbarContent
                as="div"
                className="items-center gap-3"
                justify="end"
            >
                <FriendCodingChallenge />
                <NavMenu />
            </NavbarContent>
        </Navbar>
    );
}
