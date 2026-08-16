"use server";

export type BookingState = {
  ok: boolean;
  message: string;
};

export type ContactState = {
  ok: boolean;
  message: string;
};

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
      message: "Preencha todos os campos obrigatórios para continuar.",
    };
  }

  // Simulated booking intake — ready to wire to WhatsApp/CRM/API.
  await new Promise((resolve) => setTimeout(resolve, 600));

  return {
    ok: true,
    message: `Obrigada, ${name}! Recebemos seu pedido para ${service} em ${date} às ${time}. Em breve confirmamos pelo WhatsApp.`,
  };
}

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const subject = String(formData.get("subject") || "").trim();
  const message = String(formData.get("message") || "").trim();

  if (!name || !email || !subject || !message) {
    return { ok: false, message: "Preencha todos os campos para enviar." };
  }

  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    ok: true,
    message: `Mensagem recebida, ${name}. Retornamos em até 1 dia útil.`,
  };
}
