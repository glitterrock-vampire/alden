// Default album placeholder - create a simple colored square
export async function GET() {
  // Return a simple SVG as a placeholder album cover
  const svg = `
    <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#1a1a1a"/>
      <rect x="20" y="20" width="260" height="260" fill="#2a2a2a" rx="10"/>
      <circle cx="150" cy="150" r="60" fill="#ff6b6b"/>
      <circle cx="150" cy="150" r="20" fill="#1a1a1a"/>
      <text x="150" y="250" font-family="Arial" font-size="14" fill="#666" text-anchor="middle">ALBUM</text>
    </svg>
  `;
  
  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=86400'
    }
  });
}
