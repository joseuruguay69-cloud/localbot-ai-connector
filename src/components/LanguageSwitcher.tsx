import { useTranslation, Language } from '@/i18n/context';
import { Button } from '@/components/ui/button';

const flags: Record<Language, string> = { es: '🇪🇸', it: '🇮🇹' };

export function LanguageSwitcher({ variant = 'ghost' }: { variant?: 'ghost' | 'outline' }) {
  const { lang, setLang } = useTranslation();
  const next: Language = lang === 'es' ? 'it' : 'es';

  return (
    <Button variant={variant} size="sm" onClick={() => setLang(next)} className="gap-1.5 text-sm px-2.5">
      {flags[lang]} {lang.toUpperCase()}
    </Button>
  );
}
