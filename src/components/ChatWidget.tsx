import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare, Send, X, Bot, Minimize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/i18n/context';
import type { FAQ, Business } from '@/types';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface ChatWidgetProps {
  business: Business;
  faqs: FAQ[];
  welcomeMessage: string;
  embedded?: boolean;
}

// Normalize text: lowercase, remove accents, punctuation
function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[¿¡?!.,;:'"()]/g, '')
    .trim();
}

// Calculate word overlap score between two strings
function wordOverlapScore(a: string, b: string): number {
  const wordsA = normalize(a).split(/\s+/).filter(w => w.length > 2);
  const wordsB = normalize(b).split(/\s+/).filter(w => w.length > 2);
  if (wordsA.length === 0 || wordsB.length === 0) return 0;
  
  let matches = 0;
  for (const wa of wordsA) {
    for (const wb of wordsB) {
      if (wa === wb || wa.includes(wb) || wb.includes(wa)) {
        matches++;
        break;
      }
    }
  }
  return matches / Math.max(wordsA.length, wordsB.length);
}

// Intent detection with multilingual keywords
const intents: Record<string, string[]> = {
  horario: ['horario', 'hora', 'abierto', 'abre', 'cierra', 'cuando', 'atienden', 'abren', 'cerrado', 'cierran',
    'orario', 'orari', 'aperto', 'chiude', 'aperti', 'chiuso', 'quando',
    'hours', 'open', 'close', 'schedule'],
  reserva: ['reserva', 'reservar', 'mesa', 'turno', 'cita', 'agendar', 'pedir', 'quiero reservar', 'booking',
    'prenotazione', 'prenotare', 'tavolo', 'appuntamento', 'vorrei prenotare', 'vorrei un appuntamento',
    'book', 'appointment', 'reserve'],
  precio: ['precio', 'cuanto', 'cuesta', 'sale', 'tarifa', 'costo', 'valor',
    'prezzo', 'quanto', 'costa', 'listino', 'tariffa',
    'price', 'cost', 'much'],
  cancelar: ['cancelar', 'cambiar', 'modificar', 'anular', 'reprogramar',
    'cancellare', 'cambiare', 'modificare', 'annullare', 'spostare',
    'cancel', 'change', 'reschedule'],
  vegetariano: ['vegetariano', 'vegano', 'vegetariana', 'vegana', 'sin carne', 'sin gluten', 'alergias', 'celiaco',
    'senza carne', 'senza glutine', 'allergie', 'celiaco', 'vegetarian', 'vegan'],
  ubicacion: ['donde', 'direccion', 'ubicacion', 'llegar', 'estan', 'como llego', 'mapa',
    'dove', 'indirizzo', 'arrivare', 'posizione', 'trovarvi',
    'where', 'location', 'address', 'directions'],
  humano: ['persona', 'humano', 'hablar con', 'agente', 'alguien', 'encargado', 'responsable',
    'parlare con', 'operatore', 'umano', 'qualcuno', 'responsabile',
    'human', 'agent', 'person', 'talk to someone'],
  terraza: ['terraza', 'exterior', 'aire libre', 'fuera',
    'terrazza', 'esterno', 'aperto', 'fuori',
    'terrace', 'outdoor', 'outside'],
  grupo: ['grupo', 'grandes', 'evento', 'eventos', 'fiesta', 'cumpleanos', 'celebracion',
    'gruppo', 'grandi', 'evento', 'eventi', 'festa', 'compleanno', 'celebrazione',
    'group', 'party', 'event', 'celebration'],
  sabado: ['sabado', 'sabados', 'sabato', 'saturday', 'fin de semana', 'fine settimana', 'weekend'],
  saludo: ['hola', 'buenas', 'buenos', 'hey', 'hi', 'hello', 'ciao', 'salve', 'buongiorno', 'buonasera', 'buenas tardes', 'buenas noches', 'buen dia'],
  gracias: ['gracias', 'grazie', 'thanks', 'thank you', 'perfecto', 'genial', 'ok', 'vale', 'ottimo', 'perfetto', 'bene'],
  menu: ['menu', 'carta', 'platos', 'comida', 'comer', 'cenar', 'almorzar',
    'piatti', 'mangiare', 'cenare', 'pranzare',
    'food', 'dishes', 'eat', 'dinner', 'lunch'],
  servicio: ['servicio', 'servicios', 'que ofrecen', 'que hacen', 'tratamiento', 'tratamientos',
    'servizio', 'servizi', 'cosa offrite', 'cosa fate', 'trattamento', 'trattamenti',
    'service', 'services', 'offer', 'treatments'],
};

function detectIntent(input: string): string | null {
  const norm = normalize(input);
  const words = norm.split(/\s+/);

  for (const [intent, keywords] of Object.entries(intents)) {
    for (const kw of keywords) {
      if (kw.includes(' ')) {
        if (norm.includes(kw)) return intent;
      } else {
        if (words.some(w => w === kw || w.includes(kw) || kw.includes(w))) return intent;
      }
    }
  }
  return null;
}

