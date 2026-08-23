import { getDb } from "@/lib/mongodb";

export async function ensureIndexes() {
    try {
        const db = await getDb();

        // Unique index on users.email
        await db
            .collection("users")
            .createIndex({ email: 1 }, { unique: true, sparse: true });

        // Index on snaps.authorId and createdAt
        await db.collection("snaps").createIndex({ authorId: 1 });
        await db
            .collection("snaps")
            .createIndex({ authorId: 1, createdAt: -1 });

        // Unique index on accounts.provider + providerAccountId
        await db
            .collection("accounts")
            .createIndex(
                { provider: 1, providerAccountId: 1 },
                { unique: true },
            );

        // Unique index on sessions.sessionToken
        await db
            .collection("sessions")
            .createIndex({ sessionToken: 1 }, { unique: true });
    } catch (error) {
        console.error("Failed to ensure MongoDB indexes:", error);
    }
}
