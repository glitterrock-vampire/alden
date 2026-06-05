import React from 'react';
import SpotifyNowPlaying from '@/components/SpotifyNowPlaying.jsx';

export default function StudioFooter() {
  return (
    <footer style={{ background: '#050505', borderTop: '1px solid rgba(255, 255, 255, 0.06)', padding: '4rem 2rem' }}>
      <div style={{ maxWidth: '72rem', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>
        <div>
          <h3 style={{ fontFamily: '"Arial Black", sans-serif', fontSize: '1.2rem', color: '#f0f0f0', marginBottom: '1rem', textTransform: 'uppercase' }}>
            ALDEN PHOTO STUDIO
          </h3>
          <p style={{ fontFamily: 'monospace', fontSize: '12px', color: 'rgba(240, 240, 240, 0.5)', lineHeight: 1.7 }}>
            Photography & Visual Arts. Light, shadow, story. Based in Kingston, Jamaica.
          </p>
        </div>
        <div>
          <h4 style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.4)', marginBottom: '1rem' }}>
            Services
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {['Portrait Sessions', 'Event Coverage', 'Landscape & Nature', 'Creative Projects'].map((item) => (
              <li key={item} style={{ marginBottom: '0.5rem' }}>
                <a
                  href="#services"
                  style={{
                    fontFamily: 'monospace',
                    fontSize: '12px',
                    color: 'rgba(240, 240, 240, 0.5)',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease',
                  }}
                  onMouseEnter={(e) => e.target.style.color = 'white'}
                  onMouseLeave={(e) => e.target.style.color = 'rgba(240, 240, 240, 0.5)'}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.4)', marginBottom: '1rem' }}>
            Contact
          </h4>
          <a
            href="mailto:studio@alden.design"
            style={{
              fontFamily: 'monospace',
              fontSize: '12px',
              color: 'rgba(240, 240, 240, 0.5)',
              textDecoration: 'none',
              display: 'block',
              marginBottom: '0.5rem',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => e.target.style.color = 'white'}
            onMouseLeave={(e) => e.target.style.color = 'rgba(240, 240, 240, 0.5)'}
          >
            studio@alden.design
          </a>
          <p style={{ fontFamily: 'monospace', fontSize: '11px', color: 'rgba(240, 240, 240, 0.4)', marginTop: '1rem' }}>
            Kingston, Jamaica
          </p>
        </div>
        <SpotifyNowPlaying />
      </div>
      <div style={{ maxWidth: '72rem', margin: '3rem auto 0', paddingTop: '2rem', borderTop: '1px solid rgba(255, 255, 255, 0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <span style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(240, 240, 240, 0.3)' }}>
          © 2026 ALDEN PHOTO STUDIO
        </span>
        <a
          href="http://localhost:5173"
          style={{
            fontFamily: 'monospace',
            fontSize: '10px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(240, 240, 240, 0.3)',
            textDecoration: 'none',
            transition: 'color 0.3s ease',
          }}
          onMouseEnter={(e) => e.target.style.color = 'white'}
          onMouseLeave={(e) => e.target.style.color = 'rgba(240, 240, 240, 0.3)'}
        >
          ALDEN ONE →
        </a>
      </div>
    </footer>
  );
}
