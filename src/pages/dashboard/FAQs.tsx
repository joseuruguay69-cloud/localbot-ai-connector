import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Plus, Search, Edit2, Trash2, HelpCircle } from 'lucide-react';
import { demoFAQs } from '@/data/demo';
import { useTranslation } from '@/i18n/context';
import type { FAQ } from '@/types';

const allFAQs = [...(demoFAQs['biz-1'] || []), ...(demoFAQs['biz-2'] || [])];

const FAQs = () => {
  const { t } = useTranslation();
  const [faqs, setFaqs] = useState<FAQ[]>(allFAQs);
  const [search, setSearch] = useState('');

  const filtered = faqs.filter(f =>
    f.question.toLowerCase().includes(search.toLowerCase()) || f.answer.toLowerCase().includes(search.toLowerCase())
  );

  const toggleActive = (id: string) => {
    setFaqs(faqs.map(f => f.id === id ? { ...f, is_active: !f.is_active } : f));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{t('faqs.title')}</h1>
          <p className="text-muted-foreground text-sm">{t('faqs.subtitle')}</p>
        </div>
        <Button className="bg-gradient-primary text-primary-foreground hover:opacity-90">
          <Plus className="w-4 h-4 mr-2" /> {t('faqs.new')}
        </Button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder={t('faqs.search')} className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <div className="space-y-3">
        {filtered.length > 0 ? filtered.map(faq => (
          <Card key={faq.id} className={`shadow-soft transition-opacity ${!faq.is_active ? 'opacity-50' : ''}`}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <HelpCircle className="w-4 h-4 text-primary shrink-0" />
                    <span className="font-medium text-sm">{faq.question}</span>
                    {faq.category && <Badge variant="secondary" className="text-[10px] shrink-0">{faq.category}</Badge>}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-6">{faq.answer}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Switch checked={faq.is_active} onCheckedChange={() => toggleActive(faq.id)} />
                  <Button variant="ghost" size="icon" className="w-8 h-8"><Edit2 className="w-3.5 h-3.5" /></Button>
                  <Button variant="ghost" size="icon" className="w-8 h-8 text-destructive hover:text-destructive"><Trash2 className="w-3.5 h-3.5" /></Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )) : (
          <div className="p-10 text-center text-muted-foreground">
            <HelpCircle className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="font-medium">{t('faqs.empty')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FAQs;
