'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, MessageCircle, Sparkles } from 'lucide-react';
import { initAuth } from '@/lib/firebase/config';

export default function Home() {
  useEffect(() => {
    initAuth();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-green-50">
      <section className="container mx-auto px-4 py-24">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-orange-600 via-green-600 to-blue-600 bg-clip-text text-transparent">
            Discover Bharat, Intelligently
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your AI travel companion for exploring India
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700">
              <Link href="/explore">
                <MapPin className="mr-2 h-5 w-5" />
                Start Exploring
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/plan">
                <Calendar className="mr-2 h-5 w-5" />
                Plan Trip
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}