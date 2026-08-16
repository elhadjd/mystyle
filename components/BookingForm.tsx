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
            Nome completo
          </label>
          <input
            id="name"
            name="name"
            required
            className="field"
            placeholder="Seu nome"
            autoComplete="name"
          />
        </div>
        <div>
          <label className="field-label" htmlFor="phone">
            WhatsApp
          </label>
          <input
            id="phone"
            name="phone"
            required
            className="field"
            placeholder="(11) 99999-9999"
            autoComplete="tel"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="field-label" htmlFor="email">
            E-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="field"
            placeholder="voce@email.com"
            autoComplete="email"
          />
        </div>
        <div>
          <label className="field-label" htmlFor="service">
            Serviço
          </label>
          <select id="service" name="service" required className="field" defaultValue="">
            <option value="" disabled>
              Selecione
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
            Profissional
          </label>
          <select id="stylist" name="stylist" className="field" defaultValue="qualquer">
            <option value="qualquer">Sem preferência</option>
            {stylists.map((s) => (
              <option key={s.id} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="field-label" htmlFor="date">
            Data
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
            Horário
          </label>
          <select id="time" name="time" required className="field" defaultValue="">
            <option value="" disabled>
              Selecione
            </option>
            {["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"].map(
              (t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ),
            )}
          </select>
        </div>
      </div>

      <div>
        <label className="field-label" htmlFor="notes">
          Observações
        </label>
        <textarea
          id="notes"
          name="notes"
          className="field"
          placeholder="Comprimento desejado, cor do cabelo, referência de estilo..."
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
        {pending ? "Enviando..." : "Confirmar pedido de agendamento"}
      </button>
    </form>
  );
}
