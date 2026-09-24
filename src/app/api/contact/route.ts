import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/validation";

async function verifyTurnstile(token?: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // allow in local/dev without Turnstile
  if (!token) return false;
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      secret,
      response: token,
    }),
  });
  const data = (await res.json()) as { success?: boolean };
  return Boolean(data.success);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: parsed.error.issues[0]?.message || "Nieprawidłowe dane" },
        { status: 400 },
      );
    }

    const data = parsed.data;
    const turnstileOk = await verifyTurnstile(data.turnstileToken);
    if (!turnstileOk) {
      return NextResponse.json(
        { ok: false, error: "Weryfikacja antyspamowa nie powiodła się." },
        { status: 400 },
      );
    }

    const to = process.env.CONTACT_EMAIL;
    const apiKey = process.env.RESEND_API_KEY;
    if (!to || !apiKey) {
      console.info("[contact] missing RESEND/CONTACT_EMAIL — logging only", data);
      return NextResponse.json({
        ok: true,
        warning: "E-mail nie skonfigurowany — zgłoszenie przyjęte lokalnie.",
      });
    }

    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: process.env.RESEND_FROM || "Serwis GSM <onboarding@resend.dev>",
      to,
      subject: `Zgłoszenie: ${data.brand} ${data.model} — ${data.problemType}`,
      replyTo: data.email || undefined,
      text: [
        `Imię: ${data.name}`,
        `Telefon: ${data.phone}`,
        `E-mail: ${data.email || "—"}`,
        `Marka: ${data.brand}`,
        `Model: ${data.model}`,
        `Problem: ${data.problemType}`,
        "",
        data.description,
      ].join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { ok: false, error: "Nie udało się wysłać zgłoszenia." },
      { status: 500 },
    );
  }
}
