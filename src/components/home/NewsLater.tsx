"use client";

import { useState } from "react";

import { Mail, Megaphone, Heart, MessageCircle, AtSign } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NewsLater() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <section className="py-12 sm:py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: content */}
          <div data-aos="fade-right"
          data-aos-duration="900"  className="space-y-6 lg:space-y-8">
            <div className="flex items-start gap-3">
              <div className="h-10 w-px bg-teal-600 dark:bg-teal-500 shrink-0" />
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tight leading-[1.1]">
                  Subscribe to our{" "}
                  <span className="block text-teal-600 dark:text-teal-400">
                    NEWSLETTER
                  </span>
                </h2>
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-600 dark:text-gray-400 leading-relaxed max-w-md lg:max-w-lg">
              Stay connected with Social Development Events Platform and be
              part of positive change in your community. Discover upcoming
              events, join meaningful initiatives, and contribute to activities
              like charity, food distribution, tree plantation, and community
              cleanup. Together, we can make our communities better, one small
              action at a time. Subscribe to our newsletter for the latest
              events, updates, and opportunities to make a difference!
            </p>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center"
            >
              <div className="relative flex-1 w-full sm:w-auto">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-teal-600 dark:text-teal-500"
                  aria-hidden="true"
                />
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3.5 rounded-full bg-teal-50 dark:bg-teal-900/20 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all sm:text-base"
                />
              </div>
              <Button
                type="submit"
                className="bg-teal-600 text-white hover:bg-teal-700 disabled:opacity-70 disabled:pointer-events-none sm:text-base"
                disabled={subscribed}
              >
                {subscribed ? "Subscribed!" : "Subscribe"}
              </Button>
            </form>
          </div>

          {/* Right: SVG illustration (lucide-react) */}
          <div data-aos="fade-left"
          data-aos-duration="900"  className="relative hidden lg:block h-[400px] w-full flex items-center justify-center">
            {/* Background leaf shapes (svg circles/ellipses styled with tailwind) */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-teal-100 dark:bg-teal-900/20 rounded-full blur-3xl opacity-60" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-teal-200 dark:bg-teal-900/10 rounded-full blur-3xl opacity-60" />

            {/* Envelope (Mail) */}
            <div className="relative z-10 w-48 h-48 flex items-center justify-center">
              <Mail className="size-44 text-teal-600 dark:text-teal-400 drop-shadow-lg" />
            </div>

            {/* Megaphone */}
            <div className="absolute top-1/2 right-1/4 w-24 h-24 text-teal-600 dark:text-teal-500 drop-shadow-lg animate-bounce-slow">
              <Megaphone className="size-full" />
            </div>

            {/* Badge: @ */}
            <div className="absolute top-1/3 left-1/4 w-14 h-14 rounded-full bg-teal-600 dark:bg-teal-500 flex items-center justify-center text-white shadow-lg">
              <AtSign className="size-5" />
            </div>

            {/* Badge: heart */}
            <div className="absolute top-1/6 right-1/6 w-14 h-14 rounded-full bg-teal-100 dark:bg-teal-900/20 flex items-center justify-center text-teal-600 dark:text-teal-400 shadow-lg border border-teal-200 dark:border-teal-800/30">
              <Heart className="size-5" />
            </div>

            {/* Badge: message */}
            <div className="absolute bottom-1/4 left-1/3 w-14 h-14 rounded-full bg-teal-600 dark:bg-teal-500 flex items-center justify-center text-white shadow-lg">
              <MessageCircle className="size-5" />
            </div>
          </div>

          {/* Right fallback on mobile: subtle decorative SVGs */}
          <div className="lg:hidden flex justify-center pb-4">
            <div className="relative w-32 h-32">
              <Mail className="absolute size-24 text-teal-600/20 dark:text-teal-500/20" />
              <Heart className="absolute top-2 right-2 size-8 text-teal-600 dark:text-teal-400" />
              <AtSign className="absolute bottom-2 left-2 size-8 text-teal-600 dark:text-teal-400" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
