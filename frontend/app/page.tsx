import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-lg shadow-xl bg-white border border-gray-200">
        <CardHeader className="text-center space-y-4 pb-8">
          <div className="mx-auto w-20 h-20 bg-cyan-500 rounded-lg flex items-center justify-center shadow-md transform hover:scale-105 transition-transform duration-300">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <CardTitle className="text-4xl font-bold text-gray-900">
            User Portal
          </CardTitle>
          <CardDescription className="text-base text-gray-600">
            Quản lý tài khoản người dùng dễ dàng và bảo mật
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 px-8 pb-8">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-lg">NT</span>
              </div>
              <div>
                <p className="font-bold text-gray-800 text-lg">
                  Nguyễn Phúc Khang
                </p>
                <p className="text-cyan-600 font-semibold">MSSV: 22127180</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 pt-2">
            <Link href="/signup" className="w-full group">
              <Button className="w-full h-14 text-lg font-semibold bg-cyan-500 hover:bg-cyan-600 shadow-md hover:shadow-lg transition-all duration-200">
                <svg
                  className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  />
                </svg>
                Đăng Ký Ngay
              </Button>
            </Link>
            <Link href="/login" className="w-full group">
              <Button
                variant="outline"
                className="w-full h-14 text-lg font-semibold border-2 border-gray-300 hover:border-cyan-500 text-gray-900 hover:bg-gray-50 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <svg
                  className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
                Đã Có Tài Khoản? Đăng Nhập
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
