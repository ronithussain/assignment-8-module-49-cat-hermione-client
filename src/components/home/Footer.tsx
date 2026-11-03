"use client";

import Link from "next/link";
import Image from "next/image";

import {
  Mail,
  Phone,
  MapPin,
  Clock,
  X,
  Share2,
  Link as LinkIcon,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const FOOTER_COLUMNS = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/" },
      { label: "Our Story", href: "/" },
      { label: "Team", href: "/" },
      { label: "Careers", href: "/" },
      { label: "Press", href: "/" },
    ],
  },
  {
    title: "Get Involved",
    links: [
      { label: "Volunteer", href: "/" },
      { label: "Donate", href: "/" },
      { label: "Partner With Us", href: "/" },
      { label: "Submit an Enquiry", href: "/" },
      { label: "FAQs", href: "/" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "/" },
      { label: "Community Guidelines", href: "/" },
      { label: "Privacy Policy", href: "/" },
      { label: "Terms of Service", href: "/" },
      { label: "Accessibility", href: "/" },
    ],
  },
];

const CONTACT_ITEMS = [
  {
    icon: <MapPin className="size-5" />,
    label: "123 Community Street, Cityville, CC 12345",
  },
  {
    icon: <Phone className="size-5" />,
    label: "+1 (555) 123-4567",
  },
  {
    icon: <Mail className="size-5" />,
    label: "hello@freddymatch.com",
  },
  {
    icon: <Clock className="size-5" />,
    label: "Mon - Fri: 9:00 AM - 6:00 PM",
  },
];

const SOCIAL_LINKS = [
  { icon: <X className="size-5" />, href: "https://x.com" },
  { icon: <Share2 className="size-5" />, href: "https://share.com" },
  { icon: <LinkIcon className="size-5" />, href: "https://linkedin.com" },
  { icon: <Globe className="size-5" />, href: "https://instagram.com" },
];

export default function Footer() {
  const year = typeof window !== "undefined" ? new Date().getFullYear() : 2026;

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top: logo + newsletter */}
        <div className="py-12 sm:py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start lg:items-center">
          <div className="space-y-6">
            <div className="flex items-center">
              <Link href="/" className="inline-block">
                <Image
                  src="/logo.png"
                  alt="FreddyMatch logo"
                  width={200}
                  height={60}
                  className="h-10 sm:h-12 w-auto"
                  loading="lazy"
                  decoding="async"
                />
              </Link>
              <h2 className="text-xl font-bold">Social Events</h2>
            </div>
            <p className="text-sm sm:text-base leading-relaxed max-w-md">
              Empowering communities through volunteering. Join us to make a
              measurable change in the lives of those who need it most.
            </p>
            <div className="flex flex-wrap gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-teal-600 hover:text-white transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Subscribe to our Newsletter
            </h3>
            <p className="text-sm text-slate-400 max-w-md">
              Get the latest community stories, volunteer opportunities, and
              impact updates straight to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 min-w-0 pl-4 pr-10 py-3 rounded-full bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all sm:text-base"
              />
              <Button
                type="submit"
                className="bg-teal-600 text-white hover:bg-teal-700 sm:text-base"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-12 sm:pt-16 lg:pt-20 pb-12 sm:pb-16 lg:pb-20">
          {/* Middle: navigation grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-8 lg:gap-12 mb-12 sm:mb-16 lg:mb-20">
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.title}>
                <h4 className="mb-4 sm:mb-5 text-base sm:text-lg font-bold text-white tracking-tight">
                  {column.title}
                </h4>
                <ul className="space-y-3 sm:space-y-4">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm sm:text-base text-slate-400 hover:text-teal-400 transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom: contact + copyright */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start lg:items-center">
            <div className="space-y-3">
              <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Contact Us
              </h4>
              {CONTACT_ITEMS.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 mt-0.5 text-teal-400">
                    {item.icon}
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 sm:mt-0 lg:mt-0 pt-6 lg:pt-0 border-t border-slate-800 lg:border-t-0 lg:border-l lg:pl-12 text-center lg:text-left">
              <p className="text-xs sm:text-sm text-slate-500">
                © {year} FreddyMatch Community. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
