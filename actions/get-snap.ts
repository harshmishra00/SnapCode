"use server";

import { getSnapById } from "@/lib/db/snaps";

export const GetSnap = async (snapID: string) => {
    return await getSnapById(snapID);
};
