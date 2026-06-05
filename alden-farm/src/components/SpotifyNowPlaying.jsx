import { useEffect, useState } from 'react';

const ENDPOINT = import.meta.env.VITE_SPOTIFY_NOW_PLAYING_URL || '/api/spotify-now-playing';

export default function SpotifyNowPlaying() {
  const [track, setTrack] = useState(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let isActive = true;
    const load = async () => {
      try {
        const response = await fetch(ENDPOINT, { cache: 'no-store' });
        if (!response.ok) throw new Error();
        const next = await response.json();
        if (!isActive) return;
        setTrack(next.status === 'empty' ? null : next);
        setStatus(next.status);
      } catch {
        if (isActive) setStatus('offline');
      }
    };

    load();
    const interval = window.setInterval(load, 30_000);
    return () => {
      isActive = false;
      window.clearInterval(interval);
    };
  }, []);

  const label = status === 'playing' ? '[CURRENTLY PLAYING]' : status === 'recent' ? '[LAST LISTENED]' : '[SPOTIFY OFFLINE]';
  const vinylClass = `spotify-vinyl ${status === 'playing' ? 'is-spinning' : track ? 'is-slow-spinning' : 'is-loading'}`;

  return (
    <div>
      <h4 style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.3em', color: '#6b8f4e', marginBottom: '1rem' }}>{label}</h4>
      <a href={track?.spotifyUrl || '#'} target={track ? '_blank' : undefined} rel={track ? 'noreferrer' : undefined} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', color: 'rgba(232, 223, 200, 0.6)', fontFamily: 'monospace', fontSize: '12px', lineHeight: 1.5 }}>
        <span className={vinylClass} aria-hidden="true">
          <span className="spotify-vinyl__shine" />
          <span className="spotify-vinyl__label" style={track?.imageUrl ? { backgroundImage: `url(${track.imageUrl})` } : undefined}>
            {!track?.imageUrl && <span className="spotify-vinyl__pulse" />}
          </span>
          <span className="spotify-vinyl__pin" />
        </span>
        <span>{track ? `${track.artist} - ${track.title}` : 'Waiting for Spotify'}</span>
      </a>
      <style>{`
        .spotify-vinyl {
          position: relative;
          width: 3.1rem;
          height: 3.1rem;
          flex: 0 0 3.1rem;
          border-radius: 999px;
          overflow: hidden;
          background:
            radial-gradient(circle at 50% 50%, transparent 0 18%, rgba(255,255,255,0.08) 18.5% 19%, transparent 19.5% 31%, rgba(255,255,255,0.06) 31.5% 32%, transparent 32.5% 45%, rgba(255,255,255,0.05) 45.5% 46%, transparent 46.5%),
            conic-gradient(from 120deg, #050505, #242424, #050505, #151515, #050505);
          border: 1px solid rgba(255, 255, 255, 0.14);
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.05), 0 0 1.4rem rgba(107,143,78,0.2);
        }
        .spotify-vinyl.is-spinning { animation: spotifyVinylSpin 3.8s linear infinite; }
        .spotify-vinyl.is-slow-spinning { animation: spotifyVinylSpin 8.5s linear infinite; }
        .spotify-vinyl.is-loading { animation: spotifyVinylPulse 1.6s ease-in-out infinite; }
        .spotify-vinyl__shine { position: absolute; inset: 0; background: linear-gradient(115deg, rgba(255,255,255,0.24), transparent 34%); opacity: 0.45; }
        .spotify-vinyl__label { position: absolute; inset: 28%; display: flex; align-items: center; justify-content: center; border-radius: 999px; background: linear-gradient(135deg, #6b8f4e, #324f22); background-size: cover; background-position: center; box-shadow: 0 0 0 2px rgba(0,0,0,0.8), inset 0 0 0 1px rgba(255,255,255,0.2); }
        .spotify-vinyl__pin { position: absolute; top: 50%; left: 50%; width: 0.32rem; height: 0.32rem; border-radius: 999px; background: #050505; box-shadow: 0 0 0 1px rgba(255,255,255,0.28); transform: translate(-50%, -50%); }
        .spotify-vinyl__pulse { width: 0.52rem; height: 0.52rem; border-radius: 999px; background: rgba(255,255,255,0.9); animation: spotifyVinylPulse 1.2s ease-in-out infinite; }
        @keyframes spotifyVinylSpin { to { transform: rotate(360deg); } }
        @keyframes spotifyVinylPulse { 0%, 100% { opacity: 0.62; transform: scale(0.96); } 50% { opacity: 1; transform: scale(1.02); } }
        @media (prefers-reduced-motion: reduce) { .spotify-vinyl, .spotify-vinyl__pulse { animation: none; } }
      `}</style>
    </div>
  );
}
