"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { gallery } from "@/lib/data";

const filters = [
  { id: "todas", label: "Todas" },
  { id: "negra", label: "Negras" },
  { id: "loira", label: "Loiras" },
  { id: "mista", label: "Mistas" },
] as const;

export function GalleryGrid() {
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("todas");

  const items = useMemo(() => {
    if (filter === "todas") return gallery;
    return gallery.filter((item) => item.tone === filter);
  }, [filter]);

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Filtros da galeria">
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            role="tab"
            aria-selected={filter === f.id}
            onClick={() => setFilter(f.id)}
            className={`min-h-10 px-4 text-sm font-semibold tracking-wide transition ${
              filter === f.id
                ? "bg-espresso text-cream"
                : "bg-transparent text-espresso border border-[var(--line)] hover:border-espresso"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <figure
            key={item.id}
            className="group relative aspect-[3/4] overflow-hidden bg-blush"
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition duration-700 group-hover:scale-105"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[rgba(28,16,12,0.78)] to-transparent p-5 pt-16 text-cream">
              <p className="font-display text-lg font-semibold">{item.style}</p>
              <p className="text-sm text-cream/80">{item.alt}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
