import { c as createAstro, a as createComponent, b as renderTemplate, e as renderSlot, f as renderHead, d as addAttribute, m as maybeRenderHead, r as renderComponent } from './astro/server_fjjE5Lvm.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
/* empty css                         */

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro$3 = createAstro("https://www.mason-wong.com");
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Layout;
  const {
    title = "ALDEN | Sr Visual Designer",
    description = "ALDEN is a Senior Visual Designer currently at IBM iX. Working with global businesses in creating industry-leading, immersive experiences.",
    ogImage = "https://framerusercontent.com/assets/po9x9AirrMmaeOyiuCXRkTVzQwc.png"
  } = Astro2.props;
  return renderTemplate(_a || (_a = __template(['<html lang="en-GB" data-astro-cid-sckkx6r4> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><title>', '</title><meta name="description"', '><!-- Favicon --><link rel="icon" href="/favicon.png" media="(prefers-color-scheme: light)"><link rel="icon" href="/favicon-dark.png" media="(prefers-color-scheme: dark)"><link rel="apple-touch-icon" href="/apple-touch-icon.png"><!-- Open Graph --><meta property="og:type" content="website"><meta property="og:title"', '><meta property="og:description"', '><meta property="og:image"', '><!-- Twitter --><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"', '><meta name="twitter:description"', '><meta name="twitter:image"', '><!-- Google Analytics --><script async src="https://www.googletagmanager.com/gtag/js?id=G-499YNMHRWW"><\/script><!-- Font preconnect --><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><!-- Preload critical fonts --><link rel="preload" href="https://fonts.gstatic.com/s/koulen/v30/AMOQz46as3KIBPemhXo8.woff2" as="font" type="font/woff2" crossorigin><link rel="preload" href="https://fonts.gstatic.com/s/robotomono/v31/L0x5DF4xlVMF-BfR8bXMIjhLq38.woff2" as="font" type="font/woff2" crossorigin>', "</head> <body data-astro-cid-sckkx6r4> ", " <!-- Animation Script -->    <!-- Remove loading class after page load -->  </body> </html>"])), title, addAttribute(description, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(ogImage, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(ogImage, "content"), renderHead(), renderSlot($$result, $$slots["default"]));
}, "/Users/user/Downloads/alden-designs/src/layouts/Layout.astro", void 0);

const $$Astro$2 = createAstro("https://www.mason-wong.com");
const $$Nav = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Nav;
  const { currentPage = "home" } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<nav class="nav" id="main-nav" data-appear="nav" data-astro-cid-dmqpwcec> <div class="nav-container" data-astro-cid-dmqpwcec> <!-- Logo --> <a href="/" class="logo" data-astro-cid-dmqpwcec> <span class="nav-letter" data-astro-cid-dmqpwcec>A</span> <span class="nav-letter" data-astro-cid-dmqpwcec>L</span> <span class="nav-letter" data-astro-cid-dmqpwcec>D</span> <span class="nav-letter" data-astro-cid-dmqpwcec>E</span> <span class="nav-letter" data-astro-cid-dmqpwcec>N</span> </a> <!-- Navigation Links --> <div class="nav-links" data-astro-cid-dmqpwcec> <a href="/"${addAttribute(`nav-link ${currentPage === "home" ? "active" : ""}`, "class")} onclick="handleNavClick(event, '/')" data-astro-cid-dmqpwcec> <span class="nav-link-text" data-astro-cid-dmqpwcec>HOME</span> </a> <a href="/work"${addAttribute(`nav-link ${currentPage === "work" ? "active" : ""}`, "class")} onclick="handleNavClick(event, '/work')" data-astro-cid-dmqpwcec> <span class="nav-link-text" data-astro-cid-dmqpwcec>WORK</span> </a> <a href="/info"${addAttribute(`nav-link ${currentPage === "info" ? "active" : ""}`, "class")} onclick="handleNavClick(event, '/info')" data-astro-cid-dmqpwcec> <span class="nav-link-text" data-astro-cid-dmqpwcec>INFO</span> </a> </div> <!-- Date Display --> <div class="nav-year" data-astro-cid-dmqpwcec> <span class="year-current" data-astro-cid-dmqpwcec></span> <span class="day-current" data-astro-cid-dmqpwcec></span> </div> </div> </nav>   `;
}, "/Users/user/Downloads/alden-designs/src/components/Nav.astro", void 0);

const $$Astro$1 = createAstro("https://www.mason-wong.com");
const $$MusicPlayer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$MusicPlayer;
  const { size = "medium" } = Astro2.props;
  const sizeClasses = {
    small: "music-player-small",
    medium: "music-player-medium",
    large: "music-player-large"
  };
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`music-player ${sizeClasses[size]}`, "class")} id="musicPlayer" data-astro-cid-nuxxkkcb> <div class="player-lp" id="playerLp" data-astro-cid-nuxxkkcb> <div class="player-label" data-astro-cid-nuxxkkcb></div> <div class="vinyl-grooves" data-astro-cid-nuxxkkcb></div> </div> <div class="player-album" id="playerAlbum" data-astro-cid-nuxxkkcb> <div class="album-cover" id="albumCover" data-astro-cid-nuxxkkcb> <img id="albumImage" src="/api/default-album" alt="Album Cover" data-astro-cid-nuxxkkcb> </div> <div class="album-overlay" data-astro-cid-nuxxkkcb> <img src="/images/album-overlay.png" alt="" loading="lazy" data-astro-cid-nuxxkkcb> </div> <div class="playback-indicator" id="playbackIndicator" data-astro-cid-nuxxkkcb> <div class="indicator-dot" data-astro-cid-nuxxkkcb></div> </div> </div> <div class="player-info" data-astro-cid-nuxxkkcb> <span class="player-label-top" id="currentStatus" data-astro-cid-nuxxkkcb>[CONNECTING TO SPOTIFY...]</span> <span class="player-label-bottom" id="trackInfo" data-astro-cid-nuxxkkcb>[PLEASE WAIT]</span> <span class="player-label-history" id="lastPlayed" data-astro-cid-nuxxkkcb>[LAST: --]</span> </div> </div>  `;
}, "/Users/user/Downloads/alden-designs/src/components/MusicPlayer.astro", void 0);

