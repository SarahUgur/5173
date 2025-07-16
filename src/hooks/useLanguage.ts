import { useState, useEffect } from 'react';

type Language = 'da' | 'en' | 'ar' | 'pl' | 'tr' | 'de';

interface Translations {
  [key: string]: {
    [key in Language]: string;
  };
}

const translations: Translations = {
  searchPlaceholder: {
    da: 'Søg efter rengøringsopgaver, personer...',
    en: 'Search for cleaning tasks, people...',
    ar: 'البحث عن مهام التنظيف والأشخاص...',
    pl: 'Szukaj zadań sprzątania, osób...',
    tr: 'Temizlik görevleri, kişiler ara...',
    de: 'Suche nach Reinigungsaufgaben, Personen...'
  },
  home: {
    da: 'Hjem',
    en: 'Home',
    ar: 'الرئيسية',
    pl: 'Dom',
    tr: 'Ana Sayfa',
    de: 'Startseite'
  },
  jobs: {
    da: 'Jobs',
    en: 'Jobs',
    ar: 'الوظائف',
    pl: 'Praca',
    tr: 'İşler',
    de: 'Jobs'
  },
  network: {
    da: 'Netværk',
    en: 'Network',
    ar: 'الشبكة',
    pl: 'Sieć',
    tr: 'Ağ',
    de: 'Netzwerk'
  },
  upgradeToPro: {
    da: 'Opgrader til Pro',
    en: 'Upgrade to Pro',
    ar: 'ترقية إلى برو',
    pl: 'Przejdź na Pro',
    tr: 'Pro\'ya Yükselt',
    de: 'Auf Pro upgraden'
  },
  logout: {
    da: 'Log ud',
    en: 'Logout',
    ar: 'تسجيل الخروج',
    pl: 'Wyloguj',
    tr: 'Çıkış Yap',
    de: 'Abmelden'
  },
  myTasks: {
    da: 'Mine Opgaver',
    en: 'My Tasks',
    ar: 'مهامي',
    pl: 'Moje Zadania',
    tr: 'Görevlerim',
    de: 'Meine Aufgaben'
  },
  planning: {
    da: 'Planlægning',
    en: 'Planning',
    ar: 'التخطيط',
    pl: 'Planowanie',
    tr: 'Planlama',
    de: 'Planung'
  },
  whatAreYouThinking: {
    da: 'Hvad tænker du på?',
    en: 'What are you thinking?',
    ar: 'بماذا تفكر؟',
    pl: 'O czym myślisz?',
    tr: 'Ne düşünüyorsun?',
    de: 'Woran denkst du?'
  },
  describeCleaningTask: {
    da: 'Beskriv den rengøringsopgave du har brug for hjælp til...',
    en: 'Describe the cleaning task you need help with...',
    ar: 'صف مهمة التنظيف التي تحتاج مساعدة فيها...',
    pl: 'Opisz zadanie sprzątania, z którym potrzebujesz pomocy...',
    tr: 'Yardıma ihtiyacınız olan temizlik görevini açıklayın...',
    de: 'Beschreiben Sie die Reinigungsaufgabe, bei der Sie Hilfe benötigen...'
  },
  regularPost: {
    da: 'Almindeligt Opslag',
    en: 'Regular Post',
    ar: 'منشور عادي',
    pl: 'Zwykły Post',
    tr: 'Normal Gönderi',
    de: 'Normaler Beitrag'
  },
  jobPost: {
    da: 'Job Opslag',
    en: 'Job Post',
    ar: 'منشور وظيفة',
    pl: 'Oferta Pracy',
    tr: 'İş İlanı',
    de: 'Stellenausschreibung'
  },
  homeCleaning: {
    da: 'Hjemmerengøring',
    en: 'Home Cleaning',
    ar: 'تنظيف المنزل',
    pl: 'Sprzątanie Domu',
    tr: 'Ev Temizliği',
    de: 'Hausreinigung'
  },
  officeCleaning: {
    da: 'Kontorrengøring',
    en: 'Office Cleaning',
    ar: 'تنظيف المكاتب',
    pl: 'Sprzątanie Biur',
    tr: 'Ofis Temizliği',
    de: 'Büroreinigung'
  },
  deepCleaning: {
    da: 'Hovedrengøring',
    en: 'Deep Cleaning',
    ar: 'تنظيف عميق',
    pl: 'Gruntowne Sprzątanie',
    tr: 'Derin Temizlik',
    de: 'Grundreinigung'
  },
  regularCleaning: {
    da: 'Fast rengøring',
    en: 'Regular Cleaning',
    ar: 'تنظيف منتظم',
    pl: 'Regularne Sprzątanie',
    tr: 'Düzenli Temizlik',
    de: 'Regelmäßige Reinigung'
  },
  oneTimeJob: {
    da: 'Engangsjob',
    en: 'One-time Job',
    ar: 'وظيفة لمرة واحدة',
    pl: 'Jednorazowa Praca',
    tr: 'Tek Seferlik İş',
    de: 'Einmaliger Job'
  },
  flexible: {
    da: 'Fleksibel',
    en: 'Flexible',
    ar: 'مرن',
    pl: 'Elastyczny',
    tr: 'Esnek',
    de: 'Flexibel'
  },
  thisWeek: {
    da: 'Denne uge',
    en: 'This Week',
    ar: 'هذا الأسبوع',
    pl: 'Ten Tydzień',
    tr: 'Bu Hafta',
    de: 'Diese Woche'
  },
  immediate: {
    da: 'Akut',
    en: 'Immediate',
    ar: 'فوري',
    pl: 'Natychmiastowy',
    tr: 'Acil',
    de: 'Sofort'
  },
  location: {
    da: 'Lokation',
    en: 'Location',
    ar: 'الموقع',
    pl: 'Lokalizacja',
    tr: 'Konum',
    de: 'Standort'
  },
  budget: {
    da: 'Budget (valgfrit)',
    en: 'Budget (optional)',
    ar: 'الميزانية (اختياري)',
    pl: 'Budżet (opcjonalnie)',
    tr: 'Bütçe (isteğe bağlı)',
    de: 'Budget (optional)'
  },
  createJob: {
    da: 'Opret Job',
    en: 'Create Job',
    ar: 'إنشاء وظيفة',
    pl: 'Utwórz Pracę',
    tr: 'İş Oluştur',
    de: 'Job erstellen'
  },
  share: {
    da: 'Del',
    en: 'Share',
    ar: 'مشاركة',
    pl: 'Udostępnij',
    tr: 'Paylaş',
    de: 'Teilen'
  },
  apply: {
    da: 'Ansøg',
    en: 'Apply',
    ar: 'تقدم',
    pl: 'Aplikuj',
    tr: 'Başvur',
    de: 'Bewerben'
  },
  cleaningType: {
    da: 'Type af rengøring',
    en: 'Type of cleaning',
    ar: 'نوع التنظيف',
    pl: 'Typ sprzątania',
    tr: 'Temizlik türü',
    de: 'Art der Reinigung'
  },
  urgency: {
    da: 'Hastighed',
    en: 'Urgency',
    ar: 'الإلحاح',
    pl: 'Pilność',
    tr: 'Aciliyet',
    de: 'Dringlichkeit'
  },
  image: {
    da: 'Billede',
    en: 'Image',
    ar: 'صورة',
    pl: 'Obraz',
    tr: 'Resim',
    de: 'Bild'
  },
  favorites: {
    da: 'Favoritter',
    en: 'Favorites',
    ar: 'المفضلة',
    pl: 'Ulubione',
    tr: 'Favoriler',
    de: 'Favoriten'
  },
  localJobs: {
    da: 'Lokale Jobs',
    en: 'Local Jobs',
    ar: 'الوظائف المحلية',
    pl: 'Lokalne Prace',
    tr: 'Yerel İşler',
    de: 'Lokale Jobs'
  },
  trending: {
    da: 'Trending',
    en: 'Trending',
    ar: 'الرائج',
    pl: 'Popularne',
    tr: 'Trend',
    de: 'Trending'
  },
  websiteIntegration: {
    da: 'Website Integration',
    en: 'Website Integration',
    ar: 'تكامل الموقع',
    pl: 'Integracja Strony',
    tr: 'Web Sitesi Entegrasyonu',
    de: 'Website Integration'
  },
  messages: {
    da: 'Beskeder',
    en: 'Messages',
    ar: 'الرسائل',
    pl: 'Wiadomości',
    tr: 'Mesajlar',
    de: 'Nachrichten'
  },
  notifications: {
    da: 'Notifikationer',
    en: 'Notifications',
    ar: 'الإشعارات',
    pl: 'Powiadomienia',
    tr: 'Bildirimler',
    de: 'Benachrichtigungen'
  },
  profile: {
    da: 'Profil',
    en: 'Profile',
    ar: 'الملف الشخصي',
    pl: 'Profil',
    tr: 'Profil',
    de: 'Profil'
  },
  viewProfile: {
    da: 'Se profil',
    en: 'View Profile',
    ar: 'عرض الملف الشخصي',
    pl: 'Zobacz profil',
    tr: 'Profili Görüntüle',
    de: 'Profil anzeigen'
  },
  settings: {
    da: 'Indstillinger',
    en: 'Settings',
    ar: 'الإعدادات',
    pl: 'Ustawienia',
    tr: 'Ayarlar',
    de: 'Einstellungen'
  }
};

export function useLanguage() {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'da';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return { language, setLanguage, t };
}