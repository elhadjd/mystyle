"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  getAppointmentDepositAmount,
  submitSiteAppointment,
  submitSiteContact,
  validateAppointmentInput,
  validateContactInput,
} from "@/lib/sisgesc";

export type BookingFormValues = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  service: string;
  stylist: string;
  date: string;
  time: string;
  notes: string;
};

export type BookingState = {
  ok: boolean;
  message: string;
  values: BookingFormValues;
  appointmentId?: number;
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

const emptyBookingValues: BookingFormValues = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  service: "",
  stylist: "any",
  date: "",
  time: "",
  notes: "",
};

const emptyContactValues: ContactFormValues = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

const PENDING_APPOINTMENT_COOKIE = "mystyle_pending_appointment_id";

function readBookingValues(formData: FormData): BookingFormValues {
  return {
    first_name: String(formData.get("first_name") || "").trim(),
    last_name: String(formData.get("last_name") || "").trim(),
    email: String(formData.get("email") || "").trim(),
    phone: String(formData.get("phone") || "").trim(),
    service: String(formData.get("service") || "").trim(),
    stylist: String(formData.get("stylist") || "any").trim() || "any",
    date: String(formData.get("date") || "").trim(),
    time: String(formData.get("time") || "").trim(),
    notes: String(formData.get("notes") || "").trim(),
  };
}

function readContactValues(formData: FormData): ContactFormValues {
  return {
    name: String(formData.get("name") || "").trim(),
    email: String(formData.get("email") || "").trim(),
    phone: String(formData.get("phone") || "").trim(),
    subject: String(formData.get("subject") || "").trim(),
    message: String(formData.get("message") || "").trim(),
  };
}

async function absoluteSiteUrl(path: string) {
  const headerList = await headers();
  const host = headerList.get("x-forwarded-host") || headerList.get("host");
  const proto = headerList.get("x-forwarded-proto") || "https";
  if (!host) return undefined;
  return `${proto}://${host}${path.startsWith("/") ? path : `/${path}`}`;
}

export async function submitBooking(
  _prev: BookingState,
  formData: FormData,
): Promise<BookingState> {
  const values = readBookingValues(formData);
  const depositAmount = getAppointmentDepositAmount();
  const successUrl = await absoluteSiteUrl("/book/payment/success");
  const cancelUrl = await absoluteSiteUrl("/book/payment/cancel");

  if (depositAmount && (!successUrl || !cancelUrl)) {
    return {
      ok: false,
      message: "We couldn't complete your booking right now. Please try again in a few minutes.",
      values,
    };
  }

  const validated = validateAppointmentInput({
    ...values,
    amount: depositAmount,
    success_url: depositAmount ? successUrl : undefined,
    cancel_url: depositAmount ? cancelUrl : undefined,
  });

  if (!validated.ok) {
    return { ok: false, message: validated.message, values };
  }

  const result = await submitSiteAppointment(validated.payload);

  if (!result.ok) {
    return { ok: false, message: result.message, values };
  }

  if (result.paymentUrl) {
    const cookieStore = await cookies();
    cookieStore.set(PENDING_APPOINTMENT_COOKIE, String(result.appointment.id), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60,
    });
    redirect(result.paymentUrl);
  }

  return {
    ok: true,
    message: `Thanks, ${validated.payload.first_name}! Your appointment is booked for ${result.appointment.date} at ${result.appointment.time}.`,
    values: emptyBookingValues,
    appointmentId: result.appointment.id,
  };
}

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const values = readContactValues(formData);

  const validated = validateContactInput({
    ...values,
    page_url: (await absoluteSiteUrl("/contact")) || undefined,
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

export async function readPendingAppointmentId() {
  const cookieStore = await cookies();
  const value = cookieStore.get(PENDING_APPOINTMENT_COOKIE)?.value;
  const id = Number(value);
  return Number.isFinite(id) && id > 0 ? id : null;
}

export async function clearPendingAppointmentId() {
  const cookieStore = await cookies();
  cookieStore.delete(PENDING_APPOINTMENT_COOKIE);
}
