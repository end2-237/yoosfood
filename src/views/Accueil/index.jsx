"use client";

// ─────────────────────────────────────────────────────────────────────────────
// Yoss Food — accueil « Le roi du croustillant ».
//
// Huit panneaux qu'on parcourt à l'horizontale : la molette les fait avancer
// sur ordinateur, le doigt les fait glisser sur téléphone. Le menu vient du
// catalogue Camille (source de vérité) ; tant qu'il ne répond pas, on affiche
// le menu des affiches Yoss Food, avec les photos de leurs vidéos TikTok.
// Le panier et la commande sont ceux du site (CartContext → /panier → Camille).
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useMemo, useRef, useState } from "react";
import { useCart } from "../../context/CartContext";
import { useCamilleCatalog } from "../../hooks/useCamilleCatalog";

const NOMS = ["Accueil", "Menu", "Poulet", "En cuisine", "Deals", "Ils ont goûté", "Livraison", "Contact"];
const SOMBRES = new Set([2]);
const WHATSAPP = "237691175480";

// Menu des affiches Yoss Food : affiché tant que Camille n'a pas répondu.
const MENU_AFFICHES = [
  { name: "Classic Burger", price: 1000, img: "/yoss/burger-classic.jpg", category: "Burgers" },
  { name: "Special Burger", price: 1250, img: "/yoss/burger-special.jpg", category: "Burgers" },
  { name: "Cheese Burger", price: 1500, img: "/yoss/burger-cheese.jpg", category: "Burgers" },
  { name: "Chicken Burger", price: 1500, img: "/yoss/burger-chicken.jpg", category: "Burgers" },
  { name: "Grill Burger", price: 1700, img: "/yoss/burger-grill.jpg", category: "Burgers" },
  { name: "Yoss Burger", price: 1800, img: "/yoss/burger-yoss.jpg", category: "Burgers" },
  { name: "Egg Bacon Burger", price: 2000, img: "/yoss/burger-egg-bacon.jpg", category: "Burgers" },
  { name: "Poulet pané + frites", price: 2500, img: "/yoss/poulet-frites.jpg", category: "Poulet" },
  { name: "Nuggets + frites", price: 4500, img: "/yoss/tenders.jpg", category: "Poulet" },
  { name: "Box poulet pané (10 morceaux)", price: 6500, img: "/yoss/box-poulet.jpg", category: "Poulet" },
];

const f = (n) => `${Math.round(Number(n) || 0).toLocaleString("fr-FR").replace(/ | /g, " ")} F`;
const estBurger = (cat) => /burger|sandwich/i.test(cat || "");

const Couronne = () => (
  <svg className="couronne" viewBox="0 0 140 104" aria-hidden="true">
    <path d="M16 86 L9 34 Q8 26 15 31 L44 54 L64 18 Q70 9 76 18 L96 54 L125 31 Q132 26 131 34 L124 86 Z" fill="#ffc62e" stroke="#140506" strokeWidth="5" strokeLinejoin="round" />
    <path d="M28 60 Q70 46 112 60" fill="none" stroke="#fff3c4" strokeWidth="4" strokeLinecap="round" opacity=".8" />
    <rect x="12" y="76" width="116" height="22" rx="8" fill="#e3231c" stroke="#140506" strokeWidth="5" />
    <circle cx="42" cy="87" r="5" fill="#ffc62e" stroke="#140506" strokeWidth="2.5" />
    <circle cx="70" cy="87" r="6.5" fill="#fff8ee" stroke="#140506" strokeWidth="2.5" />
    <circle cx="98" cy="87" r="5" fill="#ffc62e" stroke="#140506" strokeWidth="2.5" />
    <circle cx="9" cy="28" r="8" fill="#e3231c" stroke="#140506" strokeWidth="4" />
    <circle cx="70" cy="10" r="9" fill="#e3231c" stroke="#140506" strokeWidth="4" />
    <circle cx="131" cy="28" r="8" fill="#e3231c" stroke="#140506" strokeWidth="4" />
  </svg>
);
const IcoCuisse = () => (
  <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M30 6c8 0 13 7 11 15-2 7-10 10-16 7L13 40c-2 2-5 0-4-3l7-9c-6-5-4-22 14-22z" fill="currentColor" /><circle cx="11" cy="40" r="4" fill="currentColor" /></svg>
);
const IcoBurger = () => (
  <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M6 22c0-9 8-15 18-15s18 6 18 15z" fill="currentColor" /><rect x="4" y="26" width="40" height="5" rx="2.5" fill="currentColor" /><path d="M6 35h36c0 4-3 7-7 7H13c-4 0-7-3-7-7z" fill="currentColor" /></svg>
);
const IcoMoto = () => (
  <svg viewBox="0 0 48 48" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="34" r="6" /><circle cx="37" cy="34" r="6" /><path d="M17 34h12l6-14h-8M29 20l-4 14M8 22h10l4 6" /><rect x="2" y="12" width="12" height="10" rx="2" fill="currentColor" /></svg>
);

