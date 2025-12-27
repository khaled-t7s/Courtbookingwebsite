import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, DollarSign, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { useAuth } from '../context/AuthContext';
import { mockBookings } from '../data/mockData';

export const UserDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  const userBookings = mockBookings.filter((b) => b.userId === user.id || b.userEmail === user.email);
  const upcomingBookings = userBookings.filter((b) => b.status === 'confirmed');
  const totalSpent = userBookings.reduce((sum, b) => sum + b.price, 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl mb-8 text-gray-900 dark:text-white">Welcome, {user.name}!</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-gray-600 dark:text-gray-300">Total Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl text-gray-900 dark:text-white">{userBookings.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-gray-600 dark:text-gray-300">Upcoming</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl text-blue-600 dark:text-blue-400">{upcomingBookings.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-gray-600 dark:text-gray-300">Total Spent</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl text-green-600 dark:text-green-400">${totalSpent}</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            {userBookings.length === 0 ? (
              <p className="text-center py-8 text-gray-600 dark:text-gray-300">
                You haven't made any bookings yet.
              </p>
            ) : (
              <div className="space-y-4">
                {userBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="border dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-wrap justify-between items-start gap-4">
                      <div>
                        <h3 className="text-lg mb-2 text-gray-900 dark:text-white">
                          {booking.courtName}
                        </h3>
                        <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2" />
                            {booking.date}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2" />
                            {booking.time} ({booking.duration}h)
                          </div>
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-2" />
                            ${booking.price}
                          </div>
                        </div>
                      </div>
                      <Badge
                        className={
                          booking.status === 'confirmed'
                            ? 'bg-green-600'
                            : booking.status === 'pending'
                            ? 'bg-yellow-600'
                            : 'bg-red-600'
                        }
                      >
                        {booking.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export const UserBookings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  const userBookings = mockBookings.filter((b) => b.userId === user.id || b.userEmail === user.email);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl mb-8 text-gray-900 dark:text-white">My Bookings</h1>

        <Card>
          <CardContent className="p-6">
            {userBookings.length === 0 ? (
              <p className="text-center py-12 text-gray-600 dark:text-gray-300">
                You haven't made any bookings yet.
              </p>
            ) : (
              <div className="space-y-4">
                {userBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="border dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex flex-wrap justify-between items-start gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl mb-3 text-gray-900 dark:text-white">
                          {booking.courtName}
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-600 dark:text-gray-300">
                          <div className="flex items-center">
                            <Calendar className="h-5 w-5 mr-2" />
                            <span>{booking.date}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-5 w-5 mr-2" />
                            <span>{booking.time} - {booking.duration} hours</span>
                          </div>
                          <div className="flex items-center">
                            <DollarSign className="h-5 w-5 mr-2" />
                            <span>${booking.price}</span>
                          </div>
                        </div>
                      </div>
                      <Badge
                        className={`${
                          booking.status === 'confirmed'
                            ? 'bg-green-600'
                            : booking.status === 'pending'
                            ? 'bg-yellow-600'
                            : 'bg-red-600'
                        } text-white`}
                      >
                        {booking.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
