import { NextResponse } from "next/server";
import { hash } from "bcrypt";

import { findUserByEmail, createUser } from "@/lib/db/users";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, name, password } = body;

        // check if email already exists
        const existingUserByEmail = await findUserByEmail(email);

        // run if email already exists
        if (existingUserByEmail) {
            return NextResponse.json(
                { user: null, message: "User already exists" },
                { status: 409 },
            );
        }

        // generate hashed password from bcrypt
        const hashedPassword = await hash(password, 10);

        if (!hashedPassword) {
            return NextResponse.json(
                { message: "Error hashing password" },
                { status: 500 },
            );
        }

        // add new user to the database
        const newUser = await createUser({
            email,
            name,
            password: hashedPassword,
        });

        // Remove the password from the response
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _, ...userWithoutPassword } = newUser;

        return NextResponse.json(
            {
                user: userWithoutPassword,
                message: "User Created successfully",
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
