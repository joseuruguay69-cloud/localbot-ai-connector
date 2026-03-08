import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, CalendarDays, Users, TrendingUp, Bot, HelpCircle } from 'lucide-react';
import { demoMetrics } from '@/data/demo';

const stats = [
  { label: 'Conversaciones totales', value: demoMetrics.totalConversations, icon: MessageSquare, change: '+12%' },
  { label: 'Conversaciones abiertas', value: demoMetrics.openConversations, icon: MessageSquare, change: '-3' },
  { label: 'Reservas de hoy', value: demoMetrics.todayBookings, icon: CalendarDays, change: '+2' },
  { label: 'Clientes esta semana', value: demoMetrics.weeklyCustomers, icon: Users, change: '+8%' },
];

const Overview = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Resumen</h1>
        <p className="text-muted-foreground text-sm">Vista general de tu negocio</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <Card key={i} className="shadow-soft">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <s.icon className="w-5 h-5 text-muted-foreground" />
                <Badge variant="secondary" className="text-xs font-medium">{s.change}</Badge>
              </div>
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="text-sm text-muted-foreground">{s.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-soft">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" /> Resolución automática
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="h-3 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-primary rounded-full transition-all" style={{ width: `${demoMetrics.autoResolutionRate}%` }} />
                </div>
              </div>
              <span className="text-2xl font-bold text-primary">{demoMetrics.autoResolutionRate}%</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">De las consultas se resuelven sin intervención humana</p>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-primary" /> FAQs más consultadas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {demoMetrics.topFAQs.map((faq, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground truncate flex-1 mr-3">{faq.question}</span>
                  <Badge variant="secondary" className="shrink-0">{faq.count}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-soft">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Bot className="w-4 h-4 text-primary" /> Actividad reciente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: 'Reserva confirmada', detail: 'María García - Mesa para 2, 13:00', time: 'Hace 15 min' },
              { action: 'Conversación resuelta', detail: 'Cliente preguntó sobre horarios', time: 'Hace 30 min' },
              { action: 'Nuevo turno', detail: 'Laura Fernández - Corte de cabello, 09:30', time: 'Hace 1 hora' },
              { action: 'Derivación a humano', detail: 'Cliente con problema de facturación', time: 'Hace 2 horas' },
            ].map((a, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                <div>
                  <div className="text-sm font-medium">{a.action}</div>
                  <div className="text-xs text-muted-foreground">{a.detail}</div>
                </div>
                <span className="text-xs text-muted-foreground shrink-0">{a.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Overview;
