"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import type { GalleryDisplayItem } from "@/lib/site-content";

type GalleryGridProps = {
  items: GalleryDisplayItem[];
  filters: { id: string; label: string }[];
};

export function GalleryGrid({ items, filters }: GalleryGridProps) {
  const [filter, setFilter] = useState(filters[0]?.id || "all");

  const visible = useMemo(() => {
    if (filter === "all") return items;
    return items.filter((item) => item.filter === filter);
  }, [filter, items]);

  return (
    <div>
      {filters.length > 1 ? (
        <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Gallery filters">
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
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((item) => (
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
              unoptimized={item.src.startsWith("http")}
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[rgba(28,16,12,0.78)] to-transparent p-5 pt-16 text-cream">
              <p className="font-display text-lg font-semibold">{item.title}</p>
              {item.description ? (
                <p className="text-sm text-cream/80">{item.description}</p>
              ) : null}
            </figcaption>
          </figure>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="text-muted">No looks in this filter yet.</p>
      ) : null}
    </div>
  );
}
