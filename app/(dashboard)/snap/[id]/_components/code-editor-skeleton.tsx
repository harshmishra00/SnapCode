import { Skeleton } from "@nextui-org/skeleton";

export default function CodeEditorSkeleton() {
    return (
        <div className="flex h-full w-full flex-col gap-4 bg-content1 px-6 py-4">
            {/* Block 1 */}
            <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-3/4 rounded-lg" />
                <Skeleton className="h-4 w-1/2 rounded-lg" />
                <Skeleton className="h-4 w-full rounded-lg" />
            </div>

            {/* Block 2 */}
            <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-full rounded-lg" />
                <Skeleton className="h-4 w-2/3 rounded-lg" />
                <Skeleton className="h-4 w-3/5 rounded-lg" />
                <Skeleton className="h-4 w-4/5 rounded-lg" />
            </div>

            {/* Block 3 */}
            <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-4/5 rounded-lg" />
                <Skeleton className="h-4 w-1/3 rounded-lg" />
                <Skeleton className="h-4 w-2/3 rounded-lg" />
                <Skeleton className="h-4 w-1/2 rounded-lg" />
                <Skeleton className="h-4 w-full rounded-lg" />
            </div>

            {/* Block 4 */}
            <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-1/2 rounded-lg" />
                <Skeleton className="h-4 w-full rounded-lg" />
                <Skeleton className="h-4 w-4/5 rounded-lg" />
                <Skeleton className="h-4 w-3/4 rounded-lg" />
            </div>

            {/* Block 5 */}
            <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-3/5 rounded-lg" />
                <Skeleton className="h-4 w-4/5 rounded-lg" />
                <Skeleton className="h-4 w-full rounded-lg" />
                <Skeleton className="h-4 w-2/3 rounded-lg" />
            </div>

            {/* Block 6 */}
            <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-3/4 rounded-lg" />
                <Skeleton className="h-4 w-1/4 rounded-lg" />
                <Skeleton className="h-4 w-2/5 rounded-lg" />
                <Skeleton className="h-4 w-3/5 rounded-lg" />
                <Skeleton className="h-4 w-full rounded-lg" />
            </div>
        </div>
    );
}
