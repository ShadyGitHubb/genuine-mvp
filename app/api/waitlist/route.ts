// Waitlist form submissions are now handled by Netlify Forms.
// This API route is no longer used for form processing.
// Keeping file to avoid 404s on any cached client requests.

import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ count: 0 });
}

export async function POST() {
  return NextResponse.json({ message: 'Submissions are now handled by Netlify Forms.' }, { status: 410 });
}
