export const SignUp = (values: any) => {
    return fetch("/api/user", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: values.name,
            email: values.email,
            password: values.password,
        }),
    });
};
