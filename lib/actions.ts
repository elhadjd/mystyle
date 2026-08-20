"use server";

import { headers } from "next/headers";
import { submitSiteContact, validateContactInput } from "@/lib/sisgesc";

export type BookingState = {
  ok: boolean;
  message: string;
};

export type ContactState = {
  ok: boolean;
  message: string;
};

export async function submitBooking(
  _prev: BookingState,
  formData: FormData,
): Promise<BookingState> {
  const name = String(formData.get("name") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const service = String(formData.get("service") || "").trim();
  const date = String(formData.get("date") || "").trim();
  const time = String(formData.get("time") || "").trim();

  if (!name || !phone || !email || !service || !date || !time) {
    return {
      ok: false,
      message: "Please fill in all required fields to continue.",
    };
  }

  await new Promise((resolve) => setTimeout(resolve, 600));

  return {
    ok: true,
    message: `Thanks, ${name}! We received your request for ${service} on ${date} at ${time}. We’ll confirm by text shortly.`,
  };
}

async function contactPageUrl() {
  const headerList = await headers();
  const host = headerList.get("x-forwarded-host") || headerList.get("host");
  const proto = headerList.get("x-forwarded-proto") || "https";
  if (!host) return undefined;
  return `${proto}://${host}/contact`;
}

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const validated = validateContactInput({
    name: String(formData.get("name") || ""),
    email: String(formData.get("email") || ""),
    phone: String(formData.get("phone") || ""),
    subject: String(formData.get("subject") || ""),
    message: String(formData.get("message") || ""),
    page_url: (await contactPageUrl()) || undefined,
  });

  if (!validated.ok) {
    return { ok: false, message: validated.message };
  }

  const result = await submitSiteContact(validated.payload);

  if (!result.ok) {
    return { ok: false, message: result.message };
  }

  return {
    ok: true,
    message: `Thanks, ${validated.payload.name}. ${result.message}`,
  };
}
