import {
  fetchCatalogPriceListsResult,
  fetchSiteMediaGroupedResult,
  fetchSiteMediaResult,
  isSiteApiConfigured,
  type CatalogPriceListGroup,
  type SiteMediaAsset,
  type SiteMediaGroup,
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

export type BookingServiceOption = {
  id: string;
  label: string;
};

export type ContentLoadState = {
  source: "api" | "static";
  unavailable?: boolean;
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

function flattenGroupedMedia(groups: SiteMediaGroup[]): SiteMediaAsset[] {
  return groups.flatMap((group) => group.media_assets || []);
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

function buildGalleryFilters(items: GalleryDisplayItem[]) {
  const filterIds = Array.from(new Set(items.map((item) => item.filter)));
  return [
    { id: "all", label: "All" },
    ...filterIds.map((id) => ({
      id,
      label: id.charAt(0).toUpperCase() + id.slice(1),
    })),
  ];
}

export async function getGalleryItems(): Promise<{
  items: GalleryDisplayItem[];
  filters: { id: string; label: string }[];
} & ContentLoadState> {
  if (isSiteApiConfigured()) {
    const [groupedResult, flatResult] = await Promise.all([
      fetchSiteMediaGroupedResult({ type: "image", placement: "gallery" }),
      fetchSiteMediaResult({ type: "image", placement: "gallery" }),
    ]);

    if (!groupedResult.ok && !flatResult.ok) {
      return {
        items: [],
        filters: [{ id: "all", label: "All" }],
        source: "api",
        unavailable: true,
      };
    }

    const groupedAssets = groupedResult.ok ? flattenGroupedMedia(groupedResult.data) : [];
    const flatAssets = flatResult.ok ? flatResult.data : [];
    const preferred = groupedAssets.length > 0 ? groupedAssets : flatAssets;

    if (preferred.length === 0) {
      const fallback = await fetchSiteMediaResult({ type: "image" });
      const allAssets = fallback.ok ? fallback.data : [];

      if (!fallback.ok) {
        return {
          items: [],
          filters: [{ id: "all", label: "All" }],
          source: "api",
          unavailable: true,
        };
      }

      const fromAll = allAssets
        .map(mediaToGalleryItem)
        .filter((item): item is GalleryDisplayItem => Boolean(item));

      return {
        items: fromAll,
        filters: buildGalleryFilters(fromAll),
        source: "api",
      };
    }

    const fromApi = preferred
      .map(mediaToGalleryItem)
      .filter((item): item is GalleryDisplayItem => Boolean(item));

    return {
      items: fromApi,
      filters: buildGalleryFilters(fromApi),
      source: "api",
    };
  }

  const items = staticGalleryItems();
  return {
    items,
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
  if (!isSiteApiConfigured()) return null;

  const featured = await fetchSiteMediaResult({
    type: "image",
    placement: "home",
    featured: true,
  });
  if (featured.ok && featured.data[0]?.media_url) return featured.data[0];

  const home = await fetchSiteMediaResult({ type: "image", placement: "home" });
  if (!home.ok) return null;
  return home.data.find((asset) => asset.media_url) || null;
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

export async function getServiceMenu(): Promise<
  { groups: ServiceDisplayGroup[] } & ContentLoadState
> {
  if (isSiteApiConfigured()) {
    const result = await fetchCatalogPriceListsResult();

    if (!result.ok) {
      return { groups: [], source: "api", unavailable: true };
    }

    const groups = catalogToServiceGroups(result.data).filter((g) => g.items.length > 0);
    return { groups, source: "api" };
  }

  return { groups: staticServiceGroups(), source: "static" };
}

export async function getBookingServiceOptions(): Promise<BookingServiceOption[]> {
  const { groups, source, unavailable } = await getServiceMenu();
  if (source === "api" && unavailable) return [];

  return groups.flatMap((group) =>
    group.items.map((item) => ({
      id: item.id,
      label: item.title,
    })),
  );
}
