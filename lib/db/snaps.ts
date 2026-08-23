import { ObjectId, Filter } from "mongodb";

import { getDb } from "@/lib/mongodb";

export interface SnapDoc {
    _id?: ObjectId;
    id?: string;
    name: string;
    language: string;
    code: string;
    createdAt: Date;
    updatedAt: Date;
    visibility: string;
    authorId: string;
}

export async function getSnapsCollection() {
    const db = await getDb();

    return db.collection<SnapDoc>("snaps");
}

export async function createSnap(data: {
    snapName: string;
    language: string;
    visibility: string;
    userId: string;
    code: string;
}): Promise<SnapDoc> {
    const collection = await getSnapsCollection();

    const now = new Date();
    const newDoc: SnapDoc = {
        name: data.snapName,
        language: data.language,
        visibility: data.visibility || "private",
        authorId: data.userId,
        code: data.code,
        createdAt: now,
        updatedAt: now,
    };

    const result = await collection.insertOne(newDoc);

    return {
        ...newDoc,
        _id: result.insertedId,
        id: result.insertedId.toString(),
    };
}

export async function getSnapById(snapId: string): Promise<SnapDoc | null> {
    const collection = await getSnapsCollection();

    let query: Filter<SnapDoc>;

    if (ObjectId.isValid(snapId)) {
        query = { _id: new ObjectId(snapId) };
    } else {
        query = { id: snapId } as Filter<SnapDoc>;
    }

    const snap = await collection.findOne(query);

    if (!snap) return null;

    return {
        ...snap,
        id: snap._id ? snap._id.toString() : snap.id,
    };
}

export async function getUserSnaps(
    userID: string | undefined,
    searchQuery: string = "",
    sortBy: "asc" | "desc" = "desc",
): Promise<SnapDoc[]> {
    const collection = await getSnapsCollection();

    const filter: Filter<SnapDoc> = {};

    if (userID) {
        filter.authorId = userID;
    }

    if (searchQuery.trim()) {
        const regex = new RegExp(searchQuery, "i");

        filter.$or = [
            { name: { $regex: regex } },
            { language: { $regex: regex } },
        ];
    }

    const sortOrder = sortBy === "asc" ? 1 : -1;

    const docs = await collection
        .find(filter)
        .sort({ createdAt: sortOrder })
        .toArray();

    return docs.map((doc) => ({
        ...doc,
        id: doc._id ? doc._id.toString() : doc.id,
    }));
}

export async function updateSnap(
    snapId: string,
    code: string,
): Promise<SnapDoc | null> {
    const collection = await getSnapsCollection();

    let query: Filter<SnapDoc>;

    if (ObjectId.isValid(snapId)) {
        query = { _id: new ObjectId(snapId) };
    } else {
        query = { id: snapId } as Filter<SnapDoc>;
    }

    const now = new Date();

    await collection.updateOne(query, {
        $set: {
            code,
            updatedAt: now,
        },
    });

    return await getSnapById(snapId);
}

export async function deleteSnap(snapId: string): Promise<boolean> {
    const collection = await getSnapsCollection();

    let query: Filter<SnapDoc>;

    if (ObjectId.isValid(snapId)) {
        query = { _id: new ObjectId(snapId) };
    } else {
        query = { id: snapId } as Filter<SnapDoc>;
    }

    const result = await collection.deleteOne(query);

    return result.deletedCount > 0;
}
