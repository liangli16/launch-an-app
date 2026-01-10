import { NextResponse } from 'next/server';

const FASTAPI_BASE_URL = 'https://fastapi-gcp-pro-428858543634.us-west1.run.app';

export async function GET() {
  try {
    const response = await fetch(`${FASTAPI_BASE_URL}/`);

    if (!response.ok) {
      throw new Error(`FastAPI responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching root:', error);
    return NextResponse.json(
      { error: 'Failed to fetch from FastAPI backend' },
      { status: 500 }
    );
  }
}
