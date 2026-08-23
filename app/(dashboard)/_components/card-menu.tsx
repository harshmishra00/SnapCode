"use client";

import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
} from "@nextui-org/dropdown";
import { cn } from "@nextui-org/theme";
import { Clipboard, Edit, Ellipsis, Eye, Trash } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { DeleteSnap } from "@/actions/delete-snap";

interface CardMenuProps {
    snapId: string;
}

export default function CardMenu({ snapId }: CardMenuProps) {
    const iconClasses = "w-4 text-default-500 flex-shrink-0";
    const router = useRouter();

    const handleCopyLink = () => {
        const link = `${window.location.origin}/snap/${snapId}`;

        navigator.clipboard.writeText(link);
        toast.success("Link copied to clipboard");
    };

    const handleView = () => {
        router.push(`/snap/${snapId}`);
    };

    const handleDelete = async () => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this snap? This action cannot be undone.",
        );

        if (confirmed) {
            try {
                await DeleteSnap(snapId);
                toast.success("Snap deleted successfully");
                router.refresh();
            } catch (error) {
                toast.error("Failed to delete snap");
            }
        }
    };

    return (
        <Dropdown placement="bottom-end">
            <DropdownTrigger
                as="button"
                className="flex h-8 w-8 items-center justify-center rounded p-2 transition hover:bg-foreground/10"
            >
                <Ellipsis height={16} width={16} />
            </DropdownTrigger>
            <DropdownMenu
                aria-label="Snap Card Dropdown menu"
                variant="flat"
                onAction={(key) => {
                    if (key === "copy") handleCopyLink();
                    if (key === "view") handleView();
                    if (key === "edit") handleView(); // Edit is same as view for now
                    if (key === "delete") handleDelete();
                }}
            >
                <DropdownItem
                    key="copy"
                    startContent={<Clipboard className={iconClasses} />}
                >
                    Copy link
                </DropdownItem>
                <DropdownItem
                    key="view"
                    startContent={<Eye className={iconClasses} />}
                >
                    View Snap
                </DropdownItem>
                <DropdownItem
                    key="edit"
                    startContent={<Edit className={iconClasses} />}
                >
                    Edit Snap
                </DropdownItem>
                <DropdownItem
                    key="delete"
                    className="text-red-500 data-[hover]:text-red-500"
                    startContent={
                        <Trash className={cn(iconClasses, "text-current")} />
                    }
                >
                    Delete Snap
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}
