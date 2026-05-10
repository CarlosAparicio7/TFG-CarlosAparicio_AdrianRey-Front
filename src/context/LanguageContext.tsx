import { createContext, useContext, useEffect, useState } from "react";
import en from "../locals/en.json";
import es from "../locals/es.json";

const LANGUAGE_KEY: string = "app-language";
type Language = "es" | "en";

const translations = { es, en } as const;

type TranslationKey = keyof typeof es;

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: TranslationKey) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

type LanguageProviderProps = {
  children: React.ReactNode;
};

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = window.localStorage.getItem(LANGUAGE_KEY);
    return (stored === "en" || stored === "es") ? stored : "es";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === "es" ? "en" : "es"));
  };

  const t = (key: TranslationKey): string => {
    return translations[language][key] || key;
  };

  useEffect(() => {
    const root = document.documentElement;
    
    if (language === "en") {
      root.classList.add("en");
    } else {
      root.classList.remove("en");
    }

    window.localStorage.setItem(LANGUAGE_KEY, language);
  }, [language]);

  const value: LanguageContextType = {language, setLanguage, toggleLanguage, t,};

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage debe usarse dentro de un LanguageProvider");
  }
  return ctx;
}