// Motif de dessins de nourriture (gardé de l'ancien site), en tuile SVG.
const doodles = (c) =>
  "data:image/svg+xml," +
  encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="280" height="280" viewBox="0 0 280 280" fill="none" stroke="${c}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><g transform="translate(24 30) rotate(-12)"><path d="M0 22c0-14 12-22 26-22s26 8 26 22z"/><path d="M-2 30h56"/><path d="M0 38c4 4 8 4 12 0s8-4 12 0 8 4 12 0 8-4 12 0"/><path d="M2 46h48c0 6-4 9-10 9H12c-6 0-10-3-10-9z"/></g><g transform="translate(180 20) rotate(10)"><path d="M6 20l6 44h28l6-44z"/><path d="M12 20L8 0M20 20l-1-22M28 20l2-20M36 20l5-18"/></g><g transform="translate(120 120) rotate(-25)"><path d="M10 0c14 0 24 10 22 24-2 12-14 18-24 14L-6 52c-3 3-8 0-6-4l12-16C-6 26-4 0 10 0z"/></g><g transform="translate(30 180) rotate(8)"><path d="M0 34L6 6l14 14L30 0l10 20L54 6l6 28z"/><path d="M0 40h60"/></g><g transform="translate(200 190)"><path d="M14 0l4 10 10 4-10 4-4 10-4-10-10-4 10-4z"/></g><g transform="translate(220 110) rotate(18)"><circle cx="14" cy="14" r="14"/><path d="M8 12h12M10 18h8"/></g><g transform="translate(90 240) rotate(-6)"><path d="M0 10c10-10 20 10 30 0s20 10 30 0"/></g></svg>`);

function Sticker({ className, children }) {
  const [on, setOn] = useState(false);
  return (
    <div
      className={`sticker ${className}${on ? " decolle" : ""}`}
      onPointerDown={() => setOn(true)}
      onPointerUp={() => setOn(false)}
      onPointerLeave={() => setOn(false)}
    >
      <span>{children}</span>
    </div>
  );
}

function BoutonPlus({ onAdd, label }) {
  const [ok, setOk] = useState(false);
  return (
    <button
      type="button"
      className={`plus${ok ? " ok" : ""}`}
      aria-label={`Ajouter ${label}`}
      onClick={(e) => {
        e.stopPropagation();
        onAdd();
        setOk(true);
        setTimeout(() => setOk(false), 900);
      }}
    >
      {ok ? "✓" : "+"}
    </button>
  );
}

