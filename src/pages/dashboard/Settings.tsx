import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Globe, Smartphone, Bell } from 'lucide-react';
import { useTranslation } from '@/i18n/context';

const SettingsPage = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold">{t('settings.title')}</h1>
        <p className="text-muted-foreground text-sm">{t('settings.subtitle')}</p>
      </div>

      <Card className="shadow-soft">
        <CardHeader><CardTitle className="text-base flex items-center gap-2"><Globe className="w-4 h-4 text-primary" /> {t('settings.widget')}</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-sm">{t('settings.widgetActive')}</div>
              <div className="text-xs text-muted-foreground">{t('settings.widgetActiveDesc')}</div>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="p-4 bg-secondary/50 rounded-lg">
            <div className="text-sm font-medium mb-2">{t('settings.integrationCode')}</div>
            <code className="text-xs bg-foreground/5 p-2 rounded block text-muted-foreground break-all">
              {'<script src="https://localbot.ai/widget.js" data-business="la-buena-mesa"></script>'}
            </code>
            <Button variant="outline" size="sm" className="mt-2">{t('settings.copyCode')}</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-soft">
        <CardHeader><CardTitle className="text-base flex items-center gap-2"><Smartphone className="w-4 h-4 text-primary" /> {t('settings.whatsapp')}</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-sm">{t('settings.whatsappIntegration')}</div>
              <div className="text-xs text-muted-foreground">{t('settings.whatsappDesc')}</div>
            </div>
            <Badge variant="secondary">{t('settings.comingSoon')}</Badge>
          </div>
          <Button variant="outline" disabled>{t('settings.connectWhatsapp')}</Button>
        </CardContent>
      </Card>

      <Card className="shadow-soft">
        <CardHeader><CardTitle className="text-base flex items-center gap-2"><Bell className="w-4 h-4 text-primary" /> {t('settings.notifications')}</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {[
            { label: t('settings.notif1'), desc: t('settings.notif1Desc') },
            { label: t('settings.notif2'), desc: t('settings.notif2Desc') },
            { label: t('settings.notif3'), desc: t('settings.notif3Desc') },
          ].map((n, i) => (
            <div key={i} className="flex items-center justify-between">
              <div>
                <div className="font-medium text-sm">{n.label}</div>
                <div className="text-xs text-muted-foreground">{n.desc}</div>
              </div>
              <Switch defaultChecked />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
