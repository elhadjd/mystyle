const CONTACT_PATH = "/api/site/contacts/submit";
const MEDIA_PATH = "/api/site/media";
const PRICE_LISTS_PATH = "/api/site/price-lists";
const PRICE_QUOTE_PATH = "/api/site/price-lists/quote";
const CATALOG_PRICE_LISTS_PATH = "/api/site/catalog-price-lists";

const PHONE_MAX_LENGTH = 20;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Shown to visitors — never expose config, API keys, or server details. */
export const CONTACT_CLIENT_ERROR =
  "We couldn't send your message right now. Please try again in a few minutes.";

type SiteApiConfig = { host: string; key: string };

function getSiteApiConfig(): { ok: true; config: SiteApiConfig } | { ok: false } {
  const host = process.env.SITE_API_HOST?.trim().replace(/\/+$/, "");
  const key = process.env.SITE_API_KEY?.trim();

  if (!host || !key) {
    console.error("[SISGESC] Missing SITE_API_HOST or SITE_API_KEY.");
    return { ok: false };
  }

  if (!/^https?:\/\//i.test(host)) {
    console.error("[SISGESC] SITE_API_HOST must be a full URL (https://...).");
    return { ok: false };
  }

  return { ok: true, config: { host, key } };
}

async function readJson(response: Response) {
  const text = await response.text();
  if (!text) return null;

  try {
    return JSON.parse(text) as unknown;
  } catch {
    return null;
  }
}

async function siteApiFetch(
  path: string,
  options: {
    method?: "GET" | "POST";
    query?: Record<string, string | number | boolean | undefined>;
    body?: unknown;
  } = {},
): Promise<{ ok: true; status: number; data: unknown } | { ok: false; status?: number }> {
  const resolved = getSiteApiConfig();
  if (!resolved.ok) return { ok: false };

  const { host, key } = resolved.config;
  const url = new URL(path, `${host}/`);
  url.searchParams.set("key", key);

  if (options.query) {
    for (const [name, value] of Object.entries(options.query)) {
      if (value === undefined || value === "") continue;
      url.searchParams.set(name, String(value));
    }
  }

  try {
    const response = await fetch(url, {
      method: options.method ?? "GET",
      headers: {
        Accept: "application/json",
        key,
        ...(options.body
          ? { "Content-Type": "application/json" }
          : {}),
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
      cache: "no-store",
    });

    if (response.status === 403) {
      console.error(`[SISGESC] Unauthorized (HTTP 403) on ${path}. Check SITE_API_KEY.`);
      return { ok: false, status: 403 };
    }

    if (!response.ok) {
      const errorBody = await readJson(response);
      console.error(`[SISGESC] ${path} failed:`, response.status, errorBody);
      return { ok: false, status: response.status };
    }

    return { ok: true, status: response.status, data: await readJson(response) };
  } catch (error) {
    console.error(`[SISGESC] Network error on ${path}:`, error);
    return { ok: false };
  }
}

function asArray<T>(value: unknown): T[] {
  if (Array.isArray(value)) return value as T[];
  if (value && typeof value === "object" && "data" in value) {
    const data = (value as { data: unknown }).data;
    if (Array.isArray(data)) return data as T[];
  }
  return [];
}

// ── Contact ───────────────────────────────────────────────────────────────

export type SiteContactPayload = {
  name: string;
  email: string;
  phone: string;
  message?: string;
  subject?: string;
  service?: number | string;
  serviceType?: string;
  metadata?: Record<string, unknown>;
  page_url?: string;
};

type SiteContactRecord = {
  id: number;
  site_id: number;
  company_reference: string;
  name: string;
  email: string;
  phone: string;
  subject: string | null;
  message: string | null;
  product_id: number | null;
  metadata: Record<string, unknown> | null;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
  updated_at: string;
};

type SubmitContactSuccess = {
  success: true;
  message: string;
  contact: SiteContactRecord;
};

export type SiteContactResult =
  | { ok: true; message: string; contactId: number }
  | { ok: false; message: string; status?: number };

type ValidationErrorBody = {
  message?: string;
  errors?: Record<string, string[] | string>;
};

function optionalText(value: unknown) {
  const text = String(value ?? "").trim();
  return text.length > 0 ? text : undefined;
}

export function validateContactInput(input: {
  name: string;
  email: string;
  phone: string;
  subject?: string;
  message?: string;
  service?: string;
  page_url?: string;
}): { ok: true; payload: SiteContactPayload } | { ok: false; message: string } {
  const name = input.name.trim();
  const email = input.email.trim();
  const phone = input.phone.trim();

  if (!name || !email || !phone) {
    return {
      ok: false,
      message: "Name, email, and phone are required.",
    };
  }

  if (!EMAIL_PATTERN.test(email)) {
    return { ok: false, message: "Please enter a valid email address." };
  }

  if (phone.length > PHONE_MAX_LENGTH) {
    return {
      ok: false,
      message: `Phone must be ${PHONE_MAX_LENGTH} characters or fewer.`,
    };
  }

  const payload: SiteContactPayload = {
    name,
    email,
    phone,
  };

  const subject = optionalText(input.subject);
  const message = optionalText(input.message);
  const service = optionalText(input.service);
  const pageUrl = optionalText(input.page_url);

  if (subject) payload.subject = subject;
  if (message) payload.message = message;
  if (service) {
    payload.service = /^\d+$/.test(service) ? Number(service) : service;
  }
  payload.serviceType = "contact";
  payload.metadata = {
    form: "contact",
  };
  if (pageUrl) payload.page_url = pageUrl;

  return { ok: true, payload };
}

function firstValidationMessage(body: ValidationErrorBody | null) {
  if (!body) return "Please check the form and try again.";

  if (body.errors) {
    for (const value of Object.values(body.errors)) {
      if (Array.isArray(value) && value[0]) return String(value[0]);
      if (typeof value === "string" && value) return value;
    }
  }

  return body.message || "Please check the form and try again.";
}

export async function submitSiteContact(
  payload: SiteContactPayload,
): Promise<SiteContactResult> {
  const resolved = getSiteApiConfig();
  if (!resolved.ok) {
    return { ok: false, message: CONTACT_CLIENT_ERROR };
  }

  const { host, key } = resolved.config;
  const url = new URL(CONTACT_PATH, `${host}/`);
  url.searchParams.set("key", key);

  let response: Response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        key,
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });
  } catch (error) {
    console.error("[SISGESC] Contact submit network error:", error);
    return { ok: false, message: CONTACT_CLIENT_ERROR };
  }

  const data = await readJson(response);

  if (response.status === 201) {
    const success = data as SubmitContactSuccess | null;
    return {
      ok: true,
      message: "Your message was sent. We’ll get back to you shortly.",
      contactId: success?.contact?.id ?? 0,
    };
  }

  if (response.status === 403) {
    console.error("[SISGESC] Contact submit unauthorized (HTTP 403). Check SITE_API_KEY.");
    return { ok: false, status: 403, message: CONTACT_CLIENT_ERROR };
  }

  if (response.status === 422) {
    return {
      ok: false,
      status: 422,
      message: firstValidationMessage(data as ValidationErrorBody | null),
    };
  }

  if (response.status >= 500) {
    console.error("[SISGESC] Contact submit server error:", response.status, data);
    return { ok: false, status: response.status, message: CONTACT_CLIENT_ERROR };
  }

  console.error("[SISGESC] Contact submit unexpected response:", response.status, data);
  return { ok: false, status: response.status, message: CONTACT_CLIENT_ERROR };
}

