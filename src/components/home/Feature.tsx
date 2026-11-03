"use client";

import Link from "next/link";

import {
  Store,
  Home,
  Briefcase,
  Heart,
} from "lucide-react";

type Feature = {
  title: string;
  icon: React.ReactNode;
  beforeLink: string;
  linkText: string;
  afterLink: string;
  linkHref: string;
};

const features: Feature[] = [
  {
    title: "ORGANISATIONS",
    icon: <Store className="size-5" />,
    beforeLink: "",
    linkText: "Sign up",
    afterLink:
      " for our simple and secure volunteer recruitment and management platform.",
    linkHref: "/signup",
  },
  {
    title: "VRC",
    icon: <Home className="size-5" />,
    beforeLink: "",
    linkText: "Submit an enquiry",
    afterLink:
      " to discuss how FreddyMatch can support you to enhance the amazing impact you have in your community.",
    linkHref: "/",
  },
  {
    title: "SCHOOLS",
    icon: <Briefcase className="size-5" />,
    beforeLink:
      "FreddyMatch World Ready is a new platform which helps students across all year levels find suitable volunteer opportunities during and outside of school hours. ",
    linkText: "Learn more",
    afterLink: " about youth volunteering powered by FreddyMatch.",
    linkHref: "/",
  },
  {
    title: "CORPORATE VOLUNTEERS",
    icon: <Heart className="size-5" />,
    beforeLink:
      "Whether you are a small or large organisation, ",
    linkText: "learn more",
    afterLink:
      " about how we can match your company skills with local causes that need your help.",
    linkHref: "/",
  },
];

export default function Feature() {
  return (
    <section className="py-12 sm:py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#1e3a8a] mb-2">
            WHO WE WORK WITH
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-[1.1]">
            The FreddyMatch community is growing, be a part of it!
          </h2>
        </div>

        <div className="mt-10 sm:mt-12 lg:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col items-center text-center p-6 sm:p-8 rounded-xl bg-slate-50/50 border border-slate-100 shadow-sm"
            >
              <div className="mb-4 sm:mb-6 w-14 sm:w-16 h-14 sm:h-16 rounded-full bg-[#eef2ff] flex items-center justify-center text-indigo-600">
                {feature.icon}
              </div>
              <h3 className="mb-2 text-lg sm:text-xl font-bold text-slate-900 tracking-tight uppercase">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {feature.beforeLink}
                <Link
                  href={feature.linkHref}
                  className="text-indigo-600 underline underline-offset-4 hover:text-indigo-700 transition-colors"
                >
                  {feature.linkText}
                </Link>
                {feature.afterLink}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
