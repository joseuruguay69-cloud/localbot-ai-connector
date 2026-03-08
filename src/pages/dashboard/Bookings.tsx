import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarDays, Clock, User, Plus, CheckCircle2, XCircle, AlertCircle, MoreHorizontal } from 'lucide-react';
import { demoBookings } from '@/data/demo';
import { useTranslation } from '@/i18n/context';

const allBookings = [...(demoBookings['biz-1'] || []), ...(demoBookings['biz-2'] || [])];
const today = new Date().toISOString().split('T')[0];

const Bookings = () => {
  const { t } = useTranslation();
  const [tab, setTab] = useState('today');
  const todayBookings = allBookings.filter(b => b.date === today);
  const allSorted = [...allBookings].sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`));

  const statusConfig: Record<string, { label: string; icon: typeof CheckCircle2; className: string }> = {
    pending: { label: t('bookings.statusPending'), icon: AlertCircle, className: 'bg-accent/10 text-accent-foreground border-accent/20' },
    confirmed: { label: t('bookings.statusConfirmed'), icon: CheckCircle2, className: 'bg-primary/10 text-primary border-primary/20' },
    cancelled: { label: t('bookings.statusCancelled'), icon: XCircle, className: 'bg-destructive/10 text-destructive border-destructive/20' },
    completed: { label: t('bookings.statusCompleted'), icon: CheckCircle2, className: 'bg-secondary text-muted-foreground' },
  };

  const renderBooking = (b: typeof allBookings[0]) => {
    const sc = statusConfig[b.status];
    return (
      <div key={b.id} className="flex items-center justify-between p-4 border-b border-border/50 last:border-0 hover:bg-secondary/30 transition-colors">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/5 flex flex-col items-center justify-center">
            <span className="text-xs font-medium text-primary">{b.time}</span>
            <span className="text-[10px] text-muted-foreground">{b.duration_minutes}min</span>
          </div>
          <div>
            <div className="font-medium text-sm flex items-center gap-2">
              <User className="w-3.5 h-3.5 text-muted-foreground" />
              {b.customer_name}
              {b.party_size && <span className="text-xs text-muted-foreground">({b.party_size} pers.)</span>}
            </div>
            <div className="text-xs text-muted-foreground mt-0.5">
              {b.service_name} {b.notes && `· ${b.notes}`}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={`text-[10px] ${sc.className}`}>
            <sc.icon className="w-3 h-3 mr-1" /> {sc.label}
          </Badge>
          <Button variant="ghost" size="icon" className="w-8 h-8"><MoreHorizontal className="w-4 h-4" /></Button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{t('bookings.title')}</h1>
          <p className="text-muted-foreground text-sm">{t('bookings.subtitle')}</p>
        </div>
        <Button className="bg-gradient-primary text-primary-foreground hover:opacity-90">
          <Plus className="w-4 h-4 mr-2" /> {t('bookings.new')}
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: t('bookings.today'), value: todayBookings.length, icon: CalendarDays },
          { label: t('bookings.pending'), value: allBookings.filter(b => b.status === 'pending').length, icon: Clock },
          { label: t('bookings.confirmed'), value: allBookings.filter(b => b.status === 'confirmed').length, icon: CheckCircle2 },
        ].map((s, i) => (
          <Card key={i} className="shadow-soft">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center">
                <s.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-xl font-bold">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-soft">
        <Tabs value={tab} onValueChange={setTab}>
          <div className="px-4 pt-4">
            <TabsList>
              <TabsTrigger value="today">{t('bookings.today')}</TabsTrigger>
              <TabsTrigger value="all">{t('bookings.all')}</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="today" className="mt-0">
            {todayBookings.length > 0 ? todayBookings.map(renderBooking) : (
              <div className="p-10 text-center text-muted-foreground">
                <CalendarDays className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="font-medium">{t('bookings.noToday')}</p>
                <p className="text-sm">{t('bookings.noTodayDesc')}</p>
              </div>
            )}
          </TabsContent>
          <TabsContent value="all" className="mt-0">
            {allSorted.map(renderBooking)}
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default Bookings;
