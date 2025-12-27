import React from 'react';
import { Tag, Calendar, Copy } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { offers } from '../data/mockData';
import { toast } from 'sonner';

export const OffersPage = () => {
  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success('Promo code copied!');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl mb-4 text-gray-900 dark:text-white">
            Special Offers
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Save more on your court bookings with our exclusive deals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {offers.map((offer) => (
            <Card key={offer.id} className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-48">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-4 right-4 bg-red-600 text-lg px-4 py-2">
                  {offer.discount}% OFF
                </Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900 dark:text-white">{offer.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{offer.description}</p>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  {offer.minBooking && (
                    <div className="flex items-center">
                      <Tag className="h-4 w-4 mr-2" />
                      Minimum {offer.minBooking} hours booking required
                    </div>
                  )}
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Valid until {offer.validUntil}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Promo Code:</span>
                  <p className="text-xl text-blue-600 dark:text-blue-400">{offer.code}</p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => copyCode(offer.code)}
                  className="flex items-center gap-2"
                >
                  <Copy className="h-4 w-4" />
                  Copy Code
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 bg-blue-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl mb-4">Want More Exclusive Offers?</h2>
          <p className="mb-6 text-blue-100">
            Sign up for our newsletter and get notified about new deals and promotions
          </p>
          <Button size="lg" variant="secondary">
            Subscribe Now
          </Button>
        </div>
      </div>
    </div>
  );
};
