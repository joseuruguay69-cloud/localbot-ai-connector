import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import es from './translations/es';
import it from './translations/it';

export type Language = 'es' | 'it';

const translations: Record<Language, Record<string, any>> = { es, it };

interface I18nContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string, params?: Record<string, string>) => any;
}

const I18nContext = createContext<I18nContextType>({
  lang: 'es',
  setLang: () => {},
  t: (key: string) => key,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('localbot-lang');
    return (saved === 'it' ? 'it' : 'es') as Language;
  });

  const setLang = useCallback((newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('localbot-lang', newLang);
  }, []);

  const t = useCallback((key: string, params?: Record<string, string>) => {
    const val = translations[lang]?.[key] ?? translations['es']?.[key] ?? key;
    if (typeof val === 'string' && params) {
      return Object.entries(params).reduce((s, [k, v]) => s.replace(`{${k}}`, v), val);
    }
    return val;
  }, [lang]);

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export const useTranslation = () => useContext(I18nContext);
