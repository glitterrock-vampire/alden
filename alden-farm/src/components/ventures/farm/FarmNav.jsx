import React, { useState, useEffect } from 'react';

const links = [
  { label: 'Products', href: '#products' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function FarmNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '1rem 2rem',
        background: scrolled ? 'rgba(13,26,13,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid #2a3d1a' : 'none',
        transition: 'all 0.3s',
      }}
    >
      <a href="/" style={{ fontFamily: 'Georgia, serif', fontWeight: 900, fontSize: '15px', color: '#e8dfc8', letterSpacing: '0.2em', textDecoration: 'none' }}>
        ALDEN FARM
      </a>

      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        {links.map(l => (
          <button key={l.label} onClick={() => scrollTo(l.href)}
            style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#a09070', background: 'none', border: 'none', cursor: 'pointer' }}>
            {l.label}
          </button>
        ))}
        <a href="http://localhost:5173" style={{ fontFamily: 'monospace', fontSize: '9px', letterSpacing: '0.3em', color: '#6b8f4e', textDecoration: 'none', textTransform: 'uppercase', border: '1px solid #2a3d1a', padding: '4px 10px' }}>
          ← Hub
        </a>
      </div>
    </nav>
  );
}
