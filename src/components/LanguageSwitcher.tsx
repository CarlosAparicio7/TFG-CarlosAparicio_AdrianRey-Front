import { useLanguage } from "../context/LanguageContext";

export default function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();

    const toggleLanguage = () => {
        setLanguage(language === "es" ? "en" : "es");
    };

    const label = language === "es" ? "ES" : "EN";

    return (
        <button
            onClick={toggleLanguage}
            // Mismas clases exactas que tu ThemeToggle
            className="px-3 py-1 rounded-md border border-slate-400 bg-white text-xs flex items-center gap-2 dark:bg-slate-800 dark:border-slate-500 transition-all hover:bg-slate-100 dark:hover:bg-slate-700"
        >
            <span className="font-bold">{label}</span>
        </button>
    );
}