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

const navLinks = [
  { label: "Home", href: "/", icon: House },
  {
    label: "Upcoming Events",
    href: "/upcoming-events",
    icon: PlusCircle,
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

  return (
    <header className="sticky top-0 z-50 w-full ">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-8 lg:px-10">
        {/* Left Side: Logo */}
        {/* Logo + Brand */}
        <Link
          href="/"
          aria-label="Sodila Events home"
          className="group inline-flex items-center gap-3"
        >
          {/* Logo */}
          <div className="flex shrink-0 items-center justify-center rounded-xl bg-emerald-50 p-1.5 transition-transform duration-300 group-hover:scale-105 dark:bg-emerald-900/20">
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
        <div className="flex items-center gap-4 lg:gap-7">
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
            <ThemeToggle />
          </nav>
          <div className="flex w-36 shrink-0 items-center justify-end gap-3 sm:w-44">
            {isPending ? (
              <div className="flex items-center gap-3">
                <div className="size-9 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700" />
                <div className="h-8 w-16 animate-pulse rounded-md bg-gray-200 dark:bg-gray-700" />
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
                    className="w-[280px] px-2 py-4 bg-white dark:bg-gray-800 rounded-3xl  border-gray-200 dark:border-gray-700 shadow-2xl"
                  >
                    <DropdownMenuGroup>
                      {/* Profile */}
                      <DropdownMenuItem
                        onClick={() => router.push("/profile")}
                        className="cursor-pointer bg-slate-100 dark:bg-gray-800 rounded-2xl px-4 py-3.5 text-slate-900 dark:text-white font-medium"
                      >
                        <User className="mr-3 size-5 text-slate-600 dark:text-gray-400" />
                        Profile
                      </DropdownMenuItem>

                      {/* Community */}
                      <DropdownMenuItem
                        onClick={() => router.push("/create-event")}
                        className="cursor-pointer rounded-2xl px-4 py-3.5 hover:bg-slate-50 dark:hover:bg-gray-800/50 transition-colors"
                      >
                        <MessageCircle className="mr-3 size-5 text-slate-500 dark:text-gray-400" />
                        Create Events
                      </DropdownMenuItem>

                      {/* Subscription with PRO badge */}
                      <DropdownMenuItem
                        onClick={() => router.push("/manage-event")}
                        className="cursor-pointer rounded-2xl px-4 py-3.5 hover:bg-slate-50 dark:hover:bg-gray-800/50 transition-colors flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <CreditCard className="size-5 text-slate-500 dark:text-gray-400" />
                          Manage Events
                        </div>
                      </DropdownMenuItem>

                      {/* Settings */}
                      <DropdownMenuItem
                        onClick={() => router.push("/joined-event")}
                        className="cursor-pointer rounded-2xl px-4 py-3.5 hover:bg-slate-50 dark:hover:bg-gray-800/50 transition-colors"
                      >
                        <Settings className="mr-3 size-5 text-slate-500 dark:text-gray-400" />
                        Joined Events
                      </DropdownMenuItem>

                      {/* Help center */}
                      <DropdownMenuItem
                        onClick={() => router.push("/")}
                        className="cursor-pointer rounded-2xl px-4 py-3.5 hover:bg-slate-50 dark:hover:bg-gray-800/50 transition-colors border-t border-slate-100 dark:border-gray-700 mt-2 pt-2"
                      >
                        <CircleHelp className="mr-3 size-5 text-slate-500 dark:text-gray-400" />
                        Help center
                      </DropdownMenuItem>

                      {/* Sign out */}
                      <DropdownMenuItem
                        onClick={handleSignOut}
                        className="cursor-pointer rounded-2xl px-4 py-3.5 hover:bg-red-50 text-red-600 font-medium transition-colors"
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
                  className="whitespace-nowrap rounded-md bg-[#15A1BF] px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-[#1189a3]"
                >
                  Logout
                </button>
              </>
            ) : (
              /* Logged-out User */
              <div className="flex items-center justify-end gap-3">
                <Link
                  href="/login"
                  className="whitespace-nowrap text-sm font-medium text-[#171717] dark:text-gray-200 transition-colors hover:text-[#15A1BF] dark:hover:text-emerald-400"
                >
                  Login
                </Link>

                <Link
                  href="/signup"
                  className="whitespace-nowrap rounded-md bg-[#15A1BF] px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-[#1189a3]"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
