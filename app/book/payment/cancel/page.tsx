import type { Metadata } from "next";
import Link from "next/link";
import { clearPendingAppointmentId } from "@/lib/actions";

export const metadata: Metadata = {
  title: "Payment canceled",
  description: "MyStyle appointment deposit was canceled.",
};

export const dynamic = "force-dynamic";

export default async function PaymentCancelPage() {
  await clearPendingAppointmentId();

  return (
    <div className="pt-24">
      <section className="section-pad">
        <div className="container-page max-w-xl text-center">
          <p className="eyebrow">Payment</p>
          <h1 className="font-display mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Deposit canceled
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            No deposit was charged. Your appointment request may still be on
            file — contact us or try booking again when you’re ready.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/book" className="btn btn-primary">
              Return to booking
            </Link>
            <Link href="/contact" className="btn btn-secondary">
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
