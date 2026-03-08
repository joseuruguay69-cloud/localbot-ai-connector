import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bot, ArrowLeft, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useTranslation } from '@/i18n/context';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

const Signup = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ businessName: '', type: '', email: '', password: '' });

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success(t('signup.success'));
      navigate('/dashboard');
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/30 px-4 py-10">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <Link to="/" className="inline-flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl text-foreground">LocalBot AI</span>
            </Link>
          </div>
          <div className="flex justify-center mb-4"><LanguageSwitcher variant="outline" /></div>
          <h1 className="text-2xl font-bold">{t('signup.title')}</h1>
          <p className="text-muted-foreground text-sm mt-1">{t('signup.subtitle')}</p>
        </div>
        <Card className="shadow-medium">
          <CardContent className="p-6">
            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <Label htmlFor="businessName">{t('signup.businessName')}</Label>
                <Input id="businessName" placeholder={t('signup.businessPlaceholder')} value={form.businessName} onChange={e => setForm({ ...form, businessName: e.target.value })} required className="mt-1.5" />
              </div>
              <div>
                <Label>{t('signup.type')}</Label>
                <Select value={form.type} onValueChange={v => setForm({ ...form, type: v })}>
                  <SelectTrigger className="mt-1.5"><SelectValue placeholder={t('signup.typePlaceholder')} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="restaurant">{t('signup.typeRestaurant')}</SelectItem>
                    <SelectItem value="salon">{t('signup.typeSalon')}</SelectItem>
                    <SelectItem value="beauty">{t('signup.typeBeauty')}</SelectItem>
                    <SelectItem value="general">{t('signup.typeOther')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="email">{t('signup.email')}</Label>
                <Input id="email" type="email" placeholder="tu@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="password">{t('signup.password')}</Label>
                <Input id="password" type="password" placeholder={t('signup.passwordPlaceholder')} value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required className="mt-1.5" />
              </div>
              <Button type="submit" className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90" disabled={loading}>
                {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                {t('signup.submit')}
              </Button>
            </form>
            <p className="text-center text-sm text-muted-foreground mt-6">
              {t('signup.hasAccount')} <Link to="/login" className="text-primary hover:underline font-medium">{t('signup.login')}</Link>
            </p>
          </CardContent>
        </Card>
        <div className="mt-4 text-center">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> {t('signup.back')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
