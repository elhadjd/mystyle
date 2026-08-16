import type { Metadata } from "next";
import { Figtree, Syne } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "MyStyle — African Braids & Beauty Salon",
    template: "%s · MyStyle",
  },
  description:
    "MyStyle salon specializing in African braids, box braids, knotless, Fulani styles, hair care, and beauty for Black and blonde clients in Atlanta, GA.",
  keywords: [
    "African braids",
    "box braids",
    "knotless braids",
    "beauty salon",
    "MyStyle",
    "Atlanta braids",
    "blonde braids",
  ],
  openGraph: {
    title: "MyStyle — African Braids & Beauty Salon",
    description:
      "African braids, hair care, and beauty with identity. Book at MyStyle in Atlanta.",
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/logo/mystyle-favicon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${figtree.variable} ${syne.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
