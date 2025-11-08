'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, MapPin, Calendar, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface Destination {
  name: string;
  state: string;
  reason: string;
  highlights: string[];
  bestTime: string;
}

export default function ExplorePage() {
  const [interests, setInterests] = useState('');
  const [travelStyle, setTravelStyle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [destinations, setDestinations] = useState<Destination[]>([]);

  const handleDiscover = async () => {
    if (!interests.trim()) return;

    setIsLoading(true);
    setDestinations([]);

    try {
      const response = await fetch('/api/destinations/discover', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          interests,
          travelStyle,
          duration: 7,
        }),
      });

      const data = await response.json();
      
      if (data.destinations) {
        setDestinations(data.destinations);
      }
    } catch (error) {
      console.error('Discovery error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const examplePrompts = [
    'Historic forts, royal palaces, and cultural festivals',
    'Beaches, water sports, and seafood',
    'Mountain trekking, adventure sports, and camping',
    'Temples, spiritual retreats, and yoga',
    'Wildlife safaris, nature photography, and eco-tourism',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4" />
            AI-Powered Discovery
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Discover Your Perfect Indian Destinations
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Tell us what excites you, and our AI will recommend the best places in India for your journey
          </p>
        </div>

        {/* Input Section */}
        <div className="max-w-3xl mx-auto mb-12">
          <Card>
            <CardHeader>
              <CardTitle>What are you interested in?</CardTitle>
              <CardDescription>
                Describe your travel interests, preferred activities, or dream experiences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Textarea
                  placeholder="E.g., I love historic architecture, trying local street food, and experiencing traditional festivals..."
                  value={interests}
                  onChange={(e) => setInterests(e.target.value)}
                  rows={4}
                  className="resize-none"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Travel Style (Optional)
                </label>
                <Textarea
                  placeholder="E.g., Budget backpacker, luxury traveler, solo adventurer, family trip..."
                  value={travelStyle}
                  onChange={(e) => setTravelStyle(e.target.value)}
                  rows={2}
                  className="resize-none"
                />
              </div>

              <Button
                onClick={handleDiscover}
                disabled={!interests.trim() || isLoading}
                size="lg"
                className="w-full bg-orange-600 hover:bg-orange-700"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    AI is thinking...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Discover Destinations
                  </>
                )}
              </Button>

              {/* Example Prompts */}
              <div className="pt-4">
                <p className="text-sm text-gray-600 mb-3">Try these examples:</p>
                <div className="flex flex-wrap gap-2">
                  {examplePrompts.map((prompt, i) => (
                    <Badge
                      key={i}
                      variant="outline"
                      className="cursor-pointer hover:bg-orange-50 hover:border-orange-300"
                      onClick={() => setInterests(prompt)}
                    >
                      {prompt}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        {destinations.length > 0 && (
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">
                ✨ Your Personalized Destinations
              </h2>
              <p className="text-gray-600">
                Based on your interests, here are {destinations.length} perfect matches
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {destinations.map((dest, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-2xl mb-1">
                          {dest.name}
                        </CardTitle>
                        <div className="flex items-center text-gray-600 text-sm">
                          <MapPin className="h-4 w-4 mr-1" />
                          {dest.state}
                        </div>
                      </div>
                      <Badge className="bg-orange-100 text-orange-700 border-orange-200">
                        #{index + 1}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm text-gray-700 mb-2">
                        Why this matches you:
                      </h4>
                      <p className="text-gray-600">{dest.reason}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm text-gray-700 mb-2">
                        Highlights:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {dest.highlights.map((highlight, i) => (
                          <Badge key={i} variant="secondary">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center text-sm text-gray-600 pt-2 border-t">
                      <Calendar className="h-4 w-4 mr-1" />
                      Best time: {dest.bestTime}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
                <Link href="/plan">
                  <Calendar className="mr-2 h-5 w-5" />
                  Create Itinerary
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/map">
                  <MapPin className="mr-2 h-5 w-5" />
                  View on Map
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
