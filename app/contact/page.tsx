import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { brand } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact MyStyle — address, hours, phone, and message form in Atlanta, GA.",
};

export default function ContactPage() {
  return (
    <div className="pt-24">
      <section className="section-pad">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">Get in touch</p>
            <h1 className="font-display mt-3 text-5xl font-bold tracking-tight sm:text-6xl">
              Contact MyStyle
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              Questions about styles, pricing, or availability? We’re here.
            </p>

            <dl className="mt-10 space-y-6">
              <div>
                <dt className="text-sm font-semibold uppercase tracking-wider text-copper">
                  Address
                </dt>
                <dd className="mt-1 text-espresso">{brand.address}</dd>
                <a
                  href={brand.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-sm text-copper underline-offset-2 hover:underline"
                >
                  Open in Maps
                </a>
              </div>
              <div>
                <dt className="text-sm font-semibold uppercase tracking-wider text-copper">
                  Contact
                </dt>
                <dd className="mt-1">
                  <a href={`tel:${brand.phoneTel}`}>{brand.phone}</a>
                </dd>
                <dd>{brand.email}</dd>
                <dd>{brand.instagram}</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold uppercase tracking-wider text-copper">
                  Hours
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
                Send a message
              </h2>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
