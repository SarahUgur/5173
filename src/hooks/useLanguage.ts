import { useState, useEffect } from 'react';

type Language = 'da' | 'en' | 'ar' | 'pl' | 'tr' | 'de';

interface Translations {
  [key: string]: {
    [key in Language]: string;
  };
}

const translations: Translations = {
  // Navigation
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
  myTasks: {
    da: 'Mine Rengøringsjobs',
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

  // User actions
  createJob: {
    da: 'Opret Rengøringsjob',
    en: 'Create Job',
    ar: 'إنشاء وظيفة',
    pl: 'Utwórz Pracę',
    tr: 'İş Oluştur',
    de: 'Job erstellen'
  },
  findExperts: {
    da: 'Find Rengøringseksperter',
    en: 'Find Experts',
    ar: 'العثور على خبراء',
    pl: 'Znajdź Ekspertów',
    tr: 'Uzman Bul',
    de: 'Experten finden'
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
  },

  // Post creation
  whatAreYouThinking: {
    da: 'Hvad kan du hjælpe med i dag?',
    en: 'What are you thinking?',
    ar: 'بماذا تفكر؟',
    pl: 'O czym myślisz?',
    tr: 'Ne düşünüyorsun?',
    de: 'Woran denkst du?'
  },
  describeCleaningTask: {
    da: 'Skriv kort hvem du er, og hvad du tilbyder inden for rengøring...',
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
  share: {
    da: 'Del',
    en: 'Share',
    ar: 'مشاركة',
    pl: 'Udostępnij',
    tr: 'Paylaş',
    de: 'Teilen'
  },
  createJob: {
    da: 'Opret Job',
    en: 'Create Job',
    ar: 'إنشاء وظيفة',
    pl: 'Utwórz Pracę',
    tr: 'İş Oluştur',
    de: 'Job erstellen'
  },

  // Job types
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
  oneTimeCleaning: {
    da: 'Engangsrengøring',
    en: 'One-time Cleaning',
    ar: 'تنظيف لمرة واحدة',
    pl: 'Jednorazowe Sprzątanie',
    tr: 'Tek Seferlik Temizlik',
    de: 'Einmalige Reinigung'
  },

  // New cleaning categories
  specializedCleaning: {
    da: 'Specialrengøring',
    en: 'Specialized Cleaning',
    ar: 'تنظيف متخصص',
    pl: 'Specjalistyczne Sprzątanie',
    tr: 'Özel Temizlik',
    de: 'Spezialreinigung'
  },
  carpetSofaCleaning: {
    da: 'Tæppe/Sofa Rengøring',
    en: 'Carpet/Sofa Cleaning',
    ar: 'تنظيف السجاد/الأريكة',
    pl: 'Czyszczenie Dywanów/Sof',
    tr: 'Halı/Koltuk Temizliği',
    de: 'Teppich/Sofa Reinigung'
  },
  carCleaning: {
    da: 'Bilrengøring',
    en: 'Car Cleaning',
    ar: 'تنظيف السيارات',
    pl: 'Mycie Samochodów',
    tr: 'Araba Temizliği',
    de: 'Autoreinigung'
  },
  gardenCleaning: {
    da: 'Haverengøring',
    en: 'Garden Cleaning',
    ar: 'تنظيف الحديقة',
    pl: 'Sprzątanie Ogrodu',
    tr: 'Bahçe Temizliği',
    de: 'Gartenreinigung'
  },
  laundryService: {
    da: 'Vasketøjsservice',
    en: 'Laundry Service',
    ar: 'خدمة الغسيل',
    pl: 'Usługa Prania',
    tr: 'Çamaşır Servisi',
    de: 'Wäscheservice'
  },
  dryCleaning: {
    da: 'Kemisk Rens',
    en: 'Dry Cleaning',
    ar: 'التنظيف الجاف',
    pl: 'Pralnia Chemiczna',
    tr: 'Kuru Temizleme',
    de: 'Chemische Reinigung'
  },
  windowCleaning: {
    da: 'Vinduesrengøring',
    en: 'Window Cleaning',
    ar: 'تنظيف النوافذ',
    pl: 'Mycie Okien',
    tr: 'Cam Temizliği',
    de: 'Fensterreinigung'
  },
  moveCleaning: {
    da: 'Fraflytningsrengøring',
    en: 'Move-out Cleaning',
    ar: 'تنظيف الانتقال',
    pl: 'Sprzątanie po Przeprowadzce',
    tr: 'Taşınma Temizliği',
    de: 'Auszugsreinigung'
  },
  constructionCleaning: {
    da: 'Byggerengøring',
    en: 'Construction Cleaning',
    ar: 'تنظيف البناء',
    pl: 'Sprzątanie po Budowie',
    tr: 'İnşaat Temizliği',
    de: 'Baureinigung'
  },
  dailyOfficeCleaning: {
    da: 'Daglig Kontorrengøring',
    en: 'Daily Office Cleaning',
    ar: 'تنظيف المكتب اليومي',
    pl: 'Codzienne Sprzątanie Biura',
    tr: 'Günlük Ofis Temizliği',
    de: 'Tägliche Büroreinigung'
  },
  industrialCleaning: {
    da: 'Industrirengøring',
    en: 'Industrial Cleaning',
    ar: 'التنظيف الصناعي',
    pl: 'Sprzątanie Przemysłowe',
    tr: 'Endüstriyel Temizlik',
    de: 'Industriereinigung'
  },

  // User categories
  businessCustomer: {
    da: 'Erhvervskunde',
    en: 'Business Customer',
    ar: 'عميل تجاري',
    pl: 'Klient Biznesowy',
    tr: 'İş Müşterisi',
    de: 'Geschäftskunde'
  },
  subcontractor: {
    da: 'Underleverandør',
    en: 'Subcontractor',
    ar: 'مقاول فرعي',
    pl: 'Podwykonawca',
    tr: 'Alt Yüklenici',
    de: 'Subunternehmer'
  },

  // Target audience
  targetAudience: {
    da: 'Målgruppe',
    en: 'Target Audience',
    ar: 'الجمهور المستهدف',
    pl: 'Grupa Docelowa',
    tr: 'Hedef Kitle',
    de: 'Zielgruppe'
  },
  hiringCleaner: {
    da: 'Ansætter Rengøringshjælp',
    en: 'Hiring Cleaner',
    ar: 'توظيف منظف',
    pl: 'Zatrudnianie Sprzątacza',
    tr: 'Temizlikçi Arıyor',
    de: 'Reinigungskraft suchen'
  },
  lookingForWork: {
    da: 'Søger Arbejde',
    en: 'Looking for Work',
    ar: 'يبحث عن عمل',
    pl: 'Szuka Pracy',
    tr: 'İş Arıyor',
    de: 'Arbeit suchen'
  },
  lookingForHelp: {
    da: 'Søger hjælp',
    en: 'Looking for help',
    ar: 'يبحث عن مساعدة',
    pl: 'Szuka pomocy',
    tr: 'Yardım arıyor',
    de: 'Sucht Hilfe'
  },
  offeringServices: {
    da: 'Tilbyder tjenester',
    en: 'Offering services',
    ar: 'يقدم خدمات',
    pl: 'Oferuje usługi',
    tr: 'Hizmet sunuyor',
    de: 'Bietet Dienstleistungen'
  },
  userCategory: {
    da: 'Brugerkategori',
    en: 'User Category',
    ar: 'فئة المستخدم',
    pl: 'Kategoria Użytkownika',
    tr: 'Kullanıcı Kategorisi',
    de: 'Benutzerkategorie'
  },
  cleaningCategory: {
    da: 'Rengøringskategori',
    en: 'Cleaning Category',
    ar: 'فئة التنظيف',
    pl: 'Kategoria Sprzątania',
    tr: 'Temizlik Kategorisi',
    de: 'Reinigungskategorie'
  },

  // Urgency levels
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

  // Form fields
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

  // Actions
  apply: {
    da: 'Ansøg',
    en: 'Apply',
    ar: 'تقدم',
    pl: 'Aplikuj',
    tr: 'Başvur',
    de: 'Bewerben'
  },
  like: {
    da: 'Synes godt om',
    en: 'Like',
    ar: 'إعجاب',
    pl: 'Polub',
    tr: 'Beğen',
    de: 'Gefällt mir'
  },
  comment: {
    da: 'Kommentar',
    en: 'Comment',
    ar: 'تعليق',
    pl: 'Komentarz',
    tr: 'Yorum',
    de: 'Kommentar'
  },
  writeComment: {
    da: 'Skriv en kommentar...',
    en: 'Write a comment...',
    ar: 'اكتب تعليقاً...',
    pl: 'Napisz komentarz...',
    tr: 'Yorum yaz...',
    de: 'Schreibe einen Kommentar...'
  },

  // Time expressions
  hoursAgo: {
    da: 'timer siden',
    en: 'hours ago',
    ar: 'منذ ساعات',
    pl: 'godzin temu',
    tr: 'saat önce',
    de: 'Stunden her'
  },
  minutesAgo: {
    da: 'minutter siden',
    en: 'minutes ago',
    ar: 'منذ دقائق',
    pl: 'minut temu',
    tr: 'dakika önce',
    de: 'Minuten her'
  },
  daysAgo: {
    da: 'dage siden',
    en: 'days ago',
    ar: 'منذ أيام',
    pl: 'dni temu',
    tr: 'gün önce',
    de: 'Tage her'
  },

  // User types
  privateCustomer: {
    da: 'Privat kunde',
    en: 'Private Customer',
    ar: 'عميل خاص',
    pl: 'Klient Prywatny',
    tr: 'Özel Müşteri',
    de: 'Privatkunde'
  },
  cleaningExpert: {
    da: 'Rengøringsekspert',
    en: 'Cleaning Expert',
    ar: 'خبير تنظيف',
    pl: 'Ekspert Sprzątania',
    tr: 'Temizlik Uzmanı',
    de: 'Reinigungsexperte'
  },
  smallBusiness: {
    da: 'Lille virksomhed',
    en: 'Small Business',
    ar: 'شركة صغيرة',
    pl: 'Mała Firma',
    tr: 'Küçük İşletme',
    de: 'Kleines Unternehmen'
  },
  largeBusiness: {
    da: 'Stor virksomhed',
    en: 'Large Business',
    ar: 'شركة كبيرة',
    pl: 'Duża Firma',
    tr: 'Büyük İşletme',
    de: 'Großunternehmen'
  },

  // Status messages
  verified: {
    da: 'Verificeret',
    en: 'Verified',
    ar: 'موثق',
    pl: 'Zweryfikowany',
    tr: 'Doğrulanmış',
    de: 'Verifiziert'
  },
  proMember: {
    da: 'Pro Medlem',
    en: 'Pro Member',
    ar: 'عضو برو',
    pl: 'Członek Pro',
    tr: 'Pro Üye',
    de: 'Pro-Mitglied'
  },
  active: {
    da: 'Aktiv',
    en: 'Active',
    ar: 'نشط',
    pl: 'Aktywny',
    tr: 'Aktif',
    de: 'Aktiv'
  },
  pending: {
    da: 'Afventer',
    en: 'Pending',
    ar: 'في الانتظار',
    pl: 'Oczekujący',
    tr: 'Beklemede',
    de: 'Ausstehend'
  },
  completed: {
    da: 'Afsluttet',
    en: 'Completed',
    ar: 'مكتمل',
    pl: 'Zakończony',
    tr: 'Tamamlandı',
    de: 'Abgeschlossen'
  },

  // Local Jobs page
  allAreas: {
    da: 'Alle områder',
    en: 'All areas',
    ar: 'جميع المناطق',
    pl: 'Wszystkie obszary',
    tr: 'Tüm bölgeler',
    de: 'Alle Bereiche'
  },
  searchJobs: {
    da: 'Søg efter jobs, lokationer...',
    en: 'Search for jobs, locations...',
    ar: 'البحث عن الوظائف والمواقع...',
    pl: 'Szukaj pracy, lokalizacji...',
    tr: 'İş, konum ara...',
    de: 'Suche nach Jobs, Standorten...'
  },
  newestFirst: {
    da: 'Nyeste først',
    en: 'Newest first',
    ar: 'الأحدث أولاً',
    pl: 'Najnowsze pierwsze',
    tr: 'En yeni önce',
    de: 'Neueste zuerst'
  },
  closestFirst: {
    da: 'Nærmeste først',
    en: 'Closest first',
    ar: 'الأقرب أولاً',
    pl: 'Najbliższe pierwsze',
    tr: 'En yakın önce',
    de: 'Nächste zuerst'
  },
  highestBudget: {
    da: 'Højeste budget',
    en: 'Highest budget',
    ar: 'أعلى ميزانية',
    pl: 'Najwyższy budżet',
    tr: 'En yüksek bütçe',
    de: 'Höchstes Budget'
  },
  showing: {
    da: 'Viser',
    en: 'Showing',
    ar: 'عرض',
    pl: 'Pokazuje',
    tr: 'Gösteriliyor',
    de: 'Zeige'
  },
  jobs_count: {
    da: 'jobs',
    en: 'jobs',
    ar: 'وظائف',
    pl: 'prace',
    tr: 'iş',
    de: 'Jobs'
  },
  in: {
    da: 'i',
    en: 'in',
    ar: 'في',
    pl: 'w',
    tr: 'içinde',
    de: 'in'
  },
  useMyLocation: {
    da: 'Brug min lokation',
    en: 'Use my location',
    ar: 'استخدم موقعي',
    pl: 'Użyj mojej lokalizacji',
    tr: 'Konumumu kullan',
    de: 'Meinen Standort verwenden'
  },
  noJobsFound: {
    da: 'Ingen jobs fundet',
    en: 'No jobs found',
    ar: 'لم يتم العثور على وظائف',
    pl: 'Nie znaleziono pracy',
    tr: 'İş bulunamadı',
    de: 'Keine Jobs gefunden'
  },
  adjustSearchCriteria: {
    da: 'Prøv at justere dine søgekriterier eller vælg et andet område.',
    en: 'Try adjusting your search criteria or select a different area.',
    ar: 'حاول تعديل معايير البحث أو اختر منطقة أخرى.',
    pl: 'Spróbuj dostosować kryteria wyszukiwania lub wybierz inny obszar.',
    tr: 'Arama kriterlerinizi ayarlamayı deneyin veya farklı bir alan seçin.',
    de: 'Versuchen Sie, Ihre Suchkriterien anzupassen oder wählen Sie einen anderen Bereich.'
  },
  applicants: {
    da: 'ansøgere',
    en: 'applicants',
    ar: 'متقدمين',
    pl: 'kandydatów',
    tr: 'başvuran',
    de: 'Bewerber'
  },
  seeDetails: {
    da: 'Se detaljer',
    en: 'See details',
    ar: 'انظر التفاصيل',
    pl: 'Zobacz szczegóły',
    tr: 'Detayları gör',
    de: 'Details anzeigen'
  },
  applyNow: {
    da: 'Ansøg nu',
    en: 'Apply now',
    ar: 'تقدم الآن',
    pl: 'Aplikuj teraz',
    tr: 'Şimdi başvur',
    de: 'Jetzt bewerben'
  },
  loadMoreJobs: {
    da: 'Indlæs flere jobs',
    en: 'Load more jobs',
    ar: 'تحميل المزيد من الوظائف',
    pl: 'Załaduj więcej pracy',
    tr: 'Daha fazla iş yükle',
    de: 'Weitere Jobs laden'
  },

  // Common words
  and: {
    da: 'og',
    en: 'and',
    ar: 'و',
    pl: 'i',
    tr: 've',
    de: 'und'
  },
  priceSetBy: {
    da: 'Pris fastsat af',
    en: 'Price set by',
    ar: 'السعر محدد من قبل',
    pl: 'Cena ustalona przez',
    tr: 'Fiyat belirlenen',
    de: 'Preis festgelegt von'
  },
  customer: {
    da: 'kunde',
    en: 'customer',
    ar: 'العميل',
    pl: 'klient',
    tr: 'müşteri',
    de: 'Kunde'
  },
  provider: {
    da: 'udbyder',
    en: 'provider',
    ar: 'مقدم الخدمة',
    pl: 'dostawca',
    tr: 'sağlayıcı',
    de: 'Anbieter'
  },
  or: {
    da: 'eller',
    en: 'or',
    ar: 'أو',
    pl: 'lub',
    tr: 'veya',
    de: 'oder'
  },
  with: {
    da: 'med',
    en: 'with',
    ar: 'مع',
    pl: 'z',
    tr: 'ile',
    de: 'mit'
  },
  for: {
    da: 'for',
    en: 'for',
    ar: 'لـ',
    pl: 'dla',
    tr: 'için',
    de: 'für'
  },
  by: {
    da: 'af',
    en: 'by',
    ar: 'بواسطة',
    pl: 'przez',
    tr: 'tarafından',
    de: 'von'
  },
  to: {
    da: 'til',
    en: 'to',
    ar: 'إلى',
    pl: 'do',
    tr: 'için',
    de: 'zu'
  },
  from: {
    da: 'fra',
    en: 'from',
    ar: 'من',
    pl: 'od',
    tr: 'den',
    de: 'von'
  },
  at: {
    da: 'på',
    en: 'at',
    ar: 'في',
    pl: 'w',
    tr: 'de',
    de: 'bei'
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
    
    // Update page title based on language
    const titles = {
      da: 'Private Rengøring - Social Platform for Rengøringsservices',
      en: 'Private Cleaning - Social Platform for Cleaning Services',
      ar: 'التنظيف الخاص - منصة اجتماعية لخدمات التنظيف',
      pl: 'Prywatne Sprzątanie - Platforma Społecznościowa dla Usług Sprzątania',
      tr: 'Özel Temizlik - Temizlik Hizmetleri için Sosyal Platform',
      de: 'Private Reinigung - Soziale Plattform für Reinigungsdienste'
    };
    document.title = titles[language];
  }, [language]);

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  // Helper function to translate time expressions
  const timeAgo = (minutes: number): string => {
    if (minutes < 60) {
      return `${minutes} ${t('minutesAgo')}`;
    } else if (minutes < 1440) {
      const hours = Math.floor(minutes / 60);
      return `${hours} ${t('hoursAgo')}`;
    } else {
      const days = Math.floor(minutes / 1440);
      return `${days} ${t('daysAgo')}`;
    }
  };

  // Helper function to get user type label
  const getUserTypeLabel = (type: string): string => {
    const typeMap: { [key: string]: string } = {
      'private': 'privateCustomer',
      'cleaner': 'cleaningExpert',
      'small_business': 'smallBusiness',
      'large_business': 'largeBusiness'
    };
    return t(typeMap[type] || type);
  };

  // Helper function to get job type label
  const getJobTypeLabel = (type: string): string => {
    const typeMap: { [key: string]: string } = {
      'home_cleaning': 'homeCleaning',
      'office_cleaning': 'officeCleaning',
      'deep_cleaning': 'deepCleaning',
      'regular_cleaning': 'regularCleaning',
      'one_time': 'oneTimeJob'
    };
    return t(typeMap[type] || type);
  };

  // Helper function to get urgency label
  const getUrgencyLabel = (urgency: string): string => {
    const urgencyMap: { [key: string]: string } = {
      'flexible': 'flexible',
      'this_week': 'thisWeek',
      'immediate': 'immediate'
    };
    return t(urgencyMap[urgency] || urgency);
  };

  return { 
    language, 
    setLanguage, 
    t, 
    timeAgo, 
    getUserTypeLabel, 
    getJobTypeLabel, 
    getUrgencyLabel 
  };
}