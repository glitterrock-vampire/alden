import { a as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead, d as addAttribute } from '../chunks/astro/server_fjjE5Lvm.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Layout, a as $$Nav, b as $$Footer } from '../chunks/Footer_BEDHIogd.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const WORK_LETTERS = ["W", "O", "R", "K"];
  const projects = [
    { id: 1, title: "CDT JAMAICA", category: "DIGITAL PLATFORM", href: "https://cdtjamaica.org", image: "https://framerusercontent.com/images/o6w4CVRNseGWbrL67Z02tHFMU.png", imageW: 1628, imageH: 1119, liveUrl: "https://cdtjamaica.org" },
    { id: 2, title: "TOTALLY BAKED", category: "E-COMMERCE", href: "https://totally-baked-ja.vercel.app", image: "https://framerusercontent.com/images/XbAyT67MOmZ9iWY72g8FEkEZZFM.png", imageW: 2718, imageH: 1810, liveUrl: "https://totally-baked-ja.vercel.app" },
    { id: 3, title: "ZENITH TEAS", category: "TEA MANAGEMENT", href: "https://zenith-taupe.vercel.app", image: "https://framerusercontent.com/images/jGIDW70qyfBuP6v8UKUwumU8HGo.png", imageW: 1628, imageH: 1119, liveUrl: "https://zenith-taupe.vercel.app" },
    { id: 4, title: "GLOWING LANDING", category: "LANDING PAGE", href: "https://glowing-landing-page.netlify.app", image: "https://framerusercontent.com/images/Dqg69EBbfiJJHyD2a4T7Ki7uPuc.png", imageW: 1628, imageH: 1119, liveUrl: "https://glowing-landing-page.netlify.app" },
    { id: 5, title: "BLACKBOX SYSTEM", category: "IOT SYSTEM", href: "https://blackbox-online.vercel.app", image: "https://framerusercontent.com/images/fKFKHb1VZsz50W8Ctq7RIZW4SRw.png", imageW: 1628, imageH: 1119, liveUrl: "https://blackbox-online.vercel.app" }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Work \u2014 ALDEN", "description": "Selected work by ALDEN, Sr Visual Designer currently at IBM iX.", "data-astro-cid-57l5znwr": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Nav", $$Nav, { "currentPage": "work", "data-astro-cid-57l5znwr": true })}  ${maybeRenderHead()}<div class="grain-overlay" data-astro-cid-57l5znwr></div>  <div class="page-video-bg" id="pageVideoBg" data-astro-cid-57l5znwr> <div class="page-dark-overlay" data-astro-cid-57l5znwr></div> <div class="page-video-wrap" id="pageVideoWrap" data-astro-cid-57l5znwr> <video src="https://framerusercontent.com/assets/WTjKqrn8HNXvDANMM6KjIZoIHI.mp4" muted playsinline preload="auto" class="page-video" data-astro-cid-57l5znwr></video> </div> </div>  <section class="hero" id="hero" data-astro-cid-57l5znwr> <!-- Giant "WORK" letters (fecytw): y -230→0, delay 2.4s --> <div class="hero-letter-wrap" data-astro-cid-57l5znwr> ${WORK_LETTERS.map((letter, index) => renderTemplate`<span class="hero-letter"${addAttribute(letter, "data-letter")}${addAttribute(index, "data-index")} data-astro-cid-57l5znwr> ${letter} </span>`)} </div> </section>  <section class="cream-section" style="padding-top: 120px;" data-astro-cid-57l5znwr> <!-- Horizontal scroll gallery --> <div class="hscroll-outer" id="hscrollOuter" data-astro-cid-57l5znwr> <div class="hscroll-sticky" data-astro-cid-57l5znwr> <div class="hscroll-track" id="hscrollTrack" data-astro-cid-57l5znwr> ${projects.map((p) => renderTemplate`<div${addAttribute(`card${p.comingSoon ? " card--soon" : ""}`, "class")}${addAttribute(p.id, "data-project-id")}${addAttribute(p.title, "aria-label")} data-astro-cid-57l5znwr> <div class="card-bg" data-astro-cid-57l5znwr> ${p.liveUrl ? renderTemplate`<iframe${addAttribute(p.liveUrl, "src")}${addAttribute(`${p.title} Live Preview`, "title")} loading="lazy" class="card-live-preview" sandbox="allow-same-origin allow-scripts allow-popups allow-forms" referrerpolicy="no-referrer" allowfullscreen data-astro-cid-57l5znwr></iframe>` : renderTemplate`<img${addAttribute(`${p.image}?scale-down-to=1024&width=${p.imageW}&height=${p.imageH}`, "src")}${addAttribute(p.imageW, "width")}${addAttribute(p.imageH, "height")}${addAttribute(p.id <= 3 ? "eager" : "lazy", "loading")}${addAttribute(`${p.title} project`, "alt")} class="card-bg-img" data-astro-cid-57l5znwr>`} </div> <div class="card-labels" data-astro-cid-57l5znwr> <span${addAttribute(`card-title-text ${p.id === 1 ? "cdt-title" : ""}`, "class")} data-astro-cid-57l5znwr>${p.title}</span> <span class="card-category-text" data-astro-cid-57l5znwr>${p.category}</span> </div> ${p.comingSoon && renderTemplate`<div class="card-soon" data-astro-cid-57l5znwr>COMING SOON</div>`} ${p.liveUrl && renderTemplate`<a${addAttribute(p.liveUrl, "href")} target="_blank" class="card-live-link" data-astro-cid-57l5znwr> <span class="live-link-text" data-astro-cid-57l5znwr>VIEW LIVE SITE →</span> </a>`} </div>`)} <!-- Spacer tile for better scroll visibility of last item --> <div class="card-spacer" data-astro-cid-57l5znwr></div> </div> </div> </div> </section> ${renderComponent($$result2, "Footer", $$Footer, { "data-astro-cid-57l5znwr": true })} ` })} <!-- ─────────────────────────────────────────────────────────────────────
     STYLES
     Note: Layout.astro's global \`* { transition: 0.3s }\` rule would
     interfere with the precisely-timed CSS animations below. We cancel
     it for every animated element with \`transition: none\` inside the
     .loading class (already done by Layout) and re-declare our own
     transition values explicitly so they always win via specificity.
──────────────────────────────────────────────────────────────────────── -->    `;
}, "/Users/user/Downloads/alden-designs/src/pages/work/index.astro", void 0);

const $$file = "/Users/user/Downloads/alden-designs/src/pages/work/index.astro";
const $$url = "/work";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
