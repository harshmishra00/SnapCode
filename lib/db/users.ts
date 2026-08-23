import { ObjectId } from "mongodb";

import { getDb } from "@/lib/mongodb";

export interface UserDoc {
    _id?: ObjectId;
    id?: string;
    name?: string | null;
    email?: string | null;
    password?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
    emailVerified?: Date | null;
    image?: string | null;
}

export async function getUsersCollection() {
    const db = await getDb();

    return db.collection<UserDoc>("users");
}

export async function findUserByEmail(email: string): Promise<UserDoc | null> {
    const collection = await getUsersCollection();
    const user = await collection.findOne({ email });

    if (!user) return null;

    return {
        ...user,
        id: user._id?.toString(),
    };
}

export async function findUserById(id: string): Promise<UserDoc | null> {
    if (!ObjectId.isValid(id)) return null;

    const collection = await getUsersCollection();
    const user = await collection.findOne({ _id: new ObjectId(id) });

    if (!user) return null;

    return {
        ...user,
        id: user._id?.toString(),
    };
}

export async function createUser(data: {
    email: string;
    name?: string;
    password?: string;
}): Promise<UserDoc> {
    const collection = await getUsersCollection();

    const now = new Date();
    const newDoc: UserDoc = {
        email: data.email,
        name: data.name || null,
        password: data.password || null,
        createdAt: now,
        updatedAt: now,
        emailVerified: null,
        image: null,
    };

    const result = await collection.insertOne(newDoc);

    return {
        ...newDoc,
        _id: result.insertedId,
        id: result.insertedId.toString(),
    };
}
