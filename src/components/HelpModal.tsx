import React, { useState } from 'react';
import { X, HelpCircle, MessageCircle, Book, Video, Phone, Mail, Search, ChevronRight, AlertTriangle, Shield, Users, FileText, LogOut } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HelpModal({ isOpen, onClose }: HelpModalProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!isOpen) return null;

  const helpCategories = [
    {
      id: 'faq',
      title: 'Ofte Stillede Spørgsmål (FAQ)',
      icon: HelpCircle,
      color: 'blue',
      items: [
        {
          question: 'Hvordan opretter jeg en profil?',
          answer: 'Klik på "Opret Konto" på login siden, udfyld alle felter, accepter vilkår & betingelser og klik "Opret Konto". Du får øjeblikkelig adgang til platformen.'
        },
        {
          question: 'Hvad koster det at bruge Privat Rengøring?',
          answer: 'Grundlæggende brug er gratis. Pro abonnement koster 29 kr/måned og giver ubegrænset adgang til alle funktioner som likes, kommentarer og direkte beskeder.'
        },
        {
          question: 'Hvordan finder jeg jobs i mit område?',
          answer: 'Gå til "Lokale Jobs" i menuen, vælg dit område eller klik "Brug min lokation" for at se jobs sorteret efter afstand fra dig.'
        },
        {
          question: 'Hvordan kontakter jeg en rengøringsekspert?',
          answer: 'Med Pro abonnement kan du sende direkte beskeder til alle brugere. Klik på "Besked" knappen på deres profil eller opslag. Kun muligt hvis eksperten har tilladt direkte beskeder i sine indstillinger.'
        },
        {
          question: 'Er mine personlige oplysninger sikre?',
          answer: 'Ja, vi bruger SSL kryptering og følger GDPR regler. Du kan altid se og ændre dine privacy indstillinger under "Indstillinger" → "Privatliv".'
        }
      ]
    },
    {
      id: 'getting-started',
      title: 'Kom i gang - Brugsguide',
      icon: Book,
      color: 'green',
      items: [
        {
          question: 'Trin 1: Opret din profil',
          answer: 'Start med at oprette en profil. Vælg din brugertype (privat kunde, rengøringsekspert, virksomhed) og udfyld dine oplysninger.'
        },
        {
          question: 'Trin 2: Udfyld din profil',
          answer: 'Tilføj profilbillede, beskrivelse og dine specialer. Jo mere information, jo bedre matches får du.'
        },
        {
          question: 'Trin 3: Find eller opret jobs',
          answer: 'Brug "Lokale Jobs" til at finde arbejde, eller opret dit eget job opslag hvis du søger hjælp.'
        },
        {
          question: 'Trin 4: Byg dit netværk',
          answer: 'Forbind med andre brugere under "Netværk" for at bygge professionelle relationer.'
        },
        {
          question: 'Trin 5: Opgrader til Pro',
          answer: 'For fuld adgang til alle funktioner, opgrader til Pro for kun 29 kr/måned.'
        }
      ]
    },
    {
      id: 'account',
      title: 'Min konto',
      icon: Users,
      color: 'purple',
      items: [
        {
          question: 'Hvordan ændrer jeg mine oplysninger?',
          answer: 'Gå til "Indstillinger" → "Profil" for at ændre navn, email, telefon og andre personlige oplysninger.'
        },
        {
          question: 'Hvordan uploader jeg profilbillede?',
          answer: 'Under "Indstillinger" → "Profil" kan du klikke på dit profilbillede for at uploade et nyt.'
        },
        {
          question: 'Hvordan ændrer jeg adgangskode?',
          answer: 'Gå til "Indstillinger" → "Sikkerhed" og klik "Skift adgangskode". Du skal indtaste din nuværende adgangskode.'
        },
        {
          question: 'Hvordan sletter jeg min konto?',
          answer: 'Under "Indstillinger" → "Konto" finder du både midlertidig og permanent sletning. Permanent sletning fjerner alle data og kan ikke fortrydes!'
        },
        {
          question: 'Hvad er forskellen på midlertidig og permanent deaktivering?',
          answer: 'Midlertidig deaktivering skjuler din profil, men gemmer alle data - du kan aktivere igen ved at logge ind. Permanent sletning fjerner alt og kan ikke fortrydes.'
        }
      ]
    },
    {
      id: 'subscription',
      title: 'Pro abonnement',
      icon: Video,
      color: 'orange',
      items: [
        {
          question: 'Hvad får jeg med Pro?',
          answer: 'Pro giver ubegrænset likes, kommentarer, direkte beskeder, prioriteret visning af opslag og verificeret profil badge.'
        },
        {
          question: 'Hvordan opgraderer jeg til Pro?',
          answer: 'Klik på "Opgrader til Pro" knappen i toppen eller gå til "Indstillinger" → "Abonnement".'
        },
        {
          question: 'Hvordan opsiger jeg mit abonnement?',
          answer: 'Gå til "Indstillinger" → "Abonnement" og klik "Opsig abonnement". Dit abonnement fortsætter til næste faktureringsperiode.'
        },
        {
          question: 'Kan jeg få refund?',
          answer: 'Vi tilbyder ikke refund for allerede betalte perioder, men du kan opsige når som helst.'
        }
      ]
    },
    {
      id: 'safety',
      title: 'Sikkerhed & Rapportering',
      icon: Shield,
      color: 'red',
      items: [
        {
          question: 'Hvordan rapporterer jeg upassende indhold?',
          answer: 'Klik på "..." menuen på et opslag eller kommentar og vælg "Rapportér". Beskriv problemet og send til admin.'
        },
        {
          question: 'Hvad sker der når jeg rapporterer?',
          answer: 'Admin teamet gennemgår alle rapporter inden for 24 timer og tager passende handling.'
        },
        {
          question: 'Hvordan blokerer jeg en bruger?',
          answer: 'Gå til brugerens profil og klik "Blokér bruger". De kan ikke længere kontakte dig eller se dine opslag.'
        },
        {
          question: 'Er mine betalingsoplysninger sikre?',
          answer: 'Ja, vi bruger Stripe som er PCI DSS certificeret. Vi gemmer aldrig dine kortoplysninger.'
        }
      ]
    },
    {
      id: 'technical',
      title: 'Teknisk hjælp',
      icon: Phone,
      color: 'gray',
      items: [
        {
          question: 'Appen virker ikke korrekt',
          answer: 'Prøv at opdatere siden (Ctrl+F5), ryd browser cache eller prøv en anden browser. Kontakt support hvis problemet fortsætter.'
        },
        {
          question: 'Jeg kan ikke logge ind',
          answer: 'Tjek at email og adgangskode er korrekte. Prøv "Glemt adgangskode" hvis nødvendigt.'
        },
        {
          question: 'Notifikationer virker ikke',
          answer: 'Tjek at du har givet tilladelse til notifikationer i din browser. Gå til "Indstillinger" → "Notifikationer".'
        },
        {
          question: 'Problemer med betaling',
          answer: 'Kontakt vores support på support@privatrengoring.dk med detaljer om problemet. Vi svarer inden for 24-48 timer.'
        }
      ]
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-700 border-blue-200',
      green: 'bg-green-50 text-green-700 border-green-200',
      purple: 'bg-purple-50 text-purple-700 border-purple-200',
      orange: 'bg-orange-50 text-orange-700 border-orange-200',
      red: 'bg-red-50 text-red-700 border-red-200',
      gray: 'bg-gray-50 text-gray-700 border-gray-200'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const filteredCategories = helpCategories.filter(category =>
    category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.items.some(item => 
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleDeleteAccount = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDeleteAccount = () => {
    // I en rigtig app ville dette slette kontoen
    alert('Din konto ville blive slettet. Dette er en demo.');
    setShowDeleteConfirm(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="relative p-6 border-b border-gray-200">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <HelpCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Hjælp & Support</h2>
            <p className="text-gray-600">Få hjælp til at bruge Privat Rengøring platformen</p>
          </div>

          {/* Search */}
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Søg efter hjælp..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex">
          {/* Sidebar */}
          <div className="w-80 border-r border-gray-200 p-4 overflow-y-auto max-h-[60vh]">
            <div className="space-y-2">
              {filteredCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
                  className={`w-full p-4 rounded-lg border-2 text-left hover:shadow-md transition-all duration-200 ${getColorClasses(category.color)}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <category.icon className="w-6 h-6" />
                      <div>
                        <h3 className="font-semibold">{category.title}</h3>
                        <p className="text-sm opacity-75">{category.items.length} emner</p>
                      </div>
                    </div>
                    <ChevronRight className={`w-5 h-5 transition-transform ${activeCategory === category.id ? 'rotate-90' : ''}`} />
                  </div>
                </button>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3">Hurtige Handlinger</h4>
              <div className="space-y-2">
                <button
                  onClick={handleDeleteAccount}
                  className="w-full flex items-center space-x-3 p-3 text-left hover:bg-red-50 rounded-lg transition-colors duration-200 text-red-600"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Deaktiver min konto</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200 text-gray-700">
                  <FileText className="w-5 h-5" />
                  <span className="font-medium">Download mine data</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6 overflow-y-auto max-h-[60vh]">
            {activeCategory ? (
              <div>
                {(() => {
                  const category = helpCategories.find(cat => cat.id === activeCategory);
                  return category ? (
                    <div>
                      <div className="flex items-center space-x-3 mb-6">
                        <category.icon className="w-8 h-8 text-blue-600" />
                        <h3 className="text-2xl font-semibold text-gray-900">{category.title}</h3>
                      </div>
                      <div className="space-y-4">
                        {category.items.map((item, index) => (
                          <div key={index} className="bg-gray-50 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-900 mb-2">{item.question}</h4>
                            <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null;
                })()}
              </div>
            ) : (
              <div className="text-center py-12">
                <Book className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Vælg en kategori</h3>
                <p className="text-gray-600">Klik på en kategori til venstre for at se hjælp emner</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="text-center space-y-3">
            <p className="text-sm text-gray-600">Kan du ikke finde svar på dit spørgsmål?</p>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              <button 
                onClick={() => window.location.href = 'mailto:support@privatrengoring.dk?subject=Hjælp med Privat Rengøring'}
                className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <Mail className="w-4 h-4" />
                <span>Få hjælp - kontakt os på mail</span>
              </button>
            </div>
            <div className="text-xs text-gray-500 space-y-1">
              <p>📧 Email: support@privatrengoring.dk</p>
              <p>🕒 Åbningstider: Man-Fre 9:00-17:00 • Vi svarer inden for 24-48 timer</p>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Account Confirmation */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-60 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Deaktiver Konto</h3>
              
              {/* Midlertidig Deaktivering */}
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4 text-left">
                <h4 className="font-semibold text-orange-900 mb-2">Midlertidig Deaktivering</h4>
                <p className="text-orange-800 text-sm mb-3">
                  Din konto vil blive skjult fra andre brugere, men alle dine data gemmes sikkert. 
                  Du kan nemt genaktivere din konto ved blot at logge ind igen.
                </p>
                <button
                  onClick={() => {
                    alert('Konto midlertidigt deaktiveret. Log ind igen for at genaktivere.');
                    setShowDeleteConfirm(false);
                  }}
                  className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors duration-200"
                >
                  Deaktiver Midlertidigt
                </button>
              </div>
              
              {/* Permanent Sletning */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-left">
                <h4 className="font-semibold text-red-900 mb-2">Permanent Sletning</h4>
                <p className="text-red-800 text-sm mb-3">
                  Din konto og alle data slettes permanent og kan ikke gendannes. 
                  Dette inkluderer alle dine opslag, beskeder og forbindelser.
                </p>
                <p className="text-red-700 text-xs mb-3 font-medium">
                  ⚠️ Dette kan IKKE fortrydes!
                </p>
                <button
                  onClick={() => {
                    if (confirm('Er du helt sikker? Alle dine data slettes permanent og kan ikke gendannes.')) {
                      confirmDeleteAccount();
                    }
                  }}
                  className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                >
                  Slet Permanent
                </button>
              </div>
              
              {/* Support Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-blue-900 mb-2">Har du brug for hjælp?</h4>
                <p className="text-blue-800 text-sm mb-3">
                  Før du deaktiverer, kan vi måske hjælpe med dit problem.
                </p>
                <button
                  onClick={() => window.location.href = 'mailto:support@privatrengoring.dk?subject=Hjælp før konto deaktivering'}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Kontakt Support Først
                </button>
              </div>
              
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Annuller - Behold Konto
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}