const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';
const SPOTIFY_API_URL = 'https://api.spotify.com/v1';
const RESPONSE_CACHE_MS = 15_000;

let accessTokenCache = null;
let responseCache = null;

function getSpotifyConfig() {
  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } = process.env;

  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
    return null;
  }

  return {
    clientId: SPOTIFY_CLIENT_ID,
    clientSecret: SPOTIFY_CLIENT_SECRET,
    refreshToken: SPOTIFY_REFRESH_TOKEN,
  };
}

async function getAccessToken(config) {
  if (accessTokenCache?.expiresAt > Date.now()) {
    return accessTokenCache.value;
  }

  const credentials = Buffer.from(`${config.clientId}:${config.clientSecret}`).toString('base64');
  const response = await fetch(SPOTIFY_TOKEN_URL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: config.refreshToken,
    }),
  });

  if (!response.ok) {
    throw new Error(`Spotify token refresh failed with status ${response.status}`);
  }

  const token = await response.json();
  accessTokenCache = {
    value: token.access_token,
    expiresAt: Date.now() + Math.max(token.expires_in - 60, 60) * 1000,
  };

  return accessTokenCache.value;
}

async function spotifyFetch(path, token) {
  return fetch(`${SPOTIFY_API_URL}${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function formatTrack(track, status, playedAt = null) {
  return {
    status,
    title: track.name,
    artist: track.artists?.map(({ name }) => name).join(', ') || 'Unknown artist',
    album: track.album?.name || null,
    imageUrl: track.album?.images?.[0]?.url || null,
    spotifyUrl: track.external_urls?.spotify || null,
    playedAt,
  };
}

async function getNowPlaying(config) {
  if (responseCache?.expiresAt > Date.now()) {
    return responseCache.value;
  }

  const token = await getAccessToken(config);
  const playingResponse = await spotifyFetch('/me/player/currently-playing', token);

  if (playingResponse.ok && playingResponse.status !== 204) {
    const playing = await playingResponse.json();
    if (playing.is_playing && playing.item?.type === 'track') {
      return cacheResponse(formatTrack(playing.item, 'playing'));
    }
  } else if (playingResponse.status !== 204) {
    throw new Error(`Spotify currently-playing request failed with status ${playingResponse.status}`);
  }

  const recentResponse = await spotifyFetch('/me/player/recently-played?limit=1', token);
  if (!recentResponse.ok) {
    throw new Error(`Spotify recently-played request failed with status ${recentResponse.status}`);
  }

  const recent = await recentResponse.json();
  const latest = recent.items?.[0];

  if (!latest?.track) {
    return cacheResponse({ status: 'empty' });
  }

  return cacheResponse(formatTrack(latest.track, 'recent', latest.played_at));
}

function cacheResponse(value) {
  responseCache = {
    value,
    expiresAt: Date.now() + RESPONSE_CACHE_MS,
  };

  return value;
}

export default async function handler(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    return response.status(405).json({ error: 'Method not allowed' });
  }

  const config = getSpotifyConfig();
  if (!config) {
    return response.status(503).json({ error: 'Spotify is not configured' });
  }

  try {
    const track = await getNowPlaying(config);
    response.setHeader('Cache-Control', 's-maxage=15, stale-while-revalidate=30');
    return response.status(200).json(track);
  } catch (error) {
    console.error(error);
    return response.status(502).json({ error: 'Spotify is temporarily unavailable' });
  }
}
