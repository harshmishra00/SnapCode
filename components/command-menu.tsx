"use client";

import { useEffect, useState } from "react";
import {
    CreditCard,
    FileText,
    LayoutGrid,
    Mail,
    MessageCircle,
    Moon,
    PlusIcon,
    Settings,
    Sun,
    User,
} from "lucide-react";

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/command";

export const CommandMenu = () => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener("keydown", down);

        return () => document.removeEventListener("keydown", down);
    }, []);

    return (
        <CommandDialog isOpen={open} size="lg" onOpenChange={setOpen}>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Suggestions">
                    <CommandItem>
                        <LayoutGrid className="mr-2 h-4 w-4" />
                        <span>Search Snaps</span>
                    </CommandItem>
                    <CommandItem>
                        <PlusIcon className="mr-2 h-4 w-4" />
                        <span>Create New Snap</span>
                    </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Settings">
                    <CommandItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                    </CommandItem>
                    <CommandItem>
                        <CreditCard className="mr-2 h-4 w-4" />
                        <span>Billing</span>
                    </CommandItem>
                    <CommandItem>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                    </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Theme">
                    <CommandItem>
                        <Sun className="mr-2 h-4 w-4" />
                        <span>Light</span>
                    </CommandItem>
                    <CommandItem>
                        <Moon className="mr-2 h-4 w-4" />
                        <span>Dark</span>
                    </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Help">
                    <CommandItem>
                        <FileText className="mr-2 h-4 w-4" />
                        <span>Search Docs</span>
                    </CommandItem>
                    <CommandItem>
                        <MessageCircle className="mr-2 h-4 w-4" />
                        <span>Send Feedback</span>
                    </CommandItem>
                    <CommandItem>
                        <Mail className="mr-2 h-4 w-4" />
                        <span>Contact Support</span>
                    </CommandItem>
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    );
};
