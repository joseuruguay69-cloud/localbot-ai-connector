import { Business, FAQ, Service, Booking, Conversation, Message, BusinessHours, ChatbotSettings, Plan, DashboardMetrics } from '@/types';

export const demoBusinesses: Business[] = [
  {
    id: 'biz-1',
    owner_id: 'user-1',
    name: 'La Buena Mesa',
    slug: 'la-buena-mesa',
    type: 'restaurant',
    description: 'Restaurante familiar con cocina mediterránea y ambiente acogedor.',
    address: 'Calle Gran Vía 42, Madrid',
    phone: '+34 912 345 678',
    email: 'reservas@labuenamesa.com',
    capacity: 60,
    is_active: true,
    created_at: '2024-01-15',
    updated_at: '2024-03-01',
  },
  {
    id: 'biz-2',
    owner_id: 'user-2',
    name: 'Studio Bella',
    slug: 'studio-bella',
    type: 'salon',
    description: 'Centro de belleza y peluquería con los mejores profesionales.',
    address: 'Av. Diagonal 156, Barcelona',
    phone: '+34 933 456 789',
    email: 'citas@studiobella.com',
    capacity: 8,
    is_active: true,
    created_at: '2024-02-01',
    updated_at: '2024-03-01',
  },
];

export const demoHours: Record<string, BusinessHours[]> = {
  'biz-1': [
    { id: 'h1', business_id: 'biz-1', day_of_week: 0, open_time: '12:00', close_time: '23:00', is_open: true },
    { id: 'h2', business_id: 'biz-1', day_of_week: 1, open_time: '12:00', close_time: '23:00', is_open: true },
    { id: 'h3', business_id: 'biz-1', day_of_week: 2, open_time: '12:00', close_time: '23:00', is_open: true },
    { id: 'h4', business_id: 'biz-1', day_of_week: 3, open_time: '12:00', close_time: '23:00', is_open: true },
    { id: 'h5', business_id: 'biz-1', day_of_week: 4, open_time: '12:00', close_time: '23:00', is_open: true },
    { id: 'h6', business_id: 'biz-1', day_of_week: 5, open_time: '12:00', close_time: '00:00', is_open: true },
    { id: 'h7', business_id: 'biz-1', day_of_week: 6, open_time: '12:00', close_time: '00:00', is_open: true },
  ],
  'biz-2': [
    { id: 'h8', business_id: 'biz-2', day_of_week: 0, open_time: '', close_time: '', is_open: false },
    { id: 'h9', business_id: 'biz-2', day_of_week: 1, open_time: '', close_time: '', is_open: false },
    { id: 'h10', business_id: 'biz-2', day_of_week: 2, open_time: '09:00', close_time: '19:00', is_open: true },
    { id: 'h11', business_id: 'biz-2', day_of_week: 3, open_time: '09:00', close_time: '19:00', is_open: true },
    { id: 'h12', business_id: 'biz-2', day_of_week: 4, open_time: '09:00', close_time: '19:00', is_open: true },
    { id: 'h13', business_id: 'biz-2', day_of_week: 5, open_time: '09:00', close_time: '19:00', is_open: true },
    { id: 'h14', business_id: 'biz-2', day_of_week: 6, open_time: '09:00', close_time: '17:00', is_open: true },
  ],
};

export const demoServices: Record<string, Service[]> = {
  'biz-1': [
    { id: 's1', business_id: 'biz-1', name: 'Mesa para 2', duration_minutes: 90, price: 0, currency: 'EUR', is_active: true, description: 'Reserva para 2 personas' },
    { id: 's2', business_id: 'biz-1', name: 'Mesa para 4', duration_minutes: 120, price: 0, currency: 'EUR', is_active: true, description: 'Reserva para 4 personas' },
    { id: 's3', business_id: 'biz-1', name: 'Mesa para 6+', duration_minutes: 150, price: 0, currency: 'EUR', is_active: true, description: 'Grupo grande' },
  ],
  'biz-2': [
    { id: 's4', business_id: 'biz-2', name: 'Corte de cabello', duration_minutes: 30, price: 25, currency: 'EUR', is_active: true },
    { id: 's5', business_id: 'biz-2', name: 'Coloración', duration_minutes: 90, price: 65, currency: 'EUR', is_active: true },
    { id: 's6', business_id: 'biz-2', name: 'Manicura', duration_minutes: 45, price: 20, currency: 'EUR', is_active: true },
    { id: 's7', business_id: 'biz-2', name: 'Tratamiento facial', duration_minutes: 60, price: 45, currency: 'EUR', is_active: true },
    { id: 's8', business_id: 'biz-2', name: 'Peinado especial', duration_minutes: 60, price: 40, currency: 'EUR', is_active: true },
  ],
};