function findBestResponse(
  input: string,
  faqs: FAQ[],
  biz: Business,
  t: (key: string, params?: Record<string, string>) => string
): string {
  const intent = detectIntent(input);

  // Greeting
  if (intent === 'saludo') {
    return t('chat.greeting', { name: biz.name });
  }

  // Thanks
  if (intent === 'gracias') {
    return t('chat.thanks');
  }

  // Human escalation
  if (intent === 'humano') {
    return t('chat.humanEscalation');
  }

  // Location
  if (intent === 'ubicacion') {
    return biz.address
      ? t('chat.locationWithAddress', { address: biz.address })
      : t('chat.locationNoAddress');
  }

  // Try to match FAQ by intent
  if (intent) {
    const intentKeywords = intents[intent] || [];
    for (const faq of faqs) {
      if (!faq.is_active) continue;
      const faqNorm = normalize(faq.question);
      const faqWords = faqNorm.split(/\s+/);
      const faqMatchesIntent = intentKeywords.some(kw =>
        kw.includes(' ') ? faqNorm.includes(kw) : faqWords.some(w => w === kw || w.includes(kw) || kw.includes(w))
      );
      if (faqMatchesIntent) return faq.answer;
    }
  }

  // Fuzzy match: try word overlap with FAQ questions
  let bestScore = 0;
  let bestAnswer = '';
  for (const faq of faqs) {
    if (!faq.is_active) continue;
    const score = wordOverlapScore(input, faq.question);
    if (score > bestScore) {
      bestScore = score;
      bestAnswer = faq.answer;
    }
  }
  if (bestScore >= 0.3) return bestAnswer;

  // Booking intent fallback
  if (intent === 'reserva') {
    return t('chat.bookingIntent', { name: biz.name });
  }

  // Menu/food intent
  if (intent === 'menu') {
    return t('chat.menuInfo', { name: biz.name });
  }

  // Services intent
  if (intent === 'servicio') {
    return t('chat.servicesInfo', { name: biz.name });
  }

  // Generic fallback with helpful suggestions
  return t('chat.noMatch');
}

const ChatWidget = ({ business, faqs, welcomeMessage, embedded = false }: ChatWidgetProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(embedded);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '0', role: 'assistant', content: welcomeMessage },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = findBestResponse(input, faqs, business, t);
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', content: response }]);
      setIsTyping(false);
    }, 600 + Math.random() * 600);
  };

  if (embedded) {
    return (
      <div className="flex flex-col h-full bg-card rounded-2xl border shadow-medium overflow-hidden">
        <ChatHeader business={business} onClose={() => {}} showClose={false} />
        <ChatBody messages={messages} isTyping={isTyping} scrollRef={scrollRef} />
        <ChatInput input={input} setInput={setInput} onSend={handleSend} />
      </div>
    );
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-[380px] h-[520px] z-50 flex flex-col bg-card rounded-2xl border shadow-medium overflow-hidden"
          >
            <ChatHeader business={business} onClose={() => setIsOpen(false)} />
            <ChatBody messages={messages} isTyping={isTyping} scrollRef={scrollRef} />
            <ChatInput input={input} setInput={setInput} onSend={handleSend} />
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-primary text-primary-foreground flex items-center justify-center shadow-glow hover:opacity-90 transition-opacity"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>
    </>
  );
};

const ChatHeader = ({ business, onClose, showClose = true }: { business: Business; onClose: () => void; showClose?: boolean }) => {
  const { t } = useTranslation();
  return (
    <div className="p-4 bg-gradient-primary flex items-center justify-between shrink-0">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-primary-foreground/20 flex items-center justify-center">
          <Bot className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <div className="font-semibold text-primary-foreground text-sm">{business.name}</div>
          <div className="text-primary-foreground/70 text-xs flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" /> {t('chat.online')}
          </div>
        </div>
      </div>
      {showClose && (
        <button onClick={onClose} className="text-primary-foreground/70 hover:text-primary-foreground">
          <Minimize2 className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

const ChatBody = ({ messages, isTyping, scrollRef }: { messages: ChatMessage[]; isTyping: boolean; scrollRef: React.RefObject<HTMLDivElement> }) => (
  <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
    {messages.map(m => (
      <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
        <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          m.role === 'user' ? 'bg-gradient-primary text-primary-foreground rounded-br-md' : 'bg-secondary text-foreground rounded-bl-md'
        }`}>
          {m.content}
        </div>
      </div>
    ))}
    {isTyping && (
      <div className="flex justify-start">
        <div className="bg-secondary rounded-2xl rounded-bl-md px-4 py-3">
          <div className="flex gap-1">
            <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-pulse-soft" />
            <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-pulse-soft" style={{ animationDelay: '0.2s' }} />
            <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-pulse-soft" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>
      </div>
    )}
  </div>
);

const ChatInput = ({ input, setInput, onSend }: { input: string; setInput: (v: string) => void; onSend: () => void }) => {
  const { t } = useTranslation();
  return (
    <div className="p-3 border-t shrink-0">
      <div className="flex gap-2">
        <Input
          placeholder={t('chat.placeholder')}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && onSend()}
          className="text-sm"
        />
        <Button size="icon" onClick={onSend} className="bg-gradient-primary text-primary-foreground shrink-0" disabled={!input.trim()}>
          <Send className="w-4 h-4" />
        </Button>
      </div>
      <p className="text-[10px] text-muted-foreground text-center mt-2">{t('chat.powered')}</p>
    </div>
  );
};

export default ChatWidget;
