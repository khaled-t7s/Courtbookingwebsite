import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, MapPin, Clock, DollarSign, Check } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { courts } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

export const CourtDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const court = courts.find((c) => c.id === id);

  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [duration, setDuration] = useState('1');

  if (!court) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-2xl mb-4 text-gray-900 dark:text-white">Court not found</h2>
          <Button onClick={() => navigate('/courts')}>Back to Courts</Button>
        </div>
      </div>
    );
  }

  const totalPrice = court.price * parseInt(duration);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login to book a court');
      navigate('/login');
      return;
    }
    if (!bookingDate || !bookingTime) {
      toast.error('Please select date and time');
      return;
    }
    toast.success('Booking successful! Check your bookings dashboard.');
    navigate('/user/bookings');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="relative h-96 rounded-lg overflow-hidden mb-6">
              <img
                src={court.image}
                alt={court.name}
                className="w-full h-full object-cover"
              />
              <Badge className="absolute top-4 right-4 bg-blue-600 capitalize">
                {court.type}
              </Badge>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
              <h1 className="text-3xl mb-4 text-gray-900 dark:text-white">
                {court.name}
              </h1>

              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 fill-current mr-1" />
                  <span className="text-gray-900 dark:text-white">{court.rating}</span>
                  <span className="ml-1 text-gray-500 dark:text-gray-400">
                    ({court.reviews} reviews)
                  </span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <MapPin className="h-5 w-5 mr-1" />
                  <span>{court.location}</span>
                </div>
                <div className="flex items-center text-blue-600 dark:text-blue-400">
                  <DollarSign className="h-5 w-5" />
                  <span className="text-2xl">{court.price}</span>
                  <span className="text-gray-500 dark:text-gray-400 ml-1">/hour</span>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-xl mb-3 text-gray-900 dark:text-white">Description</h2>
                <p className="text-gray-600 dark:text-gray-300">{court.description}</p>
              </div>

              <div className="mb-6">
                <h2 className="text-xl mb-3 text-gray-900 dark:text-white">Features</h2>
                <div className="grid grid-cols-2 gap-3">
                  {court.features.map((feature) => (
                    <div key={feature} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl mb-3 text-gray-900 dark:text-white">Availability</h2>
                <div className="flex flex-wrap gap-2">
                  {court.availability.map((slot) => (
                    <Badge key={slot} variant="outline" className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {slot}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Book This Court</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleBooking} className="space-y-4">
                  <div>
                    <Label htmlFor="date" className="text-gray-700 dark:text-gray-300">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="time" className="text-gray-700 dark:text-gray-300">Time</Label>
                    <Select value={bookingTime} onValueChange={setBookingTime} required>
                      <SelectTrigger id="time" className="mt-1">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {court.availability.flatMap((slot) => {
                          const [start, end] = slot.split('-');
                          const times = [];
                          const startHour = parseInt(start.split(':')[0]);
                          const endHour = parseInt(end.split(':')[0]);
                          for (let i = startHour; i < endHour; i++) {
                            times.push(`${i.toString().padStart(2, '0')}:00`);
                          }
                          return times;
                        }).map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="duration" className="text-gray-700 dark:text-gray-300">Duration (hours)</Label>
                    <Select value={duration} onValueChange={setDuration}>
                      <SelectTrigger id="duration" className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5].map((hours) => (
                          <SelectItem key={hours} value={hours.toString()}>
                            {hours} {hours === 1 ? 'hour' : 'hours'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600 dark:text-gray-300">Price per hour:</span>
                      <span className="text-gray-900 dark:text-white">${court.price}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600 dark:text-gray-300">Duration:</span>
                      <span className="text-gray-900 dark:text-white">{duration} hours</span>
                    </div>
                    <div className="flex justify-between text-lg">
                      <span className="text-gray-900 dark:text-white">Total:</span>
                      <span className="text-blue-600 dark:text-blue-400">${totalPrice}</span>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Book Now
                  </Button>

                  {!user && (
                    <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                      Please login to complete booking
                    </p>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
