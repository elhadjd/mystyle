import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { brand } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale com o MyStyle — endereço, horários, WhatsApp e formulário de contato.",
};

export default function ContatoPage() {
  return (
    <div className="pt-24">
      <section className="section-pad">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">Fale conosco</p>
            <h1 className="font-display mt-3 text-5xl font-bold tracking-tight sm:text-6xl">
              Contato MyStyle
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              Dúvidas sobre estilos, preços ou disponibilidade? Estamos aqui.
            </p>

            <dl className="mt-10 space-y-6">
              <div>
                <dt className="text-sm font-semibold uppercase tracking-wider text-copper">
                  Endereço
                </dt>
                <dd className="mt-1 text-espresso">{brand.address}</dd>
                <a
                  href={brand.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-sm text-copper underline-offset-2 hover:underline"
                >
                  Abrir no mapa
                </a>
              </div>
              <div>
                <dt className="text-sm font-semibold uppercase tracking-wider text-copper">
                  Contatos
                </dt>
                <dd className="mt-1">{brand.phone}</dd>
                <dd>{brand.email}</dd>
                <dd>{brand.instagram}</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold uppercase tracking-wider text-copper">
                  Horários
                </dt>
                <dd className="mt-1 space-y-1">
                  {brand.hours.map((h) => (
                    <p key={h.day}>
                      {h.day}: {h.time}
                    </p>
                  ))}
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={1}>
            <div className="border border-[var(--line)] bg-[rgba(255,248,244,0.65)] p-6 sm:p-8">
              <h2 className="font-display mb-6 text-2xl font-semibold">
                Envie uma mensagem
              </h2>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
