import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { brand, testimonials } from "@/lib/data";
import {
  getHomeGalleryPreview,
  getHomeHeroMedia,
  getServiceMenu,
} from "@/lib/site-content";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [hero, preview, menu] = await Promise.all([
    getHomeHeroMedia(),
    getHomeGalleryPreview(4),
    getServiceMenu(),
  ]);

  const featured = menu.groups
    .flatMap((group) => group.items)
    .filter((item) => item.highlighted || item.badge)
    .slice(0, 3);

  const featuredFallback = menu.groups.flatMap((group) => group.items).slice(0, 3);
  const cards = featured.length > 0 ? featured : featuredFallback;

  const heroSrc = hero?.media_url || "/images/hero-braids-black.jpg";
  const heroAlt = hero?.title || hero?.description || "Black woman with African braids at MyStyle";
  const heroCtaLabel = hero?.button_label || null;
  const heroCtaUrl = hero?.button_url || null;

  return (
    <>
      <section className="relative min-h-[100svh] overflow-hidden">
        <div className="hero-media absolute inset-0">
          <Image
            src={heroSrc}
            alt={heroAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_20%]"
            unoptimized={heroSrc.startsWith("http")}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[rgba(28,16,12,0.78)] via-[rgba(28,16,12,0.45)] to-[rgba(28,16,12,0.15)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(28,16,12,0.55)] via-transparent to-[rgba(28,16,12,0.25)]" />
        </div>

        <div className="ambient-orb pointer-events-none absolute -left-20 top-32 h-64 w-64 rounded-full bg-copper/20 blur-3xl" />

        <div className="container-page relative z-10 flex min-h-[100svh] flex-col justify-end pb-16 pt-28 sm:justify-center sm:pb-24">
          <p className="animate-rise eyebrow text-copper-soft">MyStyle Salon</p>
          <h1 className="animate-rise-delay font-display mt-4 max-w-3xl text-[clamp(3.2rem,9vw,6.5rem)] font-bold leading-[0.92] tracking-tight text-cream">
            MyStyle
          </h1>
          <p className="animate-rise-delay-2 mt-5 max-w-md text-lg leading-relaxed text-cream/85 sm:text-xl">
            {hero?.description?.trim() ||
              "African braids and beauty with identity — for Black women, blondes, and every shade of power."}
          </p>
          <div className="animate-rise-delay-2 mt-8 flex flex-wrap gap-3">
            {heroCtaUrl && heroCtaLabel ? (
              <a href={heroCtaUrl} className="btn btn-copper">
                {heroCtaLabel}
              </a>
            ) : (
              <Link href="/book" className="btn btn-copper">
                Book now
              </Link>
            )}
            <Link href="/gallery" className="btn btn-ghost-light">
              View gallery
            </Link>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page grid items-end gap-8 md:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <p className="eyebrow">What we do</p>
            <h2 className="font-display mt-3 max-w-xl text-4xl font-bold tracking-tight text-espresso sm:text-5xl">
              Braids that protect. Style that celebrates.
            </h2>
          </Reveal>
          <Reveal delay={1}>
            <p className="text-[1.05rem] leading-relaxed text-muted">
              From classic box braids to blonde goddess looks, every service is
              built for comfort, longevity, and self-expression. Hair care,
              color, and beauty — all in one Atlanta studio.
            </p>
          </Reveal>
        </div>

        <div className="container-page mt-12 grid gap-8 md:grid-cols-3">
          {cards.map((service, i) => (
            <Reveal key={service.id} delay={(i + 1) as 1 | 2 | 3}>
              <article className="border-t border-espresso/15 pt-6">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-copper">
                  {service.priceLabel}
                </p>
                <h3 className="font-display mt-3 text-2xl font-semibold">{service.title}</h3>
                {service.description ? (
                  <p className="mt-3 text-muted leading-relaxed">{service.description}</p>
                ) : null}
              </article>
            </Reveal>
          ))}
        </div>

        <div className="container-page mt-10">
          <Link href="/services" className="btn btn-secondary">
            See all services
          </Link>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[70vh]">
            <Image
              src="/images/hero-braids-blonde.jpg"
              alt="Blonde client with African knotless braids"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center bg-espresso px-8 py-16 text-cream sm:px-14">
            <Reveal>
              <p className="eyebrow text-copper-soft">For everyone</p>
              <h2 className="font-display mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
                Black & blonde. Braids with the same excellence.
              </h2>
              <p className="mt-5 max-w-md text-cream/75 leading-relaxed">
                Protective techniques, polished finishes, and real hospitality.
                Whether box, knotless, Fulani, or passion twists — your style
                belongs here.
              </p>
              <Link href="/about" className="btn btn-copper mt-8 w-fit">
                About MyStyle
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <p className="eyebrow">Portfolio</p>
            <h2 className="font-display mt-2 text-4xl font-bold tracking-tight">
              Live gallery
            </h2>
          </Reveal>
          <Reveal delay={1}>
            <Link href="/gallery" className="btn btn-secondary">
              Open gallery
            </Link>
          </Reveal>
        </div>
        <div className="container-page grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {preview.map((item, i) => (
            <Reveal key={item.id} delay={(Math.min(i, 2) + 1) as 1 | 2 | 3}>
              <Link href="/gallery" className="group relative block aspect-[3/4] overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                  unoptimized={item.src.startsWith("http")}
                />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-espresso/70 to-transparent p-4 text-sm font-medium text-cream">
                  {item.title}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-[rgba(243,221,212,0.45)] section-pad">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">Testimonials</p>
            <h2 className="font-display mt-2 mb-10 text-4xl font-bold tracking-tight">
              Clients recommend
            </h2>
          </Reveal>
          <div className="grid gap-10 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.id} delay={(i + 1) as 1 | 2 | 3}>
                <blockquote>
                  <p className="text-lg leading-relaxed text-cocoa">&ldquo;{t.text}&rdquo;</p>
                  <footer className="mt-5">
                    <cite className="not-italic font-semibold text-espresso">{t.name}</cite>
                    <p className="text-sm text-muted">{t.service}</p>
                  </footer>
                </blockquote>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page relative overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/salon-interior.jpg"
              alt="MyStyle salon interior"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-espresso/70" />
          </div>
          <div className="relative z-10 px-6 py-20 text-center sm:px-12">
            <Reveal>
              <p className="font-display text-4xl font-bold text-cream sm:text-5xl">
                Ready for your next look?
              </p>
              <p className="mx-auto mt-4 max-w-lg text-cream/80">
                Book online or call us. {brand.address}.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link href="/book" className="btn btn-copper">
                  Book now
                </Link>
                <a href={`tel:${brand.phoneTel}`} className="btn btn-ghost-light">
                  Call {brand.phone}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
