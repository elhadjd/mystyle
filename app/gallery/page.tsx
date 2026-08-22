import type { Metadata } from "next";
import { GalleryGrid } from "@/components/GalleryGrid";
import { Reveal } from "@/components/Reveal";
import { getGalleryItems } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "MyStyle portfolio: Black and blonde women with African braids, box braids, Fulani, goddess, and more.",
};

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const { items, filters, unavailable } = await getGalleryItems();

  return (
    <div className="pt-24">
      <section className="section-pad">
        <div className="container-page mb-10 max-w-3xl">
          <Reveal>
            <p className="eyebrow">Real inspiration</p>
            <h1 className="font-display mt-3 text-5xl font-bold tracking-tight sm:text-6xl">
              MyStyle Gallery
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              African braids across skin tones and hair colors — from deep black
              to honey blonde. Filter and find your next look.
            </p>
            {unavailable ? (
              <p className="mt-4 text-copper">
                Gallery is temporarily unavailable. Please try again later.
              </p>
            ) : null}
          </Reveal>
        </div>
        <div className="container-page">
          {items.length > 0 ? (
            <GalleryGrid items={items} filters={filters} />
          ) : !unavailable ? (
            <p className="text-muted">No gallery images have been published yet.</p>
          ) : null}
        </div>
      </section>
    </div>
  );
}
