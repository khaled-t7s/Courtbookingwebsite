import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Create Supabase clients
const getSupabaseAdmin = () => createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

const getSupabaseClient = () => createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_ANON_KEY') ?? ''
);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Initialize default data on startup
async function initializeData() {
  try {
    // Check if courts already exist
    const courtsExist = await kv.get('court:list');
    
    if (!courtsExist) {
      console.log('Initializing default courts data...');
      
      const defaultCourts = [
        {
          id: '1',
          name: 'City Center Football Arena',
          type: 'football',
          image: 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=800&h=600&fit=crop',
          location: 'Downtown District',
          price: 50,
          rating: 4.8,
          reviews: 124,
          features: ['Floodlights', 'Parking', 'Changing Rooms', 'Artificial Grass'],
          availability: ['09:00-18:00', '18:00-21:00'],
          description: 'Premium football arena with state-of-the-art artificial grass and excellent lighting.',
          popular: true,
        },
        {
          id: '2',
          name: 'Riverside Basketball Court',
          type: 'basketball',
          image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=600&fit=crop',
          location: 'Riverside Park',
          price: 30,
          rating: 4.6,
          reviews: 89,
          features: ['Indoor', 'Air Conditioning', 'Lockers', 'Scoreboard'],
          availability: ['08:00-22:00'],
          description: 'Modern indoor basketball court with professional-grade flooring and equipment.',
          popular: true,
        },
        {
          id: '3',
          name: 'Grand Tennis Academy',
          type: 'tennis',
          image: 'https://images.unsplash.com/photo-1622163642998-1ea32b0bbc67?w=800&h=600&fit=crop',
          location: 'North Hills',
          price: 40,
          rating: 4.9,
          reviews: 156,
          features: ['Clay Courts', 'Professional Coaching', 'Equipment Rental', 'Cafe'],
          availability: ['06:00-22:00'],
          description: 'Professional tennis facility with clay courts and experienced coaching staff.',
          popular: true,
        },
        {
          id: '4',
          name: 'Sports Hub Football Field',
          type: 'football',
          image: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&h=600&fit=crop',
          location: 'West End',
          price: 45,
          rating: 4.5,
          reviews: 78,
          features: ['Natural Grass', 'Stands', 'Floodlights', 'Parking'],
          availability: ['10:00-20:00'],
          description: 'Traditional football field with natural grass and spectator stands.',
          popular: false,
        },
        {
          id: '5',
          name: 'Elite Basketball Arena',
          type: 'basketball',
          image: 'https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?w=800&h=600&fit=crop',
          location: 'City Center',
          price: 35,
          rating: 4.7,
          reviews: 102,
          features: ['Indoor', 'Professional Grade', 'Shower Facilities', 'Free WiFi'],
          availability: ['07:00-23:00'],
          description: 'Top-tier basketball arena used by local professional teams.',
          popular: false,
        },
        {
          id: '6',
          name: 'Sunset Tennis Club',
          type: 'tennis',
          image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&h=600&fit=crop',
          location: 'Suburban Area',
          price: 35,
          rating: 4.4,
          reviews: 67,
          features: ['Hard Courts', 'Night Lighting', 'Pro Shop', 'Parking'],
          availability: ['08:00-21:00'],
          description: 'Family-friendly tennis club with multiple courts and amenities.',
          popular: false,
        }
      ];

      const courtIds = defaultCourts.map(c => c.id);
      await kv.set('court:list', JSON.stringify(courtIds));
      
      for (const court of defaultCourts) {
        await kv.set(`court:${court.id}`, JSON.stringify(court));
      }

      // Initialize default offers
      const defaultOffers = [
        {
          id: '1',
          title: 'Weekend Warrior Special',
          description: 'Get 25% off on all Saturday and Sunday bookings',
          discount: 25,
          code: 'WEEKEND25',
          validUntil: '2025-12-31',
          image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=600&fit=crop',
        },
        {
          id: '2',
          title: 'Early Bird Discount',
          description: 'Book before 10 AM and save 20%',
          discount: 20,
          code: 'EARLY20',
          validUntil: '2025-12-31',
          image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop',
        },
        {
          id: '3',
          title: 'New Member Welcome',
          description: '30% off your first booking with us',
          discount: 30,
          code: 'WELCOME30',
          validUntil: '2025-12-31',
          image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&h=600&fit=crop',
        },
        {
          id: '4',
          title: 'Group Booking Deal',
          description: '15% off when booking 3 or more hours',
          discount: 15,
          code: 'GROUP15',
          validUntil: '2025-12-31',
          image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&h=600&fit=crop',
          minBooking: 3,
        }
      ];

      const offerIds = defaultOffers.map(o => o.id);
      await kv.set('offer:list', JSON.stringify(offerIds));
      
      for (const offer of defaultOffers) {
        await kv.set(`offer:${offer.id}`, JSON.stringify(offer));
      }

      console.log('Default data initialized successfully');
    }
  } catch (error) {
    console.error('Error initializing data:', error);
  }
}

