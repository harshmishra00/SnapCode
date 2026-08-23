"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { Divider } from "@nextui-org/divider";
import { useState } from "react";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@nextui-org/shared-icons";
import { Spinner } from "@nextui-org/spinner";

import { GoogleSignIn } from "@/actions/google-sign-in";
import { SignIn } from "@/actions/sign-in";
import { GoogleIcon } from "@/components/google-icon";
import AccessibleLink from "@/components/accessibleLink";

const SignInForm = () => {
    const router = useRouter();

    const [authLoading, setAuthLoading] = useState({
        credential: false,
        google: false,
    });

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const toggleVisibility = () => setIsPasswordVisible(!isPasswordVisible);

    const FormSchema = z.object({
        email: z.string().min(1, "Email is required").email("Invalid email"),
        password: z
            .string()
            .min(1, "Password is required")
            .min(8, "Password must have at least 8 characters"),
    });

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        try {
            setAuthLoading((prev) => ({ ...prev, credential: true }));
            const response = await SignIn(values);

            if (response?.ok) {
                toast.success("Signed in successfully.");
                router.push("/");
            } else {
                setAuthLoading((prev) => ({ ...prev, credential: false }));
                toast.error("Invalid credentials. Please try again.");
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

    const isLoading = authLoading.credential || authLoading.google;

    return (
        <form
            className="grid content-center gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
        >
            <Input
                isDisabled={isLoading}
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
                isDisabled={isLoading}
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
                isDisabled={isLoading}
                type="submit"
            >
                {authLoading.credential ? (
                    <Spinner color="current" size="sm" />
                ) : (
                    "Continue"
                )}
            </Button>
            <div className="grid grid-cols-[1fr,_auto,_1fr] items-center gap-2">
                <Divider />
                <span className="text-center">or</span>
                <Divider />
            </div>
            <Button
                className="font-semibold"
                isDisabled={isLoading}
                startContent={
                    authLoading.google ? (
                        <Spinner size="sm" />
                    ) : (
                        <GoogleIcon size={20} />
                    )
                }
                type="button"
                variant="ghost"
                onClick={signInWithGoogleOnClickHandler}
            >
                Sign in with Google
            </Button>
            <p className="text-center text-sm opacity-80">
                {"By signing in, you agree to our "}
                <AccessibleLink href="/sign-in" size="sm">
                    terms of service
                </AccessibleLink>
                {", and "}
                <AccessibleLink href="/sign-in" size="sm">
                    privacy policy
                </AccessibleLink>
            </p>
        </form>
    );
};

export default SignInForm;
