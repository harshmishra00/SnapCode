import { signOut } from "next-auth/react";

export const SignOut = () => {
    return signOut({
        redirect: true,
        callbackUrl: `${window.location.origin}/sign-in`,
    });
};
