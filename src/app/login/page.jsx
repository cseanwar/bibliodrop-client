"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import {
  Card,
  CardHeader,
  CardContent as CardBody,
  Input,
  Button,
  Form,
} from "@heroui/react";

import { useForm } from "react-hook-form";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const { data: signInData, error } = await authClient.signIn.email({
        email: data.email,
        password: data.password,
      });

      if (error) {
        toast.error(error.message || "Login failed");
        return;
      }

      toast.success("Login successful");

      /**
       * Optional Role Based Redirect
       * Replace with your actual role logic
       */

      const role = signInData?.user?.role;

      if (role === "librarian") {
        router.push("/dashboard/librarian");
      } else if (role === "reader") {
        router.push("/dashboard/user");
      } else if (role === "admin") {
        router.push("/dashboard/admin");
      } else {
        router.push("/");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (error) {
      toast.error("Google Login Failed");
      console.log(error);
    }
  };

  return (
    <div
      className="
      min-h-screen
      flex
      items-center
      justify-center
      px-4
      py-10
      bg-slate-50
      dark:bg-slate-950
      transition-colors
      "
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        className="w-full max-w-md"
      >
        <Card
          className="
          border
          border-slate-200
          dark:border-slate-800
          bg-white
          dark:bg-slate-900
          shadow-xl
          rounded-3xl
          "
        >
          <CardHeader className="flex flex-col items-center pt-8 pb-4">
            {/* Logo */}
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

            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Welcome Back
            </h1>

            <p className="text-slate-500 dark:text-slate-400 text-center mt-2">
              Sign in to access your library account and continue reading.
            </p>
          </CardHeader>

          <CardBody className="px-6 pb-8">
            {/* Google Login */}
            <button
              onClick={handleGoogleLogin}
              className="flex justify-center items-center gap-2 w-full h-12 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 font-medium rounded-xl text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <FcGoogle size={24} className="text-red-500 text-base" />
              Sign up with Google
            </button>

            <div className="flex items-center my-6">
              <div className="flex-1 border-t border-slate-200 dark:border-slate-700"></div>

              <span className="px-3 text-xs text-slate-500">
                OR CONTINUE WITH EMAIL
              </span>

              <div className="flex-1 border-t border-slate-200 dark:border-slate-700"></div>
            </div>

            <Form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Email */}
              <div className="w-full">
                <Input
                  {...register("email", {
                    required: "Email is required",
                  })}
                  type="email"
                  placeholder="Enter your email"
                  startContent={<FaEnvelope />}
                  className="w-full"
                />

                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="w-full">
                <Input
                  {...register("password", {
                    required: "Password is required",
                  })}
                  type="password"
                  placeholder="Enter your password"
                  startContent={<FaLock />}
                  className="w-full"
                />

                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Forgot Password */}
              <div className="flex justify-end w-full">
                <Link
                  href="/forgot-password"
                  className="
                  text-sm
                  text-blue-600
                  dark:text-blue-400
                  hover:underline
                  "
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                isLoading={loading}
                className="
                w-full
                h-12
                bg-blue-600
                hover:bg-blue-700
                text-white
                font-semibold
                rounded-xl
                "
              >
                Sign In
              </Button>
            </Form>

            {/* Register */}
            <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-base
                text-blue-600
                dark:text-blue-400
                font-semibold
                hover:underline
                "
              >
                Create Account
              </Link>
            </p>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  );
}
