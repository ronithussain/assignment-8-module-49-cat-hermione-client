
"use client";

import Link from "next/link";
import {
  Store,
  Home,
  BriefcaseBusiness,
  HeartHandshake,
  ArrowUpRight,
  Users,
} from "lucide-react";
import AnimatedButton from "../shared/AmimatedButton";

const features = [
  {
    title: "Organizations",
    description:
      "Create meaningful community events, manage volunteers, and make a lasting difference in people's lives.",
    linkText: "Create an account",
    linkHref: "/signup",
    icon: Store,
    color: "from-emerald-500 to-teal-600",
    bgColor: "bg-emerald-50",
  },
  {
    title: "Community Centers",
    description:
      "Connect with local communities and discover opportunities to support people who need your help.",
    linkText: "Get involved",
    linkHref: "/upcoming-events",
    icon: Home,
    color: "from-blue-500 to-indigo-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Schools & Students",
    description:
      "Empower young people to develop leadership skills through volunteering and community service.",
    linkText: "Explore opportunities",
    linkHref: "/upcoming-events",
    icon: BriefcaseBusiness,
    color: "from-amber-500 to-orange-600",
    bgColor: "bg-amber-50",
  },
  {
    title: "Corporate Volunteers",
    description:
      "Bring your team together, support local causes, and create positive social impact through teamwork.",
    linkText: "Join our mission",
    linkHref: "/upcoming-events",
    icon: HeartHandshake,
    color: "from-rose-500 to-pink-600",
    bgColor: "bg-rose-50",
  },
];

export default function Feature() {
  return (
    <section className="relative overflow-hidden bg-background py-20 sm:py-24 lg:py-28">

      {/* Background Decoration */}
      <div className="absolute -left-40 top-20 size-96 rounded-full bg-emerald-100/40 dark:bg-emerald-900/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-100 dark:border-emerald-800/30 bg-white dark:bg-gray-900 px-4 py-2 text-sm font-semibold text-emerald-700 dark:text-emerald-400 shadow-sm">
            <Users size={16} />
            Our Community
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
            Together, we can create
            <span className="text-emerald-600 dark:text-emerald-400">
              {" "}a better tomorrow.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-500 dark:text-gray-400 sm:text-lg">
            Whether you are an organization, student, or volunteer,
            there is a place for everyone in our mission to make
            communities stronger.
          </p>

        </div>

        {/* Feature Cards */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-700 bg-card p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-emerald-200 dark:hover:border-emerald-900/50 hover:shadow-xl hover:shadow-emerald-900/5 sm:p-8"
              >

                {/* Top Accent */}
                <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-emerald-500 to-teal-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Icon */}
                <div
                  className={`mb-7 flex size-14 items-center justify-center rounded-2xl ${feature.bgColor} dark:${feature.bgColor.replace('bg-', 'bg-gray-900/')}`}
                >
                  <div
                    className={`flex size-11 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} text-white shadow-md transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110`}
                  >
                    <Icon size={23} />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                  {feature.title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-7 text-slate-500 dark:text-gray-400">
                  {feature.description}
                </p>

                {/* Link */}
                <Link
                  href={feature.linkHref}
                  className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 dark:text-emerald-400 transition-colors hover:text-emerald-900 dark:hover:text-emerald-300"
                >
                  {feature.linkText}

                  <ArrowUpRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </Link>

              </div>
            );
          })}

        </div>

        {/* Bottom CTA */}
        <div className="mt-12 flex flex-col items-center justify-center gap-4 rounded-3xl border border-emerald-100 dark:border-emerald-800/30 bg-card p-6 text-center shadow-sm sm:flex-row sm:p-8 sm:text-left">

          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400">
            <HeartHandshake size={25} />
          </div>

          <div className="flex-1">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Ready to make a difference?
            </h3>

            <p className="mt-1 text-sm text-slate-500 dark:text-gray-400">
              Discover upcoming events and become part of our community.
            </p>
          </div>

          <AnimatedButton
            href="/upcoming-events"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-600/20"
          >
            Explore Events
            <ArrowUpRight size={18} />
          </AnimatedButton>

        </div>

      </div>
    </section>
  );
}
