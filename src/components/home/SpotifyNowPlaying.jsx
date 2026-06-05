import { useEffect, useState } from 'react';

const SPOTIFY_ENDPOINT = import.meta.env.VITE_SPOTIFY_NOW_PLAYING_URL || '/api/spotify-now-playing';
const REFRESH_INTERVAL_MS = 30_000;

export default function SpotifyNowPlaying() {
  const [track, setTrack] = useState(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let isActive = true;

    const loadTrack = async () => {
      try {
        const response = await fetch(SPOTIFY_ENDPOINT, { cache: 'no-store' });
        if (!response.ok) throw new Error('Spotify status request failed');

        const nextTrack = await response.json();
        if (!isActive) return;

        setTrack(nextTrack.status === 'empty' ? null : nextTrack);
        setStatus(nextTrack.status);
      } catch {
        if (!isActive) return;
        setTrack(null);
        setStatus('offline');
      }
    };

    loadTrack();
    const interval = window.setInterval(loadTrack, REFRESH_INTERVAL_MS);

    return () => {
      isActive = false;
      window.clearInterval(interval);
    };
  }, []);

  const label = {
    playing: '[CURRENTLY PLAYING]',
    recent: '[LAST LISTENED]',
    loading: '[CONNECTING TO SPOTIFY]',
    offline: '[SPOTIFY OFFLINE]',
    empty: '[NOTHING PLAYED YET]',
  }[status];

  const vinylStateClass = status === 'playing' ? 'is-spinning' : track ? 'is-slow-spinning' : 'is-loading';

  const content = (
    <>
      <div
        className={`spotify-vinyl ${vinylStateClass}`}
        aria-hidden="true"
      >
        <span className="spotify-vinyl__shine" />
        <span
          className="spotify-vinyl__label"
          style={track?.imageUrl ? { backgroundImage: `url(${track.imageUrl})` } : undefined}
        >
          {!track?.imageUrl && <span className="spotify-vinyl__pulse" />}
        </span>
        <span className="spotify-vinyl__pin" />
      </div>

      <span className="text-primary text-sm font-body leading-snug">
        {track ? `${track.artist} - ${track.title}` : 'Waiting for a Spotify connection'}
      </span>
    </>
  );

  return (
    <div className="flex flex-col items-start md:items-end gap-2">
      <span className="text-[10px] tracking-[0.4em] text-muted-foreground font-body uppercase">
        {label}
      </span>

      {track?.spotifyUrl ? (
        <a
          href={track.spotifyUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 text-left md:text-right hover:text-accent transition-colors duration-200"
          aria-label={`Open ${track.title} by ${track.artist} on Spotify`}
        >
          {content}
        </a>
      ) : (
        <div className="flex items-center gap-3 text-left md:text-right">{content}</div>
      )}

      <style>{`
        .spotify-vinyl {
          position: relative;
          width: 3.4rem;
          height: 3.4rem;
          flex: 0 0 3.4rem;
          border-radius: 999px;
          overflow: hidden;
          background:
            radial-gradient(circle at 50% 50%, transparent 0 18%, rgba(255, 255, 255, 0.08) 18.5% 19%, transparent 19.5% 31%, rgba(255, 255, 255, 0.06) 31.5% 32%, transparent 32.5% 45%, rgba(255, 255, 255, 0.05) 45.5% 46%, transparent 46.5%),
            conic-gradient(from 120deg, #050505, #242424, #050505, #151515, #050505);
          border: 1px solid rgba(255, 255, 255, 0.14);
          box-shadow:
            inset 0 0 0 1px rgba(255, 255, 255, 0.05),
            0 0 1.6rem rgba(30, 215, 96, 0.14);
        }

        .spotify-vinyl.is-spinning {
          animation: spotifyVinylSpin 3.8s linear infinite;
        }

        .spotify-vinyl.is-slow-spinning {
          animation: spotifyVinylSpin 8.5s linear infinite;
        }

        .spotify-vinyl.is-loading {
          animation: spotifyVinylPulse 1.6s ease-in-out infinite;
        }

        .spotify-vinyl__shine {
          position: absolute;
          inset: 0;
          background: linear-gradient(115deg, rgba(255, 255, 255, 0.24), transparent 34%);
          opacity: 0.45;
          pointer-events: none;
        }

        .spotify-vinyl__label {
          position: absolute;
          inset: 28%;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          background:
            linear-gradient(135deg, rgba(30, 215, 96, 0.9), rgba(16, 111, 50, 0.95));
          background-size: cover;
          background-position: center;
          box-shadow:
            0 0 0 2px rgba(0, 0, 0, 0.8),
            inset 0 0 0 1px rgba(255, 255, 255, 0.2);
        }

        .spotify-vinyl__pin {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0.34rem;
          height: 0.34rem;
          border-radius: 999px;
          background: #050505;
          box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.28);
          transform: translate(-50%, -50%);
        }

        .spotify-vinyl__pulse {
          width: 0.55rem;
          height: 0.55rem;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.9);
          animation: spotifyVinylPulse 1.2s ease-in-out infinite;
        }

        @keyframes spotifyVinylSpin {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spotifyVinylPulse {
          0%, 100% {
            opacity: 0.62;
            transform: scale(0.96);
          }
          50% {
            opacity: 1;
            transform: scale(1.02);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .spotify-vinyl,
          .spotify-vinyl__pulse {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