// Initialize data on startup
initializeData();

// Health check endpoint
app.get("/make-server-ca4a02ac/health", (c) => {
  return c.json({ status: "ok" });
});

// ============ AUTH ROUTES ============

// Sign up endpoint
app.post("/make-server-ca4a02ac/auth/signup", async (c) => {
  try {
    const { name, email, password } = await c.req.json();
    
    if (!name || !email || !password) {
      return c.json({ error: 'Missing required fields' }, 400);
    }

    if (password.length < 6) {
      return c.json({ error: 'Password must be at least 6 characters' }, 400);
    }

    const supabase = getSupabaseAdmin();
    
    // Create user with Supabase Auth
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { 
        name,
        role: 'user' 
      },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.error('Signup error:', error);
      return c.json({ error: error.message }, 400);
    }

    // Store user metadata in KV
    await kv.set(`user:${data.user.id}`, JSON.stringify({
      id: data.user.id,
      name,
      email,
      role: 'user'
    }));

    return c.json({ 
      user: {
        id: data.user.id,
        name,
        email,
        role: 'user'
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    return c.json({ error: 'Signup failed' }, 500);
  }
});

// Login endpoint
app.post("/make-server-ca4a02ac/auth/login", async (c) => {
  try {
    const { email, password } = await c.req.json();
    
    if (!email || !password) {
      return c.json({ error: 'Email and password required' }, 400);
    }

    const supabase = getSupabaseClient();
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Login error:', error);
      return c.json({ error: 'Invalid credentials' }, 401);
    }

    // Get user metadata from KV
    const userDataStr = await kv.get(`user:${data.user.id}`);
    let userData = userDataStr ? JSON.parse(userDataStr) : null;
    
    if (!userData) {
      // Fallback to user metadata from auth
      userData = {
        id: data.user.id,
        name: data.user.user_metadata?.name || email.split('@')[0],
        email: data.user.email,
        role: data.user.user_metadata?.role || 'user'
      };
      // Store it for future use
      await kv.set(`user:${data.user.id}`, JSON.stringify(userData));
    }

    return c.json({ 
      access_token: data.session.access_token,
      user: userData
    });
  } catch (error) {
    console.error('Login error:', error);
    return c.json({ error: 'Login failed' }, 500);
  }
});

// Get current user
app.get("/make-server-ca4a02ac/auth/user", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const supabase = getSupabaseAdmin();
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    // Get user metadata from KV
    const userDataStr = await kv.get(`user:${user.id}`);
    const userData = userDataStr ? JSON.parse(userDataStr) : {
      id: user.id,
      name: user.user_metadata?.name || user.email?.split('@')[0],
      email: user.email,
      role: user.user_metadata?.role || 'user'
    };

    return c.json({ user: userData });
  } catch (error) {
    console.error('Get user error:', error);
    return c.json({ error: 'Failed to get user' }, 500);
  }
});

// Logout (client-side handles this, but we can have a route for consistency)
app.post("/make-server-ca4a02ac/auth/logout", async (c) => {
  return c.json({ success: true });
});

// ============ COURTS ROUTES ============

// Get all courts
app.get("/make-server-ca4a02ac/courts", async (c) => {
  try {
    const courtListStr = await kv.get('court:list');
    if (!courtListStr) {
      return c.json({ courts: [] });
    }

    const courtIds = JSON.parse(courtListStr);
    const courts = [];

    for (const id of courtIds) {
      const courtStr = await kv.get(`court:${id}`);
      if (courtStr) {
        courts.push(JSON.parse(courtStr));
      }
    }

    return c.json({ courts });
  } catch (error) {
    console.error('Get courts error:', error);
    return c.json({ error: 'Failed to fetch courts' }, 500);
  }
});

