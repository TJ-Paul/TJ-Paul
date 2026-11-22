(() => {
  const root = document.documentElement;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const animate = !reduceMotion;

  /* ───────── Year ───────── */
  document.getElementById("year").textContent = new Date().getFullYear();

  /* ───────── Email (assembled at runtime to keep scrapers off it) ───────── */
  const mail = document.getElementById("mail");
  const addr = `${mail.dataset.u}@${mail.dataset.d}`;
  mail.href = `mailto:${addr}`;
  document.getElementById("mailText").textContent = addr;

  /* ───────── Theme ───────── */
  const toggle = document.getElementById("themeToggle");
  const metaTheme = document.querySelector('meta[name="theme-color"]');
  const isLight = () => root.dataset.theme === "light";
  const syncThemeUi = () => {
    toggle.setAttribute("aria-label", isLight() ? "Switch to dark theme" : "Switch to light theme");
    metaTheme.setAttribute("content", isLight() ? "#f6f6f3" : "#070b14");
  };
  syncThemeUi();
  toggle.addEventListener("click", () => {
    root.dataset.theme = isLight() ? "dark" : "light";
    try { localStorage.setItem("theme", root.dataset.theme); } catch (e) { /* storage blocked */ }
    syncThemeUi();
    if (!animate) renderStatic();
  });

  /* ───────── Nav: scrolled state, mobile menu, active link ───────── */
  const nav = document.getElementById("nav");
  const burger = document.getElementById("burger");
  const links = document.getElementById("navLinks");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 30);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const setMenu = (open) => {
    links.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };
  burger.addEventListener("click", () => setMenu(!links.classList.contains("open")));
  links.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && links.classList.contains("open")) { setMenu(false); burger.focus(); }
  });
  document.addEventListener("click", (e) => {
    if (links.classList.contains("open") && !nav.contains(e.target)) setMenu(false);
  });

  const navMap = new Map([...links.querySelectorAll('a[href^="#"]')].map((a) => [a.getAttribute("href").slice(1), a]));
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        navMap.forEach((a) => a.classList.remove("active"));
        const a = navMap.get(e.target.id);
        if (a && !a.classList.contains("nav-cta")) a.classList.add("active");
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  document.querySelectorAll("section[id]").forEach((s) => sectionObserver.observe(s));

  /* ───────── Reveal on scroll ─────────
     The stagger delay is removed once the element is in, so hover/tilt stay instant. */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        el.classList.add("in");
        revealObserver.unobserve(el);
        setTimeout(() => { el.style.transitionDelay = ""; }, 1100);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  document.querySelectorAll(".reveal").forEach((el, i) => {
    if (animate) el.style.transitionDelay = `${(i % 3) * 80}ms`;
    revealObserver.observe(el);
  });

  /* ───────── Coursework tabs ───────── */
  const tabs = [...document.querySelectorAll('[role="tab"]')];
  const selectTab = (tab, focus) => {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
    });
    if (focus) tab.focus();
  };
  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => selectTab(tab));
    tab.addEventListener("keydown", (e) => {
      const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
      if (step) { e.preventDefault(); selectTab(tabs[(i + step + tabs.length) % tabs.length], true); }
      if (e.key === "Home") { e.preventDefault(); selectTab(tabs[0], true); }
      if (e.key === "End") { e.preventDefault(); selectTab(tabs[tabs.length - 1], true); }
    });
  });
  if (tabs.length) selectTab(tabs[0]);

  /* ───────── Aula mock seat grid ───────── */
  const seats = document.getElementById("seats");
  if (seats) {
    const filled = new Set([0,1,2,3,4,5,6,8,9,10,11,12,13,14,15,16,17,19,20,21,22,23,24,25,27,28,29,30,31,32,33,34,36,37,38,39,40,41,43,44,45,46]);
    const queued = new Set([47, 48, 49]);
    seats.innerHTML = Array.from({ length: 50 }, (_, i) =>
      `<i class="${filled.has(i) ? "on" : queued.has(i) ? "q" : ""}"></i>`).join("");
  }

  /* ───────── Typing effect ───────── */
  const roles = [
    "shipping a dining app for my hall",
    "splitting bills with Kotlin & Compose",
    "processing audio for CSE 220",
    "designing schemas in PostgreSQL",
    "solving CTFs with BUET CSC",
  ];
  const typed = document.getElementById("typed");
  if (!animate) {
    typed.textContent = roles[0];
  } else {
    let r = 0, c = 0, deleting = false;
    const tick = () => {
      const word = roles[r];
      c += deleting ? -1 : 1;
      typed.textContent = word.slice(0, c);
      let delay = deleting ? 28 : 55;
      if (!deleting && c === word.length) { deleting = true; delay = 1600; }
      else if (deleting && c === 0) { deleting = false; r = (r + 1) % roles.length; delay = 300; }
      setTimeout(tick, delay);
    };
    setTimeout(tick, 700);
  }

  /* ───────── Cursor glow (transform only: no layout per move) ───────── */
  const glow = document.querySelector(".cursor-glow");
  if (finePointer && animate) {
    window.addEventListener("pointermove", (e) => {
      glow.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    }, { passive: true });
  } else {
    glow.style.display = "none";
  }

  /* ───────── Card tilt + spotlight ───────── */
  if (finePointer && animate) {
    document.querySelectorAll("[data-tilt]").forEach((card) => {
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        card.style.setProperty("--mx", `${x * 100}%`);
        card.style.setProperty("--my", `${y * 100}%`);
        card.style.transform = `perspective(1000px) rotateX(${(0.5 - y) * 3}deg) rotateY(${(x - 0.5) * 3}deg)`;
      });
      card.addEventListener("pointerleave", () => { card.style.transform = ""; });
    });
  }

  /* ───────── Palettes per theme ───────── */
  const palette = () => isLight()
    ? { waves: ["14,116,144", "109,40,217", "190,24,93", "180,83,9"], axis: "rgba(15,23,42,0.08)", sum: "rgba(17,24,39,0.22)", wave: "rgba(180,83,9,0.8)", bars: ["#0e7490", "#6d28d9", "#be185d"] }
    : { waves: ["34,211,238", "167,139,250", "244,114,182", "251,191,36"], axis: "rgba(148,170,220,0.07)", sum: "rgba(231,236,247,0.18)", wave: "rgba(251,191,36,0.7)", bars: ["#22d3ee", "#a78bfa", "#f472b6"] };

  /* ───────── Hero oscilloscope ───────── */
  const scope = document.getElementById("scope");
  const ctx = scope.getContext("2d");
  let W = 0, H = 0, dpr = 1;
  const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = scope.clientWidth; H = scope.clientHeight;
    scope.width = W * dpr; scope.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  window.addEventListener("pointermove", (e) => {
    mouse.tx = e.clientX / window.innerWidth;
    mouse.ty = e.clientY / window.innerHeight;
  }, { passive: true });

  const waves = [
    { amp: 0.09, freq: 1.6, speed: 0.9, phase: 0, width: 2 },
    { amp: 0.07, freq: 2.4, speed: -0.6, phase: 1.3, width: 1.6 },
    { amp: 0.05, freq: 3.4, speed: 1.3, phase: 2.1, width: 1.2 },
    { amp: 0.035, freq: 5.2, speed: -1.7, phase: 0.4, width: 1 },
  ];
  let heroVisible = true;
  new IntersectionObserver(([e]) => { heroVisible = e.isIntersecting; }).observe(scope);

  const drawScope = (t) => {
    const pal = palette();
    ctx.clearRect(0, 0, W, H);
    const mid = H * 0.62;
    ctx.strokeStyle = pal.axis;
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, mid); ctx.lineTo(W, mid); ctx.stroke();

    const k = 0.5 + mouse.y;
    const f = 0.6 + mouse.x * 0.9;
    const step = W > 1400 ? 4 : 3;
    waves.forEach((w, wi) => {
      ctx.beginPath();
      for (let x = 0; x <= W; x += step) {
        const u = x / W;
        const env = Math.sin(Math.PI * u);
        const y = mid + Math.sin(u * Math.PI * 2 * w.freq * f + t * w.speed + w.phase) * H * w.amp * k * env
                      + Math.sin(u * 23 + t * 2.1 + w.phase) * H * 0.006 * env;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      // cheap glow: one wide faint stroke under the line instead of shadowBlur
      ctx.strokeStyle = `rgba(${pal.waves[wi]},0.12)`;
      ctx.lineWidth = w.width * 6;
      ctx.stroke();
      ctx.strokeStyle = `rgba(${pal.waves[wi]},0.6)`;
      ctx.lineWidth = w.width;
      ctx.stroke();
    });

    ctx.beginPath();
    for (let x = 0; x <= W; x += step) {
      const u = x / W;
      const env = Math.sin(Math.PI * u);
      let s = 0;
      waves.forEach((w) => { s += Math.sin(u * Math.PI * 2 * w.freq * f + t * w.speed + w.phase) * w.amp; });
      const y = mid + s * H * 0.55 * k * env;
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.strokeStyle = pal.sum;
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 6]);
    ctx.stroke();
    ctx.setLineDash([]);
  };

  /* ───────── Spectrum bars on Audio Craft card ───────── */
  const spec = document.querySelector(".mini-spectrum");
  const sctx = spec.getContext("2d");
  let SW = 0, SH = 0;
  const sresize = () => {
    SW = spec.clientWidth; SH = spec.clientHeight;
    spec.width = SW * dpr; spec.height = SH * dpr;
    sctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  let specVisible = false;
  new IntersectionObserver(([e]) => { specVisible = e.isIntersecting; }).observe(spec);
  const BARS = 64;
  const level = new Array(BARS).fill(0);

  // `instant` jumps straight to the target (used for the single static frame)
  const drawSpectrum = (t, instant = false) => {
    const pal = palette();
    sctx.clearRect(0, 0, SW, SH);
    const gap = 3;
    const bw = (SW - gap * (BARS + 1)) / BARS;
    const base = SH * 0.86;
    const grad = sctx.createLinearGradient(0, base, 0, SH * 0.15);
    grad.addColorStop(0, pal.bars[0]);
    grad.addColorStop(0.55, pal.bars[1]);
    grad.addColorStop(1, pal.bars[2]);
    for (let i = 0; i < BARS; i++) {
      const u = i / BARS;
      let target =
        0.75 * Math.exp(-u * 5) * (0.75 + 0.25 * Math.sin(t * 4)) +
        0.45 * Math.exp(-((u - 0.25 - 0.05 * Math.sin(t * 0.7)) ** 2) / 0.004) +
        0.32 * Math.exp(-((u - 0.5 - 0.08 * Math.sin(t * 0.5)) ** 2) / 0.003) +
        0.2 * Math.exp(-((u - 0.72) ** 2) / 0.002) * (0.5 + 0.5 * Math.sin(t * 3)) +
        (instant ? 0.04 : 0.08 * Math.random());
      target = Math.min(target, 1);
      level[i] = instant ? target : level[i] + (target - level[i]) * 0.18;
      const h = level[i] * SH * 0.7;
      const x = gap + i * (bw + gap);
      sctx.fillStyle = grad;
      sctx.globalAlpha = 0.9;
      sctx.fillRect(x, base - h, bw, h);
      sctx.globalAlpha = 0.18;
      sctx.fillRect(x, base + 4, bw, h * 0.25);
    }
    sctx.globalAlpha = 1;
    sctx.beginPath();
    for (let x = 0; x <= SW; x += 2) {
      const u = x / SW;
      const y = SH * 0.3 + Math.sin(u * 40 + t * 6) * Math.sin(u * 3 + t) * SH * 0.08;
      x === 0 ? sctx.moveTo(x, y) : sctx.lineTo(x, y);
    }
    sctx.strokeStyle = pal.wave;
    sctx.lineWidth = 1.5;
    sctx.stroke();
  };

  /* ───────── Render ───────── */
  function renderStatic() {
    drawScope(1.2);
    drawSpectrum(1.2, true);
  }
  const resizeAll = () => {
    resize(); sresize();
    if (!animate) renderStatic(); // resizing a canvas clears it
  };
  resizeAll();
  let resizeRaf = 0;
  window.addEventListener("resize", () => {
    cancelAnimationFrame(resizeRaf);
    resizeRaf = requestAnimationFrame(resizeAll);
  });

  if (animate) {
    const loop = (ms) => {
      const t = ms / 1000;
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      if (heroVisible) drawScope(t);
      if (specVisible) drawSpectrum(t);
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  /* ───────── Live GitHub numbers ───────── */
  const setStat = (k, v) => {
    const el = document.querySelector(`[data-stat="${k}"]`);
    const sr = document.querySelector(`[data-sr="${k}"]`);
    if (!el) return;
    if (sr) sr.textContent = String(v);
    if (!animate) { el.textContent = v; return; }
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / 1200, 1);
      el.textContent = Math.round(v * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const loadStats = async () => {
    try {
      const [user, repos] = await Promise.all([
        fetch("https://api.github.com/users/TJ-Paul").then((r) => r.ok ? r.json() : Promise.reject()),
        fetch("https://api.github.com/users/TJ-Paul/repos?per_page=100").then((r) => r.ok ? r.json() : Promise.reject()),
      ]);
      // repos and stars use the same definition: original (non-fork) public repos
      const own = repos.filter((r) => !r.fork);
      setStat("repos", own.length);
      setStat("stars", own.reduce((s, r) => s + r.stargazers_count, 0));
      setStat("followers", user.followers);
    } catch {
      /* rate-limited or offline: the placeholders in the HTML stay */
    }
  };
  const statsEl = document.getElementById("ghStats");
  new IntersectionObserver(([e], obs) => {
    if (e.isIntersecting) { loadStats(); obs.disconnect(); }
  }).observe(statsEl);
})();
