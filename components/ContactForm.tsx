"use client";

import { useActionState } from "react";
import { submitContact, type ContactState } from "@/lib/actions";

const initialState: ContactState = { ok: false, message: "" };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, initialState);

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
        />
      </div>
      <div>
        <label className="field-label" htmlFor="contact-subject">
          Subject
        </label>
        <input id="contact-subject" name="subject" className="field" maxLength={190} />
      </div>
      <div>
        <label className="field-label" htmlFor="contact-message">
          Message
        </label>
        <textarea id="contact-message" name="message" className="field" maxLength={5000} />
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
