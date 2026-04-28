import React, { useState, useEffect } from 'react';

export default function StudioNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: scrolled ? '1rem 2rem' : '2rem 2rem',
        background: scrolled ? 'rgba(8, 8, 8, 0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        transition: 'all 0.3s ease',
        borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '100%', margin: '0 auto' }}>
        <a
          href="/"
          style={{
            fontFamily: '"Arial Black", sans-serif',
            fontSize: '1.5rem',
            color: '#f0f0f0',
            textDecoration: 'none',
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
          }}
        >
          ALDEN PHOTO STUDIO
        </a>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <a
            href="#services"
            style={{
              fontFamily: 'monospace',
              fontSize: '11px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'rgba(240, 240, 240, 0.7)',
              textDecoration: 'none',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => e.target.style.color = 'white'}
            onMouseLeave={(e) => e.target.style.color = 'rgba(240, 240, 240, 0.7)'}
          >
            Services
          </a>
          <a
            href="#booking"
            style={{
              fontFamily: 'monospace',
              fontSize: '11px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'rgba(240, 240, 240, 0.7)',
              textDecoration: 'none',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => e.target.style.color = 'white'}
            onMouseLeave={(e) => e.target.style.color = 'rgba(240, 240, 240, 0.7)'}
          >
            Book
          </a>
          <a
            href="http://localhost:5173"
            style={{
              padding: '0.5rem 1.5rem',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              fontFamily: 'monospace',
              fontSize: '10px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#f0f0f0',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.1)';
              e.target.style.borderColor = 'white';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            }}
          >
            ← Hub
          </a>
        </div>
      </div>
    </nav>
  );
}
