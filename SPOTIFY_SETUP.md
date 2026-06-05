# Spotify Footer Setup

The footer reads your Spotify status through `/api/spotify-now-playing`. The API refreshes
the private Spotify access token on the server and returns only the public track details.

## Required Spotify Scopes

- `user-read-currently-playing`
- `user-read-recently-played`

## Environment Variables

Add these values to the hosting environment:

```text
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
SPOTIFY_REFRESH_TOKEN=
```

Do not expose these values through `VITE_` variables. They must remain server-side.

## Generate The Refresh Token

1. Create an app in the Spotify developer dashboard.
2. Add `http://127.0.0.1:8888/callback` as a redirect URI.
3. Run:

```bash
SPOTIFY_CLIENT_ID=your_client_id \
SPOTIFY_CLIENT_SECRET=your_client_secret \
npm run spotify:token
```

4. Open the printed Spotify authorization URL.
5. Add the printed `SPOTIFY_REFRESH_TOKEN` to the hosting environment with the client
   ID and client secret.

## Development Note

The normal `npm run dev` command starts Vite only, so it does not execute the serverless
API route locally. Point `VITE_SPOTIFY_NOW_PLAYING_URL` at a deployed endpoint when you
want to preview live Spotify data in the Vite development server.

Set the same `VITE_SPOTIFY_NOW_PLAYING_URL` value for the standalone Build, Farm, Springs,
and Studio deployments so their footers read from the ALDEN hub API endpoint.
