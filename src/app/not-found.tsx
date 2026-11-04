import Link from "next/link";
import {
  Cube,
  Link as LinkIcon,
  LogIn,
  Facebook,
  Linkedin,
  X,
  Instagram,
  Youtube,
} from "lucide-react";

const navLinks = ["Platform", "Solutions", "Resources", "Enterprise", "Pricing"];

const socials = [
  { label: "Facebook", Icon: Facebook, href: "#" },
  { label: "LinkedIn", Icon: Linkedin, href: "#" },
  { label: "X", Icon: X, href: "#" },
  { label: "Instagram", Icon: Instagram, href: "#" },
  { label: "Youtube", Icon: Youtube, href: "#" },
];

const footerLinks = {
  Platform: ["The Data App", "Interfaces", "Automations", "API", "Pricing"],
  Solutions: ["By team", "By industry", "By use case", "Enterprise"],
  Resources: ["Help center", "Community", "Webinars", "Demos", "Support"],
  Learn: ["Blog", "Podcast", "Newsletter", "Events"],
  Company: ["About us", "Careers", "Press", "Investors"],
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-8 lg:px-10">
          <Link
            href="/"
            className="flex items-center gap-2"
            aria-label="Airtable home"
          >
            <Cube size={20} className="text-gray-900" aria-hidden="true" />
            <span className="text-xl font-bold tracking-tight">
              Airtable
            </span>
          </Link>

          <nav
            aria-label="Main navigation"
            className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600"
          >
            {navLinks.map((label) => (
              <Link
                key={label}
                href="#"
                className="flex items-center gap-1.5 transition-colors hover:text-gray-900"
              >
                {label}
                <LinkIcon size={11} className="text-gray-400 shrink-0" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 lg:gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Log in
            </Link>
            <a
              href="#"
              className="px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Book Demo
            </a>
            <a
              href="#"
              className="px-4 py-2 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Sign up for free
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* 404 Hero */}
        <section className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1 flex justify-center">
              <div className="relative w-full max-w-[360px]">
                <div className="absolute inset-0 bg-gray-100 rounded-full blur-3xl opacity-60 animate-pulse" />
                <svg
                  viewBox="0 0 360 260"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="relative w-full h-auto max-w-[300px] mx-auto drop-shadow-lg"
                  aria-hidden="true"
                >
                  {/* Ground shadow */}
                  <ellipse
                    cx="135"
                    cy="160"
                    rx="95"
                    ry="24"
                    fill="#000"
                    opacity="0.10"
                  />
                  {/* Magnifier outer ring */}
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
                  {/* Glass */}
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
                      <stop
                        offset="100%"
                        stopColor="#e2e8f0"
                        stopOpacity="0.45"
                      />
                    </radialGradient>
                  </defs>
                  {/* Handle */}
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
                  <ellipse
                    cx="238"
                    cy="156"
                    rx="18"
                    ry="14"
                    fill="#cbd5e1"
                  />
                  <ellipse
                    cx="238"
                    cy="156"
                    rx="11"
                    ry="8"
                    fill="#ffffff"
                  />
                </svg>
              </div>
            </div>

            <div className="order-1 lg:order-2 max-w-[480px]">
              <h1 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight leading-[1.05]">
                Oops, it's a 404 error.
              </h1>
              <p className="text-lg font-medium text-blue-600 mb-10">
                This page doesn't exist.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/"
                  className="px-5 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-700 font-medium shadow-sm hover:bg-gray-50 hover:border-gray-300 transition-colors"
                >
                  Back to Home
                </Link>
                <a
                  href="#"
                  className="px-5 py-2.5 rounded-lg bg-blue-600 text-white font-medium shadow-sm hover:bg-blue-700 transition-colors"
                >
                  Contact Support
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Resources */}
        <section className="bg-gray-50 border-y border-gray-200 py-20">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-10">
              Explore some of our resources
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {["Home", "Platform", "Webinars", "Demos", "Support"].map(
                (label) => (
                  <Link
                    key={label}
                    href="#"
                    className="block bg-white p-5 rounded-xl text-center text-sm font-medium text-gray-700 border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    {label}
                  </Link>
                )
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10 py-12">
          <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-between">
            <div className="flex items-center gap-2">
              <Cube size={18} className="text-gray-900" aria-hidden="true" />
              <span className="text-lg font-bold tracking-tight">Airtable</span>
            </div>

            <nav
              aria-label="Footer navigation"
              className="flex flex-col sm:flex-row gap-6 text-sm text-gray-600 font-medium"
            >
              {navLinks.map((label) => (
                <Link
                  key={label}
                  href="#"
                  className="transition-colors hover:text-gray-900"
                >
                  {label}
                </Link>
              ))}
              <a
                href="#"
                className="px-3 py-1.5 rounded-lg border border-gray-200 bg-gray-50 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Book Demo
              </a>
            </nav>

            <div className="flex items-center gap-4">
              {socials.map(({ label, Icon: SocialIcon, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="size-5 text-gray-400 hover:text-gray-900 transition-colors"
                >
                  <SocialIcon />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 bg-gray-50">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10 py-10 lg:py-16">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
              {Object.entries(footerLinks).map(([title, links]) => (
                <div key={title} className="flex flex-col gap-3">
                  <span className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                    {title}
                  </span>
                  {links.map((link) => (
                    <Link
                      key={link}
                      href="#"
                      className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      {link}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
