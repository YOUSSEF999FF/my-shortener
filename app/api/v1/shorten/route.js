import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    const slug = Math.random().toString(36).substring(2, 7);
    const short_url = `https://${request.headers.get('host')}/${slug}`;

    return NextResponse.json({
      success: true,
      original_url: url,
      short_url: short_url,
      created_at: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: "LINKSHORT-PRO REST API v1 is active.",
    usage: "Send a POST request with JSON body { 'url': 'YOUR_URL' }"
  });
}
