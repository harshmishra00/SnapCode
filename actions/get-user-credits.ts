"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getUserCreditsData } from "@/lib/db/users";

export async function GetUserCredits() {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.id) {
        return null;
    }

    try {
        const data = await getUserCreditsData(session.user.id);
        return data;
    } catch (error) {
        console.error("Error fetching user credits:", error);
        return null;
    }
}
