import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MainLayout from "@/components/layout/MainLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:9999"),
  title: "Sri Lanka Travel Explorer | Smart Tourism Assistant",
  description: "Discover Sri Lankan destinations, hotels, trip plans, favourites and tourist safety tools. Developd by SEEBTHI03.",
  openGraph: {
    title: "Sri Lanka Travel Explorer | Smart Tourism Assistant",
    description: "Discover Sri Lankan destinations, hotels, trip plans, favourites and tourist safety tools.",
    url: "/",
    siteName: "Sri Lanka Travel Explorer",
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: "Sri Lanka Travel Explorer" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sri Lanka Travel Explorer | Smart Tourism Assistant",
    description: "Discover Sri Lankan destinations, hotels, trip plans, favourites and tourist safety tools.",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import SplashScreen from "@/components/common/SplashScreen";
import AppAccessGate from "@/components/auth/AppAccessGate";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <LanguageProvider>
            <SplashScreen />
            <AppAccessGate>
              <MainLayout>{children}</MainLayout>
            </AppAccessGate>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
