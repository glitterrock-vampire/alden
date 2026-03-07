import { a as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead, d as addAttribute } from '../chunks/astro/server_fjjE5Lvm.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Layout, a as $$Nav, c as $$Button, b as $$Footer } from '../chunks/Footer_BEDHIogd.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const HERO_LETTERS = ["A", "L", "D", "E", "N"];
  const EXPERTISE_ITEMS = [
    "Software Development",
    "UI / VISUAL DESIGN",
    "USER EXPERIENCE DESIGN",
    "enterprise design thinking",
    "RESEARCH / STRATEGY",
    "BRAND MANAGEMENT"
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "ALDEN | Sr Visual Designer" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Nav", $$Nav, { "currentPage": "home" })}  ${maybeRenderHead()}<div class="grain-overlay"></div>  <div class="page-video-bg" id="pageVideoBg"> <div class="page-dark-overlay"></div> <div class="page-video-wrap" id="pageVideoWrap"> <video src="https://framerusercontent.com/assets/WTjKqrn8HNXvDANMM6KjIZoIHI.mp4" muted playsinline preload="auto" class="page-video"></video> </div> </div> <main class="main"> <!-- Hero Section --> <section class="hero"> <div class="hero-alden-logo"> ${HERO_LETTERS.map((letter, index) => renderTemplate`<div class="alden-letter"${addAttribute(letter, "data-letter")}${addAttribute(index, "data-index")}> ${letter} </div>`)} </div> <div class="hero-subtitle"> <span>Technology · Design · Innovation</span> </div> <div class="hero-content"> <div class="hero-description"> <div class="hero-role"> <h2 class="hero-role-visual" data-animate-hero="visual" data-delay="0.6">the technology</h2> <h2 class="hero-role-swimmer" data-animate-hero="swimmer" data-delay="0.7">design</h2> <h2 class="hero-role-and" data-animate-hero="and" data-delay="0.8">innovation</h2> <span class="letter-char" style="display:inline-block;opacity:0.001;transform:translateX(0px) translateY(10px) scale(1) rotate(0deg) skewX(0deg) skewY(0deg)">c</span> <span class="letter-char" style="display:inline-block;opacity:0.001;transform:translateX(0px) translateY(10px) scale(1) rotate(0deg) skewX(0deg) skewY(0deg)">t</span> <span class="letter-char" style="display:inline-block;opacity:0.001;transform:translateX(0px) translateY(10px) scale(1) rotate(0deg) skewX(0deg) skewY(0deg)">i</span> <span class="letter-char" style="display:inline-block;opacity:0.001;transform:translateX(0px) translateY(10px) scale(1) rotate(0deg) skewX(0deg) skewY(0deg)">o</span> <span class="letter-char" style="display:inline-block;opacity:0.001;transform:translateX(0px) translateY(10px) scale(1) rotate(0deg) skewX(0deg) skewY(0deg)">n</span> </div> </div> <div class="hero-scroll" data-animate-hero="scroll" data-delay="1.2"> <span class="scroll-instruction">[SCROLL DOWN] 請下去 [DOWN]</span> <span class="scroll-text">[NICE TO MEET YOU]</span> <span class="scroll-chinese">「很高興見到你」</span> </div> </div> <div class="hero-background"> <div class="hero-overlay"></div> <video class="hero-video" src="/videos/hero-background.mp4" autoplay loop muted playsinline></video> </div> </section> <!-- Development Work Section --> <section class="development-work"> <div class="section-container"> <div class="hero-subtitle"> <h2 class="featured-work-title">COLLECTION OF WORK</h2> </div> <h3 class="section-title">DEVELOPMENT</h3> <div class="dev-grid"> <div class="dev-item"> <h3>Technology</h3> <p>Web platforms and scalable infrastructure</p> <p>React · Next.js · Node · Flutter · APIs</p> </div> <div class="dev-item"> <h3>Digital Products</h3> <p>Platforms and connected experiences</p> <p>UX · UI · Systems · IoT</p> </div> <div class="dev-item"> <h3>Strategy</h3> <p>Insight and direction</p> <p>Research · Product Strategy · Roadmaps</p> </div> </div> <a href="/work" class="section-link">View Development Projects →</a> <div class="spacer"></div> <h3 class="section-title">PHOTOGRAPHY</h3> <div class="photo-categories"> <span class="photo-text">· Landscapes · Portraits · Events</span> </div> <a href="/photography" class="section-link photo-link">View Photography →</a> </div> </section> <!-- Custom Cursor Dot --> <div class="cursor-dot" id="cursorDot"></div> <!-- Info Section --> <section class="info"> <div class="info-hero"> <div class="info-left"> <h2 class="info-hero-in">INFO</h2> </div> </div> <div class="info-content"> <h3 class="info-title">
A <span class="title-bracket">[</span>multidisciplinary<span class="title-bracket">]</span>
perspective informed by <span class="title-name">technology</span>,
<span class="title-name">design</span>, and <span class="title-name">brand strategy</span>.
</h3> <div class="info-text"> <p>A multidisciplinary perspective informed by technology, design, and brand strategy.</p> <p>A strategic approach led by clarity, precision, and intent.</p> <p>Every digital experience is engineered to be intuitive, scalable, and enduring.</p> </div> </div> <div class="info-divider"> <div class="divider-line"></div> <div class="divider-text">﹁<br>技<br>術<br>﹂</div> <div class="divider-line"></div> </div> <div class="info-expertise"> <div class="expertise-right"> <h4 class="expertise-title"> <span class="expertise-quiet">Quietly</span> <span class="expertise-powerful">powerful</span>
Digital Experiences
</h4> <p class="expertise-description">
Design to me is a bridge between emotion and function. My goal has always been to 
            elevate everyday interactions into something more meaningful and crucially, quietly 
            threading in moments of joy that catch us by surprise and stay with us for years to come.
</p> ${renderComponent($$result2, "Button", $$Button, { "href": "/info", "variant": "light", "chineseText": "all caqps", "class": "hover-lift", "style": "color: #2f2f2f !important; text-shadow: 0 0 8px rgba(255,255,255,0.8) !important; background: rgba(255,255,255,0.1) !important; padding: 20px 32px !important; border: 1px solid rgba(47,47,47,0.3) !important; mix-blend-mode: normal !important; font-size: 18px !important; letter-spacing: 1px !important; line-height: 1.6 !important; min-height: 60px !important;" }, { "default": ($$result3) => renderTemplate`
all caqps
` })} </div> <div class="expertise-list" data-animate> <span class="list-label">[EXPERTISE AND SERVICES]</span> <div class="list-items"> ${EXPERTISE_ITEMS.map((item, index) => renderTemplate`<div class="list-item"${addAttribute(`--delay: ${index * 0.1}s`, "style")}>${item}</div>`)} </div> </div> </div> </section> ${renderComponent($$result2, "Footer", $$Footer, {})} </main> ` })}  `;
}, "/Users/user/Downloads/alden-designs/src/pages/index.astro", void 0);

const $$file = "/Users/user/Downloads/alden-designs/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
