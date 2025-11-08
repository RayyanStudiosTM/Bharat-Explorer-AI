// app/api/itinerary/generate/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { generateItinerary } from '@/lib/genkit/flows';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { destinations, days, travelStyle, interests } = body;

    if (!destinations || destinations.length === 0) {
      return NextResponse.json(
        { error: 'Destinations are required' },
        { status: 400 }
      );
    }

    if (!days || days < 1) {
      return NextResponse.json(
        { error: 'Valid trip duration is required' },
        { status: 400 }
      );
    }

    // Call AI flow
    const result = await generateItinerary({
      destinations,
      days,
      travelStyle: travelStyle || 'balanced',
      interests: interests || 'general exploration',
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Itinerary API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate itinerary' },
      { status: 500 }
    );
  }
}