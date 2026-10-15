import { useEffect, useMemo, useState } from "react";
import { CATEGORIES, EXTRAS, FACES, HERO_IMG, MOMENTS, PRODUCTS, SHOP, type CatId, type Variant } from "./data";
import { UI, type L, type Lang } from "./i18n";

/* ───────────── small drawings ───────────── */

function Stamp({ lang }: { lang: Lang }) {
  const hi = lang === "hi";
  return (
    <svg className="stamp" viewBox="0 0 200 200" aria-hidden="true">
      <defs>
        <path id="ring" d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0" />
      </defs>
      <circle cx="100" cy="100" r="96" fill="#f2e8d0" stroke="#1d1a16" strokeWidth="3" />
      <circle cx="100" cy="100" r="58" fill="none" stroke="#1d1a16" strokeWidth="2" strokeDasharray="2 6" />
      <g className="stamp-ring">
        <text fontFamily="Yatra One, serif" fontSize={hi ? 17 : 13} fill="#1d1a16" letterSpacing="1">
          <textPath href="#ring" textLength="440" lengthAdjust="spacing">
            {hi ? "मिर्ची बड़ा · ईमरती · कचौरी · सरदारपुरा ·" : "MIRCHI BADA · IMARTI · KACHORI · SARDARPURA ·"}
          </textPath>
        </text>
      </g>
      <text x="100" y="116" textAnchor="middle" fontFamily="Yatra One, serif" fontSize="46" fill="#c4301c">
        {hi ? "च" : "C"}
      </text>
    </svg>
  );
}

/* ───────────── helpers ───────────── */

const priceText = (v: Variant) =>
  v.price === null ? "—" : v.priceMax ? `₹${v.price}–${v.priceMax}` : `₹${v.price}`;

const keyOf = (id: string, vi: number) => `${id}:${vi}`;

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".rv");
    if (!("IntersectionObserver" in window)) {
      els.forEach((e) => e.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        }),
      { threshold: 0.12 }
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);
}

/* ───────────── page ───────────── */

