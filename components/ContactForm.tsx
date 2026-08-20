"use client";

import { useActionState, useState } from "react";
import { submitContact, type ContactFormValues, type ContactState } from "@/lib/actions";

const emptyValues: ContactFormValues = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

const initialState: ContactState = {
  ok: false,
  message: "",
  values: emptyValues,
};

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, initialState);
  const [values, setValues] = useState<ContactFormValues>(initialState.values);
  const [prevState, setPrevState] = useState(state);

  if (state !== prevState) {
    setPrevState(state);
    setValues(state.values);
  }

  function updateField(field: keyof ContactFormValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <form action={formAction} className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="field-label" htmlFor="contact-name">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            required
            className="field"
            autoComplete="name"
            maxLength={120}
            value={values.name}
            onChange={(e) => updateField("name", e.target.value)}
          />
        </div>
        <div>
          <label className="field-label" htmlFor="contact-email">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            className="field"
            autoComplete="email"
            maxLength={190}
            value={values.email}
            onChange={(e) => updateField("email", e.target.value)}
          />
        </div>
      </div>
      <div>
        <label className="field-label" htmlFor="contact-phone">
          Phone
        </label>
        <input
          id="contact-phone"
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
      <div>
        <label className="field-label" htmlFor="contact-subject">
          Subject
        </label>
        <input
          id="contact-subject"
          name="subject"
          className="field"
          maxLength={190}
          value={values.subject}
          onChange={(e) => updateField("subject", e.target.value)}
        />
      </div>
      <div>
        <label className="field-label" htmlFor="contact-message">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          className="field"
          maxLength={5000}
          value={values.message}
          onChange={(e) => updateField("message", e.target.value)}
        />
      </div>
      {state.message ? (
        <p className={`text-sm ${state.ok ? "text-sage" : "text-copper"}`} role="status">
          {state.message}
        </p>
      ) : null}
      <button type="submit" className="btn btn-primary" disabled={pending}>
        {pending ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
