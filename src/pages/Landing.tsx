import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Calendar, Bot, ArrowRight, CheckCircle2, Star, Zap, Shield, Clock, Users, ChevronRight, Sparkles, Store, Scissors, UtensilsCrossed } from 'lucide-react';
import { demoPlans } from '@/data/demo';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const Landing = () => {
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
            <a href="#features" className="hover:text-foreground transition-colors">Funciones</a>
            <a href="#how-it-works" className="hover:text-foreground transition-colors">Cómo funciona</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">Precios</a>
            <a href="#verticals" className="hover:text-foreground transition-colors">Sectores</a>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login"><Button variant="ghost" size="sm">Iniciar sesión</Button></Link>
            <Link to="/signup"><Button size="sm" className="bg-gradient-primary text-primary-foreground hover:opacity-90">Empezar gratis</Button></Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-[0.03]" />
        <div className="container mx-auto px-4 text-center relative">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6 }}>
            <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm font-medium">
              <Sparkles className="w-3.5 h-3.5 mr-1.5" /> Automatiza tu negocio con IA
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 max-w-4xl mx-auto leading-[1.1]">
              Reservas, turnos y atención <br className="hidden sm:block" />
              <span className="text-gradient-primary">automática para tu negocio</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Un asistente inteligente que responde preguntas, toma reservas y atiende a tus clientes 24/7. Para restaurantes, peluquerías y pequeños negocios.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/signup">
                <Button size="lg" className="bg-gradient-primary text-primary-foreground hover:opacity-90 h-12 px-8 text-base">
                  Crear cuenta gratis <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/demo">
                <Button size="lg" variant="outline" className="h-12 px-8 text-base">
                  Ver demo en vivo <ChevronRight className="ml-1 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Hero visual */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }} className="mt-16 max-w-4xl mx-auto">
            <div className="rounded-2xl border shadow-medium overflow-hidden bg-card p-1">
              <div className="rounded-xl bg-secondary/30 p-6 sm:p-10 flex flex-col items-center gap-4">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="flex -space-x-2">
                    {['M', 'C', 'A', 'P'].map((l, i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground text-xs font-semibold border-2 border-card">{l}</div>
                    ))}
                  </div>
                  <span>+200 negocios ya usan LocalBot AI</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mt-4">
                  {[
                    { icon: MessageSquare, label: 'Conversaciones', value: '12,450+' },
                    { icon: Calendar, label: 'Reservas gestionadas', value: '8,320+' },
                    { icon: Clock, label: 'Horas ahorradas', value: '1,200+' },
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
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Todo lo que necesitas para automatizar tu negocio</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">Herramientas potentes, diseñadas para que sean simples de usar.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Bot, title: 'Chatbot IA', desc: 'Responde preguntas frecuentes con lenguaje natural, 24/7, sin intervención.' },
              { icon: Calendar, title: 'Reservas y turnos', desc: 'Tus clientes reservan mesas o piden turno directamente desde el chat.' },
              { icon: MessageSquare, title: 'Inbox unificado', desc: 'Centraliza todas las conversaciones en un solo panel profesional.' },
              { icon: Zap, title: 'Respuestas automáticas', desc: 'Configura FAQs y el bot resuelve hasta el 80% de las consultas.' },
              { icon: Users, title: 'Derivación humana', desc: 'Cuando el bot no puede resolver, deriva automáticamente a un agente.' },
              { icon: Shield, title: 'Multi-tenant SaaS', desc: 'Cada negocio tiene sus datos separados, seguros y privados.' },
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
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Funciona en 3 simples pasos</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: '1', title: 'Crea tu cuenta', desc: 'Regístrate y configura tu negocio en menos de 5 minutos.' },
              { step: '2', title: 'Configura tu bot', desc: 'Agrega tus FAQs, horarios, servicios y personaliza el tono.' },
              { step: '3', title: 'Activa y automatiza', desc: 'Tu chatbot empieza a atender clientes y gestionar reservas.' },
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
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Diseñado para tu sector</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: UtensilsCrossed, title: 'Restaurantes', items: ['Reservas de mesa', 'Info del menú', 'Horarios', 'Grupos y eventos'] },
              { icon: Scissors, title: 'Peluquerías y belleza', items: ['Turnos online', 'Precios de servicios', 'Cancelaciones', 'Recordatorios'] },
              { icon: Store, title: 'Pequeños negocios', items: ['Atención 24/7', 'Preguntas frecuentes', 'Dirección y horarios', 'Contacto directo'] },
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
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Planes simples y transparentes</h2>
            <p className="text-muted-foreground text-lg">Empieza gratis. Escala cuando estés listo.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {demoPlans.map((plan) => (
              <Card key={plan.id} className={`relative ${plan.is_popular ? 'border-primary shadow-glow' : ''}`}>
                {plan.is_popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gradient-primary text-primary-foreground px-3 py-0.5"><Star className="w-3 h-3 mr-1" /> Popular</Badge>
                  </div>
                )}
                <CardContent className="p-6 pt-8">
                  <h3 className="font-semibold text-lg">{plan.name}</h3>
                  <div className="mt-3 mb-6">
                    <span className="text-4xl font-bold">{plan.price_monthly === 0 ? 'Gratis' : `€${plan.price_monthly}`}</span>
                    {plan.price_monthly > 0 && <span className="text-muted-foreground text-sm">/mes</span>}
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
                      {plan.price_monthly === 0 ? 'Empezar gratis' : 'Elegir plan'}
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
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Lo que dicen nuestros clientes</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { name: 'María R.', role: 'Restaurante La Esquina', text: 'Redujimos un 60% las llamadas para reservas. Ahora el bot se encarga de todo.' },
              { name: 'Carlos D.', role: 'Barbería Urbana', text: 'Mis clientes piden turno a cualquier hora. Más turnos, menos mensajes repetitivos.' },
              { name: 'Ana L.', role: 'Centro Estético Luna', text: 'La interfaz es increíble y mis clientas lo aman. Profesional desde el primer día.' },
            ].map((t, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 text-accent fill-accent" />)}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 italic">"{t.text}"</p>
                  <div>
                    <div className="font-medium text-sm">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
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
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-primary-foreground">¿Listo para automatizar tu negocio?</h2>
            <p className="text-primary-foreground/70 text-lg mb-8">Empieza gratis hoy. Sin tarjeta de crédito. Configura tu chatbot en minutos.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" className="bg-accent text-accent-foreground hover:opacity-90 h-12 px-8">
                  Crear cuenta gratis <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/demo">
                <Button size="lg" variant="outline" className="h-12 px-8 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                  Probar demo
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
            <p className="text-sm text-muted-foreground">© 2026 LocalBot AI. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
