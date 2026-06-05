import { createServer } from 'node:http';
import { randomBytes } from 'node:crypto';

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const redirectUri = process.env.SPOTIFY_REDIRECT_URI || 'http://127.0.0.1:8888/callback';
const scopes = ['user-read-currently-playing', 'user-read-recently-played'];

if (!clientId || !clientSecret) {
  console.error('Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET before running this command.');
  process.exit(1);
}

const state = randomBytes(16).toString('hex');
const authorizeUrl = new URL('https://accounts.spotify.com/authorize');
authorizeUrl.search = new URLSearchParams({
  response_type: 'code',
  client_id: clientId,
  scope: scopes.join(' '),
  redirect_uri: redirectUri,
  state,
}).toString();

const redirect = new URL(redirectUri);
const server = createServer(async (request, response) => {
  const callback = new URL(request.url, redirectUri);

  if (callback.pathname !== redirect.pathname) {
    response.writeHead(404);
    return response.end('Not found');
  }

  if (callback.searchParams.get('state') !== state) {
    response.writeHead(400);
    return response.end('Spotify state verification failed.');
  }

  const code = callback.searchParams.get('code');
  if (!code) {
    response.writeHead(400);
    return response.end(`Spotify authorization failed: ${callback.searchParams.get('error') || 'missing code'}`);
  }

  try {
    const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
      }),
    });

    const token = await tokenResponse.json();
    if (!tokenResponse.ok || !token.refresh_token) {
      throw new Error(token.error_description || token.error || 'Spotify did not return a refresh token');
    }

    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('Spotify is connected. Return to the terminal for the refresh token.');

    console.log('\nAdd this private value to your hosting environment:\n');
    console.log(`SPOTIFY_REFRESH_TOKEN=${token.refresh_token}\n`);
  } catch (error) {
    response.writeHead(500);
    response.end('Spotify token exchange failed. Return to the terminal for details.');
    console.error(error.message);
  } finally {
    server.close();
  }
});

server.listen(Number(redirect.port), redirect.hostname, () => {
  console.log(`Add this exact redirect URI to your Spotify app:\n${redirectUri}\n`);
  console.log(`Open this URL to connect Spotify:\n${authorizeUrl}\n`);
});
