import { NextResponse } from 'next/server';

const FASTAPI_BASE_URL = 'https://fastapi-gcp-pro-428858543634.us-west1.run.app';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    const { name } = await params; // ← Add await here
    const response = await fetch(`${FASTAPI_BASE_URL}/greet/${name}`);

    if (!response.ok) {
      throw new Error(`FastAPI responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching greet:', error);
    return NextResponse.json(
      { error: 'Failed to fetch greeting from FastAPI backend' },
      { status: 500 }
    );
  }
}