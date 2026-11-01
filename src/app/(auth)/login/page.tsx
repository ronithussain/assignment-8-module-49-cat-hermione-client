'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { signIn } from '@/lib/auth-client';
import { redirect } from 'next/navigation';
import Swal from 'sweetalert2';

const inputStyle =
  'flex h-10 w-full rounded-lg border border-gray-200 border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50';

const LoginPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

   const handleLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
    };
    // console.log(userData, 'user data ');
    const { data, error } = await signIn.email({
      ...userData,
    });
    if (data) {
       await Swal.fire({
              icon: "success",
              title: "Welcome Aboard!",
              text: "Your account has been login successfully.",
              confirmButtonText: "Let's Explore",
      
              buttonsStyling: false,
      
              customClass: {
                popup: "custom-swal-popup",
                title: "custom-swal-title",
                htmlContainer: "custom-swal-text",
                confirmButton: "custom-swal-confirm",
              },
            });
      redirect("/");
    } else {
       await Swal.fire({
              icon: "error",
              title: "Oops!",
              text: error?.message || "Unable to create your account.",
              confirmButtonText: "Try Again",
      
              buttonsStyling: false,
      
              customClass: {
                popup: "custom-swal-popup",
                title: "custom-swal-title",
                htmlContainer: "custom-swal-text",
                confirmButton: "custom-swal-confirm",
              },
            });
    }
  };
  return (
    <section
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600 px-4 py-8"
    >
      <div
        className="max-w-[1200px] w-full grid grid-cols-1 md:grid-cols-[0.7fr_1.6fr_0.7fr] gap-4 md:gap-6 rounded-[2rem] shadow-2xl border border-white/30 overflow-hidden bg-white relative"
      >

        {/* Left: undraw tree illustration (tablet/desktop only) */}
        <div className="md:flex hidden items-center justify-center p-8 relative z-10">
          <svg
            viewBox="0 0 200 260"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[220px] h-auto drop-shadow-lg"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="treeGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
            </defs>
            {/* foliage */}
            <ellipse cx="100" cy="95" rx="66" ry="74" fill="url(#treeGrad)" />
            <ellipse cx="78" cy="116" rx="54" ry="60" fill="url(#treeGrad)" />
            <ellipse cx="122" cy="120" rx="54" ry="60" fill="url(#treeGrad)" />
            {/* trunk */}
            <path
              d="M 95 160 Q 100 255 105 160"
              stroke="#374151"
              strokeWidth="15"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 95 172 Q 100 215 105 172"
              stroke="#111827"
              strokeWidth="9"
              strokeLinecap="round"
              fill="none"
            />
            {/* grass */}
            <path
              d="M 45 260 Q 75 240 100 260 Q 125 240 155 260"
              stroke="#10b981"
              strokeWidth="7"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 45 252 Q 75 234 100 252 Q 125 234 155 252"
              stroke="#059669"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
            />
            {/* flower */}
            <circle cx="34" cy="246" r="5" fill="#ef4444" />
            <circle cx="34" cy="246" r="2" fill="#fff" />
          </svg>
        </div>

        {/* Center: login form */}
        <div className="p-8 md:p-14 flex flex-col justify-center items-center space-y-6 w-full">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Login into account
          </h1>
          <p className="text-sm text-slate-500 text-center">
            Use your credentials to access your account.
          </p>

          <form
          onSubmit={handleLogin}
            className="w-full space-y-5 max-w-5xl"
            noValidate
          >
            <div className="space-y-2 relative">
              <label className="block text-sm font-medium text-slate-700 flex items-center gap-2">
                <Mail className="size-4 text-slate-400" aria-hidden="true" />
                Email address
              </label>
              <input
                type="email"
                name='email'
                placeholder="Enter your email"
                autoComplete="email"
                required
                className={inputStyle}
              />
            </div>

            <div className="space-y-2 relative">
              <label className="block text-sm font-medium text-slate-700 flex items-center gap-2">
                <Lock className="size-4 text-slate-400" aria-hidden="true" />
                Password
              </label>
              <div className="relative">
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  placeholder="Enter your password"
                  name='password'
                  autoComplete="current-password"
                  required
                  className={inputStyle + ' pr-10'}
                />
                <button
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  aria-label={passwordVisible ? 'Hide password' : 'Show password'}
                  className="absolute inset-y-0 right-2 flex items-center"
                >
                  {passwordVisible ? (
                    <EyeOff className="size-4 text-slate-400 hover:text-emerald-600" />
                  ) : (
                    <Eye className="size-4 text-slate-400 hover:text-emerald-600" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="rounded border-border text-emerald-600 focus:ring-emerald-500"
                />
                <span>Remember me</span>
              </label>
              <a
                href="#"
                className="text-emerald-600 text-xs font-medium hover:underline transition-colors"
              >
                Last password?
              </a>
            </div>

            <Button
              type="submit"
              className="w-full bg-emerald-600 text-white font-semibold hover:bg-emerald-700 active:bg-emerald-800 transition-all"
            >
              Sign In
            </Button>

            <p className="text-xs text-slate-500 text-center">
              or login with
            </p>

            <div className="grid grid-cols-3 gap-3 w-full">
              <Button
                variant="outline"
                className="w-full h-10 rounded-full bg-[#1da1f2] text-white border-transparent hover:bg-[#0d9dd9] active:bg-[#0a8bc1] transition-all size-sm px-4 py-2 text-xs font-medium"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white shrink-0 p-1">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#1da1f2]"
                    aria-hidden="true"
                  >
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                  </svg>
                </span>
              </Button>
              <Button
                variant="outline"
                className="w-full h-10 rounded-full bg-[#3b5998] text-white border-transparent hover:bg-[#334e88] active:bg-[#2d4374] transition-all size-sm px-4 py-2 text-xs font-medium"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white shrink-0 p-1">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#3b5998]"
                    aria-hidden="true"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </span>
              </Button>
              <Button
                variant="outline"
                className="w-full h-10 rounded-full bg-[#ea4335] text-white border-transparent hover:bg-[#d3382a] active:bg:#c03524 transition-all size-sm px-4 py-2 text-xs font-medium"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white shrink-0 p-1">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#ea4335]"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6.5v11" />
                    <path d="M6.5 12h11" />
                  </svg>
                </span>
              </Button>
            </div>

            <p className="text-sm text-slate-500 text-center mt-4">
              Not registered?{' '}
              <a
                href="/signup"
                className="text-emerald-600 font-medium hover:underline transition-colors"
              >
                Create account
              </a>
            </p>
          </form>
        </div>

        {/* Right: undraw person illustration (tablet/desktop only) */}
        <div className="md:flex hidden items-center justify-center p-8 relative z-10">
          <svg
            viewBox="0 0 200 280"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[260px] h-auto drop-shadow-lg"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="shadowGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#000" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#000" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* shadow */}
            <ellipse cx="110" cy="250" rx="48" ry="14" fill="url(#shadowGrad)" />
            {/* legs */}
            <path d="M 100 178 L 96 244" stroke="#2563eb" strokeWidth="11" strokeLinecap="round" fill="none" />
            <path d="M 120 178 L 124 244" stroke="#2563eb" strokeWidth="11" strokeLinecap="round" fill="none" />
            {/* shoes */}
            <rect x="86" y="242" width="16" height="9" rx="5" fill="#cbd5e1" />
            <rect x="98" y="242" width="16" height="9" rx="5" fill="#cbd5e1" />
            {/* body */}
            <rect x="88" y="100" width="24" height="68" rx="6" fill="#f97316" />
            {/* arm waving */}
            <path d="M 88 114 Q 72 124 62 138" stroke="#f97316" strokeWidth="11" strokeLinecap="round" fill="none" />
            <circle cx="62" cy="138" r="5" fill="#f59e0b" />
            {/* head */}
            <circle cx="100" cy="74" r="14" fill="#f59e0b" />
            <path d="M 88 63 Q 100 57 112 63" stroke="#1f2937" strokeWidth="2" fill="none" />
            <path d="M 88 51 Q 100 55 112 51" stroke="#1f2937" strokeWidth="6" strokeLinecap="round" fill="none" />
            {/* flowers */}
            <circle cx="142" cy="174" r="5" fill="#f472b6" />
            <circle cx="144" cy="170" r="3" fill="#fbbf24" />
            <path d="M 142 174 Q 152 164 158 174" stroke="#f472b6" strokeWidth="2" fill="none" strokeLinecap="round" />
            {/* grass right */}
            <path d="M 140 260 Q 160 242 180 260" stroke="#10b981" strokeWidth="7" fill="none" strokeLinecap="round" />
            <path d="M 180 260 Q 195 242 198 260" stroke="#059669" strokeWidth="5" fill="none" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