// Get single court
app.get("/make-server-ca4a02ac/courts/:id", async (c) => {
  try {
    const id = c.req.param('id');
    const courtStr = await kv.get(`court:${id}`);
    
    if (!courtStr) {
      return c.json({ error: 'Court not found' }, 404);
    }

    return c.json({ court: JSON.parse(courtStr) });
  } catch (error) {
    console.error('Get court error:', error);
    return c.json({ error: 'Failed to fetch court' }, 500);
  }
});

// ============ BOOKINGS ROUTES ============

// Create booking
app.post("/make-server-ca4a02ac/bookings", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const supabase = getSupabaseAdmin();
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { courtId, courtName, date, time, duration, price } = await c.req.json();
    
    if (!courtId || !courtName || !date || !time || !duration || !price) {
      return c.json({ error: 'Missing required fields' }, 400);
    }

    // Get user data
    const userDataStr = await kv.get(`user:${user.id}`);
    const userData = userDataStr ? JSON.parse(userDataStr) : {
      name: user.user_metadata?.name || user.email?.split('@')[0],
      email: user.email
    };

    const bookingId = `b${Date.now()}`;
    const booking = {
      id: bookingId,
      courtId,
      courtName,
      userId: user.id,
      userName: userData.name,
      userEmail: userData.email,
      date,
      time,
      duration,
      price,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    // Store booking
    await kv.set(`booking:${bookingId}`, JSON.stringify(booking));
    
    // Add to user's bookings list
    const userBookingsStr = await kv.get(`booking:user:${user.id}`);
    const userBookings = userBookingsStr ? JSON.parse(userBookingsStr) : [];
    userBookings.push(bookingId);
    await kv.set(`booking:user:${user.id}`, JSON.stringify(userBookings));

    // Add to global bookings list
    const allBookingsStr = await kv.get('booking:list');
    const allBookings = allBookingsStr ? JSON.parse(allBookingsStr) : [];
    allBookings.push(bookingId);
    await kv.set('booking:list', JSON.stringify(allBookings));

    return c.json({ booking });
  } catch (error) {
    console.error('Create booking error:', error);
    return c.json({ error: 'Failed to create booking' }, 500);
  }
});

// Get user bookings
app.get("/make-server-ca4a02ac/bookings", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const supabase = getSupabaseAdmin();
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const userBookingsStr = await kv.get(`booking:user:${user.id}`);
    const userBookingIds = userBookingsStr ? JSON.parse(userBookingsStr) : [];

    const bookings = [];
    for (const id of userBookingIds) {
      const bookingStr = await kv.get(`booking:${id}`);
      if (bookingStr) {
        bookings.push(JSON.parse(bookingStr));
      }
    }

    // Sort by date descending
    bookings.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return c.json({ bookings });
  } catch (error) {
    console.error('Get bookings error:', error);
    return c.json({ error: 'Failed to fetch bookings' }, 500);
  }
});

// Get all bookings (admin only)
app.get("/make-server-ca4a02ac/admin/bookings", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const supabase = getSupabaseAdmin();
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    // Check if user is admin
    const userDataStr = await kv.get(`user:${user.id}`);
    const userData = userDataStr ? JSON.parse(userDataStr) : null;
    
    if (!userData || userData.role !== 'admin') {
      return c.json({ error: 'Forbidden - Admin access required' }, 403);
    }

    const allBookingsStr = await kv.get('booking:list');
    const bookingIds = allBookingsStr ? JSON.parse(allBookingsStr) : [];

    const bookings = [];
    for (const id of bookingIds) {
      const bookingStr = await kv.get(`booking:${id}`);
      if (bookingStr) {
        bookings.push(JSON.parse(bookingStr));
      }
    }

    // Sort by date descending
    bookings.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return c.json({ bookings });
  } catch (error) {
    console.error('Get all bookings error:', error);
    return c.json({ error: 'Failed to fetch bookings' }, 500);
  }
});

