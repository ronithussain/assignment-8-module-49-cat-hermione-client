"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

interface AnimatedButtonProps {
  children: ReactNode;
  href: string;
  className?: string;
}

export default function AnimatedButton({
  children,
  href,
  className = "",
}: AnimatedButtonProps) {
  return (
    <Link
      href={href}
      className={`c-button c-button--gooey ${className}`}
    >
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
        <ArrowRight size={18} />
      </span>

      <span className="c-button__blobs">
        <span />
        <span />
        <span />
      </span>
    </Link>
  );
}