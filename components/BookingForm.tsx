"use client";

import { useActionState } from "react";
import { services, stylists } from "@/lib/data";
import { submitBooking, type BookingState } from "@/lib/actions";

const initialState: BookingState = { ok: false, message: "" };

function getMinDate() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().slice(0, 10);
}

export function BookingForm() {
  const [state, formAction, pending] = useActionState(submitBooking, initialState);
  const minDate = getMinDate();

  return (
    <form action={formAction} className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="field-label" htmlFor="name">
            Full name
          </label>
          <input
            id="name"
            name="name"
            required
            className="field"
            placeholder="Your name"
            autoComplete="name"
          />
        </div>
        <div>
          <label className="field-label" htmlFor="phone">
            Phone / Text
          </label>
          <input
            id="phone"
            name="phone"
            required
            className="field"
            placeholder="(404) 555-0123"
            autoComplete="tel"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="field-label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="field"
            placeholder="you@email.com"
            autoComplete="email"
          />
        </div>
        <div>
          <label className="field-label" htmlFor="service">
            Service
          </label>
          <select id="service" name="service" required className="field" defaultValue="">
            <option value="" disabled>
              Select
            </option>
            {services.map((s) => (
              <option key={s.id} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <label className="field-label" htmlFor="stylist">
            Stylist
          </label>
          <select id="stylist" name="stylist" className="field" defaultValue="any">
            <option value="any">No preference</option>
            {stylists.map((s) => (
              <option key={s.id} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="field-label" htmlFor="date">
            Date
          </label>
          <input
            id="date"
            name="date"
            type="date"
            required
            min={minDate}
            className="field"
          />
        </div>
        <div>
          <label className="field-label" htmlFor="time">
            Time
          </label>
          <select id="time" name="time" required className="field" defaultValue="">
            <option value="" disabled>
              Select
            </option>
            {[
              "9:00 AM",
              "10:00 AM",
              "11:00 AM",
              "1:00 PM",
              "2:00 PM",
              "3:00 PM",
              "4:00 PM",
              "5:00 PM",
            ].map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="field-label" htmlFor="notes">
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          className="field"
          placeholder="Desired length, hair color, style reference..."
        />
      </div>

      {state.message ? (
        <p
          className={`text-sm ${state.ok ? "text-sage" : "text-copper"}`}
          role="status"
          aria-live="polite"
        >
          {state.message}
        </p>
      ) : null}

      <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={pending}>
        {pending ? "Sending..." : "Submit booking request"}
      </button>
    </form>
  );
}
