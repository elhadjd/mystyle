import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { getServiceMenu } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Services & Pricing",
  description:
    "Full menu of African braids, hair care, beauty, and extras at MyStyle in Atlanta.",
};

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const { groups } = await getServiceMenu();

  return (
    <div className="pt-24">
      <section className="section-pad pb-8">
        <div className="container-page max-w-3xl">
          <Reveal>
            <p className="eyebrow">Full menu</p>
            <h1 className="font-display mt-3 text-5xl font-bold tracking-tight sm:text-6xl">
              MyStyle Services
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              Prices listed are starting points — final cost depends on length,
              volume, technique, and design complexity. Free quotes when you book.
            </p>
          </Reveal>
        </div>
      </section>

      {groups.map((group) => (
        <section key={group.id} className="pb-16">
          <div className="container-page">
            <Reveal>
              <h2 className="font-display mb-2 border-b border-[var(--line)] pb-4 text-3xl font-bold">
                {group.title}
              </h2>
              {group.description ? (
                <p className="mt-3 mb-6 max-w-2xl text-muted">{group.description}</p>
              ) : (
                <div className="mb-6" />
              )}
            </Reveal>
            <div className="grid gap-0">
              {group.items.map((item, i) => (
                <Reveal key={item.id} delay={((i % 3) + 1) as 1 | 2 | 3}>
                  <article className="grid gap-3 border-b border-[var(--line)] py-6 sm:grid-cols-[1.4fr_auto] sm:items-start">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="font-display text-xl font-semibold">{item.title}</h3>
                        {item.badge ? (
                          <span className="text-xs font-semibold uppercase tracking-wider text-copper">
                            {item.badge}
                          </span>
                        ) : null}
                      </div>
                      {item.description ? (
                        <p className="mt-2 max-w-2xl text-muted leading-relaxed">
                          {item.description}
                        </p>
                      ) : null}
                    </div>
                    <p className="text-lg font-semibold text-espresso sm:text-right">
                      {item.priceLabel}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="section-pad pt-0">
        <div className="container-page flex flex-col items-start gap-4 border border-[var(--line)] bg-[rgba(243,221,212,0.4)] px-6 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <div>
            <h2 className="font-display text-2xl font-bold">Ready to lock in your time?</h2>
            <p className="mt-2 text-muted">Book online in a few minutes.</p>
          </div>
          <Link href="/book" className="btn btn-primary">
            Book a service
          </Link>
        </div>
      </section>
    </div>
  );
}
