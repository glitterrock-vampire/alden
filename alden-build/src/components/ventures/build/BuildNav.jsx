import React, { useState, useEffect } from 'react';

export default function BuildNav() {
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
        background: scrolled ? 'rgba(14, 14, 14, 0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        transition: 'all 0.3s ease',
        borderBottom: scrolled ? '1px solid rgba(160, 128, 80, 0.2)' : 'none',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '100%', margin: '0 auto' }}>
        <a
          href="/"
          style={{
            fontFamily: '"Arial Black", sans-serif',
            fontSize: '1.5rem',
            color: '#f0ede8',
            textDecoration: 'none',
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
          }}
        >
          ALDEN'S CONSTRUCTION
        </a>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <a
            href="#offerings"
            style={{
              fontFamily: 'monospace',
              fontSize: '11px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'rgba(240, 237, 232, 0.7)',
              textDecoration: 'none',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => e.target.style.color = '#a08050'}
            onMouseLeave={(e) => e.target.style.color = 'rgba(240, 237, 232, 0.7)'}
          >
            Offerings
          </a>
          <a
            href="#waitlist"
            style={{
              fontFamily: 'monospace',
              fontSize: '11px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'rgba(240, 237, 232, 0.7)',
              textDecoration: 'none',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => e.target.style.color = '#a08050'}
            onMouseLeave={(e) => e.target.style.color = 'rgba(240, 237, 232, 0.7)'}
          >
            Waitlist
          </a>
          <a
            href="http://localhost:5173"
            style={{
              padding: '0.5rem 1.5rem',
              border: '1px solid rgba(160, 128, 80, 0.4)',
              fontFamily: 'monospace',
              fontSize: '10px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#f0ede8',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(160, 128, 80, 0.2)';
              e.target.style.borderColor = '#a08050';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.borderColor = 'rgba(160, 128, 80, 0.4)';
            }}
          >
            ← Hub
          </a>
        </div>
      </div>
    </nav>
  );
}
