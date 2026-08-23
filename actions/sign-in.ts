import { signIn } from "next-auth/react";

export const SignIn = (values: any) => {
    return signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
    });
};
