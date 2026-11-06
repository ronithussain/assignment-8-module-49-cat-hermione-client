import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth-client";
import { toast } from "sonner";

const GoogleLoginButton = () => {
  const handleSocialLogin = async () => {
    const { data, error } = await signIn.social({
      provider: "google",
      callbackURL: "/",
    });
    if (data) {
      toast.success("Google signin successfully");
    } else {
      toast.error(
        `${error.message}` ||
          "Google signin is Failed! Please try again leter!",
      );
    }
  };
  return (
    <Button
      onClick={handleSocialLogin}
      type="button"
      variant="outline"
      className="w-full flex border border-gray-200 dark:border-gray-700 outline-none items-center justify-center gap-2 text-sm"
    >
      <svg viewBox="0 0 48 48" className="size-5" aria-hidden="true">
        <path
          fill="#EA4335"
          d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
          transform="translate(0 6)"
        />
        <path
          fill="#4285F4"
          d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.77 7.18l7.73 6C44.41 37.86 46.98 31.7 46.98 24.55z"
        />
        <path
          fill="#FBBC05"
          d="M10.53 28.59a14.4 14.4 0 0 1 0-9.18l-7.98-6.19a23.94 23.94 0 0 0 0 21.56z"
        />
        <path
          fill="#34A853"
          d="M24 48c6.48 0 11.93-2.13 15.9-5.8l-7.73-6c-2.15 1.45-4.92 2.3-8.17 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
        />
      </svg>
      Google
    </Button>
  );
};

export default GoogleLoginButton;
