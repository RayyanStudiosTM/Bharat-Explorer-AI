// lib/genkit/flows.ts
import { geminiFlash } from './config';

// Type definitions
export interface Destination {
  name: string;
  state: string;
  reason: string;
  highlights: string[];
  bestTime: string;
}

export interface Activity {
  time: string;
  activity: string;
  location: string;
  description: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  activities: Activity[];
}

export interface Itinerary {
  title: string;
  summary: string;
  destinations: string[];
  duration: number;
  days: ItineraryDay[];
}

// Flow 1: Discover Destinations
export async function discoverDestinations(input: {
  interests: string;
  travelStyle?: string;
  duration?: number;
  budget?: string;
}): Promise<{ destinations: Destination[] }> {
  const prompt = `You are an expert on Indian tourism and culture with deep knowledge of over 160 destinations across India.

User Profile:
- Interests: ${input.interests}
- Travel Style: ${input.travelStyle || 'Not specified'}
- Duration: ${input.duration || 'Flexible'} days
- Budget: ${input.budget || 'Moderate'}

Task: Recommend exactly 5 unique destinations in India that perfectly match these preferences.

For each destination, provide:
1. Name (city/place name)
2. State (Indian state)
3. Reason (why it matches their interests - be specific and compelling)
4. Highlights (3-4 key attractions or experiences)
5. Best time to visit

Focus on diverse, culturally rich, and authentic Indian experiences. Consider regional festivals, cuisine, architecture, and local traditions.

Return ONLY a valid JSON array with this structure (no markdown, no extra text):
[
  {
    "name": "Destination Name",
    "state": "State Name",
    "reason": "Compelling reason matching user interests",
    "highlights": ["Highlight 1", "Highlight 2", "Highlight 3"],
    "bestTime": "Best months to visit"
  }
]`;

  try {
    const result = await geminiFlash.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Extract JSON from response
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error('Invalid response format from AI');
    }

    const destinations = JSON.parse(jsonMatch[0]);
    return { destinations };
  } catch (error) {
    console.error('Discover destinations error:', error);
    throw error;
  }
}

// Flow 2: Generate Itinerary
export async function generateItinerary(input: {
  destinations: string[];
  days: number;
  travelStyle?: string;
  interests?: string;
}): Promise<Itinerary> {
  const prompt = `You are a professional travel planner creating an authentic Indian travel experience.

Trip Details:
- Destinations: ${input.destinations.join(', ')}
- Duration: ${input.days} days
- Travel Style: ${input.travelStyle || 'Balanced'}
- Interests: ${input.interests || 'Cultural exploration'}

Create a comprehensive itinerary with:
1. Creative trip title (inspiring, mentions India/Bharat)
2. Engaging 2-3 sentence summary
3. Daily schedule for all ${input.days} days

For each day, include:
- Day number
- Day title (creative, related to activities)
- 4-5 time-based activities with:
  * Time (e.g., "9:00 AM", "2:00 PM")
  * Activity name
  * Location/place
  * Brief description (1-2 sentences)

Include diverse experiences: temples, local markets, cuisine, nature, culture, and authentic interactions.

Return ONLY valid JSON (no markdown, no extra text):
{
  "title": "Creative Trip Title",
  "summary": "Engaging trip summary",
  "destinations": ["Dest1", "Dest2"],
  "duration": ${input.days},
  "days": [
    {
      "day": 1,
      "title": "Day Title",
      "activities": [
        {
          "time": "9:00 AM",
          "activity": "Activity Name",
          "location": "Place Name",
          "description": "Description"
        }
      ]
    }
  ]
}`;

  try {
    const result = await geminiFlash.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid itinerary format from AI');
    }

    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error('Generate itinerary error:', error);
    throw error;
  }
}

// Flow 3: Chat with Context
export async function chatWithContext(input: {
  message: string;
  conversationHistory?: Array<{ role: string; content: string }>;
  userContext?: string;
}): Promise<{ response: string }> {
  const historyText = input.conversationHistory
    ?.map(msg => `${msg.role}: ${msg.content}`)
    .join('\n') || '';

  const prompt = `You are Bharat Explorer AI, a friendly and knowledgeable travel assistant specializing in Indian tourism.

You have deep knowledge of:
- 160+ destinations across India
- Cultural festivals, traditions, cuisines
- Travel logistics, best times to visit
- Regional languages and customs
- Budget planning and safety tips

Previous conversation:
${historyText}

User context: ${input.userContext || 'First-time visitor'}

User message: ${input.message}

Respond naturally, warmly, and informatively. Be concise but helpful. If asked about destinations, provide specific recommendations with reasons. Always celebrate India's diversity.`;

  try {
    const result = await geminiFlash.generateContent(prompt);
    const response = await result.response;
    return { response: response.text() };
  } catch (error) {
    console.error('Chat error:', error);
    throw error;
  }
}