import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SafariCharge - EV Charging Network | Powering Africa's Electric Future",
  description: "Kenya's largest EV charging network. Find charging stations, monitor sessions, manage fleets, and access AI-powered analytics for optimal charging experience.",
  keywords: ["EV charging", "electric vehicle", "charging stations", "Kenya", "SafariCharge", "sustainable transport", "green energy"],
  authors: [{ name: "SafariCharge Ltd" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "SafariCharge - EV Charging Network",
    description: "Kenya's largest EV charging network. Find charging stations and power up your journey.",
    url: "https://safaricharge.com",
    siteName: "SafariCharge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SafariCharge - EV Charging Network",
    description: "Kenya's largest EV charging network. Find charging stations and power up your journey.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
