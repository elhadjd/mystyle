import type { Metadata } from "next";
import { BookingForm } from "@/components/BookingForm";
import { Reveal } from "@/components/Reveal";
import { brand } from "@/lib/data";
import { getBookingServiceOptions } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Book",
  description:
    "Book your appointment at MyStyle — African braids, hair care, and beauty in Atlanta, GA.",
};

export const dynamic = "force-dynamic";

export default async function BookPage() {
  const services = await getBookingServiceOptions();

  return (
    <div className="pt-24">
      <section className="section-pad">
        <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <p className="eyebrow">Reservation</p>
            <h1 className="font-display mt-3 text-5xl font-bold tracking-tight sm:text-6xl">
              Book MyStyle
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              Send your request and we’ll confirm by text. For longer services,
              we recommend booking at least 3 days ahead.
            </p>
            <ul className="mt-8 space-y-3 text-muted">
              <li>
                <strong className="text-espresso">Phone:</strong>{" "}
                <a href={`tel:${brand.phoneTel}`} className="text-copper underline-offset-2 hover:underline">
                  {brand.phone}
                </a>
              </li>
              <li>
                <strong className="text-espresso">Email:</strong> {brand.email}
              </li>
              <li>
                <strong className="text-espresso">Address:</strong> {brand.address}
              </li>
            </ul>
            <div className="mt-8 border-l-2 border-copper pl-4 text-sm leading-relaxed text-muted">
              After your request, a deposit holds your appointment. Cancellations
              with less than 24 hours’ notice may forfeit the deposit.
            </div>
          </Reveal>

          <Reveal delay={1}>
            <div className="border border-[var(--line)] bg-[rgba(255,248,244,0.65)] p-6 sm:p-8">
              <BookingForm services={services} />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
