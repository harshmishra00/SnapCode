import { Link } from "@nextui-org/link";
import { Bookmark, Code, Share2, Users } from "lucide-react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import AccessibleLink from "@/components/accessibleLink";
import SignInForm from "@/app/(auth)/sign-in/_components/signin-form";
import { authOptions } from "@/lib/auth";
import BrandLogo from "@/components/brand-logo";
import Logo from "@/components/logo";
import { Sparkles } from "@/components/sparkles";

export default async function Page() {
    const session = await getServerSession(authOptions);

    if (session) {
        redirect("/");
    } else
        return (
            <div className="grid min-h-screen lg:grid-cols-2">
                <header className="absolute left-0 top-0 hidden p-6 lg:block">
                    <Link className="hover:opacity-1" href="/">
                        <Logo />
                        <BrandLogo className="ms-2" />
                    </Link>
                </header>
                <aside className="relative mt-24 hidden content-center overflow-hidden lg:grid">
                    <div className="m-auto mb-4 max-w-xl p-8">
                        <h1 className="mb-8 text-4xl xl:text-5xl">
                            Create, Run and Share
                        </h1>
                        <ul className="grid gap-4 text-sm xl:grid-cols-2">
                            <li className="grid grid-cols-[auto,_1fr] gap-2">
                                <Code size="16" />
                                <p className="opacity-70">
                                    Run your code snippets directly from your
                                    browser
                                </p>
                            </li>
                            <li className="grid grid-cols-[auto,_1fr] gap-2">
                                <Share2 size={16} />
                                <p className="opacity-70">
                                    Share code snippets with others through
                                    simple links
                                </p>
                            </li>
                            <li className="grid grid-cols-[auto,_1fr] gap-2">
                                <Users size={16} />
                                <p className="opacity-70">
                                    Work together with friends or teammates on
                                    code snippets
                                </p>
                            </li>
                            <li className="grid grid-cols-[auto,_1fr] gap-2">
                                <Bookmark size={16} />
                                <p className="opacity-70">
                                    Save, categorize, and revisit your favorite
                                    snippets anytime
                                </p>
                            </li>
                        </ul>
                    </div>
                    <div className="relative -mt-32 h-96 w-full overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#369eff,transparent_80%)] before:opacity-100 after:absolute after:-left-1/2 after:top-1/2 after:aspect-[1/0.7] after:w-[200%] after:rounded-[100%] after:border-t after:border-[#7876c566] after:bg-zinc-900">
                        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#ffffff2c_1px,transparent_1px),linear-gradient(to_bottom,#3a3a3a01_1px,transparent_1px)] bg-[size:70px_80px]" />
                        <Sparkles
                            className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
                            color="#FFFFFF"
                            density={800}
                            size={1.1}
                            speed={1}
                        />
                    </div>
                </aside>
                <main className="m-auto w-full max-w-lg p-4 lg:p-6">
                    <Logo height="50" width="50" />
                    <div className="my-4 grid gap-2">
                        <h1 className="text-xl font-bold">
                            Sign in to SnapCode
                        </h1>
                        <p className="opacity-70">
                            Don&lsquo;t have an account?&nbsp;
                            <AccessibleLink href="/sign-up">
                                Sign up
                            </AccessibleLink>
                            .
                        </p>
                    </div>
                    <SignInForm />
                </main>
            </div>
        );
}
