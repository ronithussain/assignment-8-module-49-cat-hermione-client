"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const STAT_CARD_IMAGE =
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop";

export default function Banner() {
  return (
    <section className="relative w-full overflow-hidden min-h-screen">
      {/* Background: community / social development image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/banner.png"
          alt="Children in a vulnerable community receiving support"
          fill
          sizes="100vw"
          priority
          className="object-cover object-center"
          loading="eager"
          decoding="async"
        />
        {/* Dark, subtle overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/10" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center w-full min-h-[70vh] pt-20 pb-16 px-6 sm:pt-28 sm:pb-24 lg:pt-32 lg:pb-28">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-8 lg:items-center">
            {/* Left: Content */}
            <div className="lg:col-span-7 text-center lg:text-left">
              <h1 className="mb-6 lg:mb-8 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.05]">
                Small Actions.
                <br />
                Big Impact.
                <br />
                Real Change.
              </h1>

              <p className="mb-10 lg:mb-10 text-base sm:text-lg text-slate-200 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                Helping vulnerable communities access food, education, and hope.
              </p>

              <div className="mb-10 sm:mb-0 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link href={"/"}>
                  <Button size="lg" className="w-full sm:w-auto text-white/90">
                    Donate Now <ArrowRight className="ml-2 size-5" />
                  </Button>
                </Link>
                <Link href={'/upcoming-events'}>
                  <Button size="lg" className="w-full sm:w-auto text-white/90">
                    Upcomming Events <ArrowRight className="ml-2 size-5" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right: Floating impact statistics card */}
            <div className="lg:col-span-5 lg:flex lg:justify-end">
              <div className="max-w-sm sm:max-w-[440px] mx-auto">
                <div className="relative rounded-2xl bg-white/90 backdrop-blur-md border border-white/50 shadow-2xl overflow-hidden">
                  {/* Thin green accent line at top */}
                  <div className="h-1 bg-[#15A1BF]" />
                  <div className="p-5 sm:p-6">
                    <div className="flex justify-between items-center sm:gap-2">
                      <div className="flex flex-col">
                        <p className="text-3xl sm:text-4xl font-bold text-slate-900 leading-none">
                          1,000+
                        </p>
                        <p className="mt-1 text-sm font-semibold text-slate-800">
                          Meal Distributed
                        </p>
                        <p className="mt-0.5 text-xs text-slate-600">
                          For Families and Individuals.
                        </p>
                      </div>
                      <div className="shrink-0 rounded-xl bg-slate-100 p-1">
                        <Image
                          src="/mini.jpg"
                          alt="Children receiving a meal"
                          width={150}
                          height={100}
                          className="rounded-lg object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
