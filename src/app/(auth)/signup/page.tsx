"use client";
import { Button } from "@/components/ui/button";
import { signUp } from "@/lib/auth-client";
import {
  Mail,
  Lock,
  User,
  Image as ImageIcon,
  EyeOff,
  Eye,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import GoogleLoginButton from "../GoogleLoginButton";
import GithubLoginButton from "../GithubLoginButton";
import { useState } from "react";

const inputStyle =
  "flex h-10 w-full rounded-lg border border-gray-200 dark:border-gray-700 border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50";

const SignUpPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const userData = Object.fromEntries(formData.entries()) as {
      name: string;
      image: string;
      email: string;
      password: string;
      confirmPassword: string;
    };

    // confirmPassword only for frontend validation
    const { confirmPassword, ...signupData } = userData;

    // Password validation
    const password = userData.password;

    // Password validation
    if (password.length < 8) {
      await Swal.fire({
        icon: "warning",
        title: "Weak Password!",
        text: "Password must be at least 8 characters long.",
      });
      return;
    }

    if (!/[A-Z]/.test(password)) {
      await Swal.fire({
        icon: "warning",
        title: "Invalid Password!",
        text: "Password must contain at least one uppercase letter.",
      });
      return;
    }

    if (!/[a-z]/.test(password)) {
      await Swal.fire({
        icon: "warning",
        title: "Invalid Password!",
        text: "Password must contain at least one lowercase letter.",
      });
      return;
    }

    if (!/[0-9]/.test(password)) {
      await Swal.fire({
        icon: "warning",
        title: "Invalid Password!",
        text: "Password must contain at least one number.",
      });
      return;
    }

    if (!/[@$!%*?&]/.test(password)) {
      await Swal.fire({
        icon: "warning",
        title: "Invalid Password!",
        text: "Password must contain at least one special character (@$!%*?&).",
      });
      return;
    }

    // Confirm Password validation
    if (!confirmPassword) {
      await Swal.fire({
        icon: "warning",
        title: "Confirm Password Required!",
        text: "Please confirm your password.",
      });
      return;
    }

    if (password !== confirmPassword) {
      await Swal.fire({
        icon: "error",
        title: "Password Doesn't Match!",
        text: "Password and Confirm Password must be the same.",
      });
      return;
    }

    // Better Auth Signup

    try {
      const { data, error } = await signUp.email({
        ...signupData,
      });

      if (error) {
        await Swal.fire({
          icon: "error",
          title: "Signup Failed!",
          text: error.message || "Something went wrong. Please try again.",
        });
        return;
      }

      if (data) {
        await Swal.fire({
          icon: "success",
          title: "Account Created!",
          text: "Your account has been created successfully.",
        });

        router.push("/");
      }
    } catch {
      await Swal.fire({
        icon: "error",
        title: "Something Went Wrong!",
        text: "Please try again later.",
      });
      return;
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-emerald-100 to-amber-50 dark:from-emerald-900/20 dark:via-gray-900 dark:to-amber-900/20 px-4 py-8">
      <div className="max-w-[1200px] w-full grid grid-cols-1 md:grid-cols-2 gap-0 rounded-[2rem] shadow-2xl border border-white/30 dark:border-gray-700/50 overflow-hidden bg-card">
        {/* Left panel: illustration (desktop/tablet only) */}
        <div className="md:flex hidden flex-col items-center justify-center p-10 relative overflow-hidden bg-gradient-to-br from-emerald-300 to-emerald-200 dark:from-emerald-900/20 dark:to-emerald-900/20">
          <div className="absolute top-[-12%] left-[-8%] w-72 h-72 rounded-full bg-green-400/25 dark:bg-green-900/20 blur-[120px]" />
          <div className="absolute bottom-[-12%] right-[-10%] w-80 h-80 rounded-full bg-emerald-400/25 dark:bg-emerald-900/20 blur-[120px]" />

          <div className="relative z-10 flex flex-col items-center text-center max-w-[280px]">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-emerald-700 dark:text-emerald-400 text-[11px] font-bold uppercase tracking-widest shadow-sm mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              Cat Hermione
            </div>
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
              JOIN WITH US!
            </h2>
            <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed mb-10">
              Please add your information and create an account to get started.
            </p>

            <div className="w-full max-w-[360px]">
              <svg
                viewBox="0 0 420 420"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-auto drop-shadow-lg"
                aria-hidden="true"
              >
                {/* ground shadow */}
                <ellipse
                  cx="210"
                  cy="352"
                  rx="135"
                  ry="28"
                  fill="#000"
                  opacity="0.10"
                />
                {/* rear wheel */}
                <circle cx="122" cy="300" r="34" fill="#94a3b8" />
                <circle
                  cx="122"
                  cy="300"
                  r="26"
                  fill="#fff"
                  stroke="#e2e8f0"
                  strokeWidth="2"
                />
                {/* front wheel */}
                <circle cx="300" cy="215" r="28" fill="#94a3b8" />
                <circle
                  cx="300"
                  cy="215"
                  r="20"
                  fill="#fff"
                  stroke="#e2e8f0"
                  strokeWidth="2"
                />
                {/* body deck */}
                <rect
                  x="86"
                  y="246"
                  width="190"
                  height="42"
                  rx="16"
                  fill="#f59e0b"
                />
                {/* front leg shield */}
                <rect
                  x="262"
                  y="152"
                  width="55"
                  height="70"
                  rx="22"
                  fill="#f59e0b"
                />
                {/* front fender */}
                <path
                  d="M 262 207 Q 302 207 332 187 Q 337 152 302 142 L 262 142 Z"
                  fill="#f59e0b"
                />
                {/* seat */}
                <rect
                  x="72"
                  y="200"
                  width="110"
                  height="34"
                  rx="14"
                  fill="#ef4444"
                />
                {/* rear fender */}
                <path
                  d="M 82 242 Q 112 242 142 232 Q 152 212 122 212 Z"
                  fill="#f59e0b"
                />
                {/* handlebar stem */}
                <line
                  x1="289"
                  y1="152"
                  x2="289"
                  y2="100"
                  stroke="#f59e0b"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                {/* handlebar */}
                <line
                  x1="289"
                  y1="100"
                  x2="347"
                  y2="100"
                  stroke="#f59e0b"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                <circle cx="347" cy="100" r="6" fill="#f59e0b" />
                <circle cx="262" cy="120" r="6" fill="#f59e0b" />
                {/* person head */}
                <circle cx="186" cy="188" r="17" fill="#fcd34d" />
                <path
                  d="M 169 171 Q 186 164 203 171 Q 203 188 169 188 Z"
                  fill="#1e293b"
                />
                {/* body */}
                <rect
                  x="163"
                  y="205"
                  width="46"
                  height="62"
                  rx="8"
                  fill="#ef4444"
                />
                {/* arm */}
                <line
                  x1="186"
                  y1="215"
                  x2="232"
                  y2="160"
                  stroke="#ef4444"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
                <circle cx="232" cy="160" r="7" fill="#fcd34d" />
                {/* leg */}
                <line
                  x1="186"
                  y1="267"
                  x2="152"
                  y2="300"
                  stroke="#ea580c"
                  strokeWidth="14"
                  strokeLinecap="round"
                />
                {/* leaf */}
                <ellipse
                  cx="238"
                  cy="150"
                  rx="16"
                  ry="28"
                  fill="#dc2626"
                  transform="rotate(-20 238 150)"
                />
                <path
                  d="M 238 150 L 230 122"
                  stroke="#b91c1c"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Right panel: signup form */}
        <div className="p-8 md:p-14 flex flex-col justify-center">
          {/* welcome back */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Create your account
            </h1>
            <p className="text-slate-500 dark:text-gray-400 text-sm">
              Join Cat Hermione to get started
            </p>
          </div>

          <form
            onSubmit={handleSignUp}
            className="space-y-6 w-full max-w-[430px] mx-auto"
          >
            {/* name */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-gray-300">
                <User className="mr-2 size-4" aria-hidden="true" /> Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                autoComplete="name"
                required
                minLength={2}
                className={inputStyle}
              />
            </div>
            {/* email */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-gray-300">
                <Mail className="mr-2 size-4" aria-hidden="true" /> Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email here"
                autoComplete="email"
                required
                className={inputStyle}
              />
            </div>
            {/* password */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-gray-300">
                <Lock className="mr-2 size-4" aria-hidden="true" /> Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter password"
                  autoComplete="new-password"
                  required
                  minLength={8}
                  className={`${inputStyle} pr-10`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-gray-400"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <p className="text-xs text-muted-foreground text-gray-700">
                At least 8 characters
              </p>
            </div>

            {/* confirm password */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-gray-300">
                <Lock className="mr-2 size-4" aria-hidden="true" />
                Confirm Password
              </label>

              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm password"
                  autoComplete="new-password"
                  required
                  minLength={8}
                  className={`${inputStyle} pr-10`}
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-gray-400"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>
            {/* image url */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-gray-300">
                <ImageIcon className="mr-2 size-4" aria-hidden="true" /> Profile
                Picture
              </label>
              <div className="relative">
                <input
                  type="url"
                  name="image"
                  placeholder="Image Url"
                  autoComplete="image"
                  required
                  className={inputStyle}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-emerald-600 text-white font-semibold hover:bg-emerald-700 active:bg-emerald-800 transition-all"
            >
              Create Account
            </Button>

            <p className="text-sm text-slate-600 dark:text-gray-400 text-center">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-emerald-600 dark:text-emerald-400 font-medium hover:underline transition-colors"
              >
                Log in
              </Link>
            </p>

            <div className="relative mt-2 mb-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300 dark:border-gray-700" />
              </div>
              <span className="relative flex justify-center text-xs uppercase tracking-wider bg-card dark:bg-gray-800 px-2 text-slate-400">
                Or
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* google */}
              <GoogleLoginButton />
              {/* github */}
              <GithubLoginButton />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUpPage;
