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
    default: "MyStyle — Tranças Africanas & Salão de Beleza",
    template: "%s · MyStyle",
  },
  description:
    "Salão MyStyle especializado em tranças africanas, box braids, knotless, fulani, cuidados capilares e beleza para mulheres negras e loiras.",
  keywords: [
    "tranças africanas",
    "box braids",
    "knotless braids",
    "salão de beleza",
    "MyStyle",
    "cabelo afro",
    "tranças loiras",
  ],
  openGraph: {
    title: "MyStyle — Tranças Africanas & Salão de Beleza",
    description:
      "Tranças africanas, cuidados capilares e beleza com identidade. Agende no MyStyle.",
    locale: "pt_BR",
    type: "website",
  },
  icons: {
    icon: "/logo/mystyle-mark.png",
    apple: "/logo/mystyle-mark.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${figtree.variable} ${syne.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
