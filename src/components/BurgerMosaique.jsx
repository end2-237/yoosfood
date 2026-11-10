"use client";

// ─────────────────────────────────────────────────────────────────────────────
// Le burger mosaïque : un burger fait de photos Yoss Food, qui tourne lentement.
//
// La silhouette vient d'une photo de burger détourée. Chaque zone (pain, salade,
// tomate, cheddar, viande) est remplie de vignettes de la même couleur, et la
// vraie texture repasse par-dessus en lumière douce pour garder le volume.
//
// Le burger est traité comme une surface de révolution vue légèrement d'en haut :
// chaque rangée de photos suit le tour du burger, avec un nombre de tuiles
// proportionnel à sa largeur, et les rangées sont espacées le long de la surface
// (abscisse curviligne) pour que chaque photo reste posée à plat. Le rendu est
// fait en WebGL ; un clic (ou un toucher) ouvre la photo en grand.
//
// Données : public/yoss/mosaique/ (burger.json, tuiles.webp, texture.webp, grand/).
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const DOSSIER = "/yoss/mosaique/";
const VITESSE = (2 * Math.PI) / 45; // un tour en 45 s
const K_CAMERA = 0.11; // caméra légèrement au-dessus du burger
const MARGE = 44; // marge haute et basse du canevas (unités de l'image source)
const TEXTURE = 0.7; // force de la vraie texture en lumière douce

