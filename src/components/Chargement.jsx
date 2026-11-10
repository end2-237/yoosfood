// ─────────────────────────────────────────────────────────────────────────────
// Écran de chargement de l'accueil : le logo Yoss Food se remplit de photos qui
// tombent au rythme du chargement. Logo plein = site prêt.
//
// Composant serveur : son script est dans la page envoyée et construit l'écran
// dès la lecture du HTML, avant même le JavaScript de l'accueil (rendu côté
// client). L'écran est ajouté hors de l'arbre React : rien à hydrater.
// - une seule fois par visite (sessionStorage) ;
// - au moins 1,2 s, jamais plus longtemps que nécessaire (au plus 8 s) ;
// - sans animation si l'appareil demande moins d'animations.
// L'accueil signale qu'il est prêt avec window.__yfPret().
// Images : public/yoss/chargement/ (142 Ko en tout).
// ─────────────────────────────────────────────────────────────────────────────

import { preload } from "react-dom";

// [x %, y %, rotation, échelle] de chaque photo dans le logo
const PILE = [[84.32,73.03,-25.5,0.96],[75.76,77.12,-24.2,1.25],[13.71,88.53,7.7,1.15],[46.44,37.54,16.8,1.27],[77.8,39.84,13.1,0.96],[66.06,57.8,7.2,0.98],[78.56,34.47,-27.4,1.03],[18.94,43.16,-18.3,1.14],[36.82,43.24,-5.5,1.25],[61.21,58.48,-14.5,0.85],[23.56,82.4,33.4,0.82],[86.36,57.54,4.2,1.22],[85.76,76.27,-29.8,0.87],[85.76,40.26,17.4,0.79],[88.33,53.29,-3.8,0.78],[18.79,38.64,-15.3,1.04],[42.95,36.01,-28.5,0.83],[57.5,55.67,33.6,1.11],[24.62,80.69,1.5,1.27],[85.23,74.48,-32.5,0.76],[50.98,49.71,14.1,1.28],[70.08,29.37,6.9,0.79],[89.39,32.52,16.1,0.93],[35.68,32.86,-29.7,1.05],[59.55,83.33,-31.9,1.26],[65.23,83.33,14.3,1.19],[53.18,48.6,-10.4,1.13],[68.48,33.11,26.0,0.98],[42.27,86.82,-32.9,1.02],[8.03,28.77,8.7,0.96],[40.08,73.97,-34.1,0.79],[78.11,33.79,9.8,1.3],[33.33,53.63,16.0,0.96],[30.38,83.25,13.6,1.0],[81.59,56.44,23.7,0.8],[13.94,84.18,1.0,0.92],[91.14,33.62,-1.3,0.88],[17.73,81.12,-27.1,1.18],[52.05,78.91,29.4,0.89],[6.97,28.43,-9.2,0.83],[85.98,76.1,-20.8,0.84],[41.29,48.69,11.2,0.99],[31.52,42.39,-12.1,1.12],[19.62,40.01,9.4,1.19],[62.42,84.44,29.0,1.23],[82.8,51.67,-19.6,1.26],[83.86,40.6,-25.5,1.02],[37.95,89.8,27.7,0.77],[84.7,32.35,31.5,0.9],[11.36,38.22,-27.1,1.01],[61.14,40.86,23.2,0.96],[47.05,63.59,-0.4,0.92],[10.15,89.97,23.9,1.09],[28.64,47.16,-29.8,0.77],[62.58,75.84,-32.1,1.14],[28.56,72.52,-10.2,1.11],[24.17,71.67,-33.7,0.82],[83.33,55.92,-21.7,1.17],[59.85,43.75,-18.4,0.83],[83.11,31.32,33.9,0.81],[89.02,34.73,9.1,1.11],[43.64,87.84,-9.2,0.79],[79.32,39.92,-21.0,1.01],[82.88,38.73,15.0,1.17],[8.18,68.18,15.0,0.85],[63.18,44.09,19.5,1.05],[45.38,63.67,0.0,1.3],[11.21,37.62,-7.5,1.19],[11.52,41.45,-28.9,1.26],[54.17,82.48,-7.8,1.0],[11.52,39.92,8.8,1.25],[31.36,51.16,3.5,1.11],[13.48,60.18,20.8,1.27],[67.12,56.52,-12.1,1.29],[81.67,34.22,15.5,1.2],[19.77,77.97,29.7,0.82],[67.12,42.39,28.0,1.29],[87.27,46.39,2.6,1.18],[30.61,47.16,-16.7,1.15],[60.91,28.86,-10.6,0.8],[44.24,55.07,-11.1,0.98],[63.26,44.26,-0.9,0.77],[62.65,87.93,25.7,0.99],[60.68,30.56,-22.9,0.93],[54.17,86.65,29.1,1.01],[16.67,63.07,28.0,1.04],[20.38,79.93,13.3,1.27],[38.79,58.65,5.5,1.13],[33.48,84.7,-19.5,1.04],[31.14,45.2,23.2,1.06],[49.39,37.88,1.6,1.21],[17.5,71.16,-17.0,1.12],[54.92,90.4,25.9,1.09],[70.53,46.05,24.6,1.28],[48.33,64.44,-15.9,1.02],[74.7,53.29,2.5,1.03],[73.94,75.67,-8.6,1.05],[65.45,31.15,1.1,0.97],[75.68,87.42,34.3,0.82],[37.88,33.96,13.4,0.79],[7.5,68.61,-2.9,1.26],[41.74,87.42,29.6,0.9],[13.86,57.2,-0.5,0.94],[54.55,88.36,30.5,1.26],[33.79,64.69,-12.8,0.86],[74.09,76.52,-32.9,0.89],[63.18,81.29,19.6,0.76],[13.71,39.75,-24.1,0.76],[82.05,44.77,-12.5,0.95],[34.55,76.69,-0.1,1.02],[14.77,73.97,-26.4,1.03],[17.12,42.9,15.2,1.14],[41.44,54.82,-33.4,1.1],[70.15,88.95,2.1,0.84],[19.17,40.35,25.5,1.04],[42.27,41.11,2.1,1.22],[84.09,76.1,6.1,0.83],[24.47,83.59,9.0,0.94],[60.98,38.9,-12.9,0.92],[45.38,39.75,-19.7,1.3],[60.68,34.13,-25.6,0.88],[44.85,82.74,-28.8,0.96],[81.82,54.65,23.3,0.98],[81.36,86.74,14.3,0.86],[42.8,77.2,13.0,0.76],[80.0,40.09,4.9,0.95],[52.95,88.7,32.8,0.81],[31.59,61.03,9.4,0.94],[43.11,80.35,23.3,1.19],[42.05,57.8,-27.6,0.77],[85.53,70.05,7.9,1.25],[63.03,57.71,-24.7,0.85],[83.18,40.26,-22.9,0.84],[27.58,44.77,29.9,0.8],[40.3,32.26,-25.6,1.12],[65.91,33.11,18.5,0.93],[35.23,56.78,-5.1,0.95],[13.33,40.69,7.1,0.76],[83.94,81.21,-32.1,0.86],[65.15,53.12,-3.2,1.16]];