const $$BackToTop = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="back-to-top" id="back-to-top" data-astro-cid-wlspcwf4> <div class="top-arrow" data-astro-cid-wlspcwf4>↑</div> <span class="top-tooltip" data-astro-cid-wlspcwf4>Back to top</span> </div>  `;
}, "/Users/user/Downloads/alden-designs/src/components/BackToTop.astro", void 0);

const $$Astro = createAstro("https://www.mason-wong.com");
const $$Button = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Button;
  const {
    href,
    children,
    chineseText,
    variant = "default",
    size = "medium",
    className = "",
    target = "_self"
  } = Astro2.props;
  const variantClasses = {
    default: "button-default",
    dark: "button-dark",
    light: "button-light"
  };
  const sizeClasses = {
    small: "button-small",
    medium: "button-medium",
    large: "button-large"
  };
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(href, "href")}${addAttribute(`button ${variantClasses[variant]} ${sizeClasses[size]} ${className}`, "class")}${addAttribute(target, "target")} data-astro-cid-vnzlvqnm> <span class="button-text" data-astro-cid-vnzlvqnm>${children}</span> ${chineseText && renderTemplate`<span class="button-chinese" data-astro-cid-vnzlvqnm>${chineseText}</span>`} </a> `;
}, "/Users/user/Downloads/alden-designs/src/components/Button.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<footer class="footer" data-astro-cid-sz7xmlte> <div class="footer-container" data-astro-cid-sz7xmlte> <div class="footer-top" data-astro-cid-sz7xmlte> <span class="footer-name" data-astro-cid-sz7xmlte>[ALDEN]</span> <span class="footer-copyright" data-astro-cid-sz7xmlte>[COPYRIGHT 2026]</span> </div> <div class="footer-middle" data-astro-cid-sz7xmlte> <div class="footer-title" data-astro-cid-sz7xmlte> <span class="title-line footer-come" data-animate="COME" id="footerCome" data-astro-cid-sz7xmlte>COME</span> <span class="title-line footer-say" data-animate="say" id="footerSay" data-astro-cid-sz7xmlte>say</span> <span class="title-line footer-hello" data-animate="HELLO" id="footerHello" data-astro-cid-sz7xmlte>HELLO</span> </div> <div class="footer-chinese" data-astro-cid-sz7xmlte> <span class="chinese-char" data-animate="﹁" data-astro-cid-sz7xmlte>﹁</span> <span class="chinese-char" data-animate="你" data-astro-cid-sz7xmlte>你</span> <span class="chinese-char" data-animate="好" data-astro-cid-sz7xmlte>好</span> <span class="chinese-char" data-animate="﹂" data-astro-cid-sz7xmlte>﹂</span> </div> <div class="footer-player" data-astro-cid-sz7xmlte> <span class="player-label" data-astro-cid-sz7xmlte>[CURRENTLY ON REPEAT]</span> ${renderComponent($$result, "MusicPlayer", $$MusicPlayer, { "size": "medium", "data-astro-cid-sz7xmlte": true })} <span class="player-label-bottom" data-astro-cid-sz7xmlte>[LC - MEAN IT IN THE MORNING]</span> </div> </div> <div class="footer-bottom" data-astro-cid-sz7xmlte> ${renderComponent($$result, "Button", $$Button, { "href": "https://www.linkedin.com/in/andre-walters-ja/", "variant": "light", "size": "medium", "target": "_blank", "class": "social-linkedin", "data-astro-cid-sz7xmlte": true }, { "default": ($$result2) => renderTemplate`
LINKEDIN
` })} ${renderComponent($$result, "BackToTop", $$BackToTop, { "data-astro-cid-sz7xmlte": true })} ${renderComponent($$result, "Button", $$Button, { "href": "https://www.instagram.com/andre_walters_ja/", "variant": "light", "size": "medium", "target": "_blank", "class": "social-instagram", "data-astro-cid-sz7xmlte": true }, { "default": ($$result2) => renderTemplate`
INSTAGRAM
` })} </div> </div> <div class="footer-border" data-astro-cid-sz7xmlte></div> <div class="footer-bg-blur" data-astro-cid-sz7xmlte> <img src="/images/footer-bg.jpg" alt="" loading="lazy" data-astro-cid-sz7xmlte> </div> </footer>  `;
}, "/Users/user/Downloads/alden-designs/src/components/Footer.astro", void 0);

export { $$Layout as $, $$Nav as a, $$Footer as b, $$Button as c };
