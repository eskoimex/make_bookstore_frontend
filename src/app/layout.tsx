"use client";
import { QueryClient, QueryClientProvider } from "react-query";
import { Inter } from "next/font/google";
import { RecoilRoot } from "recoil";
import type { Metadata } from "next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      structuralSharing: false,
      retry: false,
      cacheTime: 0,
    },
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <html lang="en">
          <body className={inter.className}>{children}</body>
        </html>
      </QueryClientProvider>
    </RecoilRoot>
  );
}