export default function App() {
  useReveal();

  const [lang, setLang] = useState<Lang>(() => {
    try {
      return localStorage.getItem("lang") === "en" ? "en" : "hi";
    } catch {
      return "hi";
    }
  });
  const t = (l: L) => l[lang];
  const isHi = lang === "hi";

  const [filter, setFilter] = useState<"all" | CatId>("all");
  const [sel, setSel] = useState<Record<string, number>>({}); // product id -> chosen variant index
  const [bag, setBag] = useState<Record<string, number>>({}); // "id:variant" -> quantity
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [mode, setMode] = useState<"dukaan" | "ghar">("dukaan");

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem("lang", lang);
    } catch {
      /* storage unavailable, ignore */
    }
  }, [lang]);

  const lines = useMemo(
    () =>
      Object.entries(bag)
        .filter(([, q]) => q > 0)
        .map(([k, qty]) => {
          const [id, vi] = k.split(":");
          const p = PRODUCTS.find((x) => x.id === id)!;
          return { k, p, v: p.variants[Number(vi)], qty };
        }),
    [bag]
  );
  const count = lines.reduce((s, l) => s + l.qty, 0);
  const total = lines.reduce((s, l) => s + (l.v.price ?? 0) * l.qty, 0);
  const uncertain = lines.some((l) => l.v.priceMax !== undefined || l.v.price === null);

  const change = (k: string, d: number) => setBag((b) => ({ ...b, [k]: Math.max(0, (b[k] || 0) + d) }));

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open]);

  const waText = [
    `${t(UI.waHello)} ${SHOP.nameEn}!`,
    t(UI.waIntro),
    ...lines.map(
      ({ p, v, qty }) =>
        `• ${p.en} (${p.hi})${p.unit === "pack" ? ` ${v.label}` : ""} × ${qty}${
          p.unit === "piece" ? ` ${t(UI.waPiece)}` : ""
        }`
    ),
    total > 0 ? `${t(UI.waEstimate)}: ₹${total}${uncertain ? "+" : ""} ${t(UI.waEstimateNote)}` : null,
    `${t(UI.waName)}: ${name || "-"}`,
    mode === "dukaan" ? t(UI.waPickup) : t(UI.waDeliver),
    note ? `${t(UI.waNote)}: ${note}` : null,
  ]
    .filter(Boolean)
    .join("\n");
  const waHref = `https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent(waText)}`;

  const cats = CATEGORIES.filter((c) => filter === "all" || c.id === filter);
  const chips = [{ id: "all" as const, hi: UI.all.hi, en: UI.all.en }, ...CATEGORIES];

  return (
    <>
      {/* ── top bar ── */}
      <header className="bar">
        <a href="#top" className="brand">
          <span className="brand-hi">{isHi ? SHOP.nameHi : SHOP.nameEn}</span>
          <span className="brand-en">{t(UI.city)}</span>
        </a>
        <nav className="links" aria-label="Sections">
          <a href="#bhaav">{t(UI.navPrices)}</a>
          <a href="#pal">{t(UI.navMoments)}</a>
          <a href="#chehre">{t(UI.navFaces)}</a>
          <a href="#dukaan">{t(UI.navVisit)}</a>
        </nav>
        <div className="bar-right">
          <div className="lang" role="group" aria-label="Language">
            <button className={isHi ? "act" : ""} aria-pressed={isHi} onClick={() => setLang("hi")}>
              हिं
            </button>
            <button className={!isHi ? "act" : ""} aria-pressed={!isHi} onClick={() => setLang("en")}>
              EN
            </button>
          </div>
          <button className="bagbtn" onClick={() => setOpen(true)} aria-label={t(UI.openBag)}>
            {t(UI.bag)} <b>{count || t(UI.bagEmpty)}</b>
          </button>
        </div>
      </header>

      <main id="top">
        {/* ── hero ── */}
        <section className="hero">
          <div className="hero-text">
            <p className="eyebrow">
              {t(UI.eyebrowTag)} · {t(UI.place)}
            </p>
            <h1>
              <span className="h1a">{isHi ? "चौधरी" : "Choudhary"}</span>
              <span className="h1b">{isHi ? "नमकीन" : "Namkeen"}</span>
            </h1>
            <p className="lede">{t(UI.lede)}</p>
            <div className="cta">
              <a href="#bhaav" className="btn btn-red">
                {t(UI.ctaPrices)}
              </a>
              <a href={`https://wa.me/${SHOP.whatsapp}`} className="btn btn-ghost" target="_blank" rel="noreferrer">
                {t(UI.ctaWa)}
              </a>
            </div>
            <p className="online">
              {t(UI.onlineToo)}{" "}
              <a href={SHOP.zomato} target="_blank" rel="noreferrer">
                Zomato
              </a>{" "}
              ·{" "}
              <a href={SHOP.swiggy} target="_blank" rel="noreferrer">
                Swiggy
              </a>
            </p>
          </div>
          <div className="hero-art">
            <div className="sun" aria-hidden="true" />
            <figure className="arch-photo">
              <img src={HERO_IMG} alt="Choudhary Namkeen shop on 2nd B Road, Sardarpura, Jodhpur" />
            </figure>
            <Stamp lang={lang} />
            <span className="scribble">{t(UI.scribble)}</span>
          </div>
        </section>

        {/* ── ticker ── */}
        <div className="ticker" aria-hidden="true">
          <div className="ticker-track">
            {[...PRODUCTS, ...PRODUCTS].map((p, k) => (
              <span key={k}>
                {isHi ? p.hi : p.en}
                <em>✺</em>
              </span>
            ))}
          </div>
        </div>

        {/* ── menu ── */}
        <section className="menu" id="bhaav">
          <div className="menu-head rv">
            <div>
              <p className="eyebrow">{t(UI.menuEyebrow)}</p>
              <h2>{t(UI.menuTitle)}</h2>
              <p className="sub">{t(UI.menuSub)}</p>
            </div>
            <div className="chips" role="radiogroup" aria-label="Category filter">
              {chips.map((c) => (
                <button
                  key={c.id}
                  role="radio"
                  aria-checked={filter === c.id}
                  className={`chip ${filter === c.id ? "act" : ""}`}
                  onClick={() => setFilter(c.id as "all" | CatId)}
                >
                  {isHi ? c.hi : c.en}
                </button>
              ))}
            </div>
          </div>

          {cats.map((c) => (
            <div className="cat" key={c.id}>
              <aside className="cat-side">
                <h3 className="cat-title">{isHi ? c.hi : c.en}</h3>
                <p className="cat-en">
                  {isHi ? c.en : c.hi} · {t(c.blurb)}
                </p>
                {c.photos.length > 0 && (
                  <div className="photos">
                    {c.photos.map((ph) => (
                      <figure className="photo" key={ph.src}>
                        <img src={ph.src} alt={ph.alt} loading="lazy" />
                        <figcaption>{t(ph.cap)}</figcaption>
                      </figure>
                    ))}
                  </div>
                )}
              </aside>

              <ul className="items">
                {PRODUCTS.filter((p) => p.cat === c.id).map((p) => {
                  const vi = sel[p.id] ?? 0;
                  const v = p.variants[vi];
                  const k = keyOf(p.id, vi);
                  const q = bag[k] || 0;
                  const picked = p.variants.some((_, i) => (bag[keyOf(p.id, i)] || 0) > 0);
                  const flag = p.needsConfirm || v.priceMax !== undefined ? "*" : "";
                  return (
                    <li className={`item ${picked ? "picked" : ""}`} key={p.id}>
                      <div className="what">
                        <div className="line">
                          <span className="hi">{isHi ? p.hi : p.en}</span>
                          <i className="lead" />
                          <span className="price">
                            {priceText(v)}
                            {flag}
                            {p.unit === "piece" && <small> {t(UI.perPiece)}</small>}
                          </span>
                        </div>
                        <p className="en">{isHi ? p.en : p.hi}</p>
                        <p className="hand">{t(p.desc)}</p>
                        {p.variants.length > 1 && (
                          <div className="vars" role="radiogroup" aria-label={`${p.en} size`}>
                            {p.variants.map((x, i) => (
                              <button
                                key={x.label}
                                role="radio"
                                aria-checked={vi === i}
                                className={`var ${vi === i ? "act" : ""}`}
                                onClick={() => setSel((s) => ({ ...s, [p.id]: i }))}
                              >
                                {x.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="step">
                        <button onClick={() => change(k, -1)} disabled={!q} aria-label={`${t(UI.less)} ${p.en}`}>
                          −
                        </button>
                        <output>{q}</output>
                        <button onClick={() => change(k, 1)} aria-label={`${t(UI.more)} ${p.en}`}>
                          +
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          <p className="foot-note">{t(UI.footNote)}</p>

          {EXTRAS.length > 0 && filter === "all" && (
            <div className="extras rv">
              <h3>{t(UI.extrasTitle)}</h3>
              <p className="hand">{t(UI.extrasNote)}</p>
              <div className="extras-grid">
                {EXTRAS.map((e) => (
                  <figure key={e.label.en}>
                    <img src={e.img} alt={e.alt} loading="lazy" />
                    <figcaption>{t(e.label)}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* ── moments ── */}
        <section className="moments" id="pal">
          <h2 className="rv">{t(UI.momentsTitle)}</h2>
          <div className="slips">
            {MOMENTS.map((m, i) => (
              <article className={`slip s${i} rv`} key={m.no.en}>
                <span className="slip-no">{t(m.no)}</span>
                <h3>{t(m.title)}</h3>
                <p>{t(m.body)}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ── faces ── */}
        <section className="faces" id="chehre">
          <div className="faces-in">
            <h2 className="rv">{t(UI.facesTitle)}</h2>
            <div className="faces-grid">
              {FACES.map((f, i) => (
                <figure className={`face f${i} rv`} key={f.label.en}>
                  <img src={f.img} alt={f.alt} loading="lazy" />
                  <figcaption>{t(f.label)}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ── visit ── */}
        <section className="visit scallop" id="dukaan">
          <div className="visit-in">
            <div className="board rv" aria-hidden="true">
              <span className="board-1">{SHOP.tagline}</span>
              <span className="board-2">{SHOP.boardLine}</span>
            </div>

            <div className="visit-grid">
              <div className="rv">
                <p className="eyebrow light">{t(UI.visitEyebrow)}</p>
                <h2>{t(UI.visitTitle)}</h2>
                <address className="addr">
                  {SHOP.addressLines.map((l) => (
                    <span key={l}>{l}</span>
                  ))}
                </address>
                <p className="hrs">{t(SHOP.hours)}</p>
                <p className="hrs-note">{t(UI.hoursNote)}</p>
                <div className="cta">
                  <a className="btn btn-haldi" href={SHOP.mapDirections} target="_blank" rel="noreferrer">
                    {t(UI.directions)}
                  </a>
                  <a className="btn btn-line" href={`tel:${SHOP.phone.replace(/\s/g, "")}`}>
                    {SHOP.phone}
                  </a>
                </div>
                <p className="online light">
                  {t(UI.homeOnline)}{" "}
                  <a href={SHOP.zomato} target="_blank" rel="noreferrer">
                    Zomato
                  </a>{" "}
                  ·{" "}
                  <a href={SHOP.swiggy} target="_blank" rel="noreferrer">
                    Swiggy
                  </a>
                </p>
              </div>

              <div className="map rv">
                <iframe
                  title="Choudhary Namkeen on Google Maps"
                  src={SHOP.mapEmbed}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="foot">
        <div className="foot-big" aria-hidden="true">
          {isHi ? SHOP.nameHi : SHOP.nameEn}
        </div>
        <p>
          © {new Date().getFullYear()} {SHOP.nameEn}, {SHOP.city} · FSSAI Lic. No. {SHOP.fssai}
        </p>
      </footer>

      {/* ── bag drawer ── */}
      <div className={`scrim ${open ? "show" : ""}`} onClick={() => setOpen(false)} />
      <aside className={`drawer ${open ? "show" : ""}`} aria-hidden={!open} aria-label={t(UI.bagTitle)}>
        <div className="drawer-top">
          <h3>{t(UI.bagTitle)}</h3>
          <button onClick={() => setOpen(false)} aria-label={t(UI.closeBag)}>
            ✕
          </button>
        </div>

        {lines.length === 0 ? (
          <p className="drawer-empty">{t(UI.bagEmptyMsg)}</p>
        ) : (
          <>
            <ul className="drawer-list">
              {lines.map(({ k, p, v, qty }) => (
                <li key={k}>
                  <span>
                    {isHi ? p.hi : p.en}
                    <small>
                      {isHi ? p.en : p.hi}
                      {p.unit === "pack" ? ` · ${v.label}` : ""}
                    </small>
                  </span>
                  <span className="step sm">
                    <button onClick={() => change(k, -1)} aria-label={t(UI.less)}>
                      −
                    </button>
                    <output>{qty}</output>
                    <button onClick={() => change(k, 1)} aria-label={t(UI.more)}>
                      +
                    </button>
                  </span>
                </li>
              ))}
            </ul>
            <p className="total">
              {t(UI.estimated)}{" "}
              <b>
                ₹{total}
                {uncertain ? "+" : ""}
              </b>
            </p>
            <div className="seg">
              <button className={mode === "dukaan" ? "act" : ""} onClick={() => setMode("dukaan")}>
                {t(UI.modeShop)}
              </button>
              <button className={mode === "ghar" ? "act" : ""} onClick={() => setMode("ghar")}>
                {t(UI.modeHome)}
              </button>
            </div>
            <input className="field" placeholder={t(UI.namePh)} value={name} onChange={(e) => setName(e.target.value)} />
            <textarea
              className="field"
              placeholder={t(UI.notePh)}
              rows={2}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <a className="btn btn-red wide" href={waHref} target="_blank" rel="noreferrer">
              {t(UI.sendWa)}
            </a>
            <p className="fine">{t(UI.fine)}</p>
          </>
        )}
      </aside>
    </>
  );
}
