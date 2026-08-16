import type { Metadata } from "next";
import { GalleryGrid } from "@/components/GalleryGrid";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Galeria",
  description:
    "Portfólio MyStyle: mulheres negras e loiras com tranças africanas, box braids, fulani, goddess e mais.",
};

export default function GaleriaPage() {
  return (
    <div className="pt-24">
      <section className="section-pad">
        <div className="container-page mb-10 max-w-3xl">
          <Reveal>
            <p className="eyebrow">Inspiração real</p>
            <h1 className="font-display mt-3 text-5xl font-bold tracking-tight sm:text-6xl">
              Galeria MyStyle
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              Tranças africanas em diferentes tons de pele e cabelo — do preto
              profundo ao loiro mel. Filtre e encontre o seu próximo visual.
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
