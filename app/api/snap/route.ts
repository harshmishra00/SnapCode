import { NextResponse } from "next/server";

import { createSnap, updateSnap, deleteSnap } from "@/lib/db/snaps";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { language, snapName, visibility, userId, code } = body;

        // Validate that required fields are present
        if (!language || !snapName || !visibility || !userId || !code) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 },
            );
        }

        // Create new snap in the database
        const newSnap = await createSnap({
            language,
            snapName,
            visibility,
            userId,
            code,
        });

        return NextResponse.json(
            {
                message: "Snap created successfully",
                snap: newSnap,
            },
            { status: 201 },
        );
    } catch (error) {
        return NextResponse.json(
            { message: "An error occurred" },
            { status: 500 },
        );
    }
}

export async function PATCH(req: Request) {
    try {
        const body = await req.json();
        const { snapId, code } = body;

        if (!snapId || !code) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 },
            );
        }

        const updatedSnap = await updateSnap(snapId, code);

        if (!updatedSnap) {
            return NextResponse.json(
                { message: "Snap not found" },
                { status: 404 },
            );
        }

        return NextResponse.json(
            {
                message: "Snap updated successfully",
                snap: updatedSnap,
            },
            { status: 200 },
        );
    } catch (error) {
        return NextResponse.json(
            { message: "An error occurred" },
            { status: 500 },
        );
    }
}

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const snapId = searchParams.get("id");

        if (!snapId) {
            return NextResponse.json(
                { message: "Snap ID is required" },
                { status: 400 },
            );
        }

        const success = await deleteSnap(snapId);

        if (!success) {
            return NextResponse.json(
                { message: "Snap not found or could not be deleted" },
                { status: 404 },
            );
        }

        return NextResponse.json(
            { message: "Snap deleted successfully" },
            { status: 200 },
        );
    } catch (error) {
        return NextResponse.json(
            { message: "An error occurred" },
            { status: 500 },
        );
    }
}
