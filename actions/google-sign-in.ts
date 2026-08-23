import { signIn } from "next-auth/react";

export const GoogleSignIn = () => {
    return signIn("google", {
        redirect: false,
        callbackUrl: "/",
    });
};
