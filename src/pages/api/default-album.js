// Default album image endpoint for MusicPlayer
export async function GET() {
  // Return a default album image
  return new Response(JSON.stringify({ 
    status: 'ok',
    image: '/images/default-album.jpg'
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    'Cache-Control': 'public, max-age=86400', // Cache for 1 day
    },
  });
}
