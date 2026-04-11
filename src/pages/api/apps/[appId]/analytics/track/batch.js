// Mock analytics endpoint to prevent 404 errors in development
export async function getStaticPaths() {
  return [
    { params: { appId: 'undefined' } }
  ];
}

export async function POST({ request }) {
  // Return a successful response to prevent 404 errors
  return new Response(JSON.stringify({ status: 'ok' }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function GET() {
  return new Response(JSON.stringify({ status: 'ok' }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
