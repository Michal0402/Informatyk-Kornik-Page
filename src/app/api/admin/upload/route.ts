import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { uploadImage } from "@/lib/cloudinary";

export async function POST(request: Request) {
  try {
    await requireAdmin();
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ ok: false, error: "Brak pliku" }, { status: 400 });
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    const uploaded = await uploadImage(buffer);
    return NextResponse.json({
      ok: true,
      url: uploaded.url,
      publicId: uploaded.publicId,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json({ ok: false, error: "Brak autoryzacji" }, { status: 401 });
    }
    console.error(error);
    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : "Upload nieudany. Sprawdź konfigurację Cloudinary.",
      },
      { status: 500 },
    );
  }
}
