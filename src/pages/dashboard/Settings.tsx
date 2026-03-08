import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Settings, Globe, Smartphone, Bell, Palette } from 'lucide-react';

const SettingsPage = () => {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold">Configuración</h1>
        <p className="text-muted-foreground text-sm">Opciones generales de tu cuenta</p>
      </div>

      <Card className="shadow-soft">
        <CardHeader><CardTitle className="text-base flex items-center gap-2"><Globe className="w-4 h-4 text-primary" /> Widget del chatbot</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-sm">Chatbot activo</div>
              <div className="text-xs text-muted-foreground">Mostrar el widget en tu sitio web</div>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="p-4 bg-secondary/50 rounded-lg">
            <div className="text-sm font-medium mb-2">Código de integración</div>
            <code className="text-xs bg-foreground/5 p-2 rounded block text-muted-foreground break-all">
              {'<script src="https://localbot.ai/widget.js" data-business="la-buena-mesa"></script>'}
            </code>
            <Button variant="outline" size="sm" className="mt-2">Copiar código</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-soft">
        <CardHeader><CardTitle className="text-base flex items-center gap-2"><Smartphone className="w-4 h-4 text-primary" /> WhatsApp</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-sm">Integración WhatsApp</div>
              <div className="text-xs text-muted-foreground">Conecta tu número para recibir mensajes</div>
            </div>
            <Badge variant="secondary">Próximamente</Badge>
          </div>
          <Button variant="outline" disabled>Conectar WhatsApp</Button>
        </CardContent>
      </Card>

      <Card className="shadow-soft">
        <CardHeader><CardTitle className="text-base flex items-center gap-2"><Bell className="w-4 h-4 text-primary" /> Notificaciones</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {[
            { label: 'Nueva reserva', desc: 'Recibir alerta cuando se crea una reserva' },
            { label: 'Derivación a humano', desc: 'Aviso cuando el bot necesita ayuda' },
            { label: 'Resumen diario', desc: 'Email con métricas del día' },
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
