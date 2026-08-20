const CONTACT_PATH = "/api/site/contacts/submit";
const PHONE_MAX_LENGTH = 20;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

function getSiteApiConfig() {
  const host = process.env.SITE_API_HOST?.trim().replace(/\/+$/, "");
  const key = process.env.SITE_API_KEY?.trim();

  if (!host || !key) {
    console.error("[SISGESC] Missing SITE_API_HOST or SITE_API_KEY.");
    return {
      ok: false as const,
      message:
        process.env.NODE_ENV === "production"
          ? "Could not send your message. Please try again."
          : "Contact service is not configured. Set SITE_API_HOST and SITE_API_KEY in .env.",
    };
  }

  if (!/^https?:\/\//i.test(host)) {
    return {
      ok: false as const,
      message: "SITE_API_HOST must be a full URL, for example https://app.example.com",
    };
  }

  return { ok: true as const, host, key };
}

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

async function readJson(response: Response) {
  const text = await response.text();
  if (!text) return null;

  try {
    return JSON.parse(text) as unknown;
  } catch {
    return null;
  }
}

export async function submitSiteContact(
  payload: SiteContactPayload,
): Promise<SiteContactResult> {
  const config = getSiteApiConfig();
  if (!config.ok) {
    return { ok: false, message: config.message };
  }

  const url = new URL(CONTACT_PATH, `${config.host}/`);
  url.searchParams.set("key", config.key);

  let response: Response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        key: config.key,
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });
  } catch {
    return {
      ok: false,
      message: "Could not reach the contact service. Please try again.",
    };
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
    return {
      ok: false,
      status: 403,
      message:
        process.env.NODE_ENV === "production"
          ? "Could not send your message. Please try again."
          : "Unauthorized. Check SITE_API_KEY in .env.",
    };
  }

  if (response.status === 422) {
    return {
      ok: false,
      status: 422,
      message: firstValidationMessage(data as ValidationErrorBody | null),
    };
  }

  if (response.status >= 500) {
    const serverMessage =
      data &&
      typeof data === "object" &&
      "message" in data &&
      typeof data.message === "string"
        ? data.message
        : "Could not process your message. Please try again.";

    return {
      ok: false,
      status: response.status,
      message: serverMessage,
    };
  }

  return {
    ok: false,
    status: response.status,
    message: "Could not send your message. Please try again.",
  };
}