const SCRIPT = `(function(){
window.__yfPret=function(){};
var vu=false;try{vu=sessionStorage.getItem("yf-chargement")==="1"}catch(e){}
if(vu)return;
var P=${JSON.stringify(PILE)},h="";
for(var j=0;j<P.length;j++){var q=P[j];h+='<div class="p" style="left:'+q[0]+'%;top:'+q[1]+'%;--r:'+q[2]+'deg;--s:'+q[3]+'"><i style="background-position:'+((j%14)/13*100)+'% '+(Math.floor(j/14)/9*100)+'%"></i></div>'}
var el=document.createElement("div");el.id="yf-chargement";el.setAttribute("role","status");el.setAttribute("aria-label","Chargement de Yoss Food");
el.innerHTML='<div class="lg"><div class="pile">'+h+'</div><img class="dessus" src="/yoss/chargement/logo-dessus.webp" alt="Yoss Food" width="400" height="356"></div><div class="pc">0 %</div>';
document.body.appendChild(el);
try{sessionStorage.setItem("yf-chargement","1")}catch(e){}
var calme=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
var ps=el.querySelectorAll(".p"),pc=el.querySelector(".pc"),t0=performance.now(),pret=false,reel=.1,aff=0,fin=false;
function etape(f){reel=Math.max(reel,f)}
if(document.readyState!=="loading")etape(.35);else document.addEventListener("DOMContentLoaded",function(){etape(.35)});
window.addEventListener("load",function(){etape(.7)});
window.__yfPret=function(){pret=true;reel=1};
setTimeout(window.__yfPret,8000);
function boucle(){
 var temps=Math.min(1,(performance.now()-t0)/1200);
 var cible=Math.min(pret?1:Math.min(reel,.9),Math.max(temps,calme?1:0));
 aff+=(cible-aff)*.18;if(cible-aff<.004)aff=cible;
 var n=calme?ps.length:Math.round(aff*ps.length);
 for(var i=0;i<n;i++)ps[i].classList.add("tombe");
 pc.textContent=Math.round((calme?cible:aff)*100)+" %";
 if(pret&&temps>=1&&(calme||aff>=.999)&&!fin){fin=true;pc.textContent="100 %";
  setTimeout(function(){el.classList.add("fini");setTimeout(function(){el.remove()},600)},calme?0:300);return}
 requestAnimationFrame(boucle)}
requestAnimationFrame(boucle);
})();`;

export default function Chargement() {
  preload("/yoss/chargement/logo-dessus.webp", { as: "image" });
  preload("/yoss/chargement/logo-photos.webp", { as: "image" });
  preload("/yoss/chargement/logo-masque.webp", { as: "image", crossOrigin: "anonymous" });
  return <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />;
}
