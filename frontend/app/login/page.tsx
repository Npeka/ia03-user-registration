"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Loader2,
  CheckCircle2,
  Mail,
  Lock,
  LogIn,
  ArrowLeft,
  Sparkles,
} from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Vui lòng nhập email hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      setLoginSuccess(true);
      console.log("Login attempted with:", data);

      // Reset success message after 3 seconds
      setTimeout(() => {
        setLoginSuccess(false);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left side - Decorative */}
      <div className="hidden lg:flex items-center justify-center bg-gray-900 p-12">
        <div className="text-white space-y-8 max-w-md">
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 bg-cyan-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-7 h-7" />
              </div>
              <span className="text-3xl font-bold">User Portal</span>
            </div>
            <h2 className="text-5xl font-bold leading-tight">
              Xin chào! <br />
              Chào mừng trở lại
            </h2>
            <p className="text-xl text-gray-300">
              Đăng nhập để tiếp tục truy cập vào tài khoản của bạn
            </p>
          </div>

          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg">
              <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div className="text-sm">
                <p className="font-semibold">Truy cập nhanh chóng</p>
                <p className="text-gray-300">Đăng nhập trong vài giây</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg">
              <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <div className="text-sm">
                <p className="font-semibold">An toàn tuyệt đối</p>
                <p className="text-gray-300">Dữ liệu được mã hóa</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-500 rounded-lg shadow-md mb-4">
              <LogIn className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Đăng Nhập</h1>
            <p className="text-gray-600">
              Nhập thông tin tài khoản để tiếp tục
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-gray-700 font-semibold flex items-center gap-2"
              >
                <Mail className="w-4 h-4 text-cyan-600" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                className="h-12 pl-4 border-2 border-gray-200 focus:border-cyan-500 rounded-lg transition-colors"
                {...register("email")}
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="password"
                  className="text-gray-700 font-semibold flex items-center gap-2"
                >
                  <Lock className="w-4 h-4 text-cyan-600" />
                  Mật khẩu
                </Label>
                <Link
                  href="#"
                  className="text-sm text-cyan-600 hover:text-cyan-700 hover:underline"
                >
                  Quên mật khẩu?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="h-12 pl-4 border-2 border-gray-200 focus:border-cyan-500 rounded-lg transition-colors"
                {...register("password")}
                disabled={isLoading}
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {loginSuccess && (
              <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                <p className="text-sm text-green-600 font-medium">
                  Đăng nhập thành công!
                </p>
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold bg-cyan-500 hover:bg-cyan-600 shadow-md hover:shadow-lg transition-all duration-200 rounded-lg"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
              {isLoading ? "Đang đăng nhập..." : "Đăng Nhập"}
            </Button>
          </form>

          <div className="space-y-4">
            <div className="text-center text-sm text-gray-600">
              Chưa có tài khoản?{" "}
              <Link
                href="/signup"
                className="font-semibold text-cyan-600 hover:text-cyan-700 hover:underline"
              >
                Đăng ký ngay
              </Link>
            </div>

            <Link
              href="/"
              className="flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Quay lại trang chủ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
