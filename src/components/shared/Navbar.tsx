"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  User,
  LogOut,
  House,
  PlusCircle,
  MessageCircle,
  CreditCard,
  Settings,
  CircleHelp,
  Mail,
} from "lucide-react";

import { useSession, signOut } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { toast } from "sonner";
import Image from "next/image";
import ThemeToggle from "../theme/ThemeToggle";
import ThemeSelector from "../theme/ThemeSelector";

const navLinks = [
  {
    label: "Events",
    href: "/upcoming-events",
    icon: PlusCircle,
  },
];
const dropdownLinks = [
  {
    label: "Profile",
    href: "/profile",
    icon: User,
  },
  {
    label: "Create Events",
    href: "/create-event",
    icon: MessageCircle,
  },
  {
    label: "Manage Events",
    href: "/manage-event",
    icon: CreditCard,
  },
  {
    label: "Joined Events",
    href: "/joined-event",
    icon: Settings,
  },
  {
    label: "About",
    href: "/about",
    icon: CircleHelp,
  },
  {
    label: "Contact",
    href: "/contact",
    icon: Mail,
  },
];
export default function Navbar() {
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const router = useRouter();
  const pathname = usePathname();

  // Logout functionality
  const handleSignOut = async () => {
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success(`${user?.name || "User"} signed out successfully!`);

            router.push("/login");
            router.refresh();
          },
        },
      });
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const isMenuActive = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`);
  };
  return (
    <header className="sticky top-0 z-50 w-full  border-b border-white/10 bg-white/70 shadow-lg shadow-black/5 backdrop-blur-md dark:bg-black/40">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-4 px-0.5 sm:px-4 sm:px-8 lg:px-10">
        {/* Logo + Brand */}
        <Link
          href="/"
          aria-label="Sodila Events home"
          className="group inline-flex items-center gap-3"
        >
          {/* Logo */}
          <div className="flex shrink-0 items-center justify-center rounded-xl bg-emerald-50 p-1 transition-transform duration-300 group-hover:scale-105 dark:bg-emerald-900/20">
            <Image
              src="/logo.png"
              alt="Sodila Events logo"
              width={200}
              height={60}
              className="h-10 w-auto object-contain sm:h-12"
              priority
            />
          </div>

          {/* Brand Text */}
          <div className="flex flex-col justify-center hidden sm:block lg:block">
            <h3 className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white transition-colors group-hover:text-emerald-600 sm:text-xl dark:group-hover:text-emerald-400">
              Sodila{" "}
              <span className="text-emerald-600 dark:text-emerald-400">
                Events
              </span>
            </h3>

            <p className="text-[10px] font-medium tracking-wide text-slate-500 dark:text-gray-400 sm:text-xs">
              We can create a better tomorrow.
            </p>
          </div>
        </Link>

        {/* Right Side: Navigation + User Section */}
        <div className="flex items-center ">
          {/* Navigation Links */}
          <nav
            aria-label="Main navigation"
            className="flex items-center gap-4 text-[13px] font-medium text-[#171717] dark:text-gray-200 md:flex lg:gap-6 lg:text-sm"
          >
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname === link.href ||
                    pathname.startsWith(`${link.href}/`);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative whitespace-nowrap py-1 transition-colors hover:text-[#15A1BF] dark:hover:text-emerald-400 ${
                    isActive
                      ? "text-[#15A1BF] after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:bg-[#15A1BF] dark:text-emerald-400 dark:after:bg-emerald-400"
                      : ""
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            {/* Theme Toggle */}
            <ThemeSelector />
          </nav>
          <div className="flex  shrink-0 items-center justify-end gap-0 ">
            {isPending ? (
              <div className="flex items-center gap-3">
                <div className="size-9 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700" />
                <div className="h-8 w-auto animate-pulse rounded-md bg-gray-200 dark:bg-gray-700" />
              </div>
            ) : user ? (
              /* Logged-in User */
              <>
                {/* Profile Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger
                    className="flex shrink-0 items-center justify-center rounded-full outline-none border-2 border-gray-200 dark:border-gray-700 ring-offset-2 transition hover:ring-2 hover:ring-[#15A1BF]/40 focus-visible:ring-2 focus-visible:ring-[#15A1BF]"
                    aria-label="Open user menu"
                  >
                    <Avatar className="size-9">
                      <AvatarImage
                        referrerPolicy="no-referrer"
                        src={user.image || undefined}
                        alt={user.name || "User"}
                      />
                      <AvatarFallback>
                        {user.name?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align="end"
                    className="w-[280px] px-2 py-4 bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-2xl"
                  >
                    <DropdownMenuGroup className="">
                      {dropdownLinks.map((link) => {
                        const Icon = link.icon;
                        const active = isMenuActive(link.href);

                        return (
                          <DropdownMenuItem
                            key={link.href}
                            onClick={() => router.push(link.href)}
                            className={`cursor-pointer rounded-2xl px-4 py-3.5 transition-colors ${
                              active
                                ? "bg-slate-100 text-[#009966] dark:bg-gray-700 dark:text-white font-medium"
                                : "text-foreground hover:bg-slate-100 dark:hover:bg-gray-800"
                            }`}
                          >
                            <Icon
                              className={`mr-3 size-5 ${
                                active
                                  ? "text-emerald-600 dark:text-emerald-400"
                                  : "text-slate-500 dark:text-gray-400"
                              }`}
                            />

                            {link.label}
                          </DropdownMenuItem>
                        );
                      })}
                      <div className="absolute top-6 right-8">
                        <ThemeToggle />
                      </div>
                      {/* Sign out */}
                      <DropdownMenuItem
                        onClick={handleSignOut}
                        className="cursor-pointer rounded-2xl px-4 py-3.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 font-medium"
                      >
                        <LogOut className="mr-3 size-5 text-red-600" />
                        Sign out
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Separate Logout Button */}
                <button
                  onClick={handleSignOut}
                  className="whitespace-nowrap rounded-md bg-[#009966] px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-[#1189a3]"
                >
                  Logout
                </button>
              </>
            ) : (
              /* Logged-out User */
              <div className="">
                <Link
                  href="/login"
                  className="whitespace-nowrap rounded-md bg-[#009966] px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-[#1189a3]"
                >
                  Login
                </Link>

                {/* <Link
                  href="/signup"
                  className="whitespace-nowrap rounded-md bg-[#009966] px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-[#1189a3]"
                >
                  Sign Up
                </Link> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
