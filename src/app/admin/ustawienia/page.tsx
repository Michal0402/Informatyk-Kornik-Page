export default function SettingsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Ustawienia</h1>
      <p className="text-sm text-[var(--text-secondary)]">
        Konto administratora, Resend, Cloudinary i GitHub konfigurujesz przez zmienne
        środowiskowe na serwerze (Vercel / hosting). Panel nie przechowuje sekretów w JSON.
      </p>
      <ul className="card list-disc space-y-2 p-5 pl-8 text-sm text-[var(--text-secondary)]">
        <li>ADMIN_EMAIL / ADMIN_PASSWORD_HASH / AUTH_SECRET</li>
        <li>GITHUB_TOKEN / GITHUB_OWNER / GITHUB_REPO / GITHUB_BRANCH</li>
        <li>CLOUDINARY_CLOUD_NAME / API_KEY / API_SECRET</li>
        <li>RESEND_API_KEY / CONTACT_EMAIL / RESEND_FROM</li>
        <li>TURNSTILE_SECRET_KEY / NEXT_PUBLIC_TURNSTILE_SITE_KEY</li>
      </ul>
    </div>
  );
}
