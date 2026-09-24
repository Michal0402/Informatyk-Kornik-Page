import { NextResponse } from "next/server";
import { createSession, destroySession, verifyCredentials } from "@/lib/auth";
import { loginSchema } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: "Nieprawidłowe dane" }, { status: 400 });
    }
    const ok = await verifyCredentials(parsed.data.email, parsed.data.password);
    if (!ok) {
      return NextResponse.json({ ok: false, error: "Błędny e-mail lub hasło" }, { status: 401 });
    }
    await createSession(parsed.data.email);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ ok: false, error: "Błąd logowania" }, { status: 500 });
  }
}

export async function DELETE() {
  await destroySession();
  return NextResponse.json({ ok: true });
}
