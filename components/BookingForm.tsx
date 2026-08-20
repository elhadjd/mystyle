"use client";

import { useActionState, useState } from "react";
import { services, stylists } from "@/lib/data";
import { submitBooking, type BookingFormValues, type BookingState } from "@/lib/actions";

const emptyValues: BookingFormValues = {
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

const initialState: BookingState = {
  ok: false,
  message: "",
  values: emptyValues,
};

const TIME_OPTIONS = [
  { label: "9:00 AM", value: "09:00" },
  { label: "10:00 AM", value: "10:00" },
  { label: "11:00 AM", value: "11:00" },
  { label: "1:00 PM", value: "13:00" },
  { label: "2:00 PM", value: "14:00" },
  { label: "3:00 PM", value: "15:00" },
  { label: "4:00 PM", value: "16:00" },
  { label: "5:00 PM", value: "17:00" },
];

function getMinDate() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().slice(0, 10);
}

export function BookingForm() {
  const [state, formAction, pending] = useActionState(submitBooking, initialState);
  const [values, setValues] = useState<BookingFormValues>(initialState.values);
  const [prevState, setPrevState] = useState(state);
  const minDate = getMinDate();

  if (state !== prevState) {
    setPrevState(state);
    setValues(state.values);
  }

  function updateField(field: keyof BookingFormValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <form action={formAction} className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="field-label" htmlFor="first_name">
            First name
          </label>
          <input
            id="first_name"
            name="first_name"
            required
            className="field"
            autoComplete="given-name"
            maxLength={255}
            value={values.first_name}
            onChange={(e) => updateField("first_name", e.target.value)}
          />
        </div>
        <div>
          <label className="field-label" htmlFor="last_name">
            Last name
          </label>
          <input
            id="last_name"
            name="last_name"
            required
            className="field"
            autoComplete="family-name"
            maxLength={255}
            value={values.last_name}
            onChange={(e) => updateField("last_name", e.target.value)}
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
            autoComplete="email"
            maxLength={255}
            value={values.email}
            onChange={(e) => updateField("email", e.target.value)}
          />
        </div>
        <div>
          <label className="field-label" htmlFor="phone">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            className="field"
            autoComplete="tel"
            maxLength={20}
            placeholder="(404) 555-0123"
            value={values.phone}
            onChange={(e) => updateField("phone", e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="field-label" htmlFor="service">
            Service
          </label>
          <select
            id="service"
            name="service"
            required
            className="field"
            value={values.service}
            onChange={(e) => updateField("service", e.target.value)}
          >
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
        <div>
          <label className="field-label" htmlFor="stylist">
            Stylist
          </label>
          <select
            id="stylist"
            name="stylist"
            className="field"
            value={values.stylist}
            onChange={(e) => updateField("stylist", e.target.value)}
          >
            <option value="any">No preference</option>
            {stylists.map((s) => (
              <option key={s.id} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
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
            value={values.date}
            onChange={(e) => updateField("date", e.target.value)}
          />
        </div>
        <div>
          <label className="field-label" htmlFor="time">
            Time
          </label>
          <select
            id="time"
            name="time"
            required
            className="field"
            value={values.time}
            onChange={(e) => updateField("time", e.target.value)}
          >
            <option value="" disabled>
              Select
            </option>
            {TIME_OPTIONS.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
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
          maxLength={2000}
          placeholder="Desired length, hair color, style reference..."
          value={values.notes}
          onChange={(e) => updateField("notes", e.target.value)}
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
        {pending ? "Booking..." : "Book appointment"}
      </button>
    </form>
  );
}