// ── Media ─────────────────────────────────────────────────────────────────

export type SiteMediaAsset = {
  id: number;
  site_media_group_id?: number | null;
  group?: { id: number; name: string; placement?: string | null } | null;
  type: string;
  title: string | null;
  description: string | null;
  media_url: string | null;
  thumbnail_url: string | null;
  provider: string | null;
  placement: string | null;
  button_label: string | null;
  button_url: string | null;
  metadata: Record<string, unknown> | null;
  sort_order: number;
  is_featured: boolean;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
};

export type SiteMediaGroup = {
  id: number;
  name: string;
  description: string | null;
  placement: string | null;
  sort_order: number;
  is_active: boolean;
  media_assets: SiteMediaAsset[];
  created_at?: string;
  updated_at?: string;
};

export type MediaQuery = {
  grouped?: boolean;
  type?: string;
  placement?: string;
  featured?: boolean;
  group_id?: number;
};

export async function fetchSiteMedia(
  query: MediaQuery = {},
): Promise<SiteMediaAsset[]> {
  const result = await siteApiFetch(MEDIA_PATH, {
    query: {
      grouped: query.grouped ? 1 : undefined,
      type: query.type,
      placement: query.placement,
      featured: query.featured ? 1 : undefined,
      group_id: query.group_id,
    },
  });

  if (!result.ok) return [];
  return asArray<SiteMediaAsset>(result.data).filter(
    (asset) => asset.is_active !== false && Boolean(asset.media_url),
  );
}

