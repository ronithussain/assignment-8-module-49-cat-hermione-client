"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  HeartHandshake,
  Users,
  GraduationCap,
  Store,
  HandHeart,
} from "lucide-react";
import AnimatedButton from "../shared/AmimatedButton";

const impactStats = [
  {
    number: "1,200+",
    label: "Families supported",
    description: "Providing essential support to families in need.",
    icon: Users,
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    number: "85",
    label: "Local businesses",
    description: "Helping communities build sustainable livelihoods.",
    icon: Store,
    color: "bg-amber-50 text-amber-600",
  },
  {
    number: "450",
    label: "Young people",
    description: "Empowering youth through education and mentorship.",
    icon: GraduationCap,
    color: "bg-blue-50 text-blue-600",
  },
];

export default function Statistick() {
  return (
    <section className="relative overflow-hidden bg-background dark:bg-gray-900 py-20 sm:py-24 lg:py-28">
      {/* Background decoration */}
      <div className="absolute -right-40 top-0 h-96 w-96 rounded-full bg-emerald-100/40 dark:bg-emerald-900/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-100 dark:border-emerald-800/30 bg-emerald-50 dark:bg-emerald-900/20 px-4 py-2 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
              <HeartHandshake size={16} />
              Our Community Impact
            </div>

            <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
              Together, we create
              <span className="text-emerald-600 dark:text-emerald-400"> meaningful change.</span>
            </h2>
          </div>

          <p className="max-w-md text-base leading-7 text-slate-500 dark:text-gray-400">
            Every small act of kindness creates a ripple of positive change.
            See how our community is making a difference.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid gap-6 lg:grid-cols-12">

          {/* Left: Statistics */}
          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">

            {/* Featured Stat */}
            <div className="relative flex min-h-[260px] flex-col justify-between overflow-hidden rounded-3xl bg-emerald-600 p-7 text-white shadow-xl shadow-emerald-600/10 sm:col-span-2 sm:flex-row sm:items-center sm:p-10">
              <div className="relative z-10">
                <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-white/15">
                  <HandHeart size={26} />
                </div>

                <p className="text-sm font-medium text-emerald-100">
                  Families supported this year
                </p>

                <h3 className="mt-2 text-5xl font-extrabold tracking-tight sm:text-6xl">
                  1,200+
                </h3>

                <p className="mt-4 max-w-xs text-sm leading-6 text-emerald-50">
                  Bringing food, care, and essential resources to families
                  who need them most.
                </p>
              </div>

              <div className="relative mt-8 flex items-center justify-center sm:mt-0">
                <div className="flex size-36 items-center justify-center rounded-full border border-white/20 bg-white/10 sm:size-44">
                  <div className="flex size-24 items-center justify-center rounded-full bg-white/15 sm:size-32">
                    <HeartHandshake
                      size={64}
                      strokeWidth={1.2}
                      className="text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Decorative circle */}
              <div className="absolute -bottom-20 -right-20 size-64 rounded-full border border-white/10" />
            </div>

            {/* Small Stats */}
            {impactStats.slice(1).map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.label}
                  className="group rounded-3xl border border-gray-200 dark:border-gray-700 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 dark:hover:border-emerald-900/50 hover:bg-card dark:hover:bg-gray-800 hover:shadow-xl hover:shadow-black/10"
                >
                  <div className="flex items-center justify-between">
                    <div className={`flex size-12 items-center justify-center rounded-2xl ${stat.color} dark:${stat.color.replace('bg-', 'bg-gray-900/')}`}>
                      <Icon size={24} />
                    </div>

                    <ArrowUpRight
                      size={20}
                      className="text-slate-300 dark:text-gray-400 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400"
                    />
                  </div>

                  <h3 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                    {stat.number}
                  </h3>

                  <p className="mt-2 font-semibold text-slate-800 dark:text-gray-200">
                    {stat.label}
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-gray-400">
                    {stat.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right: Image & CTA */}
          <div className="flex flex-col gap-5 lg:col-span-5">

            {/* Image Card */}
            <div className="group relative min-h-[300px] flex-1 overflow-hidden rounded-3xl sm:min-h-[350px]">
              <Image
                src="/img2.jpg"
                alt="Volunteers working together for their community"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <div className="mb-3 inline-flex rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                  Community in Action
                </div>

                <h3 className="max-w-sm text-2xl font-bold text-white sm:text-3xl">
                  Together, we make every act of kindness count.
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-200">
                  Real people. Real stories. Real impact.
                </p>
              </div>
            </div>

            {/* CTA Card */}
            <div className="flex flex-col justify-between gap-5 rounded-3xl border border-emerald-100 dark:border-emerald-800/30 bg-emerald-50/70 dark:bg-emerald-900/20 p-6 sm:flex-row sm:items-center sm:p-8">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Be part of the change
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-gray-400">
                  Join our next community event and make a difference.
                </p>
              </div>

              <AnimatedButton
                href="/upcoming-events"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-600/20"
              >
                Explore Events
                <ArrowRight size={18} />
              </AnimatedButton>
            </div>

          </div>
        </div>

        {/* Bottom Note */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-gray-200 dark:border-gray-700 pt-6 sm:flex-row">
          <p className="text-sm text-slate-500 dark:text-gray-400">
            Every contribution matters. Every volunteer makes a difference.
          </p>

          <Link
            href="/upcoming-events"
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 dark:text-emerald-400 transition-colors hover:text-emerald-900 dark:hover:text-emerald-300"
          >
            Learn more about our mission
            <ArrowRight size={16} />
          </Link>
        </div>

      </div>
    </section>
  );
}
