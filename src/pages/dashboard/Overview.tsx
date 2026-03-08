import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, CalendarDays, Users, TrendingUp, Bot, HelpCircle } from 'lucide-react';
import { demoMetrics } from '@/data/demo';
import { useTranslation } from '@/i18n/context';

const Overview = () => {
  const { t } = useTranslation();

  const stats = [
    { label: t('overview.totalConversations'), value: demoMetrics.totalConversations, icon: MessageSquare, change: '+12%' },
    { label: t('overview.openConversations'), value: demoMetrics.openConversations, icon: MessageSquare, change: '-3' },
    { label: t('overview.todayBookings'), value: demoMetrics.todayBookings, icon: CalendarDays, change: '+2' },
    { label: t('overview.weeklyCustomers'), value: demoMetrics.weeklyCustomers, icon: Users, change: '+8%' },
  ];

  const activities = [
    { action: t('overview.activity1'), detail: t('overview.activity1Detail'), time: t('overview.activity1Time') },
    { action: t('overview.activity2'), detail: t('overview.activity2Detail'), time: t('overview.activity2Time') },
    { action: t('overview.activity3'), detail: t('overview.activity3Detail'), time: t('overview.activity3Time') },
    { action: t('overview.activity4'), detail: t('overview.activity4Detail'), time: t('overview.activity4Time') },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{t('overview.title')}</h1>
        <p className="text-muted-foreground text-sm">{t('overview.subtitle')}</p>
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
              <TrendingUp className="w-4 h-4 text-primary" /> {t('overview.autoResolution')}
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
            <p className="text-sm text-muted-foreground mt-2">{t('overview.autoResolutionDesc')}</p>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-primary" /> {t('overview.topFAQs')}
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
            <Bot className="w-4 h-4 text-primary" /> {t('overview.recentActivity')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.map((a, i) => (
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