export const demoFAQs: Record<string, FAQ[]> = {
  'biz-1': [
    { id: 'f1', business_id: 'biz-1', question: '¿Cuál es el horario del restaurante?', answer: 'Estamos abiertos de lunes a domingo de 12:00 a 23:00. Los viernes y sábados cerramos a las 00:00.', category: 'Horarios', is_active: true, order_index: 0 },
    { id: 'f2', business_id: 'biz-1', question: '¿Tienen opciones vegetarianas?', answer: 'Sí, tenemos una amplia selección de platos vegetarianos y veganos. Nuestro chef prepara opciones frescas cada día.', category: 'Menú', is_active: true, order_index: 1 },
    { id: 'f3', business_id: 'biz-1', question: '¿Cómo puedo hacer una reserva?', answer: 'Puedes reservar directamente aquí en el chat indicando fecha, hora y número de personas. También por teléfono al +34 912 345 678.', category: 'Reservas', is_active: true, order_index: 2 },
    { id: 'f4', business_id: 'biz-1', question: '¿Tienen terraza?', answer: 'Sí, contamos con una terraza exterior con capacidad para 20 personas. Disponible según el clima.', category: 'Instalaciones', is_active: true, order_index: 3 },
    { id: 'f5', business_id: 'biz-1', question: '¿Aceptan grupos grandes?', answer: 'Sí, aceptamos reservas para grupos de hasta 20 personas. Para grupos mayores, contáctenos por teléfono.', category: 'Reservas', is_active: true, order_index: 4 },
  ],
  'biz-2': [
    { id: 'f6', business_id: 'biz-2', question: '¿Cuáles son los horarios de atención?', answer: 'Atendemos de martes a viernes de 9:00 a 19:00, y sábados de 9:00 a 17:00. Domingos y lunes cerrado.', category: 'Horarios', is_active: true, order_index: 0 },
    { id: 'f7', business_id: 'biz-2', question: '¿Cuánto cuesta un corte de cabello?', answer: 'El corte de cabello tiene un precio de 25€. Incluye lavado y secado.', category: 'Precios', is_active: true, order_index: 1 },
    { id: 'f8', business_id: 'biz-2', question: '¿Necesito cita previa?', answer: 'Recomendamos reservar cita para garantizar disponibilidad. Puedes hacerlo aquí en el chat o llamando al +34 933 456 789.', category: 'Reservas', is_active: true, order_index: 2 },
    { id: 'f9', business_id: 'biz-2', question: '¿Atienden los sábados?', answer: 'Sí, los sábados atendemos de 9:00 a 17:00.', category: 'Horarios', is_active: true, order_index: 3 },
    { id: 'f10', business_id: 'biz-2', question: '¿Cómo puedo cancelar mi cita?', answer: 'Puedes cancelar o modificar tu cita aquí en el chat o llamándonos con al menos 2 horas de anticipación.', category: 'Reservas', is_active: true, order_index: 4 },
  ],
};

const today = new Date().toISOString().split('T')[0];
const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

export const demoBookings: Record<string, Booking[]> = {
  'biz-1': [
    { id: 'b1', business_id: 'biz-1', customer_name: 'María García', customer_phone: '+34 611 222 333', date: today, time: '13:00', duration_minutes: 90, party_size: 2, status: 'confirmed', service_name: 'Mesa para 2', created_at: today, notes: 'Prefiere terraza' },
    { id: 'b2', business_id: 'biz-1', customer_name: 'Carlos López', customer_phone: '+34 622 333 444', date: today, time: '14:30', duration_minutes: 120, party_size: 4, status: 'confirmed', service_name: 'Mesa para 4', created_at: today },
    { id: 'b3', business_id: 'biz-1', customer_name: 'Ana Martínez', customer_phone: '+34 633 444 555', date: today, time: '21:00', duration_minutes: 120, party_size: 6, status: 'pending', service_name: 'Mesa para 6+', created_at: today, notes: 'Cumpleaños' },
    { id: 'b4', business_id: 'biz-1', customer_name: 'Pedro Ruiz', date: tomorrow, time: '13:30', duration_minutes: 90, party_size: 2, status: 'pending', service_name: 'Mesa para 2', created_at: today },
  ],
  'biz-2': [
    { id: 'b5', business_id: 'biz-2', customer_name: 'Laura Fernández', customer_phone: '+34 644 555 666', date: today, time: '09:30', duration_minutes: 30, status: 'confirmed', service_name: 'Corte de cabello', created_at: today },
    { id: 'b6', business_id: 'biz-2', customer_name: 'Isabel Torres', customer_phone: '+34 655 666 777', date: today, time: '11:00', duration_minutes: 90, status: 'confirmed', service_name: 'Coloración', created_at: today },
    { id: 'b7', business_id: 'biz-2', customer_name: 'Sofía Navarro', date: today, time: '15:00', duration_minutes: 45, status: 'pending', service_name: 'Manicura', created_at: today },
    { id: 'b8', business_id: 'biz-2', customer_name: 'Elena Díaz', date: tomorrow, time: '10:00', duration_minutes: 60, status: 'pending', service_name: 'Tratamiento facial', created_at: today },
  ],
};

