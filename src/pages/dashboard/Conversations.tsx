import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Send, User, Bot as BotIcon, ArrowUpRight } from 'lucide-react';
import { demoConversations, demoMessages } from '@/data/demo';

const allConversations = [...(demoConversations['biz-1'] || []), ...(demoConversations['biz-2'] || [])];

const statusColors: Record<string, string> = {
  open: 'bg-accent/20 text-accent-foreground border-accent/30',
  resolved: 'bg-secondary text-muted-foreground',
  escalated: 'bg-destructive/10 text-destructive border-destructive/30',
};
const statusLabels: Record<string, string> = { open: 'Abierta', resolved: 'Resuelta', escalated: 'Derivada' };

const Conversations = () => {
  const [selectedId, setSelectedId] = useState(allConversations[0]?.id || '');
  const [search, setSearch] = useState('');
  const [reply, setReply] = useState('');
  const messages = demoMessages[selectedId] || [];
  const selected = allConversations.find(c => c.id === selectedId);

  const filtered = allConversations.filter(c =>
    c.customer_name?.toLowerCase().includes(search.toLowerCase()) || !search
  );

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Conversaciones</h1>
        <p className="text-muted-foreground text-sm">Inbox de mensajes de tus clientes</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-13rem)]">
        {/* List */}
        <Card className="shadow-soft lg:col-span-1 flex flex-col">
          <div className="p-3 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Buscar conversación..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
          </div>
          <ScrollArea className="flex-1">
            {filtered.map(c => (
              <button key={c.id} onClick={() => setSelectedId(c.id)} className={`w-full text-left p-4 border-b border-border/50 hover:bg-secondary/50 transition-colors ${selectedId === c.id ? 'bg-secondary/70' : ''}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm">{c.customer_name}</span>
                  <Badge variant="outline" className={`text-[10px] ${statusColors[c.status]}`}>{statusLabels[c.status]}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground truncate max-w-[70%]">{c.channel === 'web' ? '🌐 Web' : '📱 WhatsApp'}</span>
                  <span className="text-[10px] text-muted-foreground">{new Date(c.updated_at).toLocaleDateString('es')}</span>
                </div>
              </button>
            ))}
          </ScrollArea>
        </Card>

        {/* Detail */}
        <Card className="shadow-soft lg:col-span-2 flex flex-col">
          {selected ? (
            <>
              <div className="p-4 border-b flex items-center justify-between">
                <div>
                  <div className="font-medium flex items-center gap-2">
                    <User className="w-4 h-4" /> {selected.customer_name}
                    {selected.customer_phone && <span className="text-xs text-muted-foreground">({selected.customer_phone})</span>}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">Canal: {selected.channel} · {statusLabels[selected.status]}</div>
                </div>
                {selected.status === 'escalated' && (
                  <Badge variant="outline" className="text-destructive border-destructive/30">
                    <ArrowUpRight className="w-3 h-3 mr-1" /> Derivada
                  </Badge>
                )}
              </div>
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-3">
                  {messages.map(m => (
                    <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-start' : 'justify-end'}`}>
                      <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                        m.role === 'user' ? 'bg-secondary text-foreground rounded-bl-md' : 'bg-gradient-primary text-primary-foreground rounded-br-md'
                      }`}>
                        <div className="flex items-center gap-1.5 mb-1 opacity-70">
                          {m.role === 'user' ? <User className="w-3 h-3" /> : <BotIcon className="w-3 h-3" />}
                          <span className="text-[10px]">{m.role === 'user' ? 'Cliente' : 'Bot'}</span>
                        </div>
                        {m.content}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="p-3 border-t">
                <div className="flex gap-2">
                  <Input placeholder="Responder manualmente..." value={reply} onChange={e => setReply(e.target.value)} />
                  <Button size="icon" className="bg-gradient-primary text-primary-foreground shrink-0"><Send className="w-4 h-4" /></Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              Selecciona una conversación
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Conversations;
