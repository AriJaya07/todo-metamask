"use client"

import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/authContext";
import { QueryClientProvider } from "react-query";
import queryClient from "@/@utils/queryClient";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>{children}</AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
