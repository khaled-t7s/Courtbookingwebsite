import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, Star, MapPin } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardFooter } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { courts } from '../data/mockData';

export const HomePage = () => {
  const popularCourts = courts.filter((court) => court.popular);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl mb-6">
              Book Your Perfect Court
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Find and book football, basketball, and tennis courts near you
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/courts">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  <Search className="mr-2 h-5 w-5" />
                  Browse Courts
                </Button>
              </Link>
              <Link to="/offers">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border-white text-white">
                  View Offers
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl mb-2 text-gray-900 dark:text-white">Easy Booking</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Search and book courts in just a few clicks
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl mb-2 text-gray-900 dark:text-white">Flexible Scheduling</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Book courts at times that work for you
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl mb-2 text-gray-900 dark:text-white">Quality Facilities</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Top-rated courts with excellent amenities
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Courts Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4 text-gray-900 dark:text-white">
              Popular Courts
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Check out our most booked sports facilities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularCourts.map((court) => (
              <Card key={court.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-48">
                  <img
                    src={court.image}
                    alt={court.name}
                    className="w-full h-full object-cover"
                  />
                  <Badge
                    className="absolute top-4 right-4 bg-blue-600"
                  >
                    {court.type}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl mb-2 text-gray-900 dark:text-white">
                    {court.name}
                  </h3>
                  <div className="flex items-center text-gray-600 dark:text-gray-300 mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{court.location}</span>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="ml-1 text-gray-900 dark:text-white">{court.rating}</span>
                      <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
                        ({court.reviews} reviews)
                      </span>
                    </div>
                  </div>
                  <div className="text-2xl text-blue-600 dark:text-blue-400">
                    ${court.price}
                    <span className="text-sm text-gray-500 dark:text-gray-400">/hour</span>
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Link to={`/court/${court.id}`} className="w-full">
                    <Button className="w-full">View Details</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/courts">
              <Button size="lg" variant="outline">
                View All Courts
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl mb-4">
            Ready to Play?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Sign up today and get 30% off your first booking
          </p>
          <Link to="/signup">
            <Button size="lg" variant="secondary">
              Get Started
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};
