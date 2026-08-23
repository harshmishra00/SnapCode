import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { compare } from "bcrypt";
import GoogleProvider from "next-auth/providers/google";

import clientPromise from "@/lib/mongodb";
import { findUserByEmail } from "@/lib/db/users";
import { ensureIndexes } from "@/lib/db/indexes";

// Ensure MongoDB indexes are created asynchronously
ensureIndexes().catch((err) => {
    console.error("Error creating indexes:", err);
});

export const authOptions: NextAuthOptions = {
    adapter: MongoDBAdapter(clientPromise),
    secret: process.env.NEXT_AUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/sign-in",
        error: "/auth-error",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) {
                    return null;
                }

                const existingUser = await findUserByEmail(credentials.email);

                if (!existingUser) {
                    return null;
                }

                if (!existingUser.password) {
                    return null;
                }

                const passwordMatch = await compare(
                    credentials.password,
                    existingUser.password,
                );

                if (!passwordMatch) {
                    return null;
                }

                const userId = existingUser._id
                    ? existingUser._id.toString()
                    : existingUser.id || "";

                return {
                    id: userId,
                    name: existingUser.name,
                    email: existingUser.email,
                };
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
            allowDangerousEmailAccountLinking: true,
            httpOptions: {
                timeout: 40000,
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                return {
                    ...token,
                    name: user.name,
                };
            }

            return token;
        },
        async session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    name: token.name,
                    id: token.sub || "",
                },
            };
        },
    },
};
