import type { Metadata } from "next";
import Link from "next/link";
import { FaqList } from "@/components/FaqList";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Perguntas frequentes sobre tranças, cuidados, agendamento e pagamento no MyStyle.",
};

export default function FaqPage() {
  return (
    <div className="pt-24">
      <section className="section-pad">
        <div className="container-page max-w-3xl">
          <Reveal>
            <p className="eyebrow">Dúvidas</p>
            <h1 className="font-display mt-3 text-5xl font-bold tracking-tight sm:text-6xl">
              Perguntas frequentes
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              Tudo o que você precisa saber antes de sentar na cadeira MyStyle.
            </p>
          </Reveal>

          <div className="mt-12">
            <FaqList />
          </div>

          <Reveal>
            <p className="mt-10 text-muted">
              Não encontrou sua resposta?{" "}
              <Link href="/contato" className="text-copper underline-offset-2 hover:underline">
                Fale conosco
              </Link>{" "}
              ou{" "}
              <Link href="/agendar" className="text-copper underline-offset-2 hover:underline">
                agende um horário
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
