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

const ChatbotSettingsPage = () => {
  const [settings, setSettings] = useState(demoChatbotSettings['biz-1']);

  const handleSave = () => {
    toast.success('Configuración del chatbot guardada');
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold">Configuración del chatbot</h1>
        <p className="text-muted-foreground text-sm">Personaliza cómo se comporta tu asistente</p>
      </div>

      <Card className="shadow-soft">
        <CardHeader><CardTitle className="text-base flex items-center gap-2"><Bot className="w-4 h-4 text-primary" /> Personalidad</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Tono</Label>
              <Select value={settings.tone} onValueChange={v => setSettings({ ...settings, tone: v as any })}>
                <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="formal">Formal</SelectItem>
                  <SelectItem value="friendly">Amigable</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Idioma</Label>
              <Select value={settings.language} onValueChange={v => setSettings({ ...settings, language: v as any })}>
                <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="it">Italiano</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label>Mensaje de bienvenida</Label>
            <Textarea className="mt-1.5" rows={3} value={settings.welcome_message} onChange={e => setSettings({ ...settings, welcome_message: e.target.value })} />
          </div>
          <div>
            <Label>Mensaje fuera de horario</Label>
            <Textarea className="mt-1.5" rows={2} value={settings.offline_message} onChange={e => setSettings({ ...settings, offline_message: e.target.value })} />
          </div>
          <div>
            <Label>Mensaje de derivación</Label>
            <Textarea className="mt-1.5" rows={2} value={settings.escalation_message} onChange={e => setSettings({ ...settings, escalation_message: e.target.value })} />
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-soft">
        <CardHeader><CardTitle className="text-base">Prompt del sistema</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Instrucciones base para la IA</Label>
            <Textarea className="mt-1.5" rows={4} value={settings.system_prompt || ''} onChange={e => setSettings({ ...settings, system_prompt: e.target.value })} placeholder="Describe cómo debe comportarse el bot..." />
          </div>
          <div>
            <Label>Límite de longitud de respuesta</Label>
            <Input type="number" className="mt-1.5 max-w-[200px]" value={settings.max_response_length} onChange={e => setSettings({ ...settings, max_response_length: +e.target.value })} />
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-soft">
        <CardHeader><CardTitle className="text-base">Opciones</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-sm">Reservas automáticas</div>
              <div className="text-xs text-muted-foreground">Permitir al bot tomar reservas sin intervención</div>
            </div>
            <Switch checked={settings.auto_book} onCheckedChange={v => setSettings({ ...settings, auto_book: v })} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-sm">Recopilar datos de contacto</div>
              <div className="text-xs text-muted-foreground">Pedir nombre y teléfono antes de confirmar</div>
            </div>
            <Switch checked={settings.collect_contact} onCheckedChange={v => setSettings({ ...settings, collect_contact: v })} />
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSave} className="bg-gradient-primary text-primary-foreground hover:opacity-90">
        <Save className="w-4 h-4 mr-2" /> Guardar cambios
      </Button>
    </div>
  );
};

export default ChatbotSettingsPage;
