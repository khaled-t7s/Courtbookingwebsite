import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Filter } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardFooter } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { courts } from '../data/mockData';

export const CourtsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('popular');

  const filteredCourts = courts.filter((court) => {
    const matchesSearch =
      court.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      court.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || court.type === selectedType;
    const matchesPrice =
      priceRange === 'all' ||
      (priceRange === 'low' && court.price < 35) ||
      (priceRange === 'medium' && court.price >= 35 && court.price <= 45) ||
      (priceRange === 'high' && court.price > 45);
    return matchesSearch && matchesType && matchesPrice;
  });

  const sortedCourts = [...filteredCourts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'popular') return b.reviews - a.reviews;
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl mb-4 text-gray-900 dark:text-white">
            Browse Courts
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Find the perfect court for your game
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center mb-4">
            <Filter className="h-5 w-5 mr-2 text-gray-600 dark:text-gray-300" />
            <h2 className="text-xl text-gray-900 dark:text-white">Filters</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="search" className="text-gray-700 dark:text-gray-300">Search</Label>
              <Input
                id="search"
                placeholder="Search courts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="type" className="text-gray-700 dark:text-gray-300">Court Type</Label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger id="type" className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="football">Football</SelectItem>
                  <SelectItem value="basketball">Basketball</SelectItem>
                  <SelectItem value="tennis">Tennis</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="price" className="text-gray-700 dark:text-gray-300">Price Range</Label>
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger id="price" className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="low">Under $35</SelectItem>
                  <SelectItem value="medium">$35 - $45</SelectItem>
                  <SelectItem value="high">Over $45</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="sort" className="text-gray-700 dark:text-gray-300">Sort By</Label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger id="sort" className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-300">
            Showing {sortedCourts.length} of {courts.length} courts
          </p>
        </div>

        {sortedCourts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 dark:text-gray-300">
              No courts found matching your criteria
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedCourts.map((court) => (
              <Card key={court.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-48">
                  <img
                    src={court.image}
                    alt={court.name}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-4 right-4 bg-blue-600 capitalize">
                    {court.type}
                  </Badge>
                  {court.popular && (
                    <Badge className="absolute top-4 left-4 bg-yellow-500">
                      Popular
                    </Badge>
                  )}
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
                        ({court.reviews})
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {court.features.slice(0, 3).map((feature) => (
                      <Badge key={feature} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  <div className="text-2xl text-blue-600 dark:text-blue-400">
                    ${court.price}
                    <span className="text-sm text-gray-500 dark:text-gray-400">/hour</span>
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Link to={`/court/${court.id}`} className="w-full">
                    <Button className="w-full">View & Book</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
