import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Navigation } from './components/Navigation';
import { HomePage } from './pages/HomePage';
import { CourtsPage } from './pages/CourtsPage';
import { CourtDetailPage } from './pages/CourtDetailPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { UserDashboard } from './pages/UserDashboard';
import { UserBookings } from './pages/UserBookings';
import { AdminDashboard } from './pages/AdminDashboard';
import { OffersPage } from './pages/OffersPage';
import { ContactPage } from './pages/ContactPage';
import { FAQPage } from './pages/FAQPage';
import { Toaster } from './components/ui/sonner';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
          <Navigation />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/courts" element={<CourtsPage />} />
            <Route path="/court/:id" element={<CourtDetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/user/dashboard" element={<UserDashboard />} />
            <Route path="/user/bookings" element={<UserBookings />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/offers" element={<OffersPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faq" element={<FAQPage />} />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
