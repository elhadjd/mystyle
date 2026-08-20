import {
  fetchCatalogPriceLists,
  fetchSiteMedia,
  type CatalogPriceListGroup,
  type SiteMediaAsset,
} from "@/lib/sisgesc";
import { gallery as staticGallery, services as staticServices } from "@/lib/data";

export type GalleryDisplayItem = {
  id: string;
  src: string;
  alt: string;
  title: string;
  description?: string;
  placement?: string | null;
  filter: string;
};

export type ServiceDisplayGroup = {
  id: string;
  title: string;
  description?: string | null;
  items: {
    id: string;
    title: string;
    description?: string | null;
    priceLabel: string;
    badge?: string | null;
    highlighted?: boolean;
  }[];
};

function mediaToGalleryItem(asset: SiteMediaAsset): GalleryDisplayItem | null {
  if (!asset.media_url) return null;

  const title = asset.title?.trim() || "MyStyle look";
  const placement = (asset.placement || asset.group?.placement || "gallery").toLowerCase();

  return {
    id: String(asset.id),
    src: asset.media_url,
    alt: asset.description?.trim() || title,
    title,
    description: asset.description?.trim() || undefined,
    placement,
    filter: placement,
  };
}

function staticGalleryItems(): GalleryDisplayItem[] {
  return staticGallery.map((item) => ({
    id: item.id,
    src: item.src,
    alt: item.alt,
    title: item.style,
    description: item.alt,
    placement: "gallery",
    filter: item.tone,
  }));
}

export async function getGalleryItems(): Promise<{
  items: GalleryDisplayItem[];
  filters: { id: string; label: string }[];
  source: "api" | "static";
}> {
  const [galleryMedia, allImages] = await Promise.all([
    fetchSiteMedia({ type: "image", placement: "gallery" }),
    fetchSiteMedia({ type: "image" }),
  ]);

  const preferred = galleryMedia.length > 0 ? galleryMedia : allImages;
  const fromApi = preferred
    .map(mediaToGalleryItem)
    .filter((item): item is GalleryDisplayItem => Boolean(item))
    .sort((a, b) => a.title.localeCompare(b.title));

  if (fromApi.length > 0) {
    const filterIds = Array.from(new Set(fromApi.map((item) => item.filter)));
    const filters = [
      { id: "all", label: "All" },
      ...filterIds.map((id) => ({
        id,
        label: id.charAt(0).toUpperCase() + id.slice(1),
      })),
    ];

    return { items: fromApi, filters, source: "api" };
  }

  return {
    items: staticGalleryItems(),
    filters: [
      { id: "all", label: "All" },
      { id: "black", label: "Black" },
      { id: "blonde", label: "Blonde" },
      { id: "mixed", label: "Mixed" },
    ],
    source: "static",
  };
}

export async function getHomeHeroMedia(): Promise<SiteMediaAsset | null> {
  const featured = await fetchSiteMedia({
    type: "image",
    placement: "home",
    featured: true,
  });
  if (featured[0]?.media_url) return featured[0];

  const home = await fetchSiteMedia({ type: "image", placement: "home" });
  return home.find((asset) => asset.media_url) || null;
}

export async function getHomeGalleryPreview(limit = 4): Promise<GalleryDisplayItem[]> {
  const { items } = await getGalleryItems();
  return items.slice(0, limit);
}

function formatCatalogPrice(price: number | null, priceLabel: string | null) {
  if (priceLabel?.trim()) return priceLabel.trim();
  if (typeof price === "number") {
    return price.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });
  }
  return "Ask for quote";
}

function catalogToServiceGroups(
  groups: CatalogPriceListGroup[],
): ServiceDisplayGroup[] {
  return groups.map((group) => ({
    id: String(group.id),
    title: group.title,
    description: group.description,
    items: group.items.map((item) => ({
      id: String(item.id),
      title: item.title,
      description: item.description,
      priceLabel: formatCatalogPrice(item.price, item.price_label),
      badge: item.badge,
      highlighted: item.is_highlighted,
    })),
  }));
}

function staticServiceGroups(): ServiceDisplayGroup[] {
  const byCategory = new Map<string, typeof staticServices>();

  for (const service of staticServices) {
    const list = byCategory.get(service.category) || [];
    list.push(service);
    byCategory.set(service.category, list);
  }

  const labels: Record<string, string> = {
    braids: "African Braids",
    care: "Hair Care",
    beauty: "Beauty",
    extras: "Extras",
  };

  return Array.from(byCategory.entries()).map(([category, items]) => ({
    id: category,
    title: labels[category] || category,
    description: null,
    items: items.map((service) => ({
      id: service.id,
      title: service.name,
      description: service.description,
      priceLabel: `from ${service.priceFrom.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      })}`,
      badge: service.popular ? "Popular" : null,
      highlighted: Boolean(service.popular),
    })),
  }));
}

export async function getServiceMenu(): Promise<{
  groups: ServiceDisplayGroup[];
  source: "api" | "static";
}> {
  const catalog = await fetchCatalogPriceLists();
  const groups = catalogToServiceGroups(catalog).filter((g) => g.items.length > 0);

  if (groups.length > 0) {
    return { groups, source: "api" };
  }

  return { groups: staticServiceGroups(), source: "static" };
}
