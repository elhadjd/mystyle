import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Conheça a história do salão MyStyle — tranças africanas, acolhimento e excelência técnica em São Paulo.",
};

export default function SobrePage() {
  return (
    <div className="pt-24">
      <section className="section-pad pb-10">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">Nossa história</p>
            <h1 className="font-display mt-3 text-5xl font-bold tracking-tight sm:text-6xl">
              MyStyle nasceu para celebrar você
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              Somos um salão especializado em tranças africanas e cuidados
              capilares. Aqui, a beleza negra é centro — e mulheres loiras
              também encontram técnicas protetoras com acabamento de alto nível.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Fundado por Amara Santos, o MyStyle une tradição, técnica moderna
              e um espaço onde cada cliente é ouvida antes de qualquer fio ser
              trançado.
            </p>
          </Reveal>
          <Reveal delay={1}>
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/images/salon-interior.jpg"
                alt="Ambiente acolhedor do salão MyStyle"
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
              title: "Proteção primeiro",
              text: "Cada técnica é escolhida para respeitar o couro cabeludo e a saúde da fibra.",
            },
            {
              title: "Identidade em cada detalhe",
              text: "Beads, desenhos, cores e texturas que contam a sua história — sem fórmulas prontas.",
            },
            {
              title: "Experiência completa",
              text: "Tranças, hidratação, coloração, corte e estética em um só endereço.",
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
              Venha viver a experiência MyStyle
            </h2>
            <p className="mt-4 text-muted">
              Agende uma visita, tire dúvidas com a equipe e descubra o estilo
              protetor ideal para o seu momento.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/agendar" className="btn btn-primary">
                Agendar
              </Link>
              <Link href="/equipe" className="btn btn-secondary">
                Conhecer a equipe
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
