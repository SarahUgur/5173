import type { User, Post } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Maria Hansen',
    email: 'maria@example.com',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    userType: 'private',
    isSubscribed: false,
    location: 'København',
    verified: true
  },
  {
    id: '2',
    name: 'Lars Nielsen',
    email: 'lars@cleanpro.dk',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    userType: 'cleaner',
    isSubscribed: true,
    location: 'Aarhus',
    rating: 4.8,
    verified: true
  },
  {
    id: '3',
    name: 'Sofie Andersen',
    email: 'sofie@example.com',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    userType: 'small_business',
    isSubscribed: true,
    location: 'Odense',
    verified: false
  }
];

export const mockPosts: Post[] = [
  {
    id: '1',
    userId: '1',
    user: mockUsers[0],
    content: 'Søger en pålidelig rengøringshjælp til mit hjem i København. Har brug for hjælp hver 14. dag, ca. 3 timer ad gangen. Jeg har 2 børn og en hund, så erfaring med familier er et plus! 🏠✨',
    jobType: 'regular_cleaning',
    location: 'København NV',
    budget: '300-400 kr/gang',
    urgency: 'flexible',
    likes: 12,
    comments: [
      {
        id: '1',
        userId: '2',
        user: mockUsers[1],
        content: 'Hej Maria! Jeg har 5 års erfaring med familierengøring og elsker at arbejde med familier der har kæledyr. Kan vi tale sammen?',
        createdAt: '2 timer siden'
      }
    ],
    createdAt: '4 timer siden',
    isJobPost: true,
    images: ['https://images.pexels.com/photos/4099468/pexels-photo-4099468.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop']
  },
  {
    id: '2',
    userId: '2',
    user: mockUsers[1],
    content: 'Lige afsluttet en fantastisk hovedrengøring for en familie i Aarhus! Der er intet bedre end at se kundens ansigt lyse op, når de ser resultatet. Tak for tilliden! 💪 #RengøringsMedStolthed',
    jobType: 'deep_cleaning',
    location: 'Aarhus C',
    urgency: 'flexible',
    likes: 28,
    comments: [
      {
        id: '2',
        userId: '3',
        user: mockUsers[2],
        content: 'Flot arbejde Lars! Du er virkelig dygtig til det du laver 👏',
        createdAt: '1 time siden'
      }
    ],
    createdAt: '6 timer siden',
    isJobPost: false,
    images: [
      'https://images.pexels.com/photos/4107123/pexels-photo-4107123.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      'https://images.pexels.com/photos/4108715/pexels-photo-4108715.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
    ]
  },
  {
    id: '3',
    userId: '3',
    user: mockUsers[2],
    content: 'AKUT: Vores kontor i Odense har brug for rengøring i morgen tidlig! Vi har et vigtigt klientmøde kl. 10, og stedet skal være perfekt. Kan betale ekstra for den korte varsel. Kontakt mig ASAP! 🚨',
    jobType: 'office_cleaning',
    location: 'Odense C',
    budget: '800-1000 kr',
    urgency: 'immediate',
    likes: 5,
    comments: [],
    createdAt: '30 minutter siden',
    isJobPost: true
  },
  {
    id: '4',
    userId: '1',
    user: mockUsers[0],
    content: 'Tak til alle der hjalp mig med at finde den perfekte rengøringshjælp! Lars har gjort et fantastisk arbejde, og jeg kan varmt anbefale ham til andre familier. Denne platform er virkelig guld værd! ⭐⭐⭐⭐⭐',
    jobType: 'home_cleaning',
    location: 'København',
    urgency: 'flexible',
    likes: 15,
    comments: [
      {
        id: '3',
        userId: '2',
        user: mockUsers[1],
        content: 'Tusind tak for de søde ord Maria! Det var en fornøjelse at hjælpe jer 😊',
        createdAt: '45 minutter siden'
      }
    ],
    createdAt: '1 dag siden',
    isJobPost: false
  }
];