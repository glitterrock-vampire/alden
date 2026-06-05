import React from 'react';
import SpotifyNowPlaying from '@/components/SpotifyNowPlaying.jsx';

export default function FarmFooter() {
  return (
    <footer style={{ background: '#0a120a', borderTop: '1px solid #2a3d1a', padding: '4rem 2rem' }}>
      <div style={{ maxWidth: '72rem', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>
        <div>
          <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '1.2rem', color: '#e8dfc8', marginBottom: '1rem', textTransform: 'uppercase', fontWeight: 900 }}>
            ALDEN FARM
          </h3>
          <p style={{ fontFamily: 'monospace', fontSize: '12px', color: 'rgba(232, 223, 200, 0.5)', lineHeight: 1.7 }}>
            Sustainable farming. Fresh to your table. Rooted in Kingston. Partnering with Agrotonomy for quality agricultural inputs.
          </p>
        </div>
        <div>
          <h4 style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#6b8f4e', marginBottom: '1rem' }}>
            Products
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {['Free-Range Eggs', 'Whole Chicken', 'Fresh Produce', 'Farm Supplies'].map((item) => (
              <li key={item} style={{ marginBottom: '0.5rem' }}>
                <a
                  href="#products"
                  style={{
                    fontFamily: 'monospace',
                    fontSize: '12px',
                    color: 'rgba(232, 223, 200, 0.5)',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease',
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#6b8f4e'}
                  onMouseLeave={(e) => e.target.style.color = 'rgba(232, 223, 200, 0.5)'}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#6b8f4e', marginBottom: '1rem' }}>
            Contact
          </h4>
          <a
            href="mailto:farm@alden.design"
            style={{
              fontFamily: 'monospace',
              fontSize: '12px',
              color: 'rgba(232, 223, 200, 0.5)',
              textDecoration: 'none',
              display: 'block',
              marginBottom: '0.5rem',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => e.target.style.color = '#6b8f4e'}
            onMouseLeave={(e) => e.target.style.color = 'rgba(232, 223, 200, 0.5)'}
          >
            farm@alden.design
          </a>
          <p style={{ fontFamily: 'monospace', fontSize: '11px', color: 'rgba(232, 223, 200, 0.4)', marginTop: '1rem' }}>
            Kingston, Jamaica
          </p>
        </div>
        <SpotifyNowPlaying />
      </div>
      <div style={{ maxWidth: '72rem', margin: '3rem auto 0', paddingTop: '2rem', borderTop: '1px solid #2a3d1a', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <span style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(232, 223, 200, 0.3)' }}>
          © 2026 ALDEN FARM
        </span>
        <a
          href="http://localhost:5173"
          style={{
            fontFamily: 'monospace',
            fontSize: '10px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(232, 223, 200, 0.3)',
            textDecoration: 'none',
            transition: 'color 0.3s ease',
          }}
          onMouseEnter={(e) => e.target.style.color = '#6b8f4e'}
          onMouseLeave={(e) => e.target.style.color = 'rgba(232, 223, 200, 0.3)'}
        >
          ALDEN ONE →
        </a>
      </div>
    </footer>
  );
}
