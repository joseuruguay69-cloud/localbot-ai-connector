export interface Business {
  id: string;
  owner_id: string;
  name: string;
  slug: string;
  type: 'restaurant' | 'salon' | 'beauty' | 'general';
  description?: string;
  address?: string;
  phone?: string;
  email?: string;
  logo_url?: string;
  website?: string;
  social_instagram?: string;
  social_facebook?: string;
  capacity?: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface BusinessHours {
  id: string;
  business_id: string;
  day_of_week: number; // 0=Sunday
  open_time: string;
  close_time: string;
  is_open: boolean;
}

export interface Service {
  id: string;
  business_id: string;
  name: string;
  description?: string;
  duration_minutes: number;
  price?: number;
  currency: string;
  is_active: boolean;
}

export interface FAQ {
  id: string;
  business_id: string;
  question: string;
  answer: string;
  category?: string;
  is_active: boolean;
  order_index: number;
}

export interface Conversation {
  id: string;
  business_id: string;
  customer_name?: string;
  customer_phone?: string;
  customer_email?: string;
  channel: 'web' | 'whatsapp' | 'demo';
  status: 'open' | 'resolved' | 'escalated';
  tags?: string[];
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  role: 'user' | 'assistant' | 'agent';
  content: string;
  created_at: string;
}

export interface Booking {
  id: string;
  business_id: string;
  customer_name: string;
  customer_phone?: string;
  customer_email?: string;
  service_id?: string;
  service_name?: string;
  date: string;
  time: string;
  duration_minutes: number;
  party_size?: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  notes?: string;
  created_at: string;
}

export interface ChatbotSettings {
  id: string;
  business_id: string;
  tone: 'formal' | 'friendly' | 'casual';
  welcome_message: string;
  offline_message: string;
  escalation_message: string;
  language: 'es' | 'it' | 'en';
  max_response_length: number;
  system_prompt?: string;
  auto_book: boolean;
  collect_contact: boolean;
}

export interface DashboardMetrics {
  totalConversations: number;
  openConversations: number;
  todayBookings: number;
  weeklyCustomers: number;
  autoResolutionRate: number;
  topFAQs: { question: string; count: number }[];
}
