import { useEffect } from 'react';

/**
 * Scroll reveals, 3D card tilt, and scroll parallax for the Springs page.
 * Usage: const rootRef = useRef(null); useSpringsFx(rootRef); <div ref={rootRef} className="springs-page">
 */
export default function useSpringsFx(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cleanups = [];

    // Reveal on scroll
    const targets = root.querySelectorAll('[data-reveal]');
    if (reduce || !('IntersectionObserver' in window)) {
      targets.forEach((t) => t.classList.add('is-in'));
    } else {
      const io = new IntersectionObserver(
        (entries) => entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
        }),
        { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
      );
      targets.forEach((t) => io.observe(t));
      cleanups.push(() => io.disconnect());
    }

    // 3D tilt + glare on cards
    if (!reduce && window.matchMedia('(hover: hover)').matches) {
      root.querySelectorAll('[data-tilt]').forEach((card) => {
        const move = (e) => {
          const r = card.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width;
          const y = (e.clientY - r.top) / r.height;
          card.style.setProperty('--rx', `${((0.5 - y) * 12).toFixed(2)}deg`);
          card.style.setProperty('--ry', `${((x - 0.5) * 14).toFixed(2)}deg`);
          card.style.setProperty('--mx', `${(x * 100).toFixed(1)}%`);
          card.style.setProperty('--my', `${(y * 100).toFixed(1)}%`);
        };
        const leave = () => {
          card.style.setProperty('--rx', '0deg');
          card.style.setProperty('--ry', '0deg');
        };
        card.addEventListener('pointermove', move);
        card.addEventListener('pointerleave', leave);
        cleanups.push(() => {
          card.removeEventListener('pointermove', move);
          card.removeEventListener('pointerleave', leave);
        });
      });
    }

    // Scroll parallax variable (0 -> 1 across first viewport)
    if (!reduce) {
      let raf = 0;
      const onScroll = () => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          root.style.setProperty('--scroll', Math.min(window.scrollY / window.innerHeight, 3).toFixed(3));
        });
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
      cleanups.push(() => { cancelAnimationFrame(raf); window.removeEventListener('scroll', onScroll); });
    }

    return () => cleanups.forEach((fn) => fn());
  }, [rootRef]);
}
