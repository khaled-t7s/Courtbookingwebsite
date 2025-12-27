import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, Mail, DollarSign, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { useAuth } from '../context/AuthContext';
import { mockBookings, mockMessages } from '../data/mockData';

export const AdminDashboard = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState(mockMessages);

  useEffect(() => {
    if (!user || !isAdmin) {
      navigate('/login');
    }
  }, [user, isAdmin, navigate]);

  if (!user || !isAdmin) return null;

  const totalBookings = mockBookings.length;
  const totalRevenue = mockBookings.reduce((sum, b) => sum + b.price, 0);
  const pendingBookings = mockBookings.filter((b) => b.status === 'pending').length;
  const unreadMessages = messages.filter((m) => m.status === 'unread').length;

  const markAsRead = (id: string) => {
    setMessages(messages.map((m) => (m.id === id ? { ...m, status: 'read' } : m)));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl mb-8 text-gray-900 dark:text-white">Admin Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                Total Bookings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl text-gray-900 dark:text-white">{totalBookings}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                <DollarSign className="h-4 w-4 mr-2" />
                Total Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl text-green-600 dark:text-green-400">${totalRevenue}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                <TrendingUp className="h-4 w-4 mr-2" />
                Pending
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl text-yellow-600 dark:text-yellow-400">{pendingBookings}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                Unread Messages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl text-blue-600 dark:text-blue-400">{unreadMessages}</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="bookings" className="space-y-4">
          <TabsList>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">All Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="border dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-wrap justify-between items-start gap-4">
                        <div className="flex-1">
                          <h3 className="text-lg mb-2 text-gray-900 dark:text-white">
                            {booking.courtName}
                          </h3>
                          <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                            <p>
                              <Users className="inline h-4 w-4 mr-1" />
                              {booking.userName} ({booking.userEmail})
                            </p>
                            <p>
                              <Calendar className="inline h-4 w-4 mr-1" />
                              {booking.date} at {booking.time}
                            </p>
                            <p>
                              <DollarSign className="inline h-4 w-4 mr-1" />
                              ${booking.price} ({booking.duration}h)
                            </p>
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
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Customer Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`border rounded-lg p-4 ${
                        message.status === 'unread'
                          ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-950'
                          : 'border-gray-300 dark:border-gray-700'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg text-gray-900 dark:text-white">{message.subject}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            From: {message.name} ({message.email})
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{message.date}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            className={
                              message.status === 'unread' ? 'bg-blue-600' : 'bg-gray-600'
                            }
                          >
                            {message.status}
                          </Badge>
                          {message.status === 'unread' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => markAsRead(message.id)}
                            >
                              Mark Read
                            </Button>
                          )}
                        </div>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mt-2">{message.message}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
