"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent, Input, Button } from "@heroui/react";
import { FaUser, FaEnvelope, FaLock, FaImage } from "react-icons/fa";
import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";
import { imageUploadInImgBB } from "@/utilities/imageUploadInImgBB";
import { IoBookSharp } from "react-icons/io5";
import { HiOutlineBuildingLibrary } from "react-icons/hi2";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";

export default function RegisterPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      role: "reader",
    },
  });

  const password = watch("password");

  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/", // Redirects to Home page on success
      });
    } catch (error) {
      console.error(error);
      toast.error("Google authentication failed");
    }
  };

  const onSubmit = async (data) => {
    try {
      let imageUrl = "";

      if (data.image?.[0]) {
        imageUrl = await imageUploadInImgBB(data.image[0]);
      }

      const { error } = await authClient.signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
        image: imageUrl,
        role: data.role,
      });

      if (error) {
        toast.error(error.message || "Registration failed");
        return;
      }

      toast.success("Welcome to BiblioDrop!");
      router.push("/");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-slate-50 dark:bg-slate-950">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-xl"
      >
        <Card className="p-2 md:p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl rounded-3xl">
          <CardHeader className="flex flex-col items-center text-center pt-8 pb-4">
            <div className="mb-5">
              <Image
                src="/logo.png"
                alt="BiblioDrop"
                width={220}
                height={60}
                className="dark:hidden"
              />

              <Image
                src="/logo-light.png"
                alt="BiblioDrop"
                width={220}
                height={60}
                className="hidden dark:block"
              />
            </div>
            <p className="mt-2 text-sm md:text-base text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              Create your account and start borrowing books from local
              libraries.
            </p>
          </CardHeader>

          <CardContent className="px-4 md:px-6 pb-8">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-5"
            >
              {/* Name */}
              <div className="w-full">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Name
                </label>
                <Input
                  {...register("name", { required: "Name is required" })}
                  type="text"
                  label="Full Name"
                  labelplacement="outside"
                  placeholder="John Doe"
                  variant="bordered"
                  className="w-full"
                  startcontent={
                    <FaUser className="text-slate-400 text-sm shrink-0" />
                  }
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1.5 ml-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="w-full">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Email
                </label>
                <Input
                  {...register("email", { required: "Email is required" })}
                  type="email"
                  label="Email"
                  labelplacement="outside"
                  placeholder="john@example.com"
                  variant="bordered"
                  className="w-full"
                  startcontent={
                    <FaEnvelope className="text-slate-400 text-sm shrink-0" />
                  }
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1.5 ml-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Profile Image */}
              <div className="w-full">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Profile Image
                </label>
                <div className="relative flex items-center">
                  <Input
                    {...register("image", {
                      required: "Profile image is required",
                    })}
                    type="file"
                    accept="image/*"
                    variant="bordered"
                    className="w-full"
                    startcontent={
                      <FaImage className="text-slate-400 text-sm shrink-0" />
                    }
                  />
                </div>
                {errors.image && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.image.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="w-full">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Password
                </label>
                <Input
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Minimum 6 characters" },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                      message:
                        "Must contain uppercase, lowercase, and a number",
                    },
                  })}
                  type="password"
                  label="Password"
                  labelplacement="outside"
                  placeholder="••••••••"
                  variant="bordered"
                  className="w-full"
                  startcontent={
                    <FaLock className="text-slate-400 text-sm shrink-0" />
                  }
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1.5 ml-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="w-full">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Confirm Password
                </label>
                <Input
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  type="password"
                  label="Confirm Password"
                  labelplacement="outside"
                  placeholder="••••••••"
                  variant="bordered"
                  className="w-full"
                  startcontent={
                    <FaLock className="text-slate-400 text-sm shrink-0" />
                  }
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1.5 ml-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Role Selection */}
              <div className="w-full">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Select Role
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Reader */}
                  <label className="cursor-pointer group">
                    <input
                      type="radio"
                      value="reader"
                      {...register("role", { required: "Role is required" })}
                      className="hidden peer"
                    />
                    <div className="h-full p-4 rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-transparent peer-checked:border-blue-600 dark:peer-checked:border-blue-500 peer-checked:bg-blue-50/50 dark:peer-checked:bg-blue-950/20 group-hover:border-slate-300 dark:group-hover:border-slate-700 transition-all duration-200">
                      <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                        <IoBookSharp className="w-7 h-7" /> Reader
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                        Browse catalog, manage bookshelf, and request local book
                        deliveries.
                      </p>
                    </div>
                  </label>

                  {/* Librarian */}
                  <label className="cursor-pointer group">
                    <input
                      type="radio"
                      value="librarian"
                      {...register("role", { required: "Role is required" })}
                      className="hidden peer"
                    />
                    <div className="h-full p-4 rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-transparent peer-checked:border-blue-600 dark:peer-checked:border-blue-500 peer-checked:bg-blue-50/50 dark:peer-checked:bg-blue-950/20 group-hover:border-slate-300 dark:group-hover:border-slate-700 transition-all duration-200">
                      <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                        <HiOutlineBuildingLibrary className="h-7 w-7" />{" "}
                        Librarian
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                        Manage books inventory, check-outs, and verify delivery
                        updates.
                      </p>
                    </div>
                  </label>
                </div>
                {errors.role && (
                  <p className="text-red-500 text-xs mt-1.5 ml-1">
                    {errors.role.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                isLoading={isSubmitting}
                className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-medium h-12 rounded-xl text-sm shadow-md transition-colors"
              >
                Create Account
              </Button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 border-t border-slate-200 dark:border-slate-700"></div>

              <span className="px-3 text-xs text-slate-500">
                OR CONTINUE WITH GOOGLE
              </span>

              <div className="flex-1 border-t border-slate-200 dark:border-slate-700"></div>
            </div>

            {/* Google OAuth Button */}
            <button
              onClick={handleGoogleLogin}
              className="flex justify-center items-center gap-2 w-full h-12 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 font-medium rounded-xl text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <FcGoogle size={24} className="text-red-500 text-base" />
              Sign up with Google
            </button>

            {/* Footer Navigation */}
            <p className="text-center mt-8 text-sm text-slate-500 dark:text-slate-400">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-blue-600 dark:text-blue-400 text-base font-semibold hover:underline transition-all"
              >
                Login
              </Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
