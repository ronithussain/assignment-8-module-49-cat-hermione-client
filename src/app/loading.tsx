export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-1 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10 py-12">
        <div className="space-y-8 max-w-3xl">
          {/* Heading skeleton */}
          <div className="h-10 w-3/4 animate-pulse rounded bg-gray-200" />
          <div className="h-6 w-1/2 animate-pulse rounded bg-gray-200 mt-2" />

          {/* Cards grid skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-64 rounded-2xl bg-gray-200 animate-pulse" />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
