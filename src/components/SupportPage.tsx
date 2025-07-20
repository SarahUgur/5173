import React, { useState } from 'react';
import { HelpCircle, Search, Book, MessageCircle, Phone, Mail, Video, FileText, Users, Settings, Zap, Shield } from 'lucide-react';

export default function SupportPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const supportCategories = [
    {
      id: 'getting-started',
      title: 'Kom i gang',
      icon: Book,
      color: 'blue',
      articles: [
        {
          title: 'Hvordan opretter jeg en profil?',
          content: 'Klik på "Opret Konto", udfyld alle felter, accepter vilkår og klik "Opret Konto". Du får øjeblikkelig adgang.',
          views: 1234
        },
        {
          title: 'Hvordan opretter jeg et jobopslag?',
          content: 'Gå til forsiden, klik "Opret Job", vælg kategori, udfyld beskrivelse, lokation og budget. Klik "Opret Job".',
          views: 987
        },
        {
          title: 'Hvordan finder jeg jobs i mit område?',
          content: 'Gå til "Lokale Jobs", vælg dit område eller klik "Brug min lokation" for jobs sorteret efter afstand.',
          views: 856
        }
      ]
    },
    {
      id: 'account',
      title: 'Min konto',
      icon: Users,
      color: 'green',
      articles: [
        {
          title: 'Hvordan ændrer jeg mine oplysninger?',
          content: 'Gå til "Indstillinger" → "Profil" for at ændre navn, email, telefon og andre personlige oplysninger.',
          views: 743
        },
        {
          title: 'Hvordan ændrer jeg mit abonnement?',
          content: 'Gå til "Indstillinger" → "Abonnement" for at opgradere til Pro eller opsige dit abonnement.',
          views: 621
        },
        {
          title: 'Hvordan sletter jeg min konto?',
          content: 'Under "Indstillinger" → "Konto" finder du både midlertidig og permanent sletning. Permanent sletning fjerner alle data!',
          views: 445
        }
      ]
    },
    {
      id: 'pro',
      title: 'Pro medlemskab',
      icon: Zap,
      color: 'purple',
      articles: [
        {
          title: 'Hvad får jeg med Pro?',
          content: 'Pro giver ubegrænset likes, kommentarer, direkte beskeder, prioriteret visning og verificeret profil badge.',
          views: 1567
        },
        {
          title: 'Hvordan opgraderer jeg til Pro?',
          content: 'Klik på "Opgrader til Pro" knappen i toppen eller gå til "Indstillinger" → "Abonnement".',
          views: 892
        },
        {
          title: 'Hvordan opsiger jeg mit abonnement?',
          content: 'Gå til "Indstillinger" → "Abonnement" og klik "Opsig abonnement". Dit abonnement fortsætter til næste periode.',
          views: 334
        }
      ]
    },
    {
      id: 'safety',
      title: 'Sikkerhed',
      icon: Shield,
      color: 'red',
      articles: [
        {
          title: 'Hvordan rapporterer jeg en bruger?',
          content: 'Gå til brugerens profil, klik "..." menuen og vælg "Rapportér bruger". Beskriv problemet og send til admin.',
          views: 567
        },
        {
          title: 'Hvordan blokerer jeg en bruger?',
          content: 'Gå til brugerens profil og klik "Blokér bruger". De kan ikke længere kontakte dig eller se dine opslag.',
          views: 423
        },
        {
          title: 'Hvordan får jeg flere anmeldelser?',
          content: 'Vær professionel, overhold aftaler, kommuniker klart og bed høfligt om feedback efter afsluttede jobs.',
          views: 789
        }
      ]
    },
    {
      id: 'technical',
      title: 'Teknisk hjælp',
      icon: Settings,
      color: 'orange',
      articles: [
        {
          title: 'Appen virker ikke korrekt',
          content: 'Prøv at opdatere siden (Ctrl+F5), ryd browser cache eller prøv en anden browser. Kontakt support hvis problemet fortsætter.',
          views: 234
        },
        {
          title: 'Jeg kan ikke logge ind',
          content: 'Tjek at email og adgangskode er korrekte. Prøv "Glemt adgangskode" hvis nødvendigt.',
          views: 345
        },
        {
          title: 'Problemer med betaling',
          content: 'Kontakt vores support på support@privatrengoring.dk med detaljer om problemet. Vi svarer inden for 24-48 timer.',
          views: 123
        }
      ]
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-700 border-blue-200',
      green: 'bg-green-50 text-green-700 border-green-200',
      purple: 'bg-purple-50 text-purple-700 border-purple-200',
      red: 'bg-red-50 text-red-700 border-red-200',
      orange: 'bg-orange-50 text-orange-700 border-orange-200'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const filteredCategories = supportCategories.filter(category =>
    category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.articles.some(article => 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="max-w-6xl mx-auto p-3 sm:p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <HelpCircle className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Hjælp & Support</h1>
        <p className="text-gray-600">Find svar på dine spørgsmål eller kontakt vores support team</p>
      </div>

      {/* Search */}
      <div className="relative max-w-2xl mx-auto mb-8">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Søg efter hjælp..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <a
          href="mailto:support@privatrengoring.dk"
          className="flex items-center space-x-3 p-4 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition-colors duration-200"
        >
          <Mail className="w-6 h-6 text-blue-600" />
          <div>
            <div className="font-medium text-blue-900">Send email</div>
            <div className="text-sm text-blue-700">support@privatrengoring.dk</div>
          </div>
        </a>

        <div className="flex items-center space-x-3 p-4 bg-green-50 border border-green-200 rounded-xl">
          <MessageCircle className="w-6 h-6 text-green-600" />
          <div>
            <div className="font-medium text-green-900">Live chat</div>
            <div className="text-sm text-green-700">Kommer snart</div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Category List */}
        <div className="lg:col-span-1">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Kategorier</h2>
          <div className="space-y-2">
            {filteredCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                className={`w-full p-4 rounded-xl border-2 text-left hover:shadow-md transition-all duration-200 ${getColorClasses(category.color)} ${
                  selectedCategory === category.id ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <category.icon className="w-6 h-6" />
                    <div>
                      <h3 className="font-semibold">{category.title}</h3>
                      <p className="text-sm opacity-75">{category.articles.length} artikler</p>
                    </div>
                  </div>
                  <div className="text-2xl">
                    {selectedCategory === category.id ? '−' : '+'}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Articles */}
        <div className="lg:col-span-2">
          {selectedCategory ? (
            <div>
              {(() => {
                const category = supportCategories.find(cat => cat.id === selectedCategory);
                return category ? (
                  <div>
                    <div className="flex items-center space-x-3 mb-6">
                      <category.icon className="w-8 h-8 text-blue-600" />
                      <h2 className="text-2xl font-bold text-gray-900">{category.title}</h2>
                    </div>
                    <div className="space-y-4">
                      {category.articles.map((article, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="text-lg font-semibold text-gray-900">{article.title}</h3>
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                              {article.views} visninger
                            </span>
                          </div>
                          <p className="text-gray-700 leading-relaxed">{article.content}</p>
                          <div className="mt-4 pt-4 border-t border-gray-100">
                            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                              Var dette hjælpsomt? 👍
                            </button>
                          </div>
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
              <p className="text-gray-600">Klik på en kategori til venstre for at se hjælp artikler</p>
            </div>
          )}
        </div>
      </div>

      {/* Popular Articles */}
      <div className="mt-12">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Mest populære artikler</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {supportCategories
            .flatMap(cat => cat.articles)
            .sort((a, b) => b.views - a.views)
            .slice(0, 6)
            .map((article, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200">
                <h4 className="font-medium text-gray-900 mb-2">{article.title}</h4>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{article.content}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{article.views} visninger</span>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Læs mere →
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Contact CTA */}
      <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
        <h3 className="text-2xl font-bold mb-4">Kan du ikke finde svar på dit spørgsmål?</h3>
        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
          Vores support team er klar til at hjælpe dig. Vi svarer på alle henvendelser inden for 24-48 timer.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="mailto:support@privatrengoring.dk?subject=Hjælp med Privat Rengøring"
            className="inline-flex items-center space-x-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors duration-200"
          >
            <Mail className="w-4 h-4" />
            <span>Send email</span>
          </a>
        </div>
      </div>
    </div>
  );
}