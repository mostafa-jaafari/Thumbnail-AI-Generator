import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserInfosProvider } from "@/context/UserInfos";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: {
    default: "NextGen | Modern Solutions",
    template: "%s | NextGen"
  },
  description: "High-performance solutions for modern thumbnails.",
  metadataBase: new URL('https://nexgen.com'),
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased scroll-smooth w-full overflow-x-hidden`}
      >
        <Toaster
          position="top-center"
        />
        <UserInfosProvider>
          {children}
        </UserInfosProvider>
      </body>
    </html>
  );
}
