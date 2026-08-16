import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story of MyStyle salon — African braids, hospitality, and technical excellence in Atlanta, GA.",
};

export default function AboutPage() {
  return (
    <div className="pt-24">
      <section className="section-pad pb-10">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">Our story</p>
            <h1 className="font-display mt-3 text-5xl font-bold tracking-tight sm:text-6xl">
              MyStyle was built to celebrate you
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              We’re a salon specializing in African braids and hair care. Black
              beauty is at the center — and blonde clients also get protective
              techniques with a high-end finish.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Founded by Amara Santos, MyStyle blends tradition, modern
              technique, and a space where every client is heard before a single
              strand is braided.
            </p>
          </Reveal>
          <Reveal delay={1}>
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/images/salon-interior.jpg"
                alt="Welcoming MyStyle salon interior"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-[rgba(243,221,212,0.35)] section-pad">
        <div className="container-page grid gap-10 md:grid-cols-3">
          {[
            {
              title: "Protection first",
              text: "Every technique is chosen to respect the scalp and keep the hair fiber healthy.",
            },
            {
              title: "Identity in every detail",
              text: "Beads, patterns, colors, and textures that tell your story — never one-size-fits-all.",
            },
            {
              title: "Full experience",
              text: "Braids, conditioning, color, cuts, and beauty services under one roof in Atlanta.",
            },
          ].map((item, i) => (
            <Reveal key={item.title} delay={(i + 1) as 1 | 2 | 3}>
              <h2 className="font-display text-2xl font-semibold">{item.title}</h2>
              <p className="mt-3 text-muted leading-relaxed">{item.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page max-w-3xl text-center">
          <Reveal>
            <h2 className="font-display text-4xl font-bold tracking-tight">
              Come experience MyStyle
            </h2>
            <p className="mt-4 text-muted">
              Book a visit, ask the team your questions, and find the protective
              style that fits this season of your life.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/book" className="btn btn-primary">
                Book
              </Link>
              <Link href="/team" className="btn btn-secondary">
                Meet the team
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
