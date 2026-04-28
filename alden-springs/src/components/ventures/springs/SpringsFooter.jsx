import React from 'react';

export default function SpringsFooter() {
  return (
    <footer style={{ background: '#020a12', borderTop: '1px solid #0a2540', padding: '4rem 2rem' }}>
      <div style={{ maxWidth: '72rem', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>
        <div>
          <h3 style={{ fontFamily: '"Arial Black", sans-serif', fontSize: '1.2rem', color: '#e0f4ff', marginBottom: '1rem', textTransform: 'uppercase' }}>
            ALDEN SPRINGS
          </h3>
          <p style={{ fontFamily: 'monospace', fontSize: '12px', color: 'rgba(224, 244, 255, 0.5)', lineHeight: 1.7 }}>
            Pure water. Smart irrigation. Sustainable futures. Coming 2027 to Jamaica.
          </p>
        </div>
        <div>
          <h4 style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#4aaccc', marginBottom: '1rem' }}>
            Pillars
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {['Purity', 'Sustainability', 'Distribution', 'Technology'].map((item) => (
              <li key={item} style={{ marginBottom: '0.5rem' }}>
                <a
                  href="#pillars"
                  style={{
                    fontFamily: 'monospace',
                    fontSize: '12px',
                    color: 'rgba(224, 244, 255, 0.5)',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease',
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#4aaccc'}
                  onMouseLeave={(e) => e.target.style.color = 'rgba(224, 244, 255, 0.5)'}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#4aaccc', marginBottom: '1rem' }}>
            Contact
          </h4>
          <a
            href="mailto:springs@alden.design"
            style={{
              fontFamily: 'monospace',
              fontSize: '12px',
              color: 'rgba(224, 244, 255, 0.5)',
              textDecoration: 'none',
              display: 'block',
              marginBottom: '0.5rem',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => e.target.style.color = '#4aaccc'}
            onMouseLeave={(e) => e.target.style.color = 'rgba(224, 244, 255, 0.5)'}
          >
            springs@alden.design
          </a>
          <p style={{ fontFamily: 'monospace', fontSize: '11px', color: 'rgba(224, 244, 255, 0.4)', marginTop: '1rem' }}>
            Kingston, Jamaica
          </p>
        </div>
      </div>
      <div style={{ maxWidth: '72rem', margin: '3rem auto 0', paddingTop: '2rem', borderTop: '1px solid #0a2540', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <span style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(224, 244, 255, 0.3)' }}>
          © 2027 ALDEN SPRINGS
        </span>
        <a
          href="http://localhost:5173"
          style={{
            fontFamily: 'monospace',
            fontSize: '10px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(224, 244, 255, 0.3)',
            textDecoration: 'none',
            transition: 'color 0.3s ease',
          }}
          onMouseEnter={(e) => e.target.style.color = '#4aaccc'}
          onMouseLeave={(e) => e.target.style.color = 'rgba(224, 244, 255, 0.3)'}
        >
          ALDEN ONE →
        </a>
      </div>
    </footer>
  );
}
