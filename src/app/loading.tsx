import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <main className="w-full max-w-3xl px-4 sm:px-8">
        {/* Heading Skeleton */}
        <div className="space-y-4 mb-8">
          <Skeleton className="h-10 w-3/4 mx-auto" />
          <Skeleton className="h-6 w-1/2 mx-auto" />
        </div>

        {/* Cards Skeleton */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <article
              key={i}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-card shadow-sm"
            >
              <Skeleton className="h-48 w-full rounded-none" />

              <div className="p-4 space-y-3">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />

                <div className="flex items-center gap-3 pt-3">
                  <Skeleton className="size-9 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}