document.addEventListener("DOMContentLoaded",()=>{window.scrollTo(0,0),setTimeout(()=>{document.body.classList.remove("loading")},100)});window.addEventListener("load",()=>{window.scrollTo(0,0)});(function(){window.scrollTo(0,0);class i{constructor(){this.init()}init(){window.scrollTo(0,0),this.setupIntersectionObserver(),this.setupHoverEffects(),this.setupParallax(),this.setupStaggeredAnimations(),this.setupLoadingAnimations(),this.setupSmoothScroll()}setupIntersectionObserver(){const a={threshold:[0,.1,.2,.3,.4,.5,.6,.7,.8,.9,1],rootMargin:"0px 0px -10px 0px"},r=new IntersectionObserver(e=>{e.forEach(t=>{const s=t.intersectionRatio;if(t.target.closest(".hero-content")&&!t.target.classList.contains("alden-letter")){const o=Math.min(1,s+.3),n=.95+s*.05;t.target.style.filter="none",t.target.style.opacity=o,t.target.style.transform=`scale(${n})`,t.target.style.transition="all 0.3s ease-out"}else if(t.target.classList.contains("featured"))t.isIntersecting?(t.target.style.filter="none",t.target.style.opacity="1",t.target.style.transform="translateY(0) scale(1)",document.querySelector(".nav").classList.add("nav--light")):(t.target.style.filter="none",t.target.style.opacity="0.6",t.target.style.transform="translateY(20px) scale(0.98)",document.querySelector(".nav").classList.remove("nav--light")),t.target.style.transition="all 0.8s cubic-bezier(0.55, 0.45, 0.16, 1)";else if(t.isIntersecting){t.target.classList.add("visible"),t.target.style.filter="blur(0px)",t.target.style.opacity="1",t.target.style.transform="translateY(0) scale(1)";const o=t.target.dataset.animate;o&&this.triggerCustomAnimation(t.target,o)}})},a);document.querySelectorAll(".hero-content [data-animate-hero]").forEach(e=>{e.style.filter="none",e.style.opacity="0",e.style.transform="scale(0.95)",r.observe(e)}),document.querySelectorAll(".animate-on-scroll, .featured").forEach(e=>{e.closest(".hero-content")||(e.style.filter="blur(3px)",e.style.opacity="0.6",e.style.transform="translateY(20px) scale(0.98)",e.style.transition="all 0.8s cubic-bezier(0.55, 0.45, 0.16, 1)",r.observe(e))})}triggerCustomAnimation(a,r){const e="cubic-bezier(0.55, 0.45, 0.16, 1)";switch(r){case"slide-left":a.style.animation=`slideInFromLeft 1.5s ${e} forwards`;break;case"slide-right":a.style.animation=`slideInFromRight 1.5s ${e} forwards`;break;case"fade-scale":a.style.animation=`fadeInScale 1.5s ${e} forwards`;break;case"text-reveal":a.style.animation=`textReveal 1.5s ${e} forwards`;break}}setupHoverEffects(){document.querySelectorAll(".hover-lift").forEach(e=>{e.addEventListener("mouseenter",t=>{t.target.style.transform="translateY(-5px) scale(1.02)",t.target.style.transition="all 0.3s ease"}),e.addEventListener("mouseleave",t=>{t.target.style.transform="translateY(0) scale(1)"})}),document.querySelectorAll(".image-hover").forEach(e=>{e.addEventListener("mousemove",t=>{const s=e.getBoundingClientRect(),o=t.clientX-s.left,n=t.clientY-s.top,l=s.width/2,f=s.height/2,u=(n-f)/10,p=(l-o)/10;e.style.transform=`perspective(1000px) rotateX(${u}deg) rotateY(${p}deg) scale(1.05)`,e.style.transition="transform 0.6s ease"}),e.addEventListener("mouseleave",t=>{t.target.style.transform="perspective(1000px) rotateX(0) rotateY(0) scale(1)"})});const a=document.querySelector(".logo");a&&(a.addEventListener("mouseenter",()=>{const e=a.querySelectorAll(".nav-letter");e.forEach(t=>{t.style.opacity="0",t.style.transform="translateX(20px)"}),e.forEach((t,s)=>{setTimeout(()=>{t.style.opacity="1",t.style.transform="translateX(0)"},s*100)})}),a.addEventListener("mouseleave",()=>{const e=a.querySelectorAll(".nav-letter");e.forEach(t=>{t.style.opacity="0",t.style.transform="translateX(-20px)"}),e.forEach((t,s)=>{setTimeout(()=>{t.style.opacity="1",t.style.transform="translateX(0)"},s*50)})}));const r=document.querySelector(".hero-alden-logo");r&&(r.addEventListener("mouseenter",()=>{const e=r.querySelectorAll(".alden-letter");e.forEach(t=>{t.style.opacity="0",t.style.transform="translateX(50px)"}),e.forEach((t,s)=>{setTimeout(()=>{t.style.opacity="1",t.style.transform="translateX(0)"},s*100)})}),r.addEventListener("mouseleave",()=>{const e=r.querySelectorAll(".alden-letter");e.forEach(t=>{t.style.opacity="0",t.style.transform="translateX(-50px)"}),e.forEach((t,s)=>{setTimeout(()=>{t.style.opacity="1",t.style.transform="translateX(0)"},s*50)})}))}setupParallax(){const a=document.querySelectorAll("[data-parallax]");window.addEventListener("scroll",()=>{const r=window.pageYOffset;a.forEach(e=>{const t=e.dataset.parallax||.5,s=-(r*t);e.style.transform=`translateY(${s}px)`})})}setupStaggeredAnimations(){document.querySelectorAll(".stagger-animation").forEach(a=>{const r=a.children;Array.from(r).forEach((e,t)=>{e.style.opacity="0",e.style.transform="translateY(20px)",setTimeout(()=>{e.style.transition="all 0.6s cubic-bezier(0.55, 0.45, 0.16, 1)",e.style.opacity="1",e.style.transform="translateY(0)"},t*100)})})}setupLoadingAnimations(){const a=document.querySelector('[data-animate-hero="nav"]');if(a){const n=window.matchMedia("(max-width: 809.98px)").matches?1:2.5;a.style.opacity="0.001",a.style.transform="translateX(-50%) translateY(-150px)",a.style.willChange="transform",setTimeout(()=>{a.style.transition="all 1.5s cubic-bezier(0.55, 0.45, 0.16, 1)",a.style.opacity="1",a.style.transform="translateX(-50%) translateY(0)"},n*1e3)}document.querySelectorAll(".alden-letter").forEach((o,n)=>{const l=n*.2;setTimeout(()=>{o.style.transition="all 0.8s cubic-bezier(0.55, 0.45, 0.16, 1)",o.style.opacity="1",o.style.transform="translateX(0)"},l*1e3)});const e=document.querySelector('[data-animate-hero="chinese"]');e&&(e.style.opacity="0.001",setTimeout(()=>{e.style.transition="all 1.2s cubic-bezier(0.55, 0.45, 0.16, 1)",e.style.opacity="1"},600)),document.querySelectorAll('[data-animate-hero="mason"], [data-animate-hero="bracket1"], [data-animate-hero="wong"], [data-animate-hero="bracket2"], [data-animate-hero="visual"], [data-animate-hero="swimmer"], [data-animate-hero="and"], [data-animate-hero="porsche"], [data-animate-hero="bio"]').forEach(o=>{const n=parseFloat(o.dataset.delay)||.1;o.style.opacity="0",o.style.transform="translateY(40px)",setTimeout(()=>{o.style.transition="all 1.5s cubic-bezier(0.55, 0.45, 0.16, 1)",o.style.opacity="1",o.style.transform="translateY(0)"},n*1e3)});const s=document.querySelector('[data-animate-hero="scroll"]');s&&(s.style.opacity="0.001",setTimeout(()=>{s.style.transition="all 0.8s cubic-bezier(0.55, 0.45, 0.16, 1)",s.style.opacity="1"},1500))}setupSmoothScroll(){document.querySelectorAll('a[href^="#"]').forEach(a=>{a.addEventListener("click",function(r){r.preventDefault();const e=document.querySelector(this.getAttribute("href"));e&&e.scrollIntoView({behavior:"smooth",block:"start"})})})}}const y=`
@keyframes slideInFromLeft {
  from {
    opacity: 0.001;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInFromRight {
  from {
    opacity: 0.001;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInScale {
  from {
    opacity: 0.001;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes textReveal {
  from {
    opacity: 0.001;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
`,c=document.createElement("style");c.textContent=y,document.head.appendChild(c),document.addEventListener("DOMContentLoaded",()=>{const d=new i;window.animationController=d}),window.addEventListener("popstate",()=>{setTimeout(()=>{new i},100)}),window.addEventListener("load",()=>{setTimeout(()=>{window.scrollTo(0,0)},100)})})();window.dataLayer=window.dataLayer||[];function m(){window.dataLayer.push(arguments)}m("js",new Date);m("config","G-499YNMHRWW");
