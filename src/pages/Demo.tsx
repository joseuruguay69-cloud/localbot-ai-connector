import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bot, ArrowLeft, UtensilsCrossed, Scissors, ArrowRight } from 'lucide-react';
import ChatWidget from '@/components/ChatWidget';
import { demoBusinesses, demoFAQs, demoChatbotSettings } from '@/data/demo';

const Demo = () => {
  const [activeBiz, setActiveBiz] = useState('biz-1');
  const biz = demoBusinesses.find(b => b.id === activeBiz)!;
  const faqs = demoFAQs[activeBiz] || [];
  const settings = demoChatbotSettings[activeBiz];

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 flex items-center justify-between h-14">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Bot className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-foreground">LocalBot AI</span>
            <Badge variant="secondary" className="text-[10px]">Demo</Badge>
          </Link>
          <Link to="/signup">
            <Button size="sm" className="bg-gradient-primary text-primary-foreground hover:opacity-90">
              Crear cuenta <ArrowRight className="ml-1 w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Prueba el chatbot en vivo</h1>
          <p className="text-muted-foreground">Selecciona un negocio de ejemplo y empieza a chatear</p>
        </div>

        {/* Business selector */}
        <div className="flex justify-center mb-8">
          <Tabs value={activeBiz} onValueChange={setActiveBiz}>
            <TabsList className="h-12">
              <TabsTrigger value="biz-1" className="h-10 px-6 gap-2">
                <UtensilsCrossed className="w-4 h-4" /> La Buena Mesa
              </TabsTrigger>
              <TabsTrigger value="biz-2" className="h-10 px-6 gap-2">
                <Scissors className="w-4 h-4" /> Studio Bella
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Business info */}
          <div className="space-y-4">
            <Card className="shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  {activeBiz === 'biz-1' ? <UtensilsCrossed className="w-6 h-6 text-primary" /> : <Scissors className="w-6 h-6 text-primary" />}
                  <div>
                    <h2 className="font-bold text-lg">{biz.name}</h2>
                    <p className="text-sm text-muted-foreground">{biz.description}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div><span className="text-muted-foreground">📍 Dirección:</span> {biz.address}</div>
                  <div><span className="text-muted-foreground">📞 Teléfono:</span> {biz.phone}</div>
                  <div><span className="text-muted-foreground">✉️ Email:</span> {biz.email}</div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">💡 Prueba estas preguntas:</h3>
                <div className="space-y-2">
                  {(activeBiz === 'biz-1' ? [
                    '¿Tienen mesa para 4 hoy?',
                    '¿Cuál es el horario?',
                    '¿Tienen opciones vegetarianas?',
                    'Quiero cambiar mi reserva',
                    '¿Puedo hablar con una persona?',
                  ] : [
                    'Quiero turno para mañana',
                    '¿Cuánto sale un corte?',
                    '¿Atienden los sábados?',
                    'Quiero cancelar mi cita',
                    '¿Dónde están?',
                  ]).map((q, i) => (
                    <div key={i} className="text-sm text-muted-foreground bg-secondary/50 rounded-lg px-3 py-2">"{q}"</div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat */}
          <div className="h-[550px]" key={activeBiz}>
            <ChatWidget business={biz} faqs={faqs} welcomeMessage={settings.welcome_message} embedded />
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">¿Te gusta lo que ves? Crea tu propio chatbot en minutos.</p>
          <Link to="/signup">
            <Button size="lg" className="bg-gradient-primary text-primary-foreground hover:opacity-90">
              Crear cuenta gratis <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Demo;
