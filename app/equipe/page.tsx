import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { stylists } from "@/lib/data";

export const metadata: Metadata = {
  title: "Equipe",
  description:
    "Conheça as profissionais do MyStyle — especialistas em tranças africanas, coloração e cuidados capilares.",
};

export default function EquipePage() {
  return (
    <div className="pt-24">
      <section className="section-pad">
        <div className="container-page mb-12 max-w-3xl">
          <Reveal>
            <p className="eyebrow">Quem faz a magia</p>
            <h1 className="font-display mt-3 text-5xl font-bold tracking-tight sm:text-6xl">
              Equipe MyStyle
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              Profissionais apaixonadas por tranças, texturas e o poder de um
              visual que eleva a autoestima.
            </p>
          </Reveal>
        </div>

        <div className="container-page grid gap-10 lg:grid-cols-3">
          {stylists.map((stylist, i) => (
            <Reveal key={stylist.id} delay={(i + 1) as 1 | 2 | 3}>
              <article>
                <div className="relative mb-5 aspect-square overflow-hidden bg-blush">
                  <Image
                    src={stylist.image}
                    alt={stylist.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-copper">
                  {stylist.role}
                </p>
                <h2 className="font-display mt-2 text-2xl font-bold">{stylist.name}</h2>
                <p className="mt-3 text-muted leading-relaxed">{stylist.bio}</p>
                <p className="mt-4 text-sm text-cocoa/70">
                  Experiência: {stylist.experience}
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {stylist.specialties.map((s) => (
                    <li
                      key={s}
                      className="border border-[var(--line)] px-2.5 py-1 text-xs font-medium text-cocoa"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="container-page mt-14 text-center">
          <Link href="/agendar" className="btn btn-primary">
            Escolher profissional no agendamento
          </Link>
        </div>
      </section>
    </div>
  );
}
