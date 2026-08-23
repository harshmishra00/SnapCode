"use client";

import { Save, LoaderCircle } from "lucide-react";
import { Button } from "@nextui-org/button";
import { toast } from "sonner";

import { useCodeStore } from "@/stores";
import { UpdateSnap } from "@/actions/update-snap";

export default function SaveButton() {
    const { code, snapId, isSaving, setIsSaving, setLastSavedCode } =
        useCodeStore();

    async function handleSave() {
        if (isSaving || !snapId) return;

        setIsSaving(true);
        try {
            await UpdateSnap(snapId, code);
            setLastSavedCode(code);
            toast.success("Snap saved manually!");
        } catch (error) {
            toast.error("Failed to save snap.");
        } finally {
            setIsSaving(false);
        }
    }

    return (
        <Button
            className="flex h-8 items-center gap-2 bg-blue-600 px-3 text-sm font-semibold text-white hover:bg-blue-700"
            isDisabled={isSaving}
            startContent={
                isSaving ? (
                    <LoaderCircle
                        className="animate-spinner-linear-spin"
                        size={16}
                    />
                ) : (
                    <Save size={16} />
                )
            }
            title="Save Snap (Ctrl+S)"
            onClick={handleSave}
        >
            <span className="hidden sm:inline">Save</span>
        </Button>
    );
}