export const demoConversations: Record<string, Conversation[]> = {
  'biz-1': [
    { id: 'c1', business_id: 'biz-1', customer_name: 'María García', customer_phone: '+34 611 222 333', channel: 'web', status: 'resolved', created_at: '2024-03-06T10:30:00', updated_at: '2024-03-06T10:35:00' },
    { id: 'c2', business_id: 'biz-1', customer_name: 'Carlos López', channel: 'web', status: 'open', created_at: '2024-03-07T14:20:00', updated_at: '2024-03-07T14:25:00' },
    { id: 'c3', business_id: 'biz-1', customer_name: 'Visitante', channel: 'web', status: 'escalated', created_at: '2024-03-07T16:00:00', updated_at: '2024-03-07T16:10:00' },
  ],
  'biz-2': [
    { id: 'c4', business_id: 'biz-2', customer_name: 'Laura Fernández', customer_phone: '+34 644 555 666', channel: 'web', status: 'resolved', created_at: '2024-03-06T09:00:00', updated_at: '2024-03-06T09:10:00' },
    { id: 'c5', business_id: 'biz-2', customer_name: 'Sofía Navarro', channel: 'web', status: 'open', created_at: '2024-03-07T12:00:00', updated_at: '2024-03-07T12:15:00' },
  ],
};

export const demoMessages: Record<string, Message[]> = {
  'c1': [
    { id: 'm1', conversation_id: 'c1', role: 'user', content: 'Hola, ¿tienen mesa para 2 hoy a las 13:00?', created_at: '2024-03-06T10:30:00' },
    { id: 'm2', conversation_id: 'c1', role: 'assistant', content: '¡Hola María! 👋 Sí, tenemos disponibilidad para 2 personas hoy a las 13:00. ¿Te gustaría reservar?', created_at: '2024-03-06T10:30:30' },
    { id: 'm3', conversation_id: 'c1', role: 'user', content: 'Sí, por favor. ¿Pueden ser en la terraza?', created_at: '2024-03-06T10:31:00' },
    { id: 'm4', conversation_id: 'c1', role: 'assistant', content: '¡Perfecto! He reservado una mesa para 2 en la terraza hoy a las 13:00 a nombre de María García. ¿Necesitas algo más?', created_at: '2024-03-06T10:31:30' },
    { id: 'm5', conversation_id: 'c1', role: 'user', content: 'No, gracias. ¡Hasta luego!', created_at: '2024-03-06T10:32:00' },
    { id: 'm6', conversation_id: 'c1', role: 'assistant', content: '¡Hasta luego! Te esperamos a las 13:00. 🍽️', created_at: '2024-03-06T10:32:30' },
  ],
  'c2': [
    { id: 'm7', conversation_id: 'c2', role: 'user', content: '¿Tienen opciones vegetarianas?', created_at: '2024-03-07T14:20:00' },
    { id: 'm8', conversation_id: 'c2', role: 'assistant', content: '¡Hola! Sí, tenemos una amplia selección de platos vegetarianos y veganos. Nuestro chef prepara opciones frescas cada día. ¿Te gustaría ver el menú o hacer una reserva?', created_at: '2024-03-07T14:20:30' },
    { id: 'm9', conversation_id: 'c2', role: 'user', content: 'Quiero reservar para 4 personas mañana', created_at: '2024-03-07T14:21:00' },
    { id: 'm10', conversation_id: 'c2', role: 'assistant', content: '¡Genial! ¿A qué hora les gustaría venir? Tenemos disponibilidad a partir de las 12:00.', created_at: '2024-03-07T14:21:30' },
  ],
  'c3': [
    { id: 'm11', conversation_id: 'c3', role: 'user', content: 'Quiero hablar con una persona, tengo un problema con mi factura', created_at: '2024-03-07T16:00:00' },
    { id: 'm12', conversation_id: 'c3', role: 'assistant', content: 'Entiendo, lamento las molestias. Voy a derivarte con uno de nuestros compañeros para resolver tu consulta lo antes posible. Un momento por favor. 🙏', created_at: '2024-03-07T16:00:30' },
  ],
  'c4': [
    { id: 'm13', conversation_id: 'c4', role: 'user', content: 'Hola, quiero turno para corte de cabello', created_at: '2024-03-06T09:00:00' },
    { id: 'm14', conversation_id: 'c4', role: 'assistant', content: '¡Hola Laura! 💇‍♀️ ¿Para cuándo te gustaría el turno? Tenemos disponibilidad hoy y mañana.', created_at: '2024-03-06T09:00:30' },
    { id: 'm15', conversation_id: 'c4', role: 'user', content: 'Hoy a las 9:30 si puede ser', created_at: '2024-03-06T09:01:00' },
    { id: 'm16', conversation_id: 'c4', role: 'assistant', content: '¡Perfecto! Turno confirmado para hoy a las 9:30 - Corte de cabello (25€, 30 min). ¿Necesitas algo más?', created_at: '2024-03-06T09:01:30' },
  ],
  'c5': [
    { id: 'm17', conversation_id: 'c5', role: 'user', content: '¿Cuánto sale una manicura?', created_at: '2024-03-07T12:00:00' },
    { id: 'm18', conversation_id: 'c5', role: 'assistant', content: '¡Hola! La manicura tiene un precio de 20€ y dura aproximadamente 45 minutos. ¿Te gustaría reservar un turno?', created_at: '2024-03-07T12:00:30' },
    { id: 'm19', conversation_id: 'c5', role: 'user', content: 'Sí, para hoy a las 15:00', created_at: '2024-03-07T12:01:00' },
    { id: 'm20', conversation_id: 'c5', role: 'assistant', content: 'Para confirmar la reserva necesito tu nombre y teléfono. ¿Me los puedes proporcionar?', created_at: '2024-03-07T12:01:30' },
  ],
};

