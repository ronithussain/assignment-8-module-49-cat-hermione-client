"use client";

import { useEffect } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import AnimatedButton from "../shared/AmimatedButton";

export default function Banner() {
  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      offset: 80,
      easing: "ease-out-quart",
    });
  }, []);

  return (
    <section className="relative w-full overflow-hidden min-h-screen bg-slate-900">
      {/* Decorative background glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Background image + overlay */}
      <div className="absolute inset-0 z-0">
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
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/20 via-slate-900/50 to-slate-900/90" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center w-full min-h-[75vh] pt-20 pb-16 px-6 sm:pt-36 sm:pb-32 lg:pt-44 lg:pb-40">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Left: Content */}
            <div
              className="lg:col-span-7 text-center lg:text-left"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold tracking-wider uppercase mb-6">
                Hope for Every Community
              </div>
              <h1 className="mb-6 text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.05]">
                Small Actions.
                <br />
                Big Impact.
                <br />
                Real Change.
              </h1>
              <p className="mb-10 text-lg sm:text-xl text-slate-300 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                Helping vulnerable communities access food, education, and hope
                for a better tomorrow.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <AnimatedButton href="/">Donate Now</AnimatedButton>

                <AnimatedButton
                  href="/upcoming-events"
                  className="border-white/20 text-white"
                >
                  Upcoming Events
                </AnimatedButton>
              </div>
            </div>

            {/* Right: Impact stats */}
            <div
              data-aos="fade-up"
              data-aos-delay="150"
              data-aos-duration="1000"
              className="lg:col-span-5 lg:flex lg:justify-end"
            >
              <div className="max-w-sm sm:max-w-[440px] mx-auto">
                <div className="relative rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-white/50 dark:border-gray-700/50 shadow-2xl overflow-hidden">
                  {/* Thin green accent line at top */}
                  <div className="h-1 bg-[#15A1BF]" />
                  <div className="p-5 sm:p-6">
                    <div className="flex justify-between items-center sm:gap-2">
                      <div className="flex flex-col">
                        <p className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white leading-none">
                          1,000+
                        </p>
                        <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-gray-200">
                          Meal Distributed
                        </p>
                        <p className="mt-0.5 text-xs text-slate-600 dark:text-gray-400">
                          For Families and Individuals.
                        </p>
                      </div>
                      <div className="shrink-0 rounded-xl bg-slate-100 dark:bg-gray-700 p-1">
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