export default function Accueil() {
  const { addItem, openCart, count } = useCart();
  const catalogue = useCamilleCatalog();
  const racine = useRef(null);
  const voyage = useRef(null);
  const piste = useRef(null);
  const jauge = useRef(null);
  const vols = useRef([]);
  const roi = useRef(null);
  const [index, setIndex] = useState(0);
  const [tactile, setTactile] = useState(false);
  const [astuce, setAstuce] = useState(false);
  const [onglet, setOnglet] = useState("burgers");
  const [choix, setChoix] = useState(0);
  const [change, setChange] = useState(false);
  const [temps, setTemps] = useState(["00", "00", "00"]);
  const N = NOMS.length;

  // ── Menu : Camille si disponible, sinon les affiches ──
  const plats = useMemo(() => {
    if (catalogue.live && catalogue.products.length) {
      return catalogue.products
        .filter((p) => p.available !== false && !/boisson|drink/i.test(p.category))
        .map((p) => ({ id: p.camilleId, camilleId: p.camilleId, name: p.name, price: p.priceNumber, img: p.img, category: p.category }));
    }
    return MENU_AFFICHES.map((p) => ({ ...p, id: p.name }));
  }, [catalogue.live, catalogue.products]);
  const burgers = plats.filter((p) => estBurger(p.category));
  const poulet = plats.filter((p) => !estBurger(p.category));
  const liste = onglet === "burgers" ? burgers : poulet;
  const vedette = liste[Math.min(choix, liste.length - 1)] || plats[0];
  const ajouter = (p) => addItem({ id: p.id, camilleId: p.camilleId || null, name: p.name, price: p.price, img: p.img });

  // ── Défilement horizontal ──
  useEffect(() => {
    const mq = window.matchMedia("(max-width:820px), (hover:none)");
    const maj = () => setTactile(mq.matches);
    maj();
    mq.addEventListener("change", maj);
    return () => mq.removeEventListener("change", maj);
  }, []);

  useEffect(() => {
    const v = voyage.current, p = piste.current;
    if (!v || !p) return;
    v.style.height = tactile ? "auto" : `${N * 100}vh`;
    let actuel = 0, raf = 0, dernier = -1;
    const progres = () => {
      if (tactile) return p.scrollLeft / Math.max(1, p.scrollWidth - p.clientWidth);
      const r = v.getBoundingClientRect(), total = v.offsetHeight - window.innerHeight;
      return Math.min(1, Math.max(0, -r.top / Math.max(1, total)));
    };
    const boucle = () => {
      const cible = progres();
      actuel += (cible - actuel) * 0.12; // défilement doux
      if (Math.abs(cible - actuel) < 0.0005) actuel = cible;
      if (!tactile) p.style.transform = `translate3d(${-actuel * (N - 1) * 100}vw,0,0)`;
      if (jauge.current) jauge.current.style.transform = `scaleX(${actuel})`;
      const i = Math.round(actuel * (N - 1));
      if (i !== dernier) { dernier = i; setIndex(i); }
      const d = actuel * (N - 1) - 2; // les photos du panneau 3 volent avec l'avancée
      vols.current.forEach((el) => {
        if (!el) return;
        const k = Number(el.dataset.v);
        el.style.transform = `translate(${d * k * -120}px,${d * k * 40}px) rotate(${d * k * -18}deg)`;
      });
      raf = requestAnimationFrame(boucle);
    };
    raf = requestAnimationFrame(boucle);
    return () => cancelAnimationFrame(raf);
  }, [tactile, N]);

  const aller = (i) => {
    const v = voyage.current, p = piste.current;
    if (tactile) p.scrollTo({ left: i * p.clientWidth, behavior: "smooth" });
    else {
      const total = v.offsetHeight - window.innerHeight;
      window.scrollTo({ top: v.offsetTop + (total * i) / (N - 1), behavior: "smooth" });
    }
  };

  // Astuce de navigation, une fois.
  useEffect(() => {
    const a = setTimeout(() => setAstuce(true), 1400), b = setTimeout(() => setAstuce(false), 6000);
    const cacher = () => setAstuce(false);
    window.addEventListener("scroll", cacher, { once: true });
    piste.current?.addEventListener("scroll", cacher, { once: true });
    return () => { clearTimeout(a); clearTimeout(b); };
  }, []);

  // La couronne et le carton suivent un peu la souris.
  useEffect(() => {
    if (tactile) return;
    const bouger = (e) => {
      if (!roi.current) return;
      roi.current.style.translate = `${(e.clientX / innerWidth - 0.5) * 24}px ${(e.clientY / innerHeight - 0.5) * 16}px`;
    };
    window.addEventListener("pointermove", bouger);
    return () => window.removeEventListener("pointermove", bouger);
  }, [tactile]);

  // Compte à rebours jusqu'à minuit.
  useEffect(() => {
    const tic = () => {
      const n = new Date(), m = new Date(n);
      m.setHours(24, 0, 0, 0);
      const s = Math.max(0, Math.floor((m - n) / 1000)), p = (v) => String(v).padStart(2, "0");
      setTemps([p(Math.floor(s / 3600)), p(Math.floor((s % 3600) / 60)), p(s % 60)]);
    };
    tic();
    const t = setInterval(tic, 1000);
    return () => clearInterval(t);
  }, []);

  const montrer = (i) => {
    if (i === choix) return;
    setChange(true);
    setTimeout(() => { setChoix(i); setChange(false); }, 180);
  };
  const mots = ["Yoss Food", "Le roi du croustillant", "Bonamoussadi", "Pané à la main", "Livré chaud", "Burgers dès 1 000 F"];

  return (
    <div className="yf2" ref={racine} data-fond={SOMBRES.has(index) ? "sombre" : "clair"}>
      <header className="barre">
        <img className="logo" src="/yoss/logo.png" alt="Yoss Food" />
        <nav className="sommaire tech" aria-label="Panneaux">
          {NOMS.map((n, i) => (
            <button key={n} type="button" className={i === index ? "on" : ""} onClick={() => aller(i)}>
              {String(i + 1).padStart(2, "0")} {n}
            </button>
          ))}
        </nav>
        <button className="commander" type="button" onClick={openCart}>
          Commander 🔥<span className={`compteur${count > 0 ? " on" : ""}`}>{count}</span>
        </button>
      </header>

      <main className="voyage" ref={voyage}>
        <div className="scene">
          <div className="piste" ref={piste}>
            {/* 01 · Accueil */}
            <section className="pan p-accueil" aria-label="Accueil">
              <div className="doodles" style={{ backgroundImage: `url("${doodles("#e6a22a")}")` }} />
              <h1 className="geant ligne1">Le roi du</h1>
              <div className="roi" ref={roi}>
                <img className="plat" src="/yoss/carton-hero.jpg" alt="Carton de frites au poulet pané et cheddar, Yoss Food" />
                <Couronne />
              </div>
              <p className="geant ligne2">Crousti<em>llant</em></p>
              <Sticker className="st-main"><i className="ico"><IcoCuisse /></i>Pané<br />à la main</Sticker>
              <Sticker className="st-prix"><i className="ico"><IcoBurger /></i>Dès<br />1 000 F</Sticker>
              <Sticker className="st-chaud"><i className="ico"><IcoMoto /></i>Livré chaud · Douala</Sticker>
              <div className="bas">
                <p className="tech">Burgers &amp; poulet pané · Bonamoussadi, carrefour Maison Blanche · Douala</p>
                <button className="bouton" type="button" onClick={() => aller(1)}>Voir le menu →</button>
              </div>
            </section>

            {/* 02 · Menu */}
            <section className="pan p-menu" aria-label="Le menu">
              <p className="geant titre" aria-hidden="true">Le menu</p>
              <div className="carte">
                <div>
                  <div className="onglets tech" role="tablist">
                    {[["burgers", "Burgers"], ["poulet", "Poulet & assiettes"]].map(([k, l]) => (
                      <button key={k} type="button" role="tab" aria-selected={onglet === k} onClick={() => { setOnglet(k); setChoix(0); }}>{l}</button>
                    ))}
                  </div>
                  <div className="liste">
                    {liste.map((p, i) => (
                      <div key={p.id} className={`ligne-plat${i === choix ? " on" : ""}`} onPointerEnter={() => montrer(i)} onClick={() => montrer(i)}>
                        <span className="num tech">{String(i + 1).padStart(2, "0")}</span>
                        <span className="nom">{p.name}</span>
                        <span className="px">{f(p.price)}</span>
                        <BoutonPlus label={p.name} onAdd={() => ajouter(p)} />
                      </div>
                    ))}
                  </div>
                  <p className="tech" style={{ marginTop: 12, opacity: 0.8 }}>
                    {catalogue.live ? "Menu à jour en direct" : "Prix des affiches Yoss Food"} · livraison dans Douala
                  </p>
                </div>
                <div className="vitrine">
                  <div className="fond" />
                  {vedette?.img ? <img className={change ? "change" : ""} src={vedette.img} alt={vedette.name} /> : null}
                  {vedette ? <span className="etq">{f(vedette.price)}</span> : null}
                </div>
              </div>
            </section>

            {/* 03 · Poulet, de nuit */}
            <section className="pan p-poulet" aria-label="Poulet pané">
              {[
                ["/yoss/pilons.jpg", 1, { left: "-2vw", top: "14%" }, -6],
                ["/yoss/frites-cheddar.jpg", -1.3, { right: "2vw", top: "8%" }, 5],
                ["/yoss/tenders.jpg", 1.6, { left: "12vw", bottom: "4%" }, 4],
                ["/yoss/bol-poulet.jpg", -0.8, { right: "8vw", bottom: "2%" }, -4],
                ["/yoss/pilons-2.jpg", 2, { left: "40vw", top: "10%", width: "11vw" }, 8],
              ].map(([src, v, pos, rot], i) => (
                <figure key={src} className="vol" data-v={v} ref={(el) => (vols.current[i] = el)} style={{ ...pos, margin: 0 }}>
                  <div className="polaroid" style={{ rotate: `${rot}deg`, padding: "6px 6px 6px" }}><img src={src} alt="" /></div>
                </figure>
              ))}
              <div className="bloc">
                <p className="tech" style={{ color: "var(--or)" }}>Fait minute · Bonamoussadi</p>
                <h2 className="geant">Pané à la main.<br /><span className="neon">Frit à la commande.</span></h2>
                <div className="offres">
                  {poulet.slice(0, 3).map((p) => (
                    <div className="offre" key={p.id}><span>{p.name}</span><b>{f(p.price)}</b><BoutonPlus label={p.name} onAdd={() => ajouter(p)} /></div>
                  ))}
                </div>
              </div>
            </section>

            {/* 04 · En cuisine */}
            <section className="pan p-cuisine" aria-label="En cuisine">
              <div className="doodles" style={{ backgroundImage: `url("${doodles("#e6a22a")}")`, opacity: 0.35 }} />
              <div className="tete">
                <h2 className="geant">En cuisine</h2>
                <p className="tech" style={{ maxWidth: "34ch" }}>Tout est fait à la commande, sous vos yeux, à Bonamoussadi. Images tirées de nos vidéos TikTok.</p>
              </div>
              <div className="etapes">
                {[
                  ["/yoss/cuisine-panure.jpg", "01 · Panure à la main"],
                  ["/yoss/cuisine-decoupe.jpg", "02 · Découpe minute"],
                  ["/yoss/cuisine-friteuse.jpg", "03 · Friture dorée"],
                  ["/yoss/cuisine-cheddar.jpg", "04 · Cheddar fondant"],
                  ["/yoss/cuisine-sauce.jpg", "05 · Sauce maison"],
                ].map(([src, t]) => (
                  <figure key={src} className="polaroid scotch"><img src={src} alt={t} /><figcaption>{t}</figcaption></figure>
                ))}
              </div>
            </section>

            {/* 05 · Deals */}
            <section className="pan p-deals" aria-label="Deals">
              <div className="doodles" style={{ backgroundImage: `url("${doodles("#c9171c")}")`, opacity: 0.25 }} />
              <div className="grille">
                <div>
                  <p className="tech">Chaque nuit, jusqu'à minuit</p>
                  <h2 className="geant">Deals<span>de minuit</span></h2>
                  <div className="minuteur" aria-label="Temps restant avant minuit">
                    {temps.map((t, i) => (<div key={i}><span>{t}</span><small className="tech">{["heures", "min", "sec"][i]}</small></div>))}
                  </div>
                  <button className="bouton" type="button" onClick={() => aller(1)}>J'en profite</button>
                </div>
                <div className="collage">
                  {[
                    ["/yoss/banner1.jpg", "a1", "Affiche Livraison rapide, assiettes à 2 500 F et 4 500 F"],
                    ["/yoss/affiche-box-poulet.jpg", "a2", "Affiche Box poulet pané, 10 morceaux, 6 500 F"],
                    ["/yoss/banner2.jpg", "a3", "Affiche des burgers de 1 000 F à 2 000 F"],
                    ["/yoss/banner3.jpg", "a4", "Affiche Bonne fête du travail"],
                    ["/yoss/banner4.jpg", "a5", "Bannière Yoss Food"],
                  ].map(([src, c, alt]) => (
                    <figure key={src} className={`${c} scotch`}><img src={src} alt={alt} /></figure>
                  ))}
                </div>
              </div>
            </section>

            {/* 06 · Ils ont goûté */}
            <section className="pan p-gout" aria-label="Ils ont goûté">
              <div className="grille">
                <div>
                  <p className="tech" style={{ color: "var(--or)" }}>Vu sur TikTok</p>
                  <h2 className="geant">Ils ont <em>goûté</em></h2>
                  <p>Nos clients passent à Bonamoussadi ou se font livrer, et ils reviennent. Suivez nos nouveautés et nos deals sur TikTok.</p>
                  <a className="tiktok tech" href="https://www.tiktok.com/@yossfood" target="_blank" rel="noreferrer">TikTok · @yossfood ↗</a>
                </div>
                <div className="mur">
                  {[
                    ["/yoss/client-1.jpg", "m1", "Livraison à Bonamoussadi"],
                    ["/yoss/client-3.jpg", "m2", "Le carton du midi"],
                    ["/yoss/client-2.jpg", "m3", "À emporter"],
                    ["/yoss/carton-cheddar.jpg", "m4", "Carton cheddar"],
                    ["/yoss/bol-cheddar.jpg", "m5", "Bol sauce cheddar"],
                  ].map(([src, c, t]) => (
                    <figure key={src} className={c}><div className="polaroid scotch"><img src={src} alt={t} /><figcaption>{t}</figcaption></div></figure>
                  ))}
                </div>
              </div>
            </section>

            {/* 07 · Livraison */}
            <section className="pan p-livraison" aria-label="Livraison">
              <div className="grille">
                <div>
                  <p className="tech">On roule depuis Bonamoussadi</p>
                  <h2 className="geant">Livré chaud<br />dans Douala</h2>
                  <p>Commandez sur le site ou sur WhatsApp, partagez votre position : la boutique confirme le prix et l'heure d'arrivée.</p>
                  <div className="qr">
                    <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&margin=0&data=${encodeURIComponent(`https://wa.me/${WHATSAPP}`)}`} alt="QR code vers le WhatsApp de Yoss Food" />
                    <p className="tech">Scannez<br />et commandez<br />sur WhatsApp<br />691 17 54 80</p>
                  </div>
                  <div className="partenaires tech"><span>Livreurs Yoss</span><span>Gozem</span><span>Potolo</span></div>
                </div>
                <svg className="plan" viewBox="0 0 560 420" role="img" aria-label="Quartiers livrés depuis Bonamoussadi">
                  {["M290 210 C330 150 380 110 440 90", "M290 210 C360 220 420 250 480 280", "M290 210 C250 140 210 100 170 70", "M290 210 C220 230 160 220 100 210", "M290 210 C260 290 230 330 200 370", "M290 210 C330 300 370 340 400 370"].map((d) => (
                    <path key={d} className="route" d={d} />
                  ))}
                  {[[440, 90, 456, 94, "Makepe"], [480, 280, 440, 308, "Kotto"], [170, 70, 120, 52, "Logpom"], [100, 210, 40, 240, "Bonabéri"], [200, 370, 170, 400, "Akwa"], [400, 370, 370, 400, "Bonapriso"]].map(([cx, cy, tx, ty, n]) => (
                    <g key={n}><circle className="q" cx={cx} cy={cy} r="8" /><text x={tx} y={ty}>{n}</text></g>
                  ))}
                  <g transform="translate(290 210) rotate(-6)">
                    <rect x="-74" y="-30" width="148" height="60" rx="30" fill="#e3231c" stroke="#140506" strokeWidth="3" />
                    <text x="0" y="-2" textAnchor="middle" style={{ fill: "#fff8ee", fontSize: 13 }}>Yoss Food</text>
                    <text x="0" y="15" textAnchor="middle" style={{ fill: "#ffc62e", fontSize: 10 }}>Bonamoussadi</text>
                  </g>
                </svg>
              </div>
            </section>

            {/* 08 · Contact */}
            <section className="pan p-fin" aria-label="Contact">
              <div>
                <div className="bandeau" aria-hidden="true">
                  <div>{[...mots, ...mots, ...mots, ...mots].map((m, i) => (<span key={i}>{m} ✦</span>))}</div>
                </div>
                <div className="infos">
                  <div><h3>Nous trouver</h3><p>Bonamoussadi, carrefour Maison Blanche, Douala</p></div>
                  <div><h3>Commander</h3><p>691 17 54 80 · 651 58 06 28<br />WhatsApp : Camille répond 24 h/24</p></div>
                  <div><h3>Livraison</h3><p>Livreurs Yoss, Gozem, Potolo</p></div>
                </div>
              </div>
              <p className="marque" aria-hidden="true">Yoss Food</p>
            </section>
          </div>
        </div>
      </main>

      <div className="progression">
        <span className="tech">{String(index + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}</span>
        <div className="jauge"><i ref={jauge} /></div>
        <span className="tech">{NOMS[index]}</span>
      </div>
      <div className={`astuce tech${astuce ? " on" : ""}`}>{tactile ? "← Glissez pour avancer →" : "Faites défiler pour avancer →"}</div>
    </div>
  );
}
