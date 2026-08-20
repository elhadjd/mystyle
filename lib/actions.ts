"use server";

import { headers } from "next/headers";
import { submitSiteContact, validateContactInput } from "@/lib/sisgesc";

export type BookingState = {
  ok: boolean;
  message: string;
};

export type ContactFormValues = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

export type ContactState = {
  ok: boolean;
  message: string;
  values: ContactFormValues;
};

const emptyContactValues: ContactFormValues = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

function readContactValues(formData: FormData): ContactFormValues {
  return {
    name: String(formData.get("name") || "").trim(),
    email: String(formData.get("email") || "").trim(),
    phone: String(formData.get("phone") || "").trim(),
    subject: String(formData.get("subject") || "").trim(),
    message: String(formData.get("message") || "").trim(),
  };
}

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
  const values = readContactValues(formData);

  const validated = validateContactInput({
    ...values,
    page_url: (await contactPageUrl()) || undefined,
  });

  if (!validated.ok) {
    return { ok: false, message: validated.message, values };
  }

  const result = await submitSiteContact(validated.payload);

  if (!result.ok) {
    return { ok: false, message: result.message, values };
  }

  return {
    ok: true,
    message: `Thanks, ${validated.payload.name}. ${result.message}`,
    values: emptyContactValues,
  };
}
