import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import spotifyNowPlaying from './api/spotify-now-playing.js'

function spotifyApiDevPlugin(env) {
  let lastSpotifyErrorLogAt = 0;

  return {
    name: 'spotify-api-dev',
    configureServer(server) {
      server.middlewares.use('/api/spotify-now-playing', async (req, res) => {
        if (req.method !== 'GET') {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        for (const key of ['SPOTIFY_CLIENT_ID', 'SPOTIFY_CLIENT_SECRET', 'SPOTIFY_REFRESH_TOKEN']) {
          process.env[key] = env[key] || process.env[key];
        }

        const response = {
          setHeader(key, value) {
            res.setHeader(key, value);
          },
          status(code) {
            res.statusCode = code;
            return this;
          },
          json(body) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(body));
            return this;
          },
        };

        try {
          await spotifyNowPlaying(req, response);
        } catch (error) {
          const now = Date.now();
          if (now - lastSpotifyErrorLogAt >= 60_000) {
            console.error('Spotify middleware error:', error.message);
            lastSpotifyErrorLogAt = now;
          }
          res.statusCode = 503;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Spotify service unavailable' }));
        }
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    logLevel: 'error', // Suppress warnings, only show errors
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    plugins: [
      react(),
      spotifyApiDevPlugin(env),
    ],
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes('node_modules')) return undefined;

            if (id.includes('/three/')) return 'three-core';
            if (id.includes('/@react-three/fiber/') || id.includes('/@react-three/drei/')) return 'r3f';
            if (id.includes('/gsap/') || id.includes('/@gsap/react/')) return 'gsap';
            if (id.includes('/react/') || id.includes('/react-dom/') || id.includes('/react-router-dom/')) {
              return 'vendor';
            }

            return undefined;
          },
        },
      },
    },
  };
});
