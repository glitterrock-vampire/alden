import React from 'react';

export default function BuildFooter() {
  return (
    <footer style={{ background: '#0a0a0a', borderTop: '1px solid #1e1e1e', padding: '4rem 2rem' }}>
      <div style={{ maxWidth: '72rem', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>
        <div>
          <h3 style={{ fontFamily: '"Arial Black", sans-serif', fontSize: '1.2rem', color: '#f0ede8', marginBottom: '1rem', textTransform: 'uppercase' }}>
            ALDEN BUILD
          </h3>
          <p style={{ fontFamily: 'monospace', fontSize: '12px', color: 'rgba(240, 237, 232, 0.5)', lineHeight: 1.7 }}>
            Affordable homes for Jamaica. Steel frames, container homes, and blueprint packages designed for modern living.
          </p>
        </div>
        <div>
          <h4 style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#a08050', marginBottom: '1rem' }}>
            Offerings
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {['Steel Frame Homes', 'Container Homes', 'Blueprint Packages', 'Custom Builds'].map((item) => (
              <li key={item} style={{ marginBottom: '0.5rem' }}>
                <a
                  href="#offerings"
                  style={{
                    fontFamily: 'monospace',
                    fontSize: '12px',
                    color: 'rgba(240, 237, 232, 0.5)',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease',
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#a08050'}
                  onMouseLeave={(e) => e.target.style.color = 'rgba(240, 237, 232, 0.5)'}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#a08050', marginBottom: '1rem' }}>
            Contact
          </h4>
          <a
            href="mailto:build@alden.design"
            style={{
              fontFamily: 'monospace',
              fontSize: '12px',
              color: 'rgba(240, 237, 232, 0.5)',
              textDecoration: 'none',
              display: 'block',
              marginBottom: '0.5rem',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => e.target.style.color = '#a08050'}
            onMouseLeave={(e) => e.target.style.color = 'rgba(240, 237, 232, 0.5)'}
          >
            build@alden.design
          </a>
          <p style={{ fontFamily: 'monospace', fontSize: '11px', color: 'rgba(240, 237, 232, 0.4)', marginTop: '1rem' }}>
            Kingston, Jamaica
          </p>
        </div>
      </div>
      <div style={{ maxWidth: '72rem', margin: '3rem auto 0', paddingTop: '2rem', borderTop: '1px solid #1e1e1e', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <span style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(240, 237, 232, 0.3)' }}>
          © 2026 ALDEN BUILD
        </span>
        <a
          href="http://localhost:5173"
          style={{
            fontFamily: 'monospace',
            fontSize: '10px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(240, 237, 232, 0.3)',
            textDecoration: 'none',
            transition: 'color 0.3s ease',
          }}
          onMouseEnter={(e) => e.target.style.color = '#a08050'}
          onMouseLeave={(e) => e.target.style.color = 'rgba(240, 237, 232, 0.3)'}
        >
          ALDEN ONE →
        </a>
      </div>
    </footer>
  );
}
