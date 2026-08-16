import type { Metadata } from "next";
import { GalleryGrid } from "@/components/GalleryGrid";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "MyStyle portfolio: Black and blonde women with African braids, box braids, Fulani, goddess, and more.",
};

export default function GalleryPage() {
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
          </Reveal>
        </div>
        <div className="container-page">
          <GalleryGrid />
        </div>
      </section>
    </div>
  );
}
