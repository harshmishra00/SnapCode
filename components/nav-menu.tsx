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
import { useEffect } from "react";

import { useCreditStore } from "@/stores/credit-store";
import { GetUserCredits } from "@/actions/get-user-credits";
import { ThemeSwitch } from "@/components/theme-switch";
import { SignOut } from "@/actions/sign-out";
import { usePRouter } from "@/components/custom-router";

export const NavMenu = ({ size }: { size?: number }) => {
    const { data: session } = useSession();
    const router = usePRouter();
    
    const { credits, isPremium, setCreditsData } = useCreditStore();

    useEffect(() => {
        if (session?.user?.id) {
            GetUserCredits().then((data) => {
                if (data) {
                    setCreditsData(data.credits, data.isPremium);
                }
            });
        }
    }, [session?.user?.id, setCreditsData]);

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
            
            {session && (
                <div className="flex items-center gap-1.5 px-2 py-1 bg-default-100 rounded-full border border-default-200">
                    <span className="text-xs font-medium text-default-600">
                        {isPremium ? (
                            <span className="text-warning-500">Premium</span>
                        ) : (
                            <>{credits !== null ? credits : "..."} / 10</>
                        )}
                    </span>
                    <span className="text-[10px] text-default-400 uppercase font-bold tracking-wider">Credits</span>
                </div>
            )}
            
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
                            endContent={
                                <Home className={iconClasses} size={16} />
                            }
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
