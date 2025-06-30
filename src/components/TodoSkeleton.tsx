import { Skeleton } from "@/components/ui/skeleton";

export function TodoSkeleton() {
    return (
        <div className="p-4 space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-[114px]" />
            ))}
        </div>
    )
}