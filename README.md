# Informatyk Kórnik

Profesjonalna, statyczna strona WWW dla serwisu komputerowego **Informatyk Kórnik** — ciemny motyw premium, HTML5 / CSS3 / Vanilla JS, gotowa pod Nginx.

**Podgląd lokalny:** `python -m http.server 8765` → [http://127.0.0.1:8765](http://127.0.0.1:8765)

---

## Podgląd sekcji

### Navbar (sticky)

![Sticky navbar](screenshots/00-navbar.webp)

### Hero

![Sekcja Hero](screenshots/01-hero.webp)

### Widok mobilny (Hero)

![Hero na mobile](screenshots/10-mobile-hero.webp)

### Liczniki

![Animowane liczniki](screenshots/02-stats.webp)

### Nasze usługi

![Karty usług](screenshots/03-uslugi.webp)

### Dlaczego warto

![Zalety współpracy](screenshots/04-dlaczego.webp)

### Realizacje

![Galeria realizacji — masonry](screenshots/05-realizacje.webp)

### Opinie

![Slider opinii klientów](screenshots/06-opinie.webp)

### FAQ

![Accordion FAQ](screenshots/07-faq.webp)

### Kontakt

![Sekcja kontakt — telefon, formularz, mapa](screenshots/08-kontakt.webp)

### Stopka

![Stopka strony](screenshots/09-stopka.webp)

### Cała strona

![Pełny podgląd strony](screenshots/00-fullpage.webp)

---

## Stack

- HTML5, CSS3, JavaScript (Vanilla)
- Mobile First, responsywna
- Bez WordPressa, Bootstrapa i frameworków
- Lokalne fonty (Outfit, Sora) + obrazy WebP
- SEO: meta, Open Graph, Twitter Cards, Schema.org, `robots.txt`, `sitemap.xml`

## Struktura

```
├── index.html
├── style.css / style.src.css
├── script.js / script.src.js
├── polityka-prywatnosci.html
├── robots.txt
├── sitemap.xml
├── site.webmanifest
├── favicon.svg / favicon.png
├── nginx.conf.example
├── fonts/
├── icons/
├── images/
└── screenshots/
```

## Uruchomienie lokalne

```bash
cd "Informatyk kornik Page"
python -m http.server 8765
```

Otwórz: http://127.0.0.1:8765/

## Wdrożenie (Nginx)

1. Skopiuj pliki na serwer (np. `/var/www/informatykkornik`).
2. Skorzystaj z `nginx.conf.example` (dostosuj `server_name` i certyfikaty SSL).
3. Przed publikacją podmień:
   - domenę w meta / canonical / sitemap
   - e-mail i link Facebook

## Kontakt firmy

- **Telefon:** 788 369 543  
- **Obszar:** Kórnik, Bnin, Kamionki, Borówiec, Środa Wielkopolska, Mosina, Zaniemyśl, Poznań
