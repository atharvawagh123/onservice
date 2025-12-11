"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ToastProvider from "./component/ToastProvider";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { AuthContextProvider } from "./context/ContextProvider";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const queryClient = new QueryClient();
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLogin] = useState(() => {
    if (typeof window !== "undefined") {
      return !!localStorage.getItem("token");
    }
    return false;
  });

  return (
    <html lang="en">
      <head>
        <title>Management System</title>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <AuthContextProvider isLoginstate={isLogin}>
              {children}
            </AuthContextProvider>
          </Provider>
        </QueryClientProvider>

        <ToastProvider />
      </body>
    </html>
  );
}
