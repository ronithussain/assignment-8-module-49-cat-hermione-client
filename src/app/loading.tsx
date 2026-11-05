import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-1 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10 py-12">
        <div className="space-y-10 max-w-3xl">
          {/* Page heading skeleton */}
          <div className="space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/2 mt-2" />
          </div>

          {/* Event cards grid skeleton */}
          <section
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
          >
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <article
                key={i}
                className="overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm"
              >
                {/* Thumbnail */}
                <Skeleton variant="square" className="h-56 w-full rounded-xl mb-4" />

                <div className="p-4 space-y-3">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2 mt-1" />

                  {/* Meta row */}
                  <div className="flex gap-3 mt-5">
                    <Skeleton variant="circle" className="h-9 w-9" />
                    <div className="flex flex-col space-y-1.5">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}
