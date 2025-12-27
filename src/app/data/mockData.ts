export interface Court {
  id: string;
  name: string;
  type: 'football' | 'basketball' | 'tennis';
  image: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  features: string[];
  availability: string[];
  description: string;
  popular: boolean;
}

export interface Booking {
  id: string;
  courtId: string;
  courtName: string;
  userId: string;
  userName: string;
  userEmail: string;
  date: string;
  time: string;
  duration: number;
  price: number;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  status: 'unread' | 'read';
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  discount: number;
  code: string;
  validUntil: string;
  image: string;
  minBooking?: number;
}

export const courts: Court[] = [
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
  },
];

export const offers: Offer[] = [
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
  },
];

export const mockBookings: Booking[] = [
  {
    id: 'b1',
    courtId: '1',
    courtName: 'City Center Football Arena',
    userId: '2',
    userName: 'John Doe',
    userEmail: 'john@example.com',
    date: '2025-01-05',
    time: '18:00',
    duration: 2,
    price: 100,
    status: 'confirmed',
  },
  {
    id: 'b2',
    courtId: '2',
    courtName: 'Riverside Basketball Court',
    userId: '3',
    userName: 'Jane Smith',
    userEmail: 'jane@example.com',
    date: '2025-01-06',
    time: '14:00',
    duration: 1,
    price: 30,
    status: 'pending',
  },
];

export const mockMessages: Message[] = [
  {
    id: 'm1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    subject: 'Court Availability',
    message: 'Hi, I would like to know about court availability for next week.',
    date: '2024-12-25',
    status: 'unread',
  },
  {
    id: 'm2',
    name: 'Bob Williams',
    email: 'bob@example.com',
    subject: 'Booking Issue',
    message: 'I am having trouble completing my booking. Can you help?',
    date: '2024-12-24',
    status: 'read',
  },
];

export const faqs = [
  {
    question: 'How do I book a court?',
    answer: 'Simply browse our available courts, select your preferred date and time, and complete the booking form. You will receive a confirmation email once your booking is processed.',
  },
  {
    question: 'What is the cancellation policy?',
    answer: 'You can cancel your booking up to 24 hours before the scheduled time for a full refund. Cancellations made within 24 hours will incur a 50% cancellation fee.',
  },
  {
    question: 'Do you offer group discounts?',
    answer: 'Yes! We offer a 15% discount when you book 3 or more hours. Use code GROUP15 at checkout.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, debit cards, and digital payment methods including PayPal and Apple Pay.',
  },
  {
    question: 'Are the facilities accessible?',
    answer: 'Yes, all our facilities are wheelchair accessible and equipped with disabled parking spaces and restrooms.',
  },
  {
    question: 'Can I bring my own equipment?',
    answer: 'Absolutely! You are welcome to bring your own equipment. We also offer equipment rental at select locations.',
  },
];
