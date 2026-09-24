import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { saveContentFile } from "@/lib/github";
import type { ContentFile } from "@/types/content";

const ALLOWED: ContentFile[] = [
  "site.json",
  "hero.json",
  "services.json",
  "prices.json",
  "projects.json",
  "categories.json",
  "faq.json",
  "locations.json",
  "seo.json",
  "robots.json",
  "appearance.json",
  "brands.json",
];

export async function POST(request: Request) {
  try {
    await requireAdmin();
    const body = (await request.json()) as { file?: string; data?: unknown; message?: string };
    if (!body.file || body.data === undefined) {
      return NextResponse.json({ ok: false, error: "Brak danych" }, { status: 400 });
    }
    if (!ALLOWED.includes(body.file as ContentFile)) {
      return NextResponse.json({ ok: false, error: "Niedozwolony plik" }, { status: 400 });
    }
    const result = await saveContentFile(body.file, body.data, body.message);
    return NextResponse.json({
      ok: true,
      result,
      message:
        "Zmiany zostały zapisane. Nowa wersja strony zostanie wdrożona automatycznie.",
    });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json({ ok: false, error: "Brak autoryzacji" }, { status: 401 });
    }
    console.error(error);
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Błąd zapisu" },
      { status: 500 },
    );
  }
}
