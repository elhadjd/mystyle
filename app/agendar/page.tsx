import type { Metadata } from "next";
import { BookingForm } from "@/components/BookingForm";
import { Reveal } from "@/components/Reveal";
import { brand } from "@/lib/data";

export const metadata: Metadata = {
  title: "Agendar",
  description:
    "Agende seu horário no MyStyle — tranças africanas, cuidados e estética em São Paulo.",
};

export default function AgendarPage() {
  return (
    <div className="pt-24">
      <section className="section-pad">
        <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <p className="eyebrow">Reserva</p>
            <h1 className="font-display mt-3 text-5xl font-bold tracking-tight sm:text-6xl">
              Agende no MyStyle
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              Envie seu pedido e confirmamos por WhatsApp. Para serviços longos,
              sugerimos agendar com pelo menos 3 dias de antecedência.
            </p>
            <ul className="mt-8 space-y-3 text-muted">
              <li>
                <strong className="text-espresso">Telefone:</strong> {brand.phone}
              </li>
              <li>
                <strong className="text-espresso">WhatsApp:</strong>{" "}
                <a
                  href={`https://wa.me/${brand.whatsapp}`}
                  className="text-copper underline-offset-2 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Conversar agora
                </a>
              </li>
              <li>
                <strong className="text-espresso">Endereço:</strong> {brand.address}
              </li>
            </ul>
            <div className="mt-8 border-l-2 border-copper pl-4 text-sm leading-relaxed text-muted">
              Após o pedido, pedimos um sinal para garantir a reserva. Cancelamentos
              com menos de 24h podem perder o sinal.
            </div>
          </Reveal>

          <Reveal delay={1}>
            <div className="border border-[var(--line)] bg-[rgba(255,248,244,0.65)] p-6 sm:p-8">
              <BookingForm />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
