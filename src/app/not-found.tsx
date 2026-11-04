
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <main className="flex-1">

        {/* 404 Hero */}
        <section className="mx-auto flex w-full max-w-[1440px] items-center px-4 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-28">
          <div className="grid w-full grid-cols-1 items-center gap-10 sm:gap-14 lg:grid-cols-2 lg:gap-20">

            {/* Illustration */}
            <div className="order-2 flex justify-center lg:order-1">
              <div className="relative w-full max-w-[280px] sm:max-w-[360px]">
                <div className="absolute inset-0 rounded-full bg-gray-100 opacity-60 blur-3xl animate-pulse" />

                <svg
                  viewBox="0 0 360 260"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="relative mx-auto h-auto w-full drop-shadow-lg"
                  aria-hidden="true"
                >
                  <ellipse
                    cx="135"
                    cy="160"
                    rx="95"
                    ry="24"
                    fill="#000"
                    opacity="0.10"
                  />

                  <circle
                    cx="135"
                    cy="110"
                    r="72"
                    stroke="#cbd5e1"
                    strokeWidth="4"
                  />

                  <circle
                    cx="135"
                    cy="110"
                    r="72"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />

                  <circle
                    cx="135"
                    cy="110"
                    r="58"
                    fill="url(#glass)"
                    stroke="#ffffff"
                    strokeWidth="2.5"
                  />

                  <defs>
                    <radialGradient id="glass" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
                      <stop offset="100%" stopColor="#e2e8f0" stopOpacity="0.45" />
                    </radialGradient>
                  </defs>

                  <path
                    d="M 188 142 Q 210 150 238 156"
                    stroke="#cbd5e1"
                    strokeWidth="18"
                    strokeLinecap="round"
                  />

                  <path
                    d="M 188 142 Q 210 150 238 156"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />

                  <ellipse cx="238" cy="156" rx="18" ry="14" fill="#cbd5e1" />
                  <ellipse cx="238" cy="156" rx="11" ry="8" fill="#ffffff" />
                </svg>
              </div>
            </div>

            {/* Content */}
            <div className="order-1 mx-auto w-full max-w-[480px] text-center lg:order-2 lg:mx-0 lg:text-left">

              <span className="mb-5 inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-xs font-semibold tracking-wider text-blue-600">
                ERROR 404
              </span>

              <h1 className="mb-4 text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-[52px]">
                Oops, it&apos;s a 404 error.
              </h1>

              <p className="mb-8 text-base font-medium text-blue-600 sm:text-lg">
                This page doesn&apos;t exist.
              </p>

              <p className="mx-auto mb-9 max-w-md text-sm leading-7 text-gray-500 sm:text-base lg:mx-0">
                The page you are looking for might have been removed,
                had its name changed, or is temporarily unavailable.
              </p>

              {/* Buttons */}
              <div className="flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                <Link
                  href="/"
                  className="inline-flex min-h-11 items-center justify-center rounded-lg border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 shadow-sm transition-all duration-300 hover:border-gray-300 hover:bg-gray-50 hover:shadow-md"
                >
                  Back to Home
                </Link>

                <a
                  href="mailto:support@example.com"
                  className="inline-flex min-h-11 items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg"
                >
                  Contact Support
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Resources */}
        <section className="border-y border-gray-200 bg-gray-50 py-12 sm:py-16 lg:py-20">
          <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-10">

            <div className="mb-8 text-center sm:mb-10 sm:text-left">
              <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                Explore some of our resources
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Find your way back to the information you need.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
              {[
                { label: "Home", href: "/" },
                { label: "Upcoming Events", href: "/upcoming-events" },
                { label: "Create Event", href: "/create-event" },
                { label: "Manage Events", href: "/manage-events" },
                { label: "Support", href: "mailto:support@example.com" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex min-h-14 items-center justify-center rounded-xl border border-gray-100 bg-white p-4 text-center text-xs font-semibold text-gray-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:text-blue-600 hover:shadow-md sm:text-sm"
                >
                  {item.label}
                </Link>
              ))}
            </div>

          </div>
        </section>
      </main>
    </div>
  );
}
