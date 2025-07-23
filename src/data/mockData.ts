import type { User, Post } from '../types';

// Demo users for development only - remove in production
export const mockUsers: User[] = [];

// Load users from API instead
export const loadUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch('/api/users', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    });
    
    if (response.ok) {
      return await response.json();
    }
    
    return [];
  } catch (error) {
    console.error('Error loading users:', error);
    return [];
  }
};

// Multilingual post content
export const getLocalizedPosts = (language: string): Post[] => {
  const postContent = {
    da: {
      post1: {
        content: 'Søger en pålidelig rengøringshjælp til mit hjem i København. Har brug for hjælp hver 14. dag, ca. 3 timer ad gangen. Jeg har 2 børn og en hund, så erfaring med familier er et plus! 🏠✨',
        comment: 'Hej Maria! Jeg har 5 års erfaring med familierengøring og elsker at arbejde med familier der har kæledyr. Kan vi tale sammen?'
      },
      post2: {
        content: 'Lige afsluttet en fantastisk hovedrengøring for en familie i Aarhus! Der er intet bedre end at se kundens ansigt lyse op, når de ser resultatet. Tak for tilliden! 💪 #RengøringsMedStolthed',
        comment: 'Flot arbejde Lars! Du er virkelig dygtig til det du laver 👏'
      },
      post3: {
        content: 'AKUT: Vores kontor i Odense har brug for rengøring i morgen tidlig! Vi har et vigtigt klientmøde kl. 10, og stedet skal være perfekt. Kan betale ekstra for den korte varsel. Kontakt mig ASAP! 🚨'
      },
      post4: {
        content: 'Tak til alle der hjalp mig med at finde den perfekte rengøringshjælp! Lars har gjort et fantastisk arbejde, og jeg kan varmt anbefale ham til andre familier. Denne platform er virkelig guld værd! ⭐⭐⭐⭐⭐',
        comment: 'Tusind tak for de søde ord Maria! Det var en fornøjelse at hjælpe jer 😊'
      }
    },
    en: {
      post1: {
        content: 'Looking for reliable cleaning help for my home in Copenhagen. Need help every 2 weeks, about 3 hours each time. I have 2 children and a dog, so experience with families is a plus! 🏠✨',
        comment: 'Hi Maria! I have 5 years of experience with family cleaning and love working with families who have pets. Can we talk?'
      },
      post2: {
        content: 'Just finished an amazing deep cleaning for a family in Aarhus! There\'s nothing better than seeing the customer\'s face light up when they see the result. Thanks for the trust! 💪 #CleaningWithPride',
        comment: 'Great work Lars! You\'re really good at what you do 👏'
      },
      post3: {
        content: 'URGENT: Our office in Odense needs cleaning tomorrow morning! We have an important client meeting at 10 AM, and the place needs to be perfect. Can pay extra for the short notice. Contact me ASAP! 🚨'
      },
      post4: {
        content: 'Thanks to everyone who helped me find the perfect cleaning help! Lars has done an amazing job, and I can warmly recommend him to other families. This platform is truly worth gold! ⭐⭐⭐⭐⭐',
        comment: 'Thank you so much for the kind words Maria! It was a pleasure to help you 😊'
      }
    },
    ar: {
      post1: {
        content: 'أبحث عن مساعدة تنظيف موثوقة لمنزلي في كوبنهاغن. أحتاج مساعدة كل أسبوعين، حوالي 3 ساعات في كل مرة. لدي طفلان وكلب، لذا الخبرة مع العائلات ميزة إضافية! 🏠✨',
        comment: 'مرحباً ماريا! لدي 5 سنوات من الخبرة في تنظيف المنازل العائلية وأحب العمل مع العائلات التي لديها حيوانات أليفة. هل يمكننا التحدث؟'
      },
      post2: {
        content: 'انتهيت للتو من تنظيف عميق رائع لعائلة في آرهوس! لا يوجد شيء أفضل من رؤية وجه العميل يضيء عندما يرى النتيجة. شكراً للثقة! 💪 #التنظيف_بفخر',
        comment: 'عمل رائع لارس! أنت حقاً ماهر فيما تفعله 👏'
      },
      post3: {
        content: 'عاجل: مكتبنا في أودنسه يحتاج تنظيف غداً صباحاً! لدينا اجتماع مهم مع عميل في الساعة 10، والمكان يجب أن يكون مثالياً. يمكن دفع إضافي للإشعار القصير. اتصل بي فوراً! 🚨'
      },
      post4: {
        content: 'شكراً لكل من ساعدني في العثور على مساعدة التنظيف المثالية! لارس قام بعمل رائع، ويمكنني أن أوصي به بحرارة للعائلات الأخرى. هذه المنصة تستحق الذهب حقاً! ⭐⭐⭐⭐⭐',
        comment: 'شكراً جزيلاً لك على الكلمات الطيبة ماريا! كان من دواعي سروري مساعدتكم 😊'
      }
    },
    pl: {
      post1: {
        content: 'Szukam niezawodnej pomocy przy sprzątaniu mojego domu w Kopenhadze. Potrzebuję pomocy co 2 tygodnie, około 3 godzin za każdym razem. Mam 2 dzieci i psa, więc doświadczenie z rodzinami to plus! 🏠✨',
        comment: 'Cześć Maria! Mam 5 lat doświadczenia w sprzątaniu domów rodzinnych i uwielbiam pracować z rodzinami, które mają zwierzęta. Możemy porozmawiać?'
      },
      post2: {
        content: 'Właśnie skończyłem niesamowite gruntowne sprzątanie dla rodziny w Aarhus! Nie ma nic lepszego niż widzieć, jak twarz klienta rozjaśnia się, gdy widzi rezultat. Dzięki za zaufanie! 💪 #SprzątanieZDumą',
        comment: 'Świetna robota Lars! Naprawdę jesteś dobry w tym, co robisz 👏'
      },
      post3: {
        content: 'PILNE: Nasze biuro w Odense potrzebuje sprzątania jutro rano! Mamy ważne spotkanie z klientem o 10:00, a miejsce musi być idealne. Mogę zapłacić dodatkowo za krótki termin. Skontaktuj się ze mną ASAP! 🚨'
      },
      post4: {
        content: 'Dzięki wszystkim, którzy pomogli mi znaleźć idealną pomoc przy sprzątaniu! Lars wykonał niesamowitą pracę i mogę go ciepło polecić innym rodzinom. Ta platforma jest naprawdę warta złota! ⭐⭐⭐⭐⭐',
        comment: 'Bardzo dziękuję za miłe słowa Maria! To była przyjemność móc wam pomóc 😊'
      }
    },
    tr: {
      post1: {
        content: 'Kopenhag\'daki evim için güvenilir temizlik yardımı arıyorum. Her 2 haftada bir, her seferinde yaklaşık 3 saat yardıma ihtiyacım var. 2 çocuğum ve bir köpeğim var, bu yüzden ailelerle deneyim artı! 🏠✨',
        comment: 'Merhaba Maria! Aile temizliğinde 5 yıl deneyimim var ve evcil hayvanı olan ailelerle çalışmayı seviyorum. Konuşabilir miyiz?'
      },
      post2: {
        content: 'Aarhus\'ta bir aile için harika bir derin temizlik işini yeni bitirdim! Müşterinin sonucu gördüğünde yüzünün aydınlanmasından daha güzel bir şey yok. Güven için teşekkürler! 💪 #GururlaTemizlik',
        comment: 'Harika iş Lars! Yaptığın işte gerçekten iyisin 👏'
      },
      post3: {
        content: 'ACİL: Odense\'deki ofisimizin yarın sabah temizlenmesi gerekiyor! Saat 10\'da önemli bir müşteri toplantımız var ve yer mükemmel olmalı. Kısa süre için ekstra ödeyebilirim. Hemen benimle iletişime geçin! 🚨'
      },
      post4: {
        content: 'Mükemmel temizlik yardımı bulmama yardım eden herkese teşekkürler! Lars harika bir iş çıkardı ve onu diğer ailelere sıcak bir şekilde tavsiye edebilirim. Bu platform gerçekten altın değerinde! ⭐⭐⭐⭐⭐',
        comment: 'Nazik sözlerin için çok teşekkürler Maria! Size yardım etmek bir zevkti 😊'
      }
    },
    de: {
      post1: {
        content: 'Suche zuverlässige Reinigungshilfe für mein Zuhause in Kopenhagen. Brauche alle 2 Wochen Hilfe, etwa 3 Stunden pro Mal. Ich habe 2 Kinder und einen Hund, also ist Erfahrung mit Familien ein Plus! 🏠✨',
        comment: 'Hallo Maria! Ich habe 5 Jahre Erfahrung mit Familienreinigung und liebe es, mit Familien zu arbeiten, die Haustiere haben. Können wir sprechen?'
      },
      post2: {
        content: 'Gerade eine fantastische Grundreinigung für eine Familie in Aarhus beendet! Es gibt nichts Besseres, als das Gesicht des Kunden aufleuchten zu sehen, wenn sie das Ergebnis sehen. Danke für das Vertrauen! 💪 #ReinigungMitStolz',
        comment: 'Großartige Arbeit Lars! Du bist wirklich gut in dem, was du tust 👏'
      },
      post3: {
        content: 'DRINGEND: Unser Büro in Odense braucht morgen früh eine Reinigung! Wir haben um 10 Uhr ein wichtiges Kundentreffen und der Ort muss perfekt sein. Kann extra für die kurze Frist zahlen. Kontaktieren Sie mich SOFORT! 🚨'
      },
      post4: {
        content: 'Danke an alle, die mir geholfen haben, die perfekte Reinigungshilfe zu finden! Lars hat fantastische Arbeit geleistet und ich kann ihn anderen Familien wärmstens empfehlen. Diese Plattform ist wirklich Gold wert! ⭐⭐⭐⭐⭐',
        comment: 'Vielen Dank für die netten Worte Maria! Es war mir eine Freude, euch zu helfen 😊'
      }
    }
  };

  const content = postContent[language as keyof typeof postContent] || postContent.da;

  return [
    {
      id: '1',
      userId: '1',
      user: mockUsers[0],
      content: content.post1.content,
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
          content: content.post1.comment,
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
      content: content.post2.content,
      jobType: 'deep_cleaning',
      location: 'Aarhus C',
      urgency: 'flexible',
      likes: 28,
      comments: [
        {
          id: '2',
          userId: '3',
          user: mockUsers[2],
          content: content.post2.comment,
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
      content: content.post3.content,
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
      content: content.post4.content,
      jobType: 'home_cleaning',
      location: 'København',
      urgency: 'flexible',
      likes: 15,
      comments: [
        {
          id: '3',
          userId: '2',
          user: mockUsers[1],
          content: content.post4.comment,
          createdAt: '45 minutter siden'
        }
      ],
      createdAt: '1 dag siden',
      isJobPost: false
    }
  ];
};

export const mockPosts = getLocalizedPosts('da');