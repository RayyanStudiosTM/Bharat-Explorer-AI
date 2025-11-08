// app/api/destinations/discover/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { discoverDestinations } from '@/lib/genkit/flows';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { interests, travelStyle, duration, budget } = body;

    if (!interests) {
      return NextResponse.json(
        { error: 'Interests are required' },
        { status: 400 }
      );
    }

    // Call AI flow
    const result = await discoverDestinations({
      interests,
      travelStyle: travelStyle || '',
      duration: duration || 7,
      budget: budget || 'moderate',
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Discover API error:', error);
    return NextResponse.json(
      { error: 'Failed to discover destinations' },
      { status: 500 }
    );
  }
}