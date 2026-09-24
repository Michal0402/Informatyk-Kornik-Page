(() => {
  "use strict";

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  /* Loader */
  const loader = $("#loader");
  const hideLoader = () => {
    if (!loader) return;
    loader.classList.add("is-done");
    setTimeout(() => loader.remove(), 500);
  };
  if (document.readyState === "complete") hideLoader();
  else window.addEventListener("load", hideLoader);
  setTimeout(hideLoader, 2200);

  /* Year */
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* Header scroll */
  const header = $("#header");
  const onScrollHeader = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };
  onScrollHeader();
  window.addEventListener("scroll", onScrollHeader, { passive: true });

  /* Mobile nav */
  const toggle = $("#nav-toggle");
  const nav = $("#nav");
  const closeNav = () => {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
  };
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("is-open", !open);
    });
    $$("a", nav).forEach((a) => a.addEventListener("click", closeNav));
  }

  /* Active nav link */
  const sections = $$("main section[id]");
  const navLinks = $$(".nav__list a");
  const setActiveNav = () => {
    const y = window.scrollY + 100;
    let current = "";
    sections.forEach((sec) => {
      if (sec.offsetTop <= y) current = sec.id;
    });
    navLinks.forEach((link) => {
      const href = link.getAttribute("href") || "";
      link.classList.toggle("is-active", href === `#${current}`);
    });
  };
  window.addEventListener("scroll", setActiveNav, { passive: true });

  /* Smooth scroll for same-page anchors (extra polish) */
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute("href");
    if (!id || id === "#") return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    history.pushState(null, "", id);
  });

  /* Reveal on scroll */
  const revealEls = $$(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el, i) => {
      el.style.transitionDelay = `${Math.min(i % 6, 5) * 60}ms`;
      io.observe(el);
    });
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* Animated counters */
  const counters = $$("[data-counter]");
  const animateCounter = (el) => {
    const target = Number(el.getAttribute("data-counter")) || 0;
    const suffix = el.getAttribute("data-suffix") || "";
    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if (counters.length && "IntersectionObserver" in window) {
    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animateCounter(entry.target);
          cio.unobserve(entry.target);
        });
      },
      { threshold: 0.4 }
    );
    counters.forEach((c) => cio.observe(c));
  } else {
    counters.forEach(animateCounter);
  }

  /* Parallax hero */
  const parallax = $("[data-parallax]");
  if (parallax && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    let ticking = false;
    window.addEventListener(
      "scroll",
      () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          const y = window.scrollY;
          if (y < window.innerHeight) {
            parallax.style.transform = `translate3d(0, ${y * 0.12}px, 0)`;
          }
          ticking = false;
        });
      },
      { passive: true }
    );
  }

  /* Reviews slider */
  const track = $("#reviews-track");
  const dotsWrap = $("#reviews-dots");
  const sliderRoot = $("[data-slider]");
  if (track && sliderRoot) {
    const slides = $$(".review", track);
    let index = 0;
    let perView = 1;

    const calcPerView = () => {
      if (window.innerWidth >= 1100) return 3;
      if (window.innerWidth >= 768) return 2;
      return 1;
    };

    const maxIndex = () => Math.max(0, slides.length - perView);

    const renderDots = () => {
      if (!dotsWrap) return;
      dotsWrap.innerHTML = "";
      const count = maxIndex() + 1;
      for (let i = 0; i < count; i++) {
        const b = document.createElement("button");
        b.type = "button";
        b.setAttribute("aria-label", `Slajd ${i + 1}`);
        b.classList.toggle("is-active", i === index);
        b.addEventListener("click", () => goTo(i));
        dotsWrap.appendChild(b);
      }
    };

    const goTo = (i) => {
      index = Math.max(0, Math.min(i, maxIndex()));
      const slide = slides[0];
      if (!slide) return;
      const gap = 16;
      const w = slide.getBoundingClientRect().width + gap;
      track.scrollTo({ left: w * index, behavior: "smooth" });
      renderDots();
    };

    const prev = $("[data-prev]", sliderRoot);
    const next = $("[data-next]", sliderRoot);
    if (prev) prev.addEventListener("click", () => goTo(index - 1));
    if (next) next.addEventListener("click", () => goTo(index + 1));

    const onResize = () => {
      perView = calcPerView();
      if (index > maxIndex()) index = maxIndex();
      goTo(index);
    };
    perView = calcPerView();
    renderDots();
    window.addEventListener("resize", onResize, { passive: true });

    let auto = setInterval(() => goTo(index >= maxIndex() ? 0 : index + 1), 5500);
    sliderRoot.addEventListener("pointerenter", () => clearInterval(auto));
    sliderRoot.addEventListener("pointerleave", () => {
      auto = setInterval(() => goTo(index >= maxIndex() ? 0 : index + 1), 5500);
    });
  }

  /* FAQ: only one open */
  $$(".faq__item").forEach((item) => {
    item.addEventListener("toggle", () => {
      if (!item.open) return;
      $$(".faq__item").forEach((other) => {
        if (other !== item) other.open = false;
      });
    });
  });

  /* Lightbox */
  const lightbox = $("#lightbox");
  const lbImg = $("#lightbox-img");
  const lbCap = $("#lightbox-cap");
  const openLightbox = (src, cap, alt) => {
    if (!lightbox || !lbImg) return;
    lbImg.src = src;
    lbImg.alt = alt || cap || "";
    if (lbCap) lbCap.textContent = cap || "";
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
  };
  const closeLightbox = () => {
    if (!lightbox || !lbImg) return;
    lightbox.hidden = true;
    lbImg.removeAttribute("src");
    document.body.style.overflow = "";
  };
  $$("[data-lightbox]").forEach((btn) => {
    btn.addEventListener("click", () => {
      openLightbox(
        btn.getAttribute("data-lightbox"),
        btn.getAttribute("data-caption"),
        btn.querySelector("img")?.alt
      );
    });
  });
  if (lightbox) {
    $(".lightbox__close", lightbox)?.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeLightbox();
    });
  }

  /* Map facade — load Google Maps on demand (performance) */
  const mapBox = $("#map");
  const mapBtn = $("#map-load");
  if (mapBox && mapBtn) {
    mapBtn.addEventListener("click", () => {
      const iframe = document.createElement("iframe");
      iframe.title = "Mapa — Informatyk Kórnik";
      iframe.loading = "lazy";
      iframe.referrerPolicy = "no-referrer-when-downgrade";
      iframe.allowFullscreen = true;
      iframe.src =
        "https://maps.google.com/maps?q=K%C3%B3rnik&t=&z=12&ie=UTF8&iwloc=&output=embed";
      mapBox.innerHTML = "";
      mapBox.appendChild(iframe);
    });
  }

  /* Contact form — mailto fallback (no backend) */
  const form = $("#contact-form");
  const note = $("#form-note");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = $("#name");
      const phone = $("#phone");
      const message = $("#message");
      let ok = true;

      [name, phone, message].forEach((field) => {
        if (!field) return;
        const valid = field.checkValidity();
        field.classList.toggle("is-invalid", !valid);
        if (!valid) ok = false;
      });

      if (!ok) {
        if (note) note.textContent = "Uzupełnij poprawnie wszystkie pola.";
        return;
      }

      const subject = encodeURIComponent(`Zapytanie od ${name.value.trim()}`);
      const body = encodeURIComponent(
        `Imię: ${name.value.trim()}\nTelefon: ${phone.value.trim()}\n\nOpis problemu:\n${message.value.trim()}`
      );
      if (note) {
        note.textContent = "Otwieram klienta poczty… Możesz też zadzwonić: 788 369 543.";
      }
      window.location.href = `mailto:kontakt@informatykkornik.pl?subject=${subject}&body=${body}`;
      form.reset();
    });
  }
})();
