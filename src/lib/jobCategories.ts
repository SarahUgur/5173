// Job kategorier og typer for Private Rengøring
export interface JobCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  examples: string[];
  averagePrice: string;
  duration: string;
}

export interface JobType {
  id: string;
  name: string;
  icon: string;
  description: string;
  frequency: string;
  commitment: string;
}

export const JOB_CATEGORIES: JobCategory[] = [
  {
    id: 'hjemmerengoring',
    name: 'Hjemmerengøring',
    icon: '🏠',
    description: 'Private boliger og lejligheder',
    examples: ['Almindelig rengøring', 'Køkken og bad', 'Støvsugning', 'Gulvvask'],
    averagePrice: '200-400 kr',
    duration: '2-4 timer'
  },
  {
    id: 'kontorrengoring',
    name: 'Kontorrengøring',
    icon: '🏢',
    description: 'Kontor og arbejdspladser',
    examples: ['Skriveborde', 'Mødelokaler', 'Køkkener', 'Toiletter'],
    averagePrice: '300-600 kr',
    duration: '1-3 timer'
  },
  {
    id: 'hovedrengoring',
    name: 'Hovedrengøring',
    icon: '✨',
    description: 'Dyb og grundig rengøring',
    examples: ['Ovne og køleskabe', 'Vindueskarme', 'Skabe indvendigt', 'Baseboards'],
    averagePrice: '500-1200 kr',
    duration: '4-8 timer'
  },
  {
    id: 'vinduesrengoring',
    name: 'Vinduesrengøring',
    icon: '🪟',
    description: 'Vinduer og glaspartier',
    examples: ['Vinduer indvendigt', 'Vinduer udvendigt', 'Glasdøre', 'Spejle'],
    averagePrice: '150-400 kr',
    duration: '1-3 timer'
  },
  {
    id: 'gulvrengoring',
    name: 'Gulvrengøring',
    icon: '🧽',
    description: 'Alle typer gulve',
    examples: ['Parket', 'Fliser', 'Linoleum', 'Marmor'],
    averagePrice: '200-500 kr',
    duration: '1-4 timer'
  },
  {
    id: 'tappetrengoring',
    name: 'Tæpperengøring',
    icon: '🛋️',
    description: 'Tæpper og møbler',
    examples: ['Tæpper', 'Sofaer', 'Stole', 'Madrasser'],
    averagePrice: '300-800 kr',
    duration: '2-5 timer'
  },
  {
    id: 'fraflytningsrengoring',
    name: 'Fraflytningsrengøring',
    icon: '📦',
    description: 'Ved flytning',
    examples: ['Komplet rengøring', 'Ovne og køleskabe', 'Skabe', 'Vinduer'],
    averagePrice: '800-2000 kr',
    duration: '4-8 timer'
  },
  {
    id: 'byggererengoring',
    name: 'Byggerengøring',
    icon: '🔨',
    description: 'Efter renovering',
    examples: ['Støv og snavs', 'Vinduer', 'Gulve', 'Overflader'],
    averagePrice: '600-1500 kr',
    duration: '3-6 timer'
  },
  {
    id: 'hotelrengoring',
    name: 'Hotel & Restaurant',
    icon: '🏨',
    description: 'Erhvervsrengøring',
    examples: ['Værelser', 'Køkkener', 'Spisesale', 'Toiletter'],
    averagePrice: '400-1000 kr',
    duration: '2-6 timer'
  },
  {
    id: 'butikrengoring',
    name: 'Butik & Showroom',
    icon: '🏪',
    description: 'Detailhandel',
    examples: ['Butikslokaler', 'Prøverum', 'Lagre', 'Udstillingsvinduer'],
    averagePrice: '300-700 kr',
    duration: '1-4 timer'
  },
  {
    id: 'industrirengoring',
    name: 'Industrirengøring',
    icon: '🏭',
    description: 'Fabrikker og lagre',
    examples: ['Produktionsområder', 'Lagerhaller', 'Maskiner', 'Specialudstyr'],
    averagePrice: '500-1500 kr',
    duration: '3-8 timer'
  },
  {
    id: 'specialrengoring',
    name: 'Specialrengøring',
    icon: '⭐',
    description: 'Særlige opgaver',
    examples: ['Højtryksrensning', 'Graffiti fjernelse', 'Tagrender', 'Specialudstyr'],
    averagePrice: '400-1200 kr',
    duration: '2-6 timer'
  }
];

