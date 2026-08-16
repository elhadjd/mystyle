import type { Metadata } from "next";
import Link from "next/link";
import { FaqList } from "@/components/FaqList";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about braids, care, booking, and payment at MyStyle.",
};

export default function FaqPage() {
  return (
    <div className="pt-24">
      <section className="section-pad">
        <div className="container-page max-w-3xl">
          <Reveal>
            <p className="eyebrow">Questions</p>
            <h1 className="font-display mt-3 text-5xl font-bold tracking-tight sm:text-6xl">
              Frequently asked questions
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              Everything you need to know before you sit in the MyStyle chair.
            </p>
          </Reveal>

          <div className="mt-12">
            <FaqList />
          </div>

          <Reveal>
            <p className="mt-10 text-muted">
              Still need answers?{" "}
              <Link href="/contact" className="text-copper underline-offset-2 hover:underline">
                Contact us
              </Link>{" "}
              or{" "}
              <Link href="/book" className="text-copper underline-offset-2 hover:underline">
                book an appointment
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
