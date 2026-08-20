import type { Metadata } from "next";
import Link from "next/link";
import {
  clearPendingAppointmentId,
  readPendingAppointmentId,
} from "@/lib/actions";
import { confirmSiteAppointmentPayment } from "@/lib/sisgesc";

export const metadata: Metadata = {
  title: "Payment confirmed",
  description: "MyStyle appointment deposit confirmation.",
};

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function firstParam(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value[0] || "";
  return value || "";
}

export default async function PaymentSuccessPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const sessionId = firstParam(params.session_id);
  const appointmentFromQuery = Number(firstParam(params.appointment_id));
  const appointmentFromCookie = await readPendingAppointmentId();
  const appointmentId =
    Number.isFinite(appointmentFromQuery) && appointmentFromQuery > 0
      ? appointmentFromQuery
      : appointmentFromCookie;

  let title = "Payment received";
  let message =
    "Your deposit was received and your appointment is confirmed. We’ll see you soon.";
  let ok = true;

  if (!sessionId || !appointmentId) {
    ok = false;
    title = "Almost there";
    message =
      "We couldn’t verify the payment details automatically. If you completed checkout, your appointment is still saved — contact us if you need help.";
  } else {
    const result = await confirmSiteAppointmentPayment({
      appointment_id: appointmentId,
      session_id: sessionId,
    });

    if (!result.ok) {
      ok = false;
      title = "Confirmation pending";
      message =
        "Your payment may still be processing. Your booking was created — contact us if you don’t receive a confirmation soon.";
    } else {
      message = `Deposit confirmed for appointment #${result.appointment.id}. You’re all set.`;
    }
  }

  await clearPendingAppointmentId();

  return (
    <div className="pt-24">
      <section className="section-pad">
        <div className="container-page max-w-xl text-center">
          <p className="eyebrow">{ok ? "Success" : "Notice"}</p>
          <h1 className="font-display mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">{message}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/" className="btn btn-primary">
              Back home
            </Link>
            <Link href="/book" className="btn btn-secondary">
              Book another
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
