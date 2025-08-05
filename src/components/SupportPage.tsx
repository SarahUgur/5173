import React, { useState } from 'react';
import { HelpCircle, Search, Book, Video, MessageCircle, Phone, Mail, ExternalLink, ChevronDown, ChevronRight, Shield, DollarSign, Calendar } from 'lucide-react';

export default function SupportPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const faqCategories = [
    {
      id: 'getting-started',
      title: 'Kom i gang',
      icon: Book,
      questions: [
        {
          id: '1',
          question: 'Hvordan opretter jeg en profil?',
          answer: 'Klik på "Opret konto" på forsiden, udfyld dine oplysninger og vælg om du er kunde eller rengøringshjælper. Din profil er klar på få minutter!'
        },
        {
          id: '2',
          question: 'Hvordan finder jeg rengøringsjobs?',
          answer: 'Gå til "Lokale Jobs" i menuen, brug filtrene til at finde jobs i dit område, og klik "Ansøg Nu" på jobs der interesserer dig.'
        },
        {
          id: '3',
          question: 'Hvordan poster jeg et rengøringsjob?',
          answer: 'Klik på "Opret Opslag" på forsiden, vælg "Job opslag", udfyld detaljerne om din rengøringsopgave og publiser.'
        }
      ]
    },
    {
      id: 'safety',
      title: 'Sikkerhed',
      icon: Shield,
      questions: [
        {
          id: '4',
          question: 'Hvordan ved jeg at en rengøringshjælper er pålidelig?',
          answer: 'Tjek deres rating, læs anmeldelser fra andre kunder, se hvor mange jobs de har afsluttet, og kontakt dem direkte før I mødes.'
        },
        {
          id: '5',
          question: 'Hvad gør jeg hvis noget går galt?',
          answer: 'Kontakt os øjeblikkeligt på support@privaterengoring.dk eller brug rapporteringsfunktionen i appen. Vi tager alle klager seriøst.'
        },
        {
          id: '6',
          question: 'Er mine personlige oplysninger sikre?',
          answer: 'Ja, vi følger GDPR og bruger SSL-kryptering. Vi deler aldrig dine oplysninger med tredjeparter uden dit samtykke.'
        }
      ]
    },
    {
      id: 'payments',
      title: 'Betaling',
      icon: DollarSign,
      questions: [
        {
          id: '7',
          question: 'Hvordan betaler jeg for rengøring?',
          answer: 'Du aftaler betalingsmetode direkte med rengøringshjælperen. Vi tager ingen kommission - alt går direkte til hjælperen.'
        },
        {
          id: '8',
          question: 'Koster det noget at bruge platformen?',
          answer: 'Nej! Private Rengøring er 100% gratis at bruge. Ingen skjulte gebyrer, ingen abonnementer.'
        },
        {
          id: '9',
          question: 'Hvad hvis jeg ikke er tilfreds med rengøringen?',
          answer: 'Kontakt først rengøringshjælperen direkte. Hvis problemet ikke løses, kan du kontakte vores support team.'
        }
      ]
    }
  ];

  const toggleFaq = (questionId: string) => {
    setExpandedFaq(expandedFaq === questionId ? null : questionId);
  };

  const filteredFaqs = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="max-w-4xl mx-auto p-3 sm:p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Hjælp & Support</h1>
        <p className="text-xl text-gray-600">Find svar på dine spørgsmål</p>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Søg i hjælp artikler..."
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 rounded-xl p-6 text-center">
          <MessageCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Live Chat</h3>
          <p className="text-blue-700 mb-4">Få øjeblikkelig hjælp</p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
            Start Chat
          </button>
        </div>

        <div className="bg-green-50 rounded-xl p-6 text-center">
          <Mail className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-green-900 mb-2">Email Support</h3>
          <p className="text-green-700 mb-4">Svar inden for 24 timer</p>
          <a
            href="mailto:support@privaterengoring.dk"
            className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200"
          >
            Send Email
          </a>
        </div>

        <div className="bg-purple-50 rounded-xl p-6 text-center">
          <Video className="w-12 h-12 text-purple-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-purple-900 mb-2">Video Guides</h3>
          <p className="text-purple-700 mb-4">Lær med videoer</p>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200">
            Se Videoer
          </button>
        </div>
      </div>

      {/* FAQ */}
      <div className="space-y-6">
        {filteredFaqs.map((category) => (
          <div key={category.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <category.icon className="w-8 h-8 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">{category.title}</h2>
            </div>

            <div className="space-y-4">
              {category.questions.map((faq) => (
                <div key={faq.id} className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors duration-200"
                  >
                    <span className="font-medium text-gray-900">{faq.question}</span>
                    {expandedFaq === faq.id ? (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                  
                  {expandedFaq === faq.id && (
                    <div className="px-4 pb-4">
                      <p className="text-gray-700">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Still Need Help */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mt-8 text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Fandt du ikke svar på dit spørgsmål?</h3>
        <p className="text-gray-700 mb-6">Vores support team er klar til at hjælpe dig</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="mailto:support@privaterengoring.dk"
            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <Mail className="w-5 h-5" />
            <span>Kontakt Support</span>
          </a>
          <button className="inline-flex items-center space-x-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <MessageCircle className="w-5 h-5" />
            <span>Start Live Chat</span>
          </button>
        </div>
      </div>
    </div>
  );
}