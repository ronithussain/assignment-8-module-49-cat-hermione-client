"use client";

import { updateUser, useSession } from "@/lib/auth-client";
import { useState } from "react";
import type { FormEvent } from "react";
import {
  UserRound,
  Mail,
  Camera,
  Pencil,
  ShieldCheck,
  CalendarDays,
  Save,
  Loader2,
  LockKeyhole,
  ImageIcon,
} from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AvatarFallback } from "@/components/ui/avatar";

export default function ProfilePage() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { data: session, isPending } = useSession();

  const user = session?.user;

  const handleUpdateProfile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const newUserData = Object.fromEntries(formData.entries()) as {
      name: string;
      image: string;
    };

    try {
      setLoading(true);

      const { error } = await updateUser({
        name: newUserData.name,
        image: newUserData.image,
      });

      if (error) {
        toast.error(error.message || "Failed to update profile");
        return;
      }

      toast.success("Profile updated successfully!");
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="size-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-muted-foreground">
          Please login to view your profile.
        </p>
      </div>
    );
  }

  const dialogueInputClass = 'h-11 border border-gray-200 dark:border-gray-500 rounded-xl pl-10 focus-visible:ring-emerald-500'
  return (
    <div className="min-h-screen bg-background px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Page Header */}
        <div className="mb-8">
          <div className="mb-2 flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400">
            <UserRound className="size-4" />
            <span>Account Settings</span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            My Profile
          </h1>

          <p className="mt-2 text-muted-foreground">
            Manage your personal information and account details.
          </p>
        </div>

        {/* Edit Profile Modal */}
        {/* Modern Edit Profile Dialog */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="overflow-hidden border-0 p-0 sm:max-w-[480px] bg-white dark:bg-slate-700">
            {/* Header */}
            <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 px-6 py-8 text-white">
              <div className="absolute -right-10 -top-10 size-40 rounded-full bg-white/10 blur-2xl" />
              <div className="absolute -bottom-10 -left-10 size-32 rounded-full bg-emerald-300/20 blur-xl" />

              <div className="relative flex items-center gap-4">
                <div className="flex size-14 items-center justify-center rounded-2xl border border-white/20 bg-white/15 shadow-lg backdrop-blur-sm">
                  <UserRound className="size-7" />
                </div>

                <div>
                  <DialogTitle className="text-2xl font-bold tracking-tight text-white">
                    Edit Profile
                  </DialogTitle>
                  <DialogDescription className="mt-1 text-sm text-emerald-50">
                    Personalize your account information.
                  </DialogDescription>
                </div>
              </div>
            </div>

            {/* Form */}
            <form
              id="edit-profile-form"
              onSubmit={handleUpdateProfile}
              className="space-y-5 px-6 py-6"
            >
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="font-medium text-slate-800 dark:text-slate-200">
                  Full Name
                </Label>

                <div className="relative">
                  <UserRound className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    id="name"
                    name="name"
                    type="text"
                    defaultValue={user.name || ""}
                    placeholder="Enter your full name"
                    required
                    className={dialogueInputClass}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-800 dark:text-slate-200 font-medium">
                  Email Address
                </Label>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    id="email"
                    type="email"
                    value={user.email}
                    disabled
                    className={dialogueInputClass}
                 />
                </div>

                <p className="text-slate-800 dark:text-slate-200 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <LockKeyhole className="size-3 " />
                  Email address cannot be changed.
                </p>
              </div>

              {/* Profile Image */}
              <div className="space-y-2">
                <Label htmlFor="image" className="text-slate-800 dark:text-slate-200 font-medium">
                  Profile Image URL
                </Label>

                <div className="relative">
                  <ImageIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    id="image"
                    name="image"
                    type="url"
                    defaultValue={user.image || ""}
                    placeholder="https://example.com/avatar.jpg"
                    className={dialogueInputClass}
                  />
                </div>

                <p className="text-xs text-slate-800 dark:text-slate-200 text-muted-foreground">
                  Use a publicly accessible image URL.
                </p>
              </div>

              {/* Footer Actions */}
              <div className="flex flex-col-reverse gap-3 border-t border-gray-200 dark:border-gray-500 pt-5 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                  className="rounded-xl border-gray-200 dark:border-gray-500"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  disabled={loading}
                  className="rounded-xl bg-emerald-600 text-white shadow-md shadow-emerald-600/20 transition-all hover:bg-emerald-700"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 size-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Profile Card */}
        <Card className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-500 bg-card shadow-sm">
          {/* Banner */}
          <div className="relative h-36 bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 sm:h-44">
            <div className="absolute inset-0 bg-black/5" />

            <div className="absolute right-6 top-6 rounded-full border border-white/20 bg-white/20 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
              <ShieldCheck className="mr-1 inline size-4" />
              Verified Account
            </div>
          </div>

          {/* Profile Info */}
          <div className="relative px-5 pb-6 sm:px-8">
            {/* Avatar & Edit Button */}
            <div className="-mt-14 mb-5 flex flex-col justify-between gap-4 sm:-mt-16 sm:flex-row sm:items-end">
              <div className="relative flex size-28 items-center justify-center overflow-hidden rounded-2xl border-4 border-[#009966] border-card bg-emerald-100 shadow-md dark:bg-emerald-950 sm:size-32">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name || "User"}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                ) : (
                  <AvatarFallback className="text-4xl font-bold text-emerald-700 dark:text-emerald-300">
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                )}

                <div className="absolute bottom-2 right-2 rounded-full bg-emerald-500 p-1.5 text-white">
                  <Camera className="size-3.5" />
                </div>
              </div>

              {/* Edit Button (opens modal) */}
              <Button
                variant="outline"
                size="sm"
                className="gap-2 border-gray-200 dark:border-gray-500"
                onClick={() => setOpen(true)}
              >
                <Pencil className="size-4" />
                Edit Profile
              </Button>
            </div>

            {/* Name & Email */}
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                {user.name || "User"}
              </h2>

              <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Mail className="size-4" />
                  {user.email}
                </span>

                <span className="hidden sm:inline">•</span>

                <span className="flex items-center gap-1.5">
                  <CalendarDays className="size-4" />
                  Community Member
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Profile Details */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3 border-none outline-none">
          {/* Personal Information (read-only) */}
          <Card className="rounded-2xl shadow-sm lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Personal Information
              </CardTitle>
              <CardDescription>
                Your personal account information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-xl border border-gray-200 dark:border-gray-500 bg-muted/30 p-4">
                <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Full Name
                </p>
                <p className="font-medium text-foreground">
                  {user.name || "Not provided"}
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 dark:border-gray-500 bg-muted/30 p-4">
                <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Email Address
                </p>
                <p className="break-all font-medium text-foreground">
                  {user.email}
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 dark:border-gray-500 bg-muted/30 p-4">
                <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Profile Image
                </p>
                <p className="break-all text-sm text-muted-foreground">
                  {user.image || "No profile image"}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Account Status */}
          {/* card border is not work */}
          <Card className="border-gray-200 dark:border-gray-500"> 
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Account Overview
              </CardTitle>
              <CardDescription>Your account status.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-xl bg-emerald-50 p-4 dark:bg-emerald-950/30">
                <div>
                  <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
                    Account Status
                  </p>
                  <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400">
                    Active
                  </p>
                </div>
                <ShieldCheck className="size-6 text-emerald-600 dark:text-emerald-400" />
              </div>

              <div className="rounded-xl border border-gray-200 dark:border-gray-500 p-4">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Account Type
                </p>
                <p className="mt-1 font-semibold text-foreground">
                  Community Member
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          Your information is securely managed by Sodila Events.
        </div>
      </div>
    </div>
  );
}