export async function fetchSiteMediaGrouped(
  query: Omit<MediaQuery, "grouped"> = {},
): Promise<SiteMediaGroup[]> {
  const result = await siteApiFetch(MEDIA_PATH, {
    query: {
      grouped: 1,
      type: query.type,
      placement: query.placement,
      featured: query.featured ? 1 : undefined,
      group_id: query.group_id,
    },
  });

  if (!result.ok) return [];
  return asArray<SiteMediaGroup>(result.data)
    .filter((group) => group.is_active !== false)
    .map((group) => ({
      ...group,
      media_assets: (group.media_assets || []).filter(
        (asset) => asset.is_active !== false && Boolean(asset.media_url),
      ),
    }));
}

// ── ERP price lists ───────────────────────────────────────────────────────

export type PriceListRule = {
  id: number;
  name: string;
  type: string;
  value: number;
  product_id: number | null;
  category_product_id: number | null;
  costumer_group_id: number | null;
  min_quantity: number | null;
  start_date: string | null;
  end_date: string | null;
  apply_to: string | null;
  is_active: boolean;
};

export type PriceList = {
  id: number;
  price_list_group_id: number | null;
  group?: { id: number; name: string } | null;
  name: string;
  currency: string;
  priority: number;
  is_active: boolean;
  rules: PriceListRule[];
  created_at?: string;
  updated_at?: string;
};

export type PriceListGroup = {
  id: number;
  name: string;
  description: string | null;
  sort_order: number;
  is_active: boolean;
  price_lists: PriceList[];
  created_at?: string;
  updated_at?: string;
};

export type PriceQuoteRequest = {
  product_id: number;
  quantity?: number;
  customer_reference?: number;
  customer_session?: string;
};

export type PriceQuoteData = {
  base_price: number;
  final_price: number;
  sale_price: number;
  tax_rate: number;
  sales_tax_rate?: number;
  sales_tax_state?: string;
  applied_rules: unknown[];
  price_source: string;
};

export async function fetchPriceLists(options: {
  grouped?: boolean;
  group_id?: number;
  date?: string;
} = {}): Promise<PriceList[] | PriceListGroup[]> {
  const result = await siteApiFetch(PRICE_LISTS_PATH, {
    query: {
      grouped: options.grouped ? 1 : undefined,
      group_id: options.group_id,
      date: options.date,
    },
  });

  if (!result.ok) return [];

  if (options.grouped) {
    return asArray<PriceListGroup>(result.data).filter((g) => g.is_active !== false);
  }

  return asArray<PriceList>(result.data).filter((list) => list.is_active !== false);
}

export async function quoteProductPrice(
  body: PriceQuoteRequest,
): Promise<{ ok: true; data: PriceQuoteData } | { ok: false; status?: number }> {
  if (!body.product_id || body.product_id < 1) {
    return { ok: false, status: 422 };
  }

  const result = await siteApiFetch(PRICE_QUOTE_PATH, {
    method: "POST",
    body: {
      product_id: body.product_id,
      quantity: body.quantity && body.quantity >= 1 ? body.quantity : 1,
      ...(body.customer_reference
        ? { customer_reference: body.customer_reference }
        : {}),
      ...(body.customer_session
        ? { customer_session: body.customer_session }
        : {}),
    },
  });

  if (!result.ok) return { ok: false, status: result.status };

  const payload = result.data as { data?: PriceQuoteData } | PriceQuoteData | null;
  if (!payload) return { ok: false };

  const data =
    "data" in payload && payload.data
      ? payload.data
      : (payload as PriceQuoteData);

  if (typeof data.sale_price !== "number") return { ok: false };

  return { ok: true, data };
}

// ── Catalog (editorial) price lists ───────────────────────────────────────

export type CatalogPriceListItem = {
  id: number;
  title: string;
  description: string | null;
  price: number | null;
  price_label: string | null;
  badge: string | null;
  sort_order: number;
  is_highlighted: boolean;
  is_active: boolean;
};

export type CatalogPriceListGroup = {
  id: number;
  title: string;
  description: string | null;
  sort_order: number;
  is_active: boolean;
  items: CatalogPriceListItem[];
};

export async function fetchCatalogPriceLists(): Promise<CatalogPriceListGroup[]> {
  const result = await siteApiFetch(CATALOG_PRICE_LISTS_PATH);

  if (!result.ok) return [];

  return asArray<CatalogPriceListGroup>(result.data)
    .filter((group) => group.is_active !== false)
    .map((group) => ({
      ...group,
      items: (group.items || [])
        .filter((item) => item.is_active !== false)
        .sort((a, b) => a.sort_order - b.sort_order),
    }))
    .sort((a, b) => a.sort_order - b.sort_order);
}

export function isSiteApiConfigured() {
  return getSiteApiConfig().ok;
}
