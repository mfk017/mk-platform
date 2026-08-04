import { useState, useEffect } from 'react';
import { Language } from '@/components/MarketingHeader';

export function useLanguage(defaultLang: Language = 'ar') {
  const [lang, setLangState] = useState<Language>(defaultLang);

  useEffect(() => {
    const saved = localStorage.getItem('mk_lang') as Language;
    if (saved) setLangState(saved);
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('mk_lang', newLang);
  };

  return [lang, setLang] as const;
}
