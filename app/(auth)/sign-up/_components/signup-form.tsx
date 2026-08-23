"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@nextui-org/shared-icons";
import { Spinner } from "@nextui-org/spinner";

import AccessibleLink from "@/components/accessibleLink";
import { GoogleIcon } from "@/components/google-icon";
import { SignUp } from "@/actions/sign-up";
import { GoogleSignIn } from "@/actions/google-sign-in";

const SignUpForm = () => {
    const router = useRouter();

    const [authLoading, setAuthLoading] = useState({
        credential: false,
        google: false,
    });

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const toggleVisibility = () => setIsPasswordVisible(!isPasswordVisible);

    const FormSchema = z.object({
        name: z.string().min(1, "Name is required").max(100),
        email: z.string().min(1, "Email is required").email("Invalid email"),
        password: z
            .string()
            .min(1, "Password is required")
            .min(8, "Password must have more than 8 characters"),
    });

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        try {
            setAuthLoading((prev) => ({ ...prev, credential: true }));
            const response = await SignUp(values);

            if (response.ok) {
                toast.success("Signup was successful. Please sign in.");
                router.push("/sign-in");
            } else {
                setAuthLoading((prev) => ({ ...prev, credential: false }));
                toast.error("Credentials are invalid or already in use.");
            }
        } catch (error) {
            setAuthLoading((prev) => ({ ...prev, credential: false }));

            toast.error(
                "An unexpected error occurred. Please try again later.",
            );
        } finally {
            setAuthLoading((prev) => ({ ...prev, credential: false }));
        }
    };

    const signInWithGoogleOnClickHandler = async () => {
        try {
            setAuthLoading((prev) => ({ ...prev, google: true }));
            const response = await GoogleSignIn();

            if (response?.error) {
                toast.error("");
                setAuthLoading((prev) => ({ ...prev, google: false }));
            }
        } catch (error) {
            setAuthLoading((prev) => ({ ...prev, google: false }));
            toast.error(
                "An unexpected error occurred. Please try again later.",
            );
        } finally {
            setAuthLoading((prev) => ({ ...prev, credential: false }));
        }
    };

    const loading = authLoading.credential || authLoading.google;

    return (
        <form
            className="grid content-center gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
        >
            <Input
                isDisabled={loading}
                label="Name"
                placeholder="John Doe"
                required={false}
                {...form.register("name")}
                errorMessage={form.formState.errors.name?.message}
                isInvalid={!!form.formState.errors.name}
            />
            <Input
                isDisabled={loading}
                label="Email"
                placeholder="mail@example.com"
                required={false}
                {...form.register("email")}
                errorMessage={form.formState.errors.email?.message}
                isInvalid={!!form.formState.errors.email}
            />
            <Input
                endContent={
                    <button
                        aria-label="toggle password visibility"
                        className="focus:outline-none"
                        type="button"
                        onClick={toggleVisibility}
                    >
                        {isPasswordVisible ? (
                            <EyeSlashFilledIcon className="pointer-events-none text-2xl text-default-400" />
                        ) : (
                            <EyeFilledIcon className="pointer-events-none text-2xl text-default-400" />
                        )}
                    </button>
                }
                isDisabled={loading}
                isInvalid={!!form.formState.errors.password}
                {...form.register("password")}
                errorMessage={form.formState.errors.password?.message}
                label="Password"
                placeholder="Enter your password"
                required={false}
                type={isPasswordVisible ? "text" : "password"}
            />
            <Button
                className="font-semibold"
                color="primary"
                isDisabled={loading}
                type="submit"
            >
                {authLoading.credential ? (
                    <Spinner color="current" size="sm" />
                ) : (
                    "Create account"
                )}
            </Button>
            <div className="grid grid-cols-[1fr,_auto,_1fr] items-center gap-2">
                <Divider />
                <span className="text-center">or</span>
                <Divider />
            </div>
            <Button
                className="font-semibold"
                isDisabled={loading}
                startContent={
                    authLoading.google ? (
                        <Spinner size="sm" />
                    ) : (
                        <GoogleIcon size={20} />
                    )
                }
                variant="ghost"
                onClick={signInWithGoogleOnClickHandler}
            >
                Sign up with Google
            </Button>
            <p className="text-center text-sm opacity-80">
                {"By signing up, you agree to our "}
                <AccessibleLink href="/sign-in" size="sm">
                    terms
                </AccessibleLink>
                {", "}
                <AccessibleLink href="/sign-in" size="sm">
                    acceptable use
                </AccessibleLink>
                {", and "}
                <AccessibleLink href="/sign-in" size="sm">
                    privacy policy
                </AccessibleLink>
            </p>
        </form>
    );
};

export default SignUpForm;
