import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('site_lang');
    return (saved === 'id' || saved === 'en' || saved === 'de') ? saved : 'id';
  });


  useEffect(() => {
    localStorage.setItem('site_lang', language);
  }, [language]);

  const toggleLanguage = (lang) => {
    if (lang === 'id' || lang === 'en' || lang === 'de') {
      setLanguage(lang);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
