import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Save, Store, Clock } from 'lucide-react';
import { demoBusinesses, demoHours } from '@/data/demo';
import { toast } from 'sonner';
import { useTranslation } from '@/i18n/context';

const BusinessSettings = () => {
  const { t } = useTranslation();
  const dayNames = t('businessSettings.days') as string[];
  const [biz, setBiz] = useState(demoBusinesses[0]);
  const [hours, setHours] = useState(demoHours['biz-1']);

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold">{t('businessSettings.title')}</h1>
        <p className="text-muted-foreground text-sm">{t('businessSettings.subtitle')}</p>
      </div>

      <Card className="shadow-soft">
        <CardHeader><CardTitle className="text-base flex items-center gap-2"><Store className="w-4 h-4 text-primary" /> {t('businessSettings.generalData')}</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><Label>{t('businessSettings.name')}</Label><Input className="mt-1.5" value={biz.name} onChange={e => setBiz({ ...biz, name: e.target.value })} /></div>
            <div><Label>{t('businessSettings.phone')}</Label><Input className="mt-1.5" value={biz.phone || ''} onChange={e => setBiz({ ...biz, phone: e.target.value })} /></div>
            <div><Label>{t('businessSettings.email')}</Label><Input className="mt-1.5" value={biz.email || ''} onChange={e => setBiz({ ...biz, email: e.target.value })} /></div>
            <div><Label>{t('businessSettings.address')}</Label><Input className="mt-1.5" value={biz.address || ''} onChange={e => setBiz({ ...biz, address: e.target.value })} /></div>
          </div>
          <div><Label>{t('businessSettings.description')}</Label><Input className="mt-1.5" value={biz.description || ''} onChange={e => setBiz({ ...biz, description: e.target.value })} /></div>
        </CardContent>
      </Card>

      <Card className="shadow-soft">
        <CardHeader><CardTitle className="text-base flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> {t('businessSettings.hours')}</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {hours.map((h, i) => (
              <div key={h.id} className="flex items-center gap-4">
                <span className="w-24 text-sm font-medium">{dayNames[h.day_of_week]}</span>
                <Switch checked={h.is_open} onCheckedChange={v => {
                  const updated = [...hours];
                  updated[i] = { ...h, is_open: v };
                  setHours(updated);
                }} />
                {h.is_open ? (
                  <div className="flex items-center gap-2">
                    <Input type="time" className="w-28" value={h.open_time} onChange={e => {
                      const updated = [...hours];
                      updated[i] = { ...h, open_time: e.target.value };
                      setHours(updated);
                    }} />
                    <span className="text-muted-foreground">—</span>
                    <Input type="time" className="w-28" value={h.close_time} onChange={e => {
                      const updated = [...hours];
                      updated[i] = { ...h, close_time: e.target.value };
                      setHours(updated);
                    }} />
                  </div>
                ) : (
                  <span className="text-sm text-muted-foreground">{t('businessSettings.closed')}</span>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Button onClick={() => toast.success(t('businessSettings.saved'))} className="bg-gradient-primary text-primary-foreground hover:opacity-90">
        <Save className="w-4 h-4 mr-2" /> {t('businessSettings.save')}
      </Button>
    </div>
  );
};

export default BusinessSettings;
