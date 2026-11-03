"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Statistick() {
  return (
    <section className="py-12 sm:py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-start lg:items-center"
        >
          {/* Left: heading + statistics grid */}
          <div className="lg:col-span-6">
            <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Impact
            </h2>
            <h1 className="mb-6 text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-[1.05]">
              Measurable change in <br />
              our community
            </h1>

            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6"
            >
              {/* 1,200+ card (spans two rows on lg+) */}
              <div className="lg:row-span-2 bg-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm">
                <div className="text-5xl sm:text-6xl font-bold text-slate-900 leading-none">
                  1,200+
                </div>
                <div className="mt-2 sm:mt-3 text-sm font-medium text-slate-700">
                  Families served this year
                </div>
                <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Direct assistance reached households in need across our
                  region.
                </p>
              </div>

              {/* Top-middle image */}
              <div className="relative h-48 sm:h-60 lg:h-64 bg-gray-200 rounded-2xl overflow-hidden">
                <Image
                  src="/img1.jpg"
                  alt="Two women working together on a laptop"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* 85 card */}
              <div className="bg-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm">
                <div className="text-5xl sm:text-6xl font-bold text-slate-900 leading-none">
                  85
                </div>
                <div className="mt-2 sm:mt-3 text-sm font-medium text-slate-700">
                  Small businesses supported
                </div>
                <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Entrepreneurs build sustainable livelihoods with our
                  guidance.
                </p>
              </div>

              {/* 450 card */}
              <div className="bg-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm">
                <div className="text-5xl sm:text-6xl font-bold text-slate-900 leading-none">
                  450
                </div>
                <div className="mt-2 sm:mt-3 text-sm font-medium text-slate-700">
                  Young people in programs
                </div>
                <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Youth gain skills and mentorship through sustained
                  engagement.
                </p>
              </div>

              {/* Bottom-right image */}
              <div className="relative h-48 sm:h-60 lg:h-64 bg-gray-200 rounded-2xl overflow-hidden">
                <Image
                  src="/img2.jpg"
                  alt="Community group gathered around a table"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>

          {/* Right: intro text + actions */}
          <div className="lg:col-span-6 lg:pl-8">
            <p className="mb-6 sm:mb-8 text-base sm:text-lg text-slate-600 leading-relaxed">
              We track what matters. Our work produces real results that
              improve lives and strengthen neighborhoods.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button variant="outline" size="sm">
                Learn
              </Button>
              <Link
                href="/"
                className="inline-flex items-center gap-1 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
              >
                Details <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
