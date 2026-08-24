"use client";

import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownSection,
    DropdownTrigger,
} from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/avatar";
import { User } from "@nextui-org/user";
import { Home, LogOut, PlusIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

import { ThemeSwitch } from "@/components/theme-switch";
import { SignOut } from "@/actions/sign-out";
import { usePRouter } from "@/components/custom-router";

export const NavMenu = ({ size }: { size?: number }) => {
    const { data: session } = useSession();
    const router = usePRouter();

    const handleSignOut = async () => {
        try {
            await SignOut();
        } catch (error) {
            toast.error(
                "An unexpected error occurred. Please try again later.",
            );
        }
    };

    const iconClasses =
        "w-4 text-default-500 flex-shrink-0 group-hover:text-foreground";

    return (
        <div className="flex items-center gap-3">
            <ThemeSwitch />
            <Dropdown placement="bottom-end">
                <DropdownTrigger>
                <Avatar
                    isBordered
                    showFallback
                    as="button"
                    className="transition-transform"
                    size={size ? undefined : "sm"}
                    src={session?.user?.image || undefined}
                    style={{
                        width: size ? size : undefined,
                        height: size ? size : undefined,
                    }}
                />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownSection showDivider aria-label="Profile & Actions">
                    <DropdownItem
                        key="profile"
                        isReadOnly
                        className="h-14 gap-2"
                    >
                        <User
                            avatarProps={{
                                size: "sm",
                                src: session?.user?.image || undefined,
                                showFallback: true,
                            }}
                            classNames={{
                                name: "text-default-600",
                                description: "text-default-500",
                            }}
                            description={session?.user?.email}
                            name={session?.user?.name}
                        />
                    </DropdownItem>
                    <DropdownItem
                        key="dashboard"
                        onClick={() => router.push("/")}
                    >
                        Dashboard
                    </DropdownItem>
                    <DropdownItem
                        key="settings"
                        onClick={() => router.push("/settings")}
                    >
                        Settings
                    </DropdownItem>
                    <DropdownItem
                        key="new_project"
                        endContent={
                            <PlusIcon className={iconClasses} size={16} />
                        }
                    >
                        New Snap
                    </DropdownItem>
                </DropdownSection>
                <DropdownSection showDivider aria-label="Preferences">
                    <DropdownItem key="command_menu" shortcut="⌘K">
                        Command Menu
                    </DropdownItem>
                </DropdownSection>
                <DropdownSection showDivider aria-label="Home & Logout">
                    <DropdownItem
                        key="home"
                        endContent={<Home className={iconClasses} size={16} />}
                        onClick={() => router.push("/home")}
                    >
                        Home Page
                    </DropdownItem>
                    <DropdownItem
                        key="logout"
                        endContent={
                            <LogOut className={iconClasses} size={16} />
                        }
                        onClick={handleSignOut}
                    >
                        Log Out
                    </DropdownItem>
                </DropdownSection>
                <DropdownSection aria-label="Upgrade">
                    <DropdownItem
                        key="upgrade_to_pro"
                        className="bg-foreground text-center text-background data-[hover]:bg-foreground/80 data-[hover]:text-background"
                    >
                        Upgrade to Pro
                    </DropdownItem>
                </DropdownSection>
            </DropdownMenu>
        </Dropdown>
        </div>
    );
};
