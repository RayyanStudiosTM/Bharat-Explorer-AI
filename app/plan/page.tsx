'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Clock, Loader2, Plus, X, Sparkles } from 'lucide-react';

interface Activity {
  time: string;
  activity: string;
  location: string;
  description: string;
}

interface ItineraryDay {
  day: number;
  title: string;
  activities: Activity[];
}

interface Itinerary {
  title: string;
  summary: string;
  destinations: string[];
  duration: number;
  days: ItineraryDay[];
}

export default function PlanPage() {
  const [destinations, setDestinations] = useState<string[]>(['']);
  const [days, setDays] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);

  const addDestination = () => {
    setDestinations([...destinations, '']);
  };

  const removeDestination = (index: number) => {
    setDestinations(destinations.filter((_, i) => i !== index));
  };

  const updateDestination = (index: number, value: string) => {
    const updated = [...destinations];
    updated[index] = value;
    setDestinations(updated);
  };

  const handleGenerate = async () => {
    const validDests = destinations.filter(d => d.trim());
    if (validDests.length === 0 || days < 1) return;

    setIsLoading(true);
    setItinerary(null);

    try {
      const response = await fetch('/api/itinerary/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destinations: validDests,
          days,
        }),
      });

      const data = await response.json();
      
      if (data) {
        setItinerary(data);
      }
    } catch (error) {
      console.error('Itinerary generation error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Calendar className="h-4 w-4" />
            AI Itinerary Generator
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Create Your Perfect Travel Plan
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Tell us where you want to go and for how long. Our AI will craft a detailed, optimized itinerary just for you.
          </p>
        </div>

        {/* Input Section */}
        <div className="max-w-3xl mx-auto mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Trip Details</CardTitle>
              <CardDescription>
                Add your destinations and trip duration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Destinations */}
              <div>
                <label className="text-sm font-medium mb-3 block">
                  Destinations
                </label>
                <div className="space-y-3">
                  {destinations.map((dest, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder="E.g., Jaipur, Goa, Kerala..."
                        value={dest}
                        onChange={(e) => updateDestination(index, e.target.value)}
                      />
                      {destinations.length > 1 && (
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => removeDestination(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    onClick={addDestination}
                    className="w-full"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Destination
                  </Button>
                </div>
              </div>

              {/* Duration */}
              <div>
                <label className="text-sm font-medium mb-3 block">
                  Trip Duration (days)
                </label>
                <Input
                  type="number"
                  min="1"
                  max="30"
                  value={days}
                  onChange={(e) => setDays(parseInt(e.target.value) || 1)}
                />
              </div>

              {/* Generate Button */}
              <Button
                onClick={handleGenerate}
                disabled={destinations.filter(d => d.trim()).length === 0 || isLoading}
                size="lg"
                className="w-full bg-green-600 hover:bg-green-700"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Crafting your itinerary...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Generate Itinerary
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Itinerary Results */}
        {itinerary && (
          <div className="max-w-4xl mx-auto">
            {/* Title Section */}
            <div className="text-center mb-8 p-8 bg-gradient-to-r from-green-100 to-blue-100 rounded-3xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                {itinerary.title}
              </h2>
              <p className="text-gray-700 text-lg mb-4">
                {itinerary.summary}
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {itinerary.destinations.map((dest, i) => (
                  <Badge key={i} variant="secondary" className="text-sm">
                    <MapPin className="h-3 w-3 mr-1" />
                    {dest}
                  </Badge>
                ))}
                <Badge variant="secondary" className="text-sm">
                  <Calendar className="h-3 w-3 mr-1" />
                  {itinerary.duration} days
                </Badge>
              </div>
            </div>

            {/* Daily Schedule */}
            <div className="space-y-6">
              {itinerary.days.map((day, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="bg-green-50">
                    <div className="flex items-center gap-3">
                      <div className="bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                        {day.day}
                      </div>
                      <div>
                        <CardTitle>Day {day.day}</CardTitle>
                        <CardDescription className="text-base">
                          {day.title}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {day.activities.map((activity, actIndex) => (
                        <div key={actIndex} className="flex gap-4 pb-4 border-b last:border-0">
                          <div className="flex items-center gap-2 text-sm font-medium text-gray-600 min-w-[80px]">
                            <Clock className="h-4 w-4" />
                            {activity.time}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-lg mb-1">
                              {activity.activity}
                            </h4>
                            <div className="flex items-center text-sm text-gray-600 mb-2">
                              <MapPin className="h-3 w-3 mr-1" />
                              {activity.location}
                            </div>
                            <p className="text-gray-600">
                              {activity.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Save Itinerary
              </Button>
              <Button size="lg" variant="outline">
                Download PDF
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}