// Photos de la mosaïque qui correspondent à un plat du menu : on retrouve le plat
// dans le catalogue (prix et identifiant Camille), on n'invente aucun prix.
const PLATS_DES_PHOTOS = {
  "burger-classic.jpg": /classic/,
  "burger-special.jpg": /special/,
  "burger-cheese.jpg": /cheese/,
  "burger-chicken.jpg": /chicken/,
  "burger-grill.jpg": /grill/,
  "burger-yoss.jpg": /yoss/,
  "burger-egg-bacon.jpg": /egg/,
  "poulet-frites.jpg": /^poulet pane.*frites/,
  "box-poulet.jpg": /box/,
  "affiche-box-poulet.jpg": /box/,
};
const ZONES = { pain: "pain", salade: "salade", tomate: "tomate", cheddar: "cheddar", viande: "viande" };
const sansAccents = (s) => (s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const prix = (n) => `${Math.round(Number(n) || 0).toLocaleString("fr-FR").replace(/[  ]/g, " ")} F`;

const VS = `attribute vec2 p;varying vec2 v;void main(){v=vec2(p.x*.5+.5,.5-p.y*.5);gl_Position=vec4(p,0,1);}`;
const FS = `precision highp float;varying vec2 v;uniform sampler2D S,X,E,N;uniform float th,tex,tps,W,H,T,C,SH,K,P,Y0;uniform vec3 sur;
float sl(float b,float s){return s<=.5?b-(1.-2.*s)*b*(1.-b):b+(2.*s-1.)*((b<=.25?((16.*b-12.)*b+4.)*b:sqrt(b))-b);}
float h(vec2 q){return fract(sin(dot(q,vec2(12.9898,78.233)))*43758.5453);}
vec4 lit(float yy){return texture2D(E,vec2(.5,(floor(clamp(yy,0.,H-1.))+.5)/H))*255.;}
float rayon(float yy){if(yy<0.||yy>=H)return 0.;vec4 e=lit(yy);return (e.r*256.+e.g)/64.;}
void main(){
 float y=v.y*(H+2.*P)-P;float X0=v.x*W-C;float ys=y;float R=0.;
 // rangée de la surface vue en ce point (la caméra est un peu au-dessus)
 for(int i=0;i<6;i++){R=rayon(ys);ys=y-K*sqrt(max(R*R-X0*X0,0.));}
 R=rayon(ys);float bord=R>1.?clamp(R-abs(X0)+.5,0.,1.):0.;
 vec4 col;float ph;float ar;float n;float u;bool cap=false;
 if(bord<=0.){
  // au-dessus de la première rangée : le dessus du pain
  float r0=rayon(Y0);float pz=(y-Y0)/K;float rho=sqrt(X0*X0+pz*pz);bord=r0>1.?clamp(r0-rho+.5,0.,1.):0.;
  if(bord<=0.||y>Y0+2.){gl_FragColor=vec4(0);return;}
  cap=true;ph=0.;u=fract((atan(X0,pz)+th)/6.2831853+.5);ar=0.;n=texture2D(N,vec2(.5,(Y0+.5)/H)).r*255.;col=texture2D(S,vec2(u,.5*T/SH));ys=Y0;
 }else{
  ph=asin(clamp(X0/R,-.999,.999));vec4 e2=lit(ys);ar=(e2.b*256.+e2.a)/32.;n=texture2D(N,vec2(.5,(floor(ys)+.5)/H)).r*255.;
  u=fract((ph+th)/6.2831853+.5);col=texture2D(S,vec2(u,ar/SH));
 }
 vec2 gt=vec2(floor(u*n),floor(ar/T));float d=(1.-ys/H)*1.1+h(gt)*.35;float a=smoothstep(d,d+.45,tps);
 if(sur.z>.5&&gt==sur.xy){col.rgb=mix(col.rgb,vec3(1),.22);}
 float lum=texture2D(X,vec2(v.x,clamp(ys,0.,H-1.)/H)).r;vec3 o=col.rgb;
 for(int i=0;i<3;i++){o[i]=mix(o[i],sl(o[i],lum),tex);}
 float cy=cos(ph);o*=.5+.5*pow(cy,.6);o+=vec3(1.,.95,.85)*.13*pow(max(0.,cos(ph+.5)),10.)*(1.-ys/H*.6);
 if(cap)o*=1.08;
 o*=.86+.14*smoothstep(H,H*.55,ys);
 gl_FragColor=vec4(o,bord*a);
}`;

const chargerImage = (src) =>
  new Promise((ok) => {
    const i = new Image();
    i.decoding = "async";
    i.onload = () => ok(i);
    i.onerror = () => ok(null);
    i.src = src;
  });

// Prépare la bande de photos qui fait le tour du burger, et tout ce dont le
// shader et le clic ont besoin.
function preparer(B, sprite, texture) {
  const { W, H, T, C, cols, taille } = B;
  const Rr = B.ext.map(([l, r]) => (r > l ? (r - l) / 2 : 0));
  const arc = new Float32Array(H);
  for (let y = 1; y < H; y++) {
    const d = Rr[y] > 0 && Rr[y - 1] > 0 ? Rr[y] - Rr[y - 1] : 0;
    arc[y] = arc[y - 1] + Math.sqrt(1 + d * d);
  }
  const Y0 = Rr.findIndex((r) => r > 0);
  const NR = Math.ceil(arc[H - 1] / T) + 1;
  const ligneDe = (y) => Math.floor(arc[y] / T);
  const ny = new Array(NR).fill(null);
  for (let y = 0; y < H; y++) {
    const j = ligneDe(y);
    if (Rr[y] > 0 && (ny[j] === null || Math.abs(arc[y] - (j + 0.5) * T) < Math.abs(arc[ny[j]] - (j + 0.5) * T))) ny[j] = y;
  }
  const nT = ny.map((y) => (y === null ? 0 : Math.max(6, Math.round((2 * Math.PI * Rr[y]) / T))));
  const SW = Math.max(...nT) * T;

  const grille = {};
  B.tuiles.forEach((t) => (grille[t[0] + "," + t[1]] = t));
  const parZone = {};
  B.tuiles.forEach((t) => {
    (parZone[t[3]] = parZone[t[3]] || new Set()).add(t[2]);
    parZone[t[3]].add(t[4]);
  });
  Object.keys(parZone).forEach((k) => (parZone[k] = [...parZone[k]]));

  const txc = document.createElement("canvas");
  txc.width = W;
  txc.height = H;
  const txg = txc.getContext("2d", { willReadFrequently: true });
  txg.drawImage(texture, 0, 0, W, H);
  const txd = txg.getImageData(0, 0, W, H).data;

  let graine = 7;
  const alea = () => (graine = (graine * 16807) % 2147483647) / 2147483647;
  const bande = [];
  const S = document.createElement("canvas");
  S.width = SW;
  S.height = NR * T;
  const sg = S.getContext("2d");
  for (let j = 0; j < NR; j++) {
    bande[j] = [];
    const yc = ny[j];
    if (yc === null) continue;
    const n = nT[j], w = SW / n, R = Rr[yc];
    const k0 = (yc * W + C) * 4;
    sg.fillStyle = `rgb(${txd[k0]},${txd[k0 + 1]},${txd[k0 + 2]})`;
    sg.fillRect(0, j * T, SW, T);
    for (let i = 0; i < n; i++) {
      const ps = ((i + 0.5) / n) * 2 * Math.PI - Math.PI;
      const x = Math.round(C + R * Math.sin(ps));
      let t = null;
      for (let d = 0; d < 4 && !t; d++)
        for (const dx of [0, -d, d])
          for (const dy of [0, -d, d]) t = t || grille[(Math.floor(x / T) + dx) * T + "," + (Math.floor(yc / T) + dy) * T];
      if (!t) { bande[j][i] = null; continue; }
      const haut = bande[j - 1] && bande[j - 1].length ? bande[j - 1][Math.floor(((i + 0.5) / n) * bande[j - 1].length)] : null;
      const choix = parZone[t[3]].filter((f) => f !== bande[j][i - 1]?.f && f !== haut?.f);
      const f = choix[Math.floor(alea() * choix.length)] ?? t[2];
      bande[j][i] = { f, z: t[3] };
      sg.drawImage(sprite, (f % cols) * taille, Math.floor(f / cols) * taille, taille, taille, i * w, j * T, w, T);
      const k = (yc * W + Math.max(0, Math.min(W - 1, x))) * 4;
      sg.globalCompositeOperation = "color";
      sg.globalAlpha = 0.45;
      sg.fillStyle = `rgb(${txd[k]},${txd[k + 1]},${txd[k + 2]})`;
      sg.fillRect(i * w, j * T, w, T);
      sg.globalCompositeOperation = "source-over";
      sg.globalAlpha = 1;
      sg.strokeStyle = "rgba(0,0,0,.28)";
      sg.lineWidth = 1;
      sg.strokeRect(i * w + 0.5, j * T + 0.5, w - 1, T - 1);
    }
  }

  const flou = document.createElement("canvas");
  flou.width = W;
  flou.height = H;
  const fg = flou.getContext("2d");
  fg.filter = "blur(1.5px) grayscale(1)";
  fg.drawImage(texture, 0, 0, W, H);

  // par ligne de pixels : rayon (×64), abscisse curviligne (×32), tuiles de la rangée
  const ed = new Uint8Array(H * 4), en = new Uint8Array(H * 4);
  for (let y = 0; y < H; y++) {
    const R = Math.round(Rr[y] * 64), A = Math.round(arc[y] * 32);
    ed[y * 4] = R >> 8; ed[y * 4 + 1] = R & 255; ed[y * 4 + 2] = A >> 8; ed[y * 4 + 3] = A & 255;
    en[y * 4] = nT[ligneDe(y)] || 0; en[y * 4 + 3] = 255;
  }
  return { W, H, T, C, Rr, Y0, NR, ligneDe, nT, bande, S, flou, ed, en };
}

export default function BurgerMosaique({ plats = [], onAjouter, tactile = false, onPret }) {
  const toile = useRef(null);
  const etat = useRef({ auto: true });
  const [pret, setPret] = useState(false);
  const [sansWebgl, setSansWebgl] = useState(false);
  const [photo, setPhoto] = useState(null); // { src, zone, x, y }
  const [ajoute, setAjoute] = useState(false);
  const [grandes, setGrandes] = useState([]);
  const carte = useRef(null);
  const onPretRef = useRef(onPret);
  onPretRef.current = onPret;

  useEffect(() => {
    const cv = toile.current;
    if (!cv) return;
    let fini = false, raf = 0, gl = null;
    const nettoyer = [];
    const reduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    (async () => {
      const [B, sprite, texture] = await Promise.all([
        fetch(DOSSIER + "burger.json").then((r) => r.json()),
        chargerImage(DOSSIER + "tuiles.webp"),
        chargerImage(DOSSIER + "texture.webp"),
      ]);
      if (fini) return;
      if (!sprite || !texture) { setSansWebgl(true); onPretRef.current?.(); return; }
      setGrandes([...new Set(B.grand)]);
      const D = preparer(B, sprite, texture);
      gl = cv.getContext("webgl", { premultipliedAlpha: false, antialias: true });
      if (!gl) { setSansWebgl(true); onPretRef.current?.(); return; }
      const shader = (type, src) => {
        const o = gl.createShader(type);
        gl.shaderSource(o, src);
        gl.compileShader(o);
        return o;
      };
      const pr = gl.createProgram();
      gl.attachShader(pr, shader(gl.VERTEX_SHADER, VS));
      gl.attachShader(pr, shader(gl.FRAGMENT_SHADER, FS));
      gl.linkProgram(pr);
      if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) { setSansWebgl(true); onPretRef.current?.(); return; }
      gl.useProgram(pr);
      gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
      const lp = gl.getAttribLocation(pr, "p");
      gl.enableVertexAttribArray(lp);
      gl.vertexAttribPointer(lp, 2, gl.FLOAT, false, 0, 0);
      [["S", D.S, gl.LINEAR], ["X", D.flou, gl.LINEAR], ["E", D.ed, gl.NEAREST], ["N", D.en, gl.NEAREST]].forEach(([nom, src, filtre], i) => {
        gl.activeTexture(gl.TEXTURE0 + i);
        gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
        if (src instanceof Uint8Array) gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, D.H, 0, gl.RGBA, gl.UNSIGNED_BYTE, src);
        else gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, src);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filtre);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filtre);
        gl.uniform1i(gl.getUniformLocation(pr, nom), i);
      });
      const U = (n) => gl.getUniformLocation(pr, n);
      gl.uniform1f(U("W"), D.W); gl.uniform1f(U("H"), D.H); gl.uniform1f(U("T"), D.T); gl.uniform1f(U("C"), D.C);
      gl.uniform1f(U("SH"), D.NR * D.T); gl.uniform1f(U("K"), K_CAMERA); gl.uniform1f(U("P"), MARGE); gl.uniform1f(U("Y0"), D.Y0);
      gl.uniform1f(U("tex"), TEXTURE);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

      const e = etat.current;
      let th = 0, tps = reduit ? 9 : 0, sur = [0, 0, 0], glisse = null, inertie = 0, tDebut = null, visible = false;
      const taille = () => {
        const dpr = Math.min(2, window.devicePixelRatio || 1), w = cv.clientWidth;
        cv.width = Math.round(w * dpr);
        cv.height = Math.round(((w * (D.H + 2 * MARGE)) / D.W) * dpr);
        gl.viewport(0, 0, cv.width, cv.height);
      };
      taille();
      const ro = new ResizeObserver(taille);
      ro.observe(cv);
      nettoyer.push(() => ro.disconnect());
      const io = new IntersectionObserver((es) => {
        visible = es[0].isIntersecting;
        if (visible && tDebut === null) tDebut = performance.now();
      });
      io.observe(cv);
      nettoyer.push(() => io.disconnect());

      let prec = performance.now();
      const rendu = (now) => {
        const dt = Math.min(0.05, (now - prec) / 1000);
        prec = now;
        if (visible) {
          if (tDebut !== null && !reduit) tps = (now - tDebut) / 1000;
          if (!glisse) {
            if (Math.abs(inertie) > 0.01) { th += inertie * dt; inertie *= Math.pow(0.04, dt); }
            else if (e.auto && !reduit && tps > 1.6) th += VITESSE * dt;
          }
          gl.uniform1f(U("th"), th); gl.uniform1f(U("tps"), tps); gl.uniform3f(U("sur"), ...sur);
          gl.clearColor(0, 0, 0, 0);
          gl.clear(gl.COLOR_BUFFER_BIT);
          gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        }
        raf = requestAnimationFrame(rendu);
      };
      raf = requestAnimationFrame(rendu);

      // la photo sous le pointeur : même calcul que le shader
      const rayon = (yy) => (yy < 0 || yy >= D.H ? 0 : D.Rr[Math.floor(yy)]);
      const pointe = (ev) => {
        const b = cv.getBoundingClientRect();
        const X0 = ((ev.clientX - b.left) / b.width) * D.W - D.C, y = ((ev.clientY - b.top) / b.height) * (D.H + 2 * MARGE) - MARGE;
        let ys = y, R = 0;
        for (let k = 0; k < 6; k++) { R = rayon(ys); ys = y - K_CAMERA * Math.sqrt(Math.max(R * R - X0 * X0, 0)); }
        R = rayon(ys);
        let u, j;
        if (R >= Math.abs(X0) && R > 1) { u = (Math.asin(Math.max(-0.999, Math.min(0.999, X0 / R))) + th) / (2 * Math.PI) + 0.5; j = D.ligneDe(Math.floor(ys)); }
        else {
          const pz = (y - D.Y0) / K_CAMERA;
          if (Math.hypot(X0, pz) > D.Rr[D.Y0] || y > D.Y0 + 2) return null;
          u = (Math.atan2(X0, pz) + th) / (2 * Math.PI) + 0.5; j = D.ligneDe(D.Y0);
        }
        u -= Math.floor(u);
        const i = Math.floor(u * D.nT[j]);
        const t = D.bande[j] && D.bande[j][i];
        return t ? { t, i, j } : null;
      };
      const bas = (ev) => {
        glisse = { x: ev.clientX, th0: th, dep: 0, vx: 0, lx: ev.clientX, lt: performance.now(), tactile: ev.pointerType !== "mouse" };
        if (!glisse.tactile) { cv.setPointerCapture(ev.pointerId); cv.classList.add("tire"); }
      };
      const bouge = (ev) => {
        if (glisse) {
          const dx = ev.clientX - glisse.x;
          glisse.dep = Math.max(glisse.dep, Math.abs(dx));
          if (glisse.tactile) return; // au doigt, le glissé fait défiler les panneaux
          th = glisse.th0 + (dx / cv.clientWidth) * Math.PI * 1.6;
          const now = performance.now();
          if (now > glisse.lt) { glisse.vx = (ev.clientX - glisse.lx) / (now - glisse.lt); glisse.lx = ev.clientX; glisse.lt = now; }
          return;
        }
        const p = pointe(ev);
        sur = p ? [p.i, p.j, 1] : [0, 0, 0];
        cv.style.cursor = p ? "pointer" : "grab";
      };
      const haut = (ev) => {
        if (!glisse) return;
        cv.classList.remove("tire");
        const g = glisse;
        glisse = null;
        if (g.dep < 8) {
          const p = pointe(ev);
          if (p) setPhoto({ src: B.grand[p.t.f], zone: p.t.z, x: ev.clientX, y: ev.clientY });
        } else if (!g.tactile) inertie = ((g.vx * 1000) / cv.clientWidth) * Math.PI * 1.6;
      };
      const annule = () => { glisse = null; cv.classList.remove("tire"); };
      const sort = () => { if (!glisse) sur = [0, 0, 0]; };
      cv.addEventListener("pointerdown", bas);
      cv.addEventListener("pointermove", bouge);
      cv.addEventListener("pointerup", haut);
      cv.addEventListener("pointercancel", annule);
      cv.addEventListener("pointerleave", sort);
      nettoyer.push(() => {
        cv.removeEventListener("pointerdown", bas);
        cv.removeEventListener("pointermove", bouge);
        cv.removeEventListener("pointerup", haut);
        cv.removeEventListener("pointercancel", annule);
        cv.removeEventListener("pointerleave", sort);
      });
      setPret(true);
      requestAnimationFrame(() => onPretRef.current?.());
    })();

    return () => {
      fini = true;
      cancelAnimationFrame(raf);
      nettoyer.forEach((f) => f());
      gl?.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  // Photo ouverte : la rotation s'arrête, Échap ferme, flèches pour naviguer.
  const ouverte = !!photo;
  useEffect(() => {
    etat.current.auto = !ouverte;
    if (!ouverte) return;
    const clavier = (e) => {
      if (e.key === "Escape") setPhoto(null);
      if (e.key === "ArrowLeft") voisine(-1);
      if (e.key === "ArrowRight") voisine(1);
    };
    window.addEventListener("keydown", clavier);
    return () => window.removeEventListener("keydown", clavier);
  });
  useEffect(() => {
    if (!photo || photo.x == null || !carte.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const b = carte.current.getBoundingClientRect();
    carte.current.animate(
      [
        { transform: `translate(${photo.x - (b.left + b.width / 2)}px,${photo.y - (b.top + b.height / 2)}px) scale(${40 / b.width})`, opacity: 0.4 },
        { transform: "none", opacity: 1 },
      ],
      { duration: 420, easing: "cubic-bezier(.2,1.2,.3,1)" }
    );
  }, [photo]);

  const voisine = (pas) =>
    setPhoto((p) => {
      if (!p || !grandes.length) return p;
      const i = grandes.indexOf(p.src);
      return { src: grandes[(i + pas + grandes.length) % grandes.length], zone: null };
    });

  const cle = photo ? PLATS_DES_PHOTOS[photo.src] : null;
  const plat = cle ? plats.find((p) => cle.test(sansAccents(p.name))) : null;
  const titre = plat ? plat.name : photo && /^photo-/.test(photo.src) ? "Salade fraîche" : "Yoss Food";
  const legende = photo
    ? [plat ? prix(plat.price) : null, photo.zone ? `zone ${ZONES[photo.zone] || photo.zone} du burger` : `photo ${grandes.indexOf(photo.src) + 1} / ${grandes.length}`]
        .filter(Boolean)
        .join(" · ")
    : "";

  return (
    <>
      <canvas
        ref={toile}
        className={`burger-mosaique${pret ? " pret" : ""}`}
        style={{ touchAction: tactile ? "pan-x pan-y" : "pan-y" }}
        aria-label="Burger fait de photos Yoss Food, qui tourne sur lui-même. Touchez une photo pour l'agrandir."
        role="img"
      />
      {sansWebgl ? <img className="burger-repli" src="/yoss/carton-hero.jpg" alt="Carton Yoss Food" /> : null}
      {photo && typeof document !== "undefined"
        ? createPortal(
            <div className="yf2-vis" role="dialog" aria-modal="true" aria-label={titre} onClick={(e) => e.target === e.currentTarget && setPhoto(null)}>
              <div className="carte" ref={carte}>
                <button type="button" className="x" aria-label="Fermer" onClick={() => setPhoto(null)}>✕</button>
                <button type="button" className="fl g" aria-label="Photo précédente" onClick={() => voisine(-1)}>‹</button>
                <button type="button" className="fl d" aria-label="Photo suivante" onClick={() => voisine(1)}>›</button>
                <img src={DOSSIER + "grand/" + photo.src} alt={titre} />
                <div className="bas">
                  <div>
                    <div className="nom">{titre}</div>
                    <div className="zone">{legende}</div>
                  </div>
                  {plat && onAjouter ? (
                    <button
                      type="button"
                      className="cmd"
                      onClick={() => {
                        onAjouter(plat);
                        setAjoute(true);
                        // l'ajout ouvre le panier : on referme la photo pour le laisser voir
                        setTimeout(() => { setAjoute(false); setPhoto(null); }, 650);
                      }}
                    >
                      {ajoute ? "Ajouté ✓" : "Ajouter au panier"}
                    </button>
                  ) : null}
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
}
