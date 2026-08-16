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
            Nome
          </label>
          <input id="contact-name" name="name" required className="field" autoComplete="name" />
        </div>
        <div>
          <label className="field-label" htmlFor="contact-email">
            E-mail
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            className="field"
            autoComplete="email"
          />
        </div>
      </div>
      <div>
        <label className="field-label" htmlFor="contact-subject">
          Assunto
        </label>
        <input id="contact-subject" name="subject" required className="field" />
      </div>
      <div>
        <label className="field-label" htmlFor="contact-message">
          Mensagem
        </label>
        <textarea id="contact-message" name="message" required className="field" />
      </div>
      {state.message ? (
        <p className={`text-sm ${state.ok ? "text-sage" : "text-copper"}`} role="status">
          {state.message}
        </p>
      ) : null}
      <button type="submit" className="btn btn-primary" disabled={pending}>
        {pending ? "Enviando..." : "Enviar mensagem"}
      </button>
    </form>
  );
}
