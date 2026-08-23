import { Folder } from "lucide-react";
import { getServerSession } from "next-auth";

import ControlPanel from "@/app/(dashboard)/_components/control-panel";
import SnapInfoCard from "@/app/(dashboard)/_components/snap-info-card";
import DashboardNavBar from "@/app/(dashboard)/_components/dashboard-nav-bar";
import { CommandMenu } from "@/components/command-menu";
import { authOptions } from "@/lib/auth";
import { GetSnaps } from "@/actions";

export default async function Page({
    searchParams,
}: {
    searchParams: { query?: string; sort?: "asc" | "desc" };
}) {
    const session = await getServerSession(authOptions);

    const query = searchParams?.query || "";
    const sort = searchParams?.sort === "asc" ? "asc" : "desc";

    let snapData;

    try {
        snapData = await GetSnaps(session?.user.id, query, sort);
    } catch (error) {
        // TODO: Make Page for the failed loading Snippets [No Internet / Server Error]
        return <div>Unable to load snaps. Please try again later.</div>;
    }

    // If no snap is found
    if (!snapData) {
        // TODO: Make component for the failed loading Snippets
        return <div>Unable to load snaps. Please try again later.</div>;
    }

    return (
        <div className="space-y-6">
            <DashboardNavBar />
            <ControlPanel />
            <CommandMenu />
            <main className="m-auto max-w-screen-xl space-y-4 px-6">
                <div className="flex items-center gap-2 text-lg font-medium">
                    <Folder className="fill-foreground" />
                    <h1>Snaps</h1>
                </div>
                <div className="m-auto grid grid-cols-[repeat(auto-fill,minmax(330px,1fr))] gap-4 pb-8 lg:gap-6 xl:gap-8">
                    {snapData &&
                        snapData.map((snap, index) => (
                            <SnapInfoCard
                                key={index}
                                createdAt={new Date(
                                    snap.createdAt,
                                ).toISOString()}
                                id={snap.id || ""}
                                language={snap.language}
                                title={snap.name}
                            />
                        ))}
                </div>
            </main>
        </div>
    );
}