export const demoChatbotSettings: Record<string, ChatbotSettings> = {
  'biz-1': {
    id: 'cs1', business_id: 'biz-1', tone: 'friendly',
    welcome_message: '¡Hola! 👋 Soy el asistente de La Buena Mesa. ¿En qué puedo ayudarte? Puedo responder preguntas sobre nuestro menú, horarios o ayudarte a hacer una reserva.',
    offline_message: 'Ahora mismo estamos fuera de horario. Nuestro horario es de 12:00 a 23:00. ¡Déjanos tu mensaje y te responderemos mañana!',
    escalation_message: 'Voy a derivarte con uno de nuestros compañeros. Un momento por favor.',
    language: 'es', max_response_length: 200, auto_book: true, collect_contact: true,
    system_prompt: 'Eres el asistente virtual de La Buena Mesa, un restaurante familiar con cocina mediterránea. Responde de forma amable y ayuda con reservas.',
  },
  'biz-2': {
    id: 'cs2', business_id: 'biz-2', tone: 'friendly',
    welcome_message: '¡Hola! 💇‍♀️ Bienvenida a Studio Bella. ¿En qué puedo ayudarte? Puedo informarte sobre nuestros servicios, precios o ayudarte a pedir un turno.',
    offline_message: 'Estamos cerrados en este momento. Atendemos de martes a sábado. ¡Déjanos tu mensaje!',
    escalation_message: 'Te conecto con una de nuestras profesionales para atender tu consulta.',
    language: 'es', max_response_length: 200, auto_book: true, collect_contact: true,
    system_prompt: 'Eres el asistente virtual de Studio Bella, un centro de belleza y peluquería. Responde con calidez y ayuda a agendar turnos.',
  },
};

export const demoPlans: Plan[] = [
  { id: 'plan-free', name: 'Starter', price_monthly: 0, messages_limit: 100, bookings_limit: 20, features: ['1 chatbot', 'FAQs básicas', '100 mensajes/mes', '20 reservas/mes'], is_popular: false },
  { id: 'plan-pro', name: 'Profesional', price_monthly: 29, messages_limit: 1000, bookings_limit: 200, features: ['Chatbot personalizado', 'FAQs ilimitadas', '1.000 mensajes/mes', '200 reservas/mes', 'Widget personalizable', 'Métricas avanzadas'], is_popular: true },
  { id: 'plan-business', name: 'Business', price_monthly: 79, messages_limit: 5000, bookings_limit: 1000, features: ['Todo de Profesional', '5.000 mensajes/mes', '1.000 reservas/mes', 'Integración WhatsApp', 'API acceso', 'Soporte prioritario', 'Multi-idioma'], is_popular: false },
];

export const demoMetrics: DashboardMetrics = {
  totalConversations: 147,
  openConversations: 12,
  todayBookings: 8,
  weeklyCustomers: 63,
  autoResolutionRate: 78,
  topFAQs: [
    { question: '¿Cuál es el horario?', count: 34 },
    { question: '¿Cómo reservo?', count: 28 },
    { question: '¿Tienen opciones vegetarianas?', count: 15 },
    { question: '¿Aceptan grupos?', count: 12 },
  ],
};
