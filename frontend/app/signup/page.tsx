"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { authApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Loader2,
  CheckCircle2,
  AlertCircle,
  Mail,
  Lock,
  UserPlus,
  ArrowLeft,
} from "lucide-react";

const signupSchema = z
  .object({
    email: z.string().email("Vui lòng nhập email hợp lệ"),
    password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu không khớp",
    path: ["confirmPassword"],
  });

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const [successMessage, setSuccessMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const mutation = useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      setSuccessMessage(data.message);
      reset();
      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
    },
  });

  const onSubmit = (data: SignupFormData) => {
    setSuccessMessage("");
    mutation.mutate({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left side - Form */}
      <div className="flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-500 rounded-lg shadow-md mb-4">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Tạo Tài Khoản</h1>
            <p className="text-gray-600">Điền thông tin để tạo tài khoản mới</p>
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
                disabled={mutation.isPending}
              />
              {errors.email && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-gray-700 font-semibold flex items-center gap-2"
              >
                <Lock className="w-4 h-4 text-cyan-600" />
                Mật khẩu
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="h-12 pl-4 border-2 border-gray-200 focus:border-cyan-500 rounded-lg transition-colors"
                {...register("password")}
                disabled={mutation.isPending}
              />
              {errors.password && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="confirmPassword"
                className="text-gray-700 font-semibold flex items-center gap-2"
              >
                <Lock className="w-4 h-4 text-cyan-600" />
                Xác nhận mật khẩu
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                className="h-12 pl-4 border-2 border-gray-200 focus:border-cyan-500 rounded-lg transition-colors"
                {...register("confirmPassword")}
                disabled={mutation.isPending}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {mutation.isError && (
              <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                <p className="text-sm text-red-600">
                  {mutation.error instanceof Error
                    ? mutation.error.message
                    : "Đăng ký thất bại. Vui lòng thử lại."}
                </p>
              </div>
            )}

            {successMessage && (
              <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                <p className="text-sm text-green-600 font-medium">
                  {successMessage}
                </p>
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold bg-cyan-500 hover:bg-cyan-600 shadow-md hover:shadow-lg transition-all duration-200 rounded-lg"
              disabled={mutation.isPending}
            >
              {mutation.isPending && (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              )}
              {mutation.isPending ? "Đang tạo tài khoản..." : "Đăng Ký"}
            </Button>
          </form>

          <div className="space-y-4">
            <div className="text-center text-sm text-gray-600">
              Đã có tài khoản?{" "}
              <Link
                href="/login"
                className="font-semibold text-cyan-600 hover:text-cyan-700 hover:underline"
              >
                Đăng nhập ngay
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

      {/* Right side - Decorative */}
      <div className="hidden lg:flex items-center justify-center bg-gray-900 p-12">
        <div className="text-white space-y-8 max-w-md">
          <div className="space-y-4">
            <h2 className="text-5xl font-bold leading-tight">
              Chào mừng bạn đến với hệ thống
            </h2>
            <p className="text-xl text-gray-300">
              Tạo tài khoản để trải nghiệm đầy đủ các tính năng của chúng tôi
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Bảo mật cao</h3>
                <p className="text-gray-300">
                  Mã hóa dữ liệu an toàn tuyệt đối
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Dễ sử dụng</h3>
                <p className="text-gray-300">Giao diện thân thiện, trực quan</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Hỗ trợ 24/7</h3>
                <p className="text-gray-300">Luôn sẵn sàng giúp đỡ bạn</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
