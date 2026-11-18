(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ───────── Year ───────── */
  document.getElementById("year").textContent = new Date().getFullYear();

  /* ───────── Nav: scrolled state, mobile menu, active link ───────── */
  const nav = document.getElementById("nav");
  const burger = document.getElementById("burger");
  const links = document.getElementById("navLinks");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 30);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  burger.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    burger.setAttribute("aria-expanded", String(open));
  });
  links.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      links.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
    })
  );

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

  /* ───────── Reveal on scroll ───────── */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          revealObserver.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  document.querySelectorAll(".reveal").forEach((el, i) => {
    el.style.transitionDelay = `${(i % 3) * 80}ms`;
    revealObserver.observe(el);
  });

  /* ───────── Typing effect ───────── */
  const roles = [
    "building games in C++ & JavaFX",
    "shipping an Android audio lab",
    "making math you can drag around",
    "learning NumPy & Pandas",
    "looking for data science collaborators",
  ];
  const typed = document.getElementById("typed");
  if (reduceMotion) {
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

  /* ───────── Cursor glow ───────── */
  const glow = document.querySelector(".cursor-glow");
  if (finePointer && !reduceMotion) {
    window.addEventListener("pointermove", (e) => {
      glow.style.left = e.clientX + "px";
      glow.style.top = e.clientY + "px";
    }, { passive: true });
  } else {
    glow.style.display = "none";
  }

  /* ───────── Card tilt + spotlight ───────── */
  if (finePointer && !reduceMotion) {
    document.querySelectorAll("[data-tilt]").forEach((card) => {
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        card.style.setProperty("--mx", `${x * 100}%`);
        card.style.setProperty("--my", `${y * 100}%`);
        card.style.transform = `perspective(1000px) rotateX(${(0.5 - y) * 4}deg) rotateY(${(x - 0.5) * 4}deg)`;
      });
      card.addEventListener("pointerleave", () => { card.style.transform = ""; });
    });
  }

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
  resize();
  window.addEventListener("resize", resize);
  window.addEventListener("pointermove", (e) => {
    mouse.tx = e.clientX / window.innerWidth;
    mouse.ty = e.clientY / window.innerHeight;
  }, { passive: true });

  const waves = [
    { color: "34,211,238", amp: 0.09, freq: 1.6, speed: 0.9, phase: 0, width: 2 },
    { color: "167,139,250", amp: 0.07, freq: 2.4, speed: -0.6, phase: 1.3, width: 1.6 },
    { color: "244,114,182", amp: 0.05, freq: 3.4, speed: 1.3, phase: 2.1, width: 1.2 },
    { color: "251,191,36", amp: 0.035, freq: 5.2, speed: -1.7, phase: 0.4, width: 1 },
  ];
  let heroVisible = true;
  new IntersectionObserver(([e]) => { heroVisible = e.isIntersecting; }).observe(scope);

  const drawScope = (t) => {
    ctx.clearRect(0, 0, W, H);
    const mid = H * 0.62;
    // grid ticks (oscilloscope feel)
    ctx.strokeStyle = "rgba(148,170,220,0.07)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, mid); ctx.lineTo(W, mid);
    ctx.stroke();

    const k = 0.5 + mouse.y; // amplitude boost from mouse
    const f = 0.6 + mouse.x * 0.9; // frequency shift from mouse
    waves.forEach((w) => {
      ctx.beginPath();
      for (let x = 0; x <= W; x += 3) {
        const u = x / W;
        const env = Math.sin(Math.PI * u); // fade at edges
        const y = mid + Math.sin(u * Math.PI * 2 * w.freq * f + t * w.speed + w.phase) * H * w.amp * k * env
                      + Math.sin(u * 23 + t * 2.1 + w.phase) * H * 0.006 * env;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = `rgba(${w.color},0.55)`;
      ctx.lineWidth = w.width;
      ctx.shadowColor = `rgba(${w.color},0.8)`;
      ctx.shadowBlur = 14;
      ctx.stroke();
    });
    ctx.shadowBlur = 0;

    // sum signal (the "output")
    ctx.beginPath();
    for (let x = 0; x <= W; x += 3) {
      const u = x / W;
      const env = Math.sin(Math.PI * u);
      let s = 0;
      waves.forEach((w) => { s += Math.sin(u * Math.PI * 2 * w.freq * f + t * w.speed + w.phase) * w.amp; });
      const y = mid + s * H * 0.55 * k * env;
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.strokeStyle = "rgba(231,236,247,0.18)";
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 6]);
    ctx.stroke();
    ctx.setLineDash([]);
  };

  /* ───────── Spectrum bars on Signal Lab card ───────── */
  const spec = document.querySelector(".mini-spectrum");
  const sctx = spec.getContext("2d");
  let SW = 0, SH = 0;
  const sresize = () => {
    SW = spec.clientWidth; SH = spec.clientHeight;
    spec.width = SW * dpr; spec.height = SH * dpr;
    sctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  sresize();
  window.addEventListener("resize", sresize);
  let specVisible = false;
  new IntersectionObserver(([e]) => { specVisible = e.isIntersecting; }).observe(spec);
  const BARS = 64;
  const level = new Array(BARS).fill(0);

  const drawSpectrum = (t) => {
    sctx.clearRect(0, 0, SW, SH);
    const gap = 3;
    const bw = (SW - gap * (BARS + 1)) / BARS;
    const base = SH * 0.86;
    const grad = sctx.createLinearGradient(0, base, 0, SH * 0.15);
    grad.addColorStop(0, "#22d3ee");
    grad.addColorStop(0.55, "#a78bfa");
    grad.addColorStop(1, "#f472b6");
    for (let i = 0; i < BARS; i++) {
      const u = i / BARS;
      // fake music: bass bump + a few moving harmonics + jitter
      let target =
        0.75 * Math.exp(-u * 5) * (0.75 + 0.25 * Math.sin(t * 4)) +
        0.45 * Math.exp(-((u - 0.25 - 0.05 * Math.sin(t * 0.7)) ** 2) / 0.004) +
        0.32 * Math.exp(-((u - 0.5 - 0.08 * Math.sin(t * 0.5)) ** 2) / 0.003) +
        0.2 * Math.exp(-((u - 0.72) ** 2) / 0.002) * (0.5 + 0.5 * Math.sin(t * 3)) +
        0.08 * Math.random();
      target = Math.min(target, 1);
      level[i] += (target - level[i]) * 0.18;
      const h = level[i] * SH * 0.7;
      const x = gap + i * (bw + gap);
      sctx.fillStyle = grad;
      sctx.globalAlpha = 0.9;
      sctx.fillRect(x, base - h, bw, h);
      sctx.globalAlpha = 0.18; // reflection
      sctx.fillRect(x, base + 4, bw, h * 0.25);
    }
    sctx.globalAlpha = 1;
    // waveform overlay
    sctx.beginPath();
    for (let x = 0; x <= SW; x += 2) {
      const u = x / SW;
      const y = SH * 0.3 + Math.sin(u * 40 + t * 6) * Math.sin(u * 3 + t) * SH * 0.08;
      x === 0 ? sctx.moveTo(x, y) : sctx.lineTo(x, y);
    }
    sctx.strokeStyle = "rgba(251,191,36,0.7)";
    sctx.lineWidth = 1.5;
    sctx.stroke();
  };

  /* ───────── Main loop ───────── */
  const loop = (ms) => {
    const t = ms / 1000;
    mouse.x += (mouse.tx - mouse.x) * 0.05;
    mouse.y += (mouse.ty - mouse.y) * 0.05;
    if (heroVisible) drawScope(t);
    if (specVisible) drawSpectrum(t);
    requestAnimationFrame(loop);
  };
  if (reduceMotion) {
    drawScope(1.2);
    drawSpectrum(1.2);
  } else {
    requestAnimationFrame(loop);
  }

  /* ───────── Live GitHub numbers ───────── */
  const setStat = (k, v) => {
    const el = document.querySelector(`[data-stat="${k}"]`);
    if (!el) return;
    if (reduceMotion) { el.textContent = v; return; }
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
      const own = repos.filter((r) => !r.fork);
      setStat("repos", user.public_repos);
      setStat("stars", own.reduce((s, r) => s + r.stargazers_count, 0));
      setStat("followers", user.followers);
    } catch {
      /* rate-limited or offline: keep the placeholders */
      document.querySelector('[data-stat="stars"]').textContent = "6+";
      document.querySelector('[data-stat="followers"]').textContent = "7+";
    }
  };
  const statsEl = document.getElementById("ghStats");
  new IntersectionObserver(([e], obs) => {
    if (e.isIntersecting) { loadStats(); obs.disconnect(); }
  }).observe(statsEl);
})();
