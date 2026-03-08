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

function findFAQMatch(input: string, faqs: FAQ[], biz: Business, t: (key: string, params?: Record<string, string>) => string): string | null {
  const lower = input.toLowerCase();
  const keywords: Record<string, string[]> = {
    horario: ['horario', 'hora', 'abierto', 'abre', 'cierra', 'cuando', 'atienden', 'abren', 'orario', 'orari', 'aperto', 'chiude', 'aperti'],
    reserva: ['reserva', 'reservar', 'mesa', 'turno', 'cita', 'agendar', 'pedir turno', 'prenotazione', 'prenotare', 'tavolo', 'appuntamento'],
    precio: ['precio', 'cuanto', 'cuesta', 'sale', 'tarifa', 'costo', 'prezzo', 'quanto', 'costa'],
    cancelar: ['cancelar', 'cambiar', 'modificar', 'anular', 'cancellare', 'modificare', 'annullare'],
    vegetariano: ['vegetariano', 'vegano', 'vegetariana', 'vegana', 'sin carne', 'senza carne'],
    ubicacion: ['donde', 'dirección', 'ubicación', 'llegar', 'están', 'direccion', 'dove', 'indirizzo', 'arrivare'],
    humano: ['persona', 'humano', 'hablar con', 'agente', 'alguien', 'parlare con', 'operatore', 'umano'],
    terraza: ['terraza', 'exterior', 'aire libre', 'terrazza', 'esterno'],
    grupo: ['grupo', 'grandes', 'evento', 'eventos', 'gruppo', 'grandi', 'evento'],
    sabado: ['sábado', 'sabado', 'sábados', 'sabados', 'sabato'],
  };

  for (const k of keywords.humano) {
    if (lower.includes(k)) return t('chat.humanEscalation');
  }

  for (const faq of faqs) {
    if (!faq.is_active) continue;
    const faqLower = faq.question.toLowerCase();
    if (lower.includes(faqLower.slice(0, 15)) || faqLower.includes(lower.slice(0, 15))) return faq.answer;
    for (const [, kws] of Object.entries(keywords)) {
      const inputHas = kws.some(k => lower.includes(k));
      const faqHas = kws.some(k => faqLower.includes(k));
      if (inputHas && faqHas) return faq.answer;
    }
  }

  for (const k of keywords.reserva) {
    if (lower.includes(k)) return t('chat.bookingIntent', { name: biz?.name || '' });
  }

  for (const k of keywords.ubicacion) {
    if (lower.includes(k)) {
      return biz?.address ? t('chat.locationWithAddress', { address: biz.address }) : t('chat.locationNoAddress');
    }
  }

  return null;
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
      const match = findFAQMatch(input, faqs, business, t);
      const response = match || t('chat.noMatch');
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', content: response }]);
      setIsTyping(false);
    }, 800 + Math.random() * 800);
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
