# Serwis GSM Kórnik

Nowoczesna strona lokalnego serwisu telefonów — **bez bazy danych**.

- Treści: `src/content/*.json` (+ zapis przez GitHub API)
- Zdjęcia: Cloudinary
- Formularz: Resend
- Admin: jedno konto (env) → `/admin`

## Uruchomienie

```bash
cp .env.example .env.local
npm install
npm run dev
```

- Strona: http://localhost:3000  
- Admin: http://localhost:3000/admin/login  
- Domyślne (dev): `admin@serwis-gsm-kornik.pl` / `Admin123!`

## Build

```bash
npm run lint
npm run build
```

## Architektura

| Element | Rozwiązanie |
|---|---|
| Treść | JSON w repo / GitHub Contents API |
| Zdjęcia | Cloudinary |
| Formularz | Resend (bez zapisu do DB) |
| Auth | Cookie JWT + bcrypt hash w env |
| SEO | `seo.json`, `robots.ts`, `sitemap.ts`, Schema.org |

**Nie używamy:** Prisma, Drizzle, PostgreSQL, MySQL, MongoDB, SQLite, Firebase DB, Supabase DB.
