import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Calendar, Bot, ArrowRight, CheckCircle2, Star, Zap, Shield, Clock, Users, ChevronRight, Sparkles, Store, Scissors, UtensilsCrossed } from 'lucide-react';
import { demoPlans } from '@/data/demo';
import { useTranslation } from '@/i18n/context';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const Landing = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Bot className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg text-foreground">LocalBot AI</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">{t('nav.features')}</a>
            <a href="#how-it-works" className="hover:text-foreground transition-colors">{t('nav.howItWorks')}</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">{t('nav.pricing')}</a>
            <a href="#verticals" className="hover:text-foreground transition-colors">{t('nav.verticals')}</a>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Link to="/login"><Button variant="ghost" size="sm">{t('nav.login')}</Button></Link>
            <Link to="/signup"><Button size="sm" className="bg-gradient-primary text-primary-foreground hover:opacity-90">{t('nav.startFree')}</Button></Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-[0.03]" />
        <div className="container mx-auto px-4 text-center relative">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6 }}>
            <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm font-medium">
              <Sparkles className="w-3.5 h-3.5 mr-1.5" /> {t('hero.badge')}
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 max-w-4xl mx-auto leading-[1.1]">
              {t('hero.title1')} <br className="hidden sm:block" />
              <span className="text-gradient-primary">{t('hero.title2')}</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/signup">
                <Button size="lg" className="bg-gradient-primary text-primary-foreground hover:opacity-90 h-12 px-8 text-base">
                  {t('hero.cta')} <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/demo">
                <Button size="lg" variant="outline" className="h-12 px-8 text-base">
                  {t('hero.demo')} <ChevronRight className="ml-1 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }} className="mt-16 max-w-4xl mx-auto">
            <div className="rounded-2xl border shadow-medium overflow-hidden bg-card p-1">
              <div className="rounded-xl bg-secondary/30 p-6 sm:p-10 flex flex-col items-center gap-4">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="flex -space-x-2">
                    {['M', 'C', 'A', 'P'].map((l, i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground text-xs font-semibold border-2 border-card">{l}</div>
                    ))}
                  </div>
                  <span>{t('hero.socialProof')}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mt-4">
                  {[
                    { icon: MessageSquare, label: t('hero.stat1'), value: '12,450+' },
                    { icon: Calendar, label: t('hero.stat2'), value: '8,320+' },
                    { icon: Clock, label: t('hero.stat3'), value: '1,200+' },
                  ].map((stat, i) => (
                    <div key={i} className="bg-card rounded-xl p-5 shadow-soft text-center">
                      <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                      <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t('features.title')}</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">{t('features.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Bot, title: t('features.chatbot'), desc: t('features.chatbotDesc') },
              { icon: Calendar, title: t('features.bookings'), desc: t('features.bookingsDesc') },
              { icon: MessageSquare, title: t('features.inbox'), desc: t('features.inboxDesc') },
              { icon: Zap, title: t('features.auto'), desc: t('features.autoDesc') },
              { icon: Users, title: t('features.escalation'), desc: t('features.escalationDesc') },
              { icon: Shield, title: t('features.multitenant'), desc: t('features.multitenantDesc') },
            ].map((f, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }}>
                <Card className="h-full hover:shadow-medium transition-shadow bg-card border">
                  <CardContent className="p-6">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <f.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t('howItWorks.title')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: '1', title: t('howItWorks.step1Title'), desc: t('howItWorks.step1Desc') },
              { step: '2', title: t('howItWorks.step2Title'), desc: t('howItWorks.step2Desc') },
              { step: '3', title: t('howItWorks.step3Title'), desc: t('howItWorks.step3Desc') },
            ].map((s, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.15 }} className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto mb-4">{s.step}</div>
                <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Verticals */}
      <section id="verticals" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t('verticals.title')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: UtensilsCrossed, title: t('verticals.restaurants'), items: [t('verticals.r1'), t('verticals.r2'), t('verticals.r3'), t('verticals.r4')] },
              { icon: Scissors, title: t('verticals.salons'), items: [t('verticals.s1'), t('verticals.s2'), t('verticals.s3'), t('verticals.s4')] },
              { icon: Store, title: t('verticals.small'), items: [t('verticals.sm1'), t('verticals.sm2'), t('verticals.sm3'), t('verticals.sm4')] },
            ].map((v, i) => (
              <Card key={i} className="hover:shadow-medium transition-shadow">
                <CardContent className="p-6">
                  <v.icon className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold text-lg mb-3">{v.title}</h3>
                  <ul className="space-y-2">
                    {v.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-accent" /> {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t('pricing.title')}</h2>
            <p className="text-muted-foreground text-lg">{t('pricing.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {demoPlans.map((plan) => (
              <Card key={plan.id} className={`relative ${plan.is_popular ? 'border-primary shadow-glow' : ''}`}>
                {plan.is_popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gradient-primary text-primary-foreground px-3 py-0.5"><Star className="w-3 h-3 mr-1" /> {t('pricing.popular')}</Badge>
                  </div>
                )}
                <CardContent className="p-6 pt-8">
                  <h3 className="font-semibold text-lg">{plan.name}</h3>
                  <div className="mt-3 mb-6">
                    <span className="text-4xl font-bold">{plan.price_monthly === 0 ? t('pricing.free') : `€${plan.price_monthly}`}</span>
                    {plan.price_monthly > 0 && <span className="text-muted-foreground text-sm">{t('pricing.month')}</span>}
                  </div>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                        <span className="text-muted-foreground">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/signup">
                    <Button className={`w-full ${plan.is_popular ? 'bg-gradient-primary text-primary-foreground hover:opacity-90' : ''}`} variant={plan.is_popular ? 'default' : 'outline'}>
                      {plan.price_monthly === 0 ? t('pricing.startFree') : t('pricing.choosePlan')}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t('testimonials.title')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { name: 'María R.', role: 'Restaurante La Esquina', text: t('testimonials.t1') },
              { name: 'Carlos D.', role: 'Barbería Urbana', text: t('testimonials.t2') },
              { name: 'Ana L.', role: 'Centro Estético Luna', text: t('testimonials.t3') },
            ].map((tt, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 text-accent fill-accent" />)}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 italic">"{tt.text}"</p>
                  <div>
                    <div className="font-medium text-sm">{tt.name}</div>
                    <div className="text-xs text-muted-foreground">{tt.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center rounded-2xl bg-gradient-hero p-10 sm:p-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-primary-foreground">{t('cta.title')}</h2>
            <p className="text-primary-foreground/70 text-lg mb-8">{t('cta.subtitle')}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" className="bg-accent text-accent-foreground hover:opacity-90 h-12 px-8">
                  {t('cta.button')} <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/demo">
                <Button size="lg" variant="outline" className="h-12 px-8 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                  {t('cta.demo')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Bot className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">LocalBot AI</span>
            </div>
            <p className="text-sm text-muted-foreground">{t('footer.rights')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
