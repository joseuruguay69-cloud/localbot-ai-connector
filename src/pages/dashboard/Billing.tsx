import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Star, CreditCard, Zap } from 'lucide-react';
import { demoPlans } from '@/data/demo';
import { useTranslation } from '@/i18n/context';

const Billing = () => {
  const { t } = useTranslation();
  const currentPlan = demoPlans[1];
  const usage = { messages: 342, bookings: 67 };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold">{t('billing.title')}</h1>
        <p className="text-muted-foreground text-sm">{t('billing.subtitle')}</p>
      </div>

      <Card className="shadow-soft border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <Badge className="bg-gradient-primary text-primary-foreground mb-2"><Star className="w-3 h-3 mr-1" /> {t('billing.currentPlan')}</Badge>
              <h2 className="text-2xl font-bold">{currentPlan.name}</h2>
              <p className="text-muted-foreground text-sm">€{currentPlan.price_monthly}/{t('pricing.month').replace('/', '')}</p>
            </div>
            <Button variant="outline"><Zap className="w-4 h-4 mr-2" /> {t('billing.changePlan')}</Button>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>{t('billing.messages')} ({usage.messages}/{currentPlan.messages_limit})</span>
                <span className="text-muted-foreground">{Math.round(usage.messages / currentPlan.messages_limit * 100)}%</span>
              </div>
              <Progress value={usage.messages / currentPlan.messages_limit * 100} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>{t('billing.bookingsLabel')} ({usage.bookings}/{currentPlan.bookings_limit})</span>
                <span className="text-muted-foreground">{Math.round(usage.bookings / currentPlan.bookings_limit * 100)}%</span>
              </div>
              <Progress value={usage.bookings / currentPlan.bookings_limit * 100} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-soft">
        <CardHeader><CardTitle className="text-base flex items-center gap-2"><CreditCard className="w-4 h-4 text-primary" /> {t('billing.paymentMethod')}</CardTitle></CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-7 bg-foreground/10 rounded flex items-center justify-center text-xs font-mono">VISA</div>
              <div>
                <div className="text-sm font-medium">•••• •••• •••• 4242</div>
                <div className="text-xs text-muted-foreground">{t('billing.expires')} 12/2027</div>
              </div>
            </div>
            <Button variant="ghost" size="sm">{t('billing.change')}</Button>
          </div>
          <p className="text-xs text-muted-foreground mt-3">{t('billing.nextBilling')} · €{currentPlan.price_monthly}</p>
        </CardContent>
      </Card>

      <h3 className="text-lg font-semibold mt-8 mb-4">{t('billing.allPlans')}</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {demoPlans.map(plan => (
          <Card key={plan.id} className={`${plan.id === currentPlan.id ? 'border-primary shadow-glow' : ''}`}>
            <CardContent className="p-5">
              <h4 className="font-semibold">{plan.name}</h4>
              <div className="text-2xl font-bold mt-1">{plan.price_monthly === 0 ? t('pricing.free') : `€${plan.price_monthly}`}<span className="text-sm font-normal text-muted-foreground">{t('pricing.month')}</span></div>
              <ul className="mt-4 space-y-2">
                {plan.features.map((f, i) => (
                  <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent mt-0.5 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Button className="w-full mt-4" variant={plan.id === currentPlan.id ? 'default' : 'outline'} size="sm" disabled={plan.id === currentPlan.id}>
                {plan.id === currentPlan.id ? t('billing.current') : t('billing.select')}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Billing;
