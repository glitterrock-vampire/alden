import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const HERO_LETTERS = ['A', 'L', 'D', 'E', 'N'];

export default function HeroSection({ heroImage }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const titleY = useTransform(scrollYProgress, [0, 0.6], [0, -100]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const barOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);

  // Keep the title close to the navbar while preserving breathing room on mobile.
  const SAFE_NAV_PADDING = 'clamp(76px, 11vw, 92px)';

  useEffect(() => {
    const isMobile = window.innerWidth <= 640;

    const letters = document.querySelectorAll('.alden-letter');
    letters.forEach((letter, index) => {
      if (!isMobile) {
        letter.style.transform = index % 2 === 0 ? 'translateX(-100px)' : 'translateX(100px)';
      }
      setTimeout(() => {
        letter.style.opacity = '1';
        letter.style.transform = 'translateX(0)';
      }, 800 + index * 100);
    });

    const heroRoles = document.querySelectorAll('[data-animate-hero]');
    heroRoles.forEach((el) => {
      const delay = parseFloat(el.dataset.delay || '0') * 1000;
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateX(0)';
      }, delay);
    });
  }, []);

  return (
    <section id="home" ref={ref} className="hero-section">

      {/* Background — sits BELOW nav's mixBlendMode layer */}
      <motion.div className="hero-bg" style={{ y: bgY }}>
        <img
          src={heroImage}
          alt="Hero background"
          className="hero-bg-img"
        />
        <div className="hero-bg-overlay" />
      </motion.div>

      {/* Content wrapper */}
      <motion.div
        className="hero-inner"
        // Safe fixed padding to ensure no nav overlap
        style={{
          y: titleY,
          opacity: titleOpacity,
          paddingTop: SAFE_NAV_PADDING,
        }}
      >
        <div className="hero-content">
          {/* TOP: Letters + taglines */}
          <div className="hero-top">

            <div className="hero-logo" aria-label="ALDEN">
              {HERO_LETTERS.map((letter) => (
                <span
                  key={letter}
                  className="alden-letter"
                  style={{
                    opacity: 0.001,
                    transition: 'opacity 0.8s cubic-bezier(0.55,0.45,0.16,1), transform 0.8s cubic-bezier(0.55,0.45,0.16,1)',
                  }}
                >
                  {letter}
                </span>
              ))}
            </div>

            <div className="hero-roles">
              {[
                { label: 'Technology', delay: 0.6 },
                { label: 'Innovation', delay: 0.7 },
                { label: 'Design',     delay: 0.8 },
              ].map(({ label, delay }) => (
                <h2
                  key={label}
                  data-animate-hero={label.toLowerCase()}
                  data-delay={delay}
                  className="hero-role-item"
                  style={{
                    opacity: 0,
                    transform: 'translateX(50px)',
                    transition: 'all 0.8s cubic-bezier(0.55,0.45,0.16,1)',
                  }}
                >
                  {label}
                </h2>
              ))}
            </div>

          </div>

          <div className="hero-lower-right">
            <p className="hero-desc">
              I partner with companies and entrepreneurs{' '}
              <span className="br-wrap">to transform visions into captivating experiences,{' '}</span>
              all designed with users at the helm.
            </p>
          </div>
        </div>

        {/* BOTTOM: scroll bar */}
        <motion.footer style={{ opacity: barOpacity }} className="hero-scroll">
          <span>[SCROLL DOWN] 請下去 [DOWN]</span>
          <span className="scroll-mid">[NICE TO MEET YOU]</span>
          <span className="scroll-right">「很高興見到你」</span>
        </motion.footer>
      </motion.div>

      <style>{`
        /* ─── Layout ─── */
        .hero-section {
          position: relative;
          width: 100%;
          height: 100svh;
          overflow: hidden;
          --side: clamp(1.5rem, 4.5vw, 2.5rem);
        }

        /* Background: starts below nav to prevent overlap */
        .hero-bg {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          height: 100%;
          z-index: 0;
          /* Sits below nav's mixBlendMode: difference — no z-index fight */
        }
        .hero-bg-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center center;
          display: block;
        }
        .hero-bg-overlay {
          position: absolute;
          inset: 0;
          /* Slightly stronger overlay so text is legible even with blend mode above */
          background: rgba(0, 0, 0, 0.45);
        }

        /* Content wrapper */
        .hero-inner {
          position: relative;
          z-index: 10; /* Below nav z-index:1000 so blend mode works */
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
          /* top padding set inline via JS-measured navHeight */
          padding-left: var(--side);
          padding-right: var(--side);
          padding-bottom: clamp(1.5rem, 4vh, 2.5rem);
        }

        .hero-content {
          display: flex;
          flex: 1;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: clamp(2rem, 6vh, 4rem);
          padding-bottom: clamp(1rem, 4vh, 3rem);
        }

        /* Top block */
        .hero-top {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: clamp(1rem, 2.5vh, 1.75rem);
          text-align: center;
        }

        /* ── Letters ── */
        .hero-logo {
          display: flex;
          align-items: flex-end;
          justify-content: center;
        }
        .alden-letter {
          font-family: 'Koulen', cursive;
          font-size: clamp(84px, 15vw, 360px);
          color: #fff;
          line-height: 0.85;
          display: inline-block;
          margin: 0 clamp(1px, 0.2vw, 6px);
        }

        /* ── Roles ── */
        .hero-roles {
          display: flex;
          flex-direction: row;
          justify-content: center;
          gap: clamp(1rem, 3vw, 3rem);
        }
        .hero-role-item {
          font-family: 'Koulen', cursive;
          font-size: clamp(18px, 2.5vw, 40px);
          color: #fff;
          margin: 0;
          line-height: 1.2;
        }

        /* ── Description ── */
        .hero-desc {
          font-family: 'Roboto Mono', monospace;
          font-size: clamp(12px, 1.25vw, 16px);
          color: #ccbb87;
          line-height: 1.6;
          margin: 0;
          max-width: 520px;
          text-align: center;
        }

        /* ── Lower Right Container ── */
        .hero-lower-right {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* ── Scroll bar ── */
        .hero-scroll {
          position: relative;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: 'Roboto Mono', monospace;
          font-size: clamp(10px, 1vw, 14px);
          color: #fff;
        }

        .scroll-mid {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
          white-space: nowrap;
        }

        .scroll-right {
          margin-left: auto;
        }

        /* ════════════════════════════
           Mobile ≤ 640px
        ════════════════════════════ */
        @media (max-width: 640px) {
          .hero-section {
            --side: clamp(1.5rem, 7vw, 2rem);
          }

          .hero-top {
            gap: 0.9rem;
          }

          .hero-content {
            gap: 2rem;
            padding-bottom: 1rem;
          }

          .hero-roles {
            gap: clamp(0.75rem, 4vw, 1rem);
          }

          .alden-letter {
            font-size: clamp(56px, 16vw, 76px);
            margin: 0 1px;
          }

          .hero-role-item {
            font-size: clamp(16px, 4.5vw, 22px);
            line-height: 1.1;
          }

          .hero-desc {
            font-size: clamp(10px, 2.6vw, 13px);
            line-height: 1.5;
            max-width: 100%;
            text-align: center;
          }

          .hero-lower-right {
            align-items: center;
          }

          /* On mobile, .br-wrap displays inline so text flows naturally */
          .br-wrap {
            display: inline;
          }

          .hero-scroll {
            flex-direction: column;
            align-items: center;
            gap: 0.3rem;
            font-size: clamp(9px, 2.3vw, 11px);
            text-align: center;
          }

          .scroll-mid {
            position: static;
            transform: none;
            white-space: normal;
          }

          .scroll-right {
            margin-left: 0;
          }
        }

        /* ════════════════════════════
           Very small ≤ 375px
        ════════════════════════════ */
        @media (max-width: 375px) {
          .alden-letter {
            font-size: clamp(40px, 12vw, 56px);
          }
        }
      `}</style>
    </section>
  );
}
