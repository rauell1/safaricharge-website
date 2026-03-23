import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/react";

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
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
