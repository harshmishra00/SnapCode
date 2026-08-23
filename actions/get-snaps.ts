"use server";

import { getUserSnaps } from "@/lib/db/snaps";

export const GetSnaps = async (
    userID: string | undefined,
    searchQuery: string = "",
    sortBy: "asc" | "desc" = "desc",
) => {
    return await getUserSnaps(userID, searchQuery, sortBy);
};
