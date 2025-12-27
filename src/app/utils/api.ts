import { projectId, publicAnonKey } from '../../../utils/supabase/info';

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-ca4a02ac`;

// Helper function to get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('access_token');
};

// Helper function to make API requests
async function apiRequest(
  endpoint: string,
  options: RequestInit = {}
): Promise<any> {
  const token = getAuthToken();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Add authorization header if token exists
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  } else {
    // Use public anon key if no user token
    headers['Authorization'] = `Bearer ${publicAnonKey}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'API request failed');
  }

  return data;
}

// ============ AUTH API ============

export async function signup(name: string, email: string, password: string) {
  const data = await apiRequest('/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  });
  return data.user;
}

export async function login(email: string, password: string) {
  const data = await apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  
  // Store access token
  if (data.access_token) {
    localStorage.setItem('access_token', data.access_token);
  }
  
  return data;
}

export async function getCurrentUser() {
  try {
    const data = await apiRequest('/auth/user');
    return data.user;
  } catch (error) {
    // If unauthorized, clear token and return null
    localStorage.removeItem('access_token');
    return null;
  }
}

export async function logout() {
  localStorage.removeItem('access_token');
  await apiRequest('/auth/logout', {
    method: 'POST',
  });
}

// ============ COURTS API ============

export async function getCourts() {
  const data = await apiRequest('/courts');
  return data.courts;
}

export async function getCourt(id: string) {
  const data = await apiRequest(`/courts/${id}`);
  return data.court;
}

// ============ BOOKINGS API ============

export async function createBooking(booking: {
  courtId: string;
  courtName: string;
  date: string;
  time: string;
  duration: number;
  price: number;
}) {
  const data = await apiRequest('/bookings', {
    method: 'POST',
    body: JSON.stringify(booking),
  });
  return data.booking;
}

export async function getUserBookings() {
  const data = await apiRequest('/bookings');
  return data.bookings;
}

export async function getAllBookings() {
  const data = await apiRequest('/admin/bookings');
  return data.bookings;
}

export async function updateBookingStatus(id: string, status: string) {
  const data = await apiRequest(`/bookings/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  });
  return data.booking;
}

// ============ MESSAGES API ============

export async function sendMessage(message: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const data = await apiRequest('/messages', {
    method: 'POST',
    body: JSON.stringify(message),
  });
  return data.message;
}

export async function getAllMessages() {
  const data = await apiRequest('/admin/messages');
  return data.messages;
}

export async function updateMessageStatus(id: string, status: string) {
  const data = await apiRequest(`/messages/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  });
  return data.message;
}

// ============ OFFERS API ============

export async function getOffers() {
  const data = await apiRequest('/offers');
  return data.offers;
}
