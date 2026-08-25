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
    credits?: number;
    lastCreditReset?: Date;
    isPremium?: boolean;
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
        credits: 10,
        lastCreditReset: now,
        isPremium: false,
    };

    const result = await collection.insertOne(newDoc);

    return {
        ...newDoc,
        _id: result.insertedId,
        id: result.insertedId.toString(),
    };
}

/**
 * Ensures user credits are properly initialized or reset daily.
 * Returns the current (or newly reset) credit balance and premium status.
 */
export async function getUserCreditsData(userId: string): Promise<{ credits: number; isPremium: boolean }> {
    const user = await findUserById(userId);
    if (!user) {
        throw new Error("User not found");
    }

    if (user.isPremium) {
        return { credits: Infinity, isPremium: true };
    }

    const now = new Date();
    const lastReset = user.lastCreditReset;
    let currentCredits = user.credits ?? 10;
    
    // Check if last reset was before today (local time or UTC is fine for simple reset, using UTC day change here)
    const needsReset = !lastReset || (now.getUTCFullYear() > lastReset.getUTCFullYear() || now.getUTCMonth() > lastReset.getUTCMonth() || now.getUTCDate() > lastReset.getUTCDate());

    if (needsReset || user.credits === undefined) {
        const collection = await getUsersCollection();
        await collection.updateOne(
            { _id: new ObjectId(userId) },
            { $set: { credits: 10, lastCreditReset: now } }
        );
        currentCredits = 10;
    }

    return { credits: currentCredits, isPremium: false };
}

/**
 * Attempts to consume one execution credit.
 * Returns true if successful, false if no credits left.
 */
export async function consumeUserCredit(userId: string): Promise<boolean> {
    const { credits, isPremium } = await getUserCreditsData(userId);
    
    if (isPremium) {
        return true;
    }

    if (credits <= 0) {
        return false;
    }

    const collection = await getUsersCollection();
    await collection.updateOne(
        { _id: new ObjectId(userId) },
        { $inc: { credits: -1 } }
    );

    return true;
}