// Update booking status (admin only)
app.put("/make-server-ca4a02ac/bookings/:id", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const supabase = getSupabaseAdmin();
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    // Check if user is admin
    const userDataStr = await kv.get(`user:${user.id}`);
    const userData = userDataStr ? JSON.parse(userDataStr) : null;
    
    if (!userData || userData.role !== 'admin') {
      return c.json({ error: 'Forbidden - Admin access required' }, 403);
    }

    const bookingId = c.req.param('id');
    const { status } = await c.req.json();

    const bookingStr = await kv.get(`booking:${bookingId}`);
    if (!bookingStr) {
      return c.json({ error: 'Booking not found' }, 404);
    }

    const booking = JSON.parse(bookingStr);
    booking.status = status;

    await kv.set(`booking:${bookingId}`, JSON.stringify(booking));

    return c.json({ booking });
  } catch (error) {
    console.error('Update booking error:', error);
    return c.json({ error: 'Failed to update booking' }, 500);
  }
});

// ============ MESSAGES ROUTES ============

// Create message (contact form)
app.post("/make-server-ca4a02ac/messages", async (c) => {
  try {
    const { name, email, subject, message } = await c.req.json();
    
    if (!name || !email || !subject || !message) {
      return c.json({ error: 'Missing required fields' }, 400);
    }

    const messageId = `m${Date.now()}`;
    const newMessage = {
      id: messageId,
      name,
      email,
      subject,
      message,
      date: new Date().toISOString(),
      status: 'unread'
    };

    await kv.set(`message:${messageId}`, JSON.stringify(newMessage));

    // Add to messages list
    const messagesStr = await kv.get('message:list');
    const messages = messagesStr ? JSON.parse(messagesStr) : [];
    messages.push(messageId);
    await kv.set('message:list', JSON.stringify(messages));

    return c.json({ message: newMessage });
  } catch (error) {
    console.error('Create message error:', error);
    return c.json({ error: 'Failed to send message' }, 500);
  }
});

// Get all messages (admin only)
app.get("/make-server-ca4a02ac/admin/messages", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const supabase = getSupabaseAdmin();
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    // Check if user is admin
    const userDataStr = await kv.get(`user:${user.id}`);
    const userData = userDataStr ? JSON.parse(userDataStr) : null;
    
    if (!userData || userData.role !== 'admin') {
      return c.json({ error: 'Forbidden - Admin access required' }, 403);
    }

    const messagesStr = await kv.get('message:list');
    const messageIds = messagesStr ? JSON.parse(messagesStr) : [];

    const messages = [];
    for (const id of messageIds) {
      const messageStr = await kv.get(`message:${id}`);
      if (messageStr) {
        messages.push(JSON.parse(messageStr));
      }
    }

    // Sort by date descending
    messages.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return c.json({ messages });
  } catch (error) {
    console.error('Get messages error:', error);
    return c.json({ error: 'Failed to fetch messages' }, 500);
  }
});

// Update message status (admin only)
app.put("/make-server-ca4a02ac/messages/:id", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const supabase = getSupabaseAdmin();
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    // Check if user is admin
    const userDataStr = await kv.get(`user:${user.id}`);
    const userData = userDataStr ? JSON.parse(userDataStr) : null;
    
    if (!userData || userData.role !== 'admin') {
      return c.json({ error: 'Forbidden - Admin access required' }, 403);
    }

    const messageId = c.req.param('id');
    const { status } = await c.req.json();

    const messageStr = await kv.get(`message:${messageId}`);
    if (!messageStr) {
      return c.json({ error: 'Message not found' }, 404);
    }

    const message = JSON.parse(messageStr);
    message.status = status;

    await kv.set(`message:${messageId}`, JSON.stringify(message));

    return c.json({ message });
  } catch (error) {
    console.error('Update message error:', error);
    return c.json({ error: 'Failed to update message' }, 500);
  }
});

// ============ OFFERS ROUTES ============

// Get all offers
app.get("/make-server-ca4a02ac/offers", async (c) => {
  try {
    const offerListStr = await kv.get('offer:list');
    if (!offerListStr) {
      return c.json({ offers: [] });
    }

    const offerIds = JSON.parse(offerListStr);
    const offers = [];

    for (const id of offerIds) {
      const offerStr = await kv.get(`offer:${id}`);
      if (offerStr) {
        offers.push(JSON.parse(offerStr));
      }
    }

    return c.json({ offers });
  } catch (error) {
    console.error('Get offers error:', error);
    return c.json({ error: 'Failed to fetch offers' }, 500);
  }
});

Deno.serve(app.fetch);