export const JOB_TYPES: JobType[] = [
  {
    id: 'engangsjob',
    name: 'Engangsjob',
    icon: '🔄',
    description: 'Kun denne ene gang',
    frequency: 'En gang',
    commitment: 'Ingen forpligtelse'
  },
  {
    id: 'fast_ugentlig',
    name: 'Fast ugentlig',
    icon: '📅',
    description: 'Hver uge på samme tid',
    frequency: 'Ugentlig',
    commitment: 'Længerevarende aftale'
  },
  {
    id: 'fast_14_dage',
    name: 'Fast hver 14. dag',
    icon: '📅',
    description: 'Hver anden uge',
    frequency: 'Hver 14. dag',
    commitment: 'Regelmæssig aftale'
  },
  {
    id: 'fast_maanedlig',
    name: 'Fast månedlig',
    icon: '📅',
    description: 'En gang om måneden',
    frequency: 'Månedlig',
    commitment: 'Månedlig forpligtelse'
  },
  {
    id: 'efter_behov',
    name: 'Efter behov',
    icon: '🎯',
    description: 'Fleksibel aftale',
    frequency: 'Variabel',
    commitment: 'Fleksibel'
  },
  {
    id: 'akut',
    name: 'Akut',
    icon: '🚨',
    description: 'Skal udføres i dag',
    frequency: 'Øjeblikkeligt',
    commitment: 'Samme dag'
  }
];

// Helper funktioner
export const getCategoryById = (id: string): JobCategory | undefined => {
  return JOB_CATEGORIES.find(category => category.id === id);
};

export const getTypeById = (id: string): JobType | undefined => {
  return JOB_TYPES.find(type => type.id === id);
};

export const getCategoryName = (id: string): string => {
  const category = getCategoryById(id);
  return category ? `${category.icon} ${category.name}` : id;
};

export const getTypeName = (id: string): string => {
  const type = getTypeById(id);
  return type ? `${type.icon} ${type.name}` : id;
};

export const getFullCategoryName = (id: string): string => {
  const category = getCategoryById(id);
  return category ? `${category.icon} ${category.name} - ${category.description}` : id;
};

export const getFullTypeName = (id: string): string => {
  const type = getTypeById(id);
  return type ? `${type.icon} ${type.name} - ${type.description}` : id;
};

// Filtrering funktioner
export const filterJobsByCategory = (jobs: any[], categoryId: string) => {
  if (categoryId === 'all') return jobs;
  return jobs.filter(job => job.jobCategory === categoryId);
};

export const filterJobsByType = (jobs: any[], typeId: string) => {
  if (typeId === 'all') return jobs;
  return jobs.filter(job => job.jobType === typeId);
};

// Søgning funktioner
export const searchInCategories = (searchTerm: string): JobCategory[] => {
  const term = searchTerm.toLowerCase();
  return JOB_CATEGORIES.filter(category => 
    category.name.toLowerCase().includes(term) ||
    category.description.toLowerCase().includes(term) ||
    category.examples.some(example => example.toLowerCase().includes(term))
  );
};

export const searchInTypes = (searchTerm: string): JobType[] => {
  const term = searchTerm.toLowerCase();
  return JOB_TYPES.filter(type => 
    type.name.toLowerCase().includes(term) ||
    type.description.toLowerCase().includes(term) ||
    type.frequency.toLowerCase().includes(term)
  );
};