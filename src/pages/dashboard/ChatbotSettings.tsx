import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Bot, Save } from 'lucide-react';
import { demoChatbotSettings } from '@/data/demo';
import { toast } from 'sonner';
import { useTranslation } from '@/i18n/context';

const ChatbotSettingsPage = () => {
  const { t } = useTranslation();
  const [settings, setSettings] = useState(demoChatbotSettings['biz-1']);

  const handleSave = () => {
    toast.success(t('chatbotSettings.saved'));
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold">{t('chatbotSettings.title')}</h1>
        <p className="text-muted-foreground text-sm">{t('chatbotSettings.subtitle')}</p>
      </div>

      <Card className="shadow-soft">
        <CardHeader><CardTitle className="text-base flex items-center gap-2"><Bot className="w-4 h-4 text-primary" /> {t('chatbotSettings.personality')}</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>{t('chatbotSettings.tone')}</Label>
              <Select value={settings.tone} onValueChange={v => setSettings({ ...settings, tone: v as any })}>
                <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="formal">{t('chatbotSettings.toneFormal')}</SelectItem>
                  <SelectItem value="friendly">{t('chatbotSettings.toneFriendly')}</SelectItem>
                  <SelectItem value="casual">{t('chatbotSettings.toneCasual')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>{t('chatbotSettings.language')}</Label>
              <Select value={settings.language} onValueChange={v => setSettings({ ...settings, language: v as any })}>
                <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="es">{t('chatbotSettings.langEs')}</SelectItem>
                  <SelectItem value="it">{t('chatbotSettings.langIt')}</SelectItem>
                  <SelectItem value="en">{t('chatbotSettings.langEn')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label>{t('chatbotSettings.welcomeMessage')}</Label>
            <Textarea className="mt-1.5" rows={3} value={settings.welcome_message} onChange={e => setSettings({ ...settings, welcome_message: e.target.value })} />
          </div>
          <div>
            <Label>{t('chatbotSettings.offlineMessage')}</Label>
            <Textarea className="mt-1.5" rows={2} value={settings.offline_message} onChange={e => setSettings({ ...settings, offline_message: e.target.value })} />
          </div>
          <div>
            <Label>{t('chatbotSettings.escalationMessage')}</Label>
            <Textarea className="mt-1.5" rows={2} value={settings.escalation_message} onChange={e => setSettings({ ...settings, escalation_message: e.target.value })} />
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-soft">
        <CardHeader><CardTitle className="text-base">{t('chatbotSettings.systemPrompt')}</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>{t('chatbotSettings.systemPromptLabel')}</Label>
            <Textarea className="mt-1.5" rows={4} value={settings.system_prompt || ''} onChange={e => setSettings({ ...settings, system_prompt: e.target.value })} placeholder={t('chatbotSettings.systemPromptPlaceholder')} />
          </div>
          <div>
            <Label>{t('chatbotSettings.maxLength')}</Label>
            <Input type="number" className="mt-1.5 max-w-[200px]" value={settings.max_response_length} onChange={e => setSettings({ ...settings, max_response_length: +e.target.value })} />
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-soft">
        <CardHeader><CardTitle className="text-base">{t('chatbotSettings.options')}</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-sm">{t('chatbotSettings.autoBook')}</div>
              <div className="text-xs text-muted-foreground">{t('chatbotSettings.autoBookDesc')}</div>
            </div>
            <Switch checked={settings.auto_book} onCheckedChange={v => setSettings({ ...settings, auto_book: v })} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-sm">{t('chatbotSettings.collectContact')}</div>
              <div className="text-xs text-muted-foreground">{t('chatbotSettings.collectContactDesc')}</div>
            </div>
            <Switch checked={settings.collect_contact} onCheckedChange={v => setSettings({ ...settings, collect_contact: v })} />
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSave} className="bg-gradient-primary text-primary-foreground hover:opacity-90">
        <Save className="w-4 h-4 mr-2" /> {t('chatbotSettings.save')}
      </Button>
    </div>
  );
};

export default ChatbotSettingsPage;
