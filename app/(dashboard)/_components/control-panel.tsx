"use client";

import { ChevronDown, Search } from "lucide-react";
import { Input } from "@nextui-org/input";
import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import { useState, useMemo, useEffect, useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import CreateSnapModal from "@/app/(dashboard)/_components/create-snap-modal";
import useMediaQuery from "@/hooks/media-query";

export default function ControlPanel() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const isMobile = useMediaQuery("(max-width: 640px)");

    const [search, setSearch] = useState(searchParams.get("query") || "");

    const getSortLabel = (sort: string) => {
        return sort === "asc" ? "Oldest" : "Newest";
    };

    const [selectedKeys, setSelectedKeys] = useState<Set<string>>(
        new Set([getSortLabel(searchParams.get("sort") || "desc")]),
    );

    const selectedValue = useMemo(
        () => Array.from(selectedKeys).join(", "),
        [selectedKeys],
    );

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());

            params.set(name, value);

            return params.toString();
        },
        [searchParams],
    );

    // Debounce search
    useEffect(() => {
        const timeout = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());

            if (search) {
                params.set("query", search);
            } else {
                params.delete("query");
            }
            router.replace(pathname + "?" + params.toString());
        }, 500);

        return () => clearTimeout(timeout);
    }, [search]); // Only depend on search state

    const handleSortChange = (keys: any) => {
        const selected = Array.from(keys)[0] as string;

        setSelectedKeys(new Set([selected]));

        const sortValue = selected === "Newest" ? "desc" : "asc";

        router.push(pathname + "?" + createQueryString("sort", sortValue));
    };

    return (
        <div className="m-auto flex max-w-screen-xl justify-between gap-4 px-6">
            <Input
                fullWidth
                isClearable
                placeholder="Search..."
                startContent={<Search className="h-4 w-4 opacity-50" />}
                value={search}
                onValueChange={setSearch}
            />
            <div className="flex gap-3">
                <Dropdown>
                    <DropdownTrigger>
                        <Button
                            className="capitalize"
                            endContent={<ChevronDown size={16} />}
                            isIconOnly={isMobile}
                        >
                            <span className="hidden sm:flex">
                                {selectedValue}
                            </span>
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        disallowEmptySelection
                        aria-label="Sort options"
                        selectedKeys={selectedKeys}
                        selectionMode="single"
                        variant="flat"
                        onSelectionChange={handleSortChange}
                    >
                        <DropdownItem key="Newest">Newest</DropdownItem>
                        <DropdownItem key="Oldest">Oldest</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <CreateSnapModal isMobile={isMobile} />
            </div>
        </div>
    );
}
