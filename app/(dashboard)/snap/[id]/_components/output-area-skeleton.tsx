import React from "react";
import { Skeleton } from "@nextui-org/skeleton";

export default function OutputAreaSkeleton() {
    return (
        <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-3/4 rounded-lg" />
            <Skeleton className="h-4 w-1/2 rounded-lg" />
            <Skeleton className="h-4 w-1/3 rounded-lg" />
            <Skeleton className="h-4 w-2/3 rounded-lg" />
            <Skeleton className="h-4 w-full rounded-lg" />
        </div>
    );
}
