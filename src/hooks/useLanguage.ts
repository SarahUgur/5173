import { useState } from 'react';

type Language = 'da' | 'en';

interface Translations {
  [key: string]: {
    da: string;
    en: string;
  };
}

const translations: Translations = {
  home: {
    da: 'Hjem',
    en: 'Home'
  },
  localJobs: {
    da: 'Lokale Jobs',
    en: 'Local Jobs'
  },
  network: {
    da: 'Netværk',
    en: 'Network'
  },
  myTasks: {
    da: 'Mine Opgaver',
    en: 'My Tasks'
  },
  planning: {
    da: 'Planlægning',
    en: 'Planning'
  },
  favorites: {
    da: 'Favoritter',
    en: 'Favorites'
  },
  trending: {
    da: 'Trending',
    en: 'Trending'
  },
  profile: {
    da: 'Profil',
    en: 'Profile'
  },
  messages: {
    da: 'Beskeder',
    en: 'Messages'
  },
  notifications: {
    da: 'Notifikationer',
    en: 'Notifications'
  },
  settings: {
    da: 'Indstillinger',
    en: 'Settings'
  },
  logout: {
    da: 'Log ud',
    en: 'Logout'
  },
  search: {
    da: 'Søg',
    en: 'Search'
  },
  filter: {
    da: 'Filter',
    en: 'Filter'
  },
  location: {
    da: 'Lokation',
    en: 'Location'
  },
  budget: {
    da: 'Budget',
    en: 'Budget'
  },
  jobType: {
    da: 'Job Type',
    en: 'Job Type'
  },
  urgency: {
    da: 'Hastighed',
    en: 'Urgency'
  },
  apply: {
    da: 'Ansøg',
    en: 'Apply'
  },
  contact: {
    da: 'Kontakt',
    en: 'Contact'
  },
  save: {
    da: 'Gem',
    en: 'Save'
  },
  cancel: {
    da: 'Annuller',
    en: 'Cancel'
  },
  edit: {
    da: 'Rediger',
    en: 'Edit'
  },
  delete: {
    da: 'Slet',
    en: 'Delete'
  },
  share: {
    da: 'Del',
    en: 'Share'
  },
  like: {
    da: 'Synes godt om',
    en: 'Like'
  },
  comment: {
    da: 'Kommentar',
    en: 'Comment'
  },
  post: {
    da: 'Opslag',
    en: 'Post'
  },
  createPost: {
    da: 'Opret Opslag',
    en: 'Create Post'
  },
  writePost: {
    da: 'Skriv et opslag...',
    en: 'Write a post...'
  },
  addPhoto: {
    da: 'Tilføj billede',
    en: 'Add photo'
  },
  addLocation: {
    da: 'Tilføj lokation',
    en: 'Add location'
  },
  publish: {
    da: 'Udgiv',
    en: 'Publish'
  },
  loading: {
    da: 'Indlæser...',
    en: 'Loading...'
  },
  error: {
    da: 'Fejl',
    en: 'Error'
  },
  success: {
    da: 'Succes',
    en: 'Success'
  },
  welcome: {
    da: 'Velkommen',
    en: 'Welcome'
  },
  login: {
    da: 'Log ind',
    en: 'Login'
  },
  register: {
    da: 'Registrer',
    en: 'Register'
  },
  email: {
    da: 'Email',
    en: 'Email'
  },
  password: {
    da: 'Adgangskode',
    en: 'Password'
  },
  name: {
    da: 'Navn',
    en: 'Name'
  },
  phone: {
    da: 'Telefon',
    en: 'Phone'
  },
  website: {
    da: 'Hjemmeside',
    en: 'Website'
  },
  bio: {
    da: 'Biografi',
    en: 'Bio'
  },
  rating: {
    da: 'Bedømmelse',
    en: 'Rating'
  },
  reviews: {
    da: 'Anmeldelser',
    en: 'Reviews'
  },
  completedJobs: {
    da: 'Afsluttede Jobs',
    en: 'Completed Jobs'
  },
  verified: {
    da: 'Verificeret',
    en: 'Verified'
  },
  premium: {
    da: 'Premium',
    en: 'Premium'
  },
  free: {
    da: 'Gratis',
    en: 'Free'
  },
  paid: {
    da: 'Betalt',
    en: 'Paid'
  },
  hourly: {
    da: 'Per time',
    en: 'Hourly'
  },
  fixed: {
    da: 'Fast pris',
    en: 'Fixed price'
  },
  negotiable: {
    da: 'Til forhandling',
    en: 'Negotiable'
  },
  urgent: {
    da: 'Akut',
    en: 'Urgent'
  },
  flexible: {
    da: 'Fleksibel',
    en: 'Flexible'
  },
  asap: {
    da: 'Hurtigst muligt',
    en: 'ASAP'
  },
  today: {
    da: 'I dag',
    en: 'Today'
  },
  tomorrow: {
    da: 'I morgen',
    en: 'Tomorrow'
  },
  thisWeek: {
    da: 'Denne uge',
    en: 'This week'
  },
  nextWeek: {
    da: 'Næste uge',
    en: 'Next week'
  },
  thisMonth: {
    da: 'Denne måned',
    en: 'This month'
  },
  nextMonth: {
    da: 'Næste måned',
    en: 'Next month'
  }
};

export function useLanguage() {
  const [language, setLanguage] = useState<Language>('da');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  return {
    language,
    t,
    changeLanguage
  };
}