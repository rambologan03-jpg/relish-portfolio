import type { Metadata } from "next";
import { Bebas_Neue, Manrope } from "next/font/google";
import CustomCursor from "@/components/CustomCursor";
import LoadingScreen from "@/components/LoadingScreen";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const displayFont = Bebas_Neue({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

const bodyFont = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Relish Sabalpara — Creative Editor & AI Content Designer",
  description:
    "Video editor based in Surat, India. Specializing in AI-generated content, UGC ads, YouTube production, real estate videos, motion graphics and reels for brands and creators worldwide.",
  keywords:
    "video editor, AI content creator, UGC ads, YouTube editor, motion graphics, real estate video, Surat, India, Relish Sabalpara",
  openGraph: {
    title: "Relish Sabalpara — Creative Editor & AI Content Designer",
    description:
      "Cinematic edits, AI content, and motion-led storytelling for brands and creators.",
    url: "https://relishsabalpara.vercel.app",
    siteName: "Relish Sabalpara",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${displayFont.variable} ${bodyFont.variable} antialiased`}>
        <LoadingScreen />
        <CustomCursor />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
