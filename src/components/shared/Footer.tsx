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
    title: "Helpful Links",
    links: [
      { label: "Video Library", href: "/" },
      { label: "Form Template Library", href: "/" },
      { label: "Conversational Forms Gallery", href: "/" },
      { label: "Affiliate Program", href: "/" },
      { label: "Terms and Conditions", href: "/" },
      { label: "Refund Policy", href: "/" },
      { label: "Brand Assets", href: "/" },
      { label: "Developer Documentation", href: "/" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Sodila Events", href: "/" },
      { label: "Blog", href: "/" },
      { label: "Community Forums", href: "/" },
      { label: "Giving Back", href: "/" },
      { label: "Career Openings", href: "/" },
    ],
  },
  {
    title: "System Requirements",
    description:
      "Sodila Events recommends the same system requirements as a modern browser: Chrome, Firefox, Safari or Edge, and the latest version of your operating system.",
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
    label: "hello@sodilaevents.com",
  },
  {
    icon: <Clock className="size-5" />,
    label: "Mon - Fri: 9:00 AM - 6:00 PM",
  },
];

const SOCIAL_LINKS = [
  { icon: <X className="size-5" />, href: "https://x.com", label: "X" },
  { icon: <Share2 className="size-5" />, href: "https://facebook.com", label: "Facebook" },
  { icon: <LinkIcon className="size-5" />, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: <Globe className="size-5" />, href: "https://instagram.com", label: "Instagram" },
];

const LEGAL_LINKS = [
  { label: "Contact Us", href: "/" },
  { label: "Terms and Conditions", href: "/" },
  { label: "Cookie Policy", href: "/" },
  { label: "Privacy Policy", href: "/" },
];

export default function Footer() {
  const year = typeof window !== "undefined" ? new Date().getFullYear() : 2026;

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top: newsletter banner (news later section) */}
        <div
          className="relative overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 p-8 sm:p-12 lg:p-16 mb-12 sm:mb-16 lg:mb-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center gap-3">
                <Link href="/" aria-label="Sodila Events home">
                  <Image
                    src="/logo.png"
                    alt="Sodila Events logo"
                    width={200}
                    height={60}
                    className="h-8 sm:h-10 w-auto"
                    loading="lazy"
                    decoding="async"
                  />
                </Link>
                <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase">
                  SODILA EVENTS
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-[1.15]">
                Stay in touch with us.
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-slate-400 max-w-md">
                We will send you tips and tricks, news and updates, discounts and
                deals, plus we promise not to spam your inbox.
              </p>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto max-w-md">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 min-w-0 pl-4 pr-10 py-3 sm:py-3.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all sm:text-base"
                />
                <Button type="button" className="w-full sm:w-auto">
                  Subscribe
                </Button>
              </div>
              <p className="text-xs text-slate-500">
                By subscribing you agree to our Privacy Policy.
              </p>
            </div>
          </div>
        </div>

        {/* Middle: navigation grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12 sm:mb-16 lg:mb-20">
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title}>
              {column.title && (
                <h4 className="mb-4 sm:mb-5 text-base sm:text-lg font-bold text-white tracking-tight">
                  {column.title}
                </h4>
              )}
              {column.links && (
                <ul className="space-y-3 sm:space-y-4">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm sm:text-base text-slate-400 hover:text-emerald-400 transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              {column.description && (
                <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                  {column.description}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="border-t border-slate-800 pt-12 sm:pt-16 lg:pt-20 pb-12 sm:pb-16 lg:pb-20">
          {/* Bottom: contact + copyright + legal */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start lg:items-center">
            <div className="space-y-3">
              <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Contact Us
              </h4>
              {CONTACT_ITEMS.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 mt-0.5 text-emerald-500">
                    {item.icon}
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {item.label}
                  </p>
                </div>
              ))}
              <div className="mt-6 flex flex-wrap gap-3">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:bg-emerald-600 hover:text-white transition-colors"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-8 sm:mt-0 lg:mt-0 pt-6 lg:pt-0 border-t border-slate-800 lg:border-t-0 lg:border-l lg:pl-12 text-center lg:text-left">
              <p className="text-xs sm:text-sm text-slate-500">
                © {year} Sodila Events Inc. All rights reserved.
              </p>
              <div className="mt-4 sm:mt-6 flex flex-wrap justify-center gap-2 sm:gap-4 lg:justify-start lg:gap-6 text-xs sm:text-sm">
                {LEGAL_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-slate-500 hover:text-emerald-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
