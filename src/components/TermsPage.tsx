import React from 'react';
import { Shield, FileText, Users, Globe, Lock, Mail } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto p-3 sm:p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Vilkår & Betingelser</h1>
        <p className="text-xl text-gray-600">Sidst opdateret: 20. januar 2024</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
        <div className="prose max-w-none">
          {/* Introduction */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <FileText className="w-8 h-8 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Introduktion</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Velkommen til Private Rengøring. Ved at bruge vores platform accepterer du følgende vilkår og betingelser. 
              Læs dem omhyggeligt igennem før du bruger vores tjenester.
            </p>
          </div>

          {/* Platform Usage */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Users className="w-8 h-8 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-900">1. Brug af Platformen</h2>
            </div>
            <div className="space-y-4 text-gray-700">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Tilladt brug:</h3>
                <ul className="space-y-2">
                  <li>• Opret ærlige og nøjagtige profiler</li>
                  <li>• Post legitime rengøringsjobs og tilbud</li>
                  <li>• Kommuniker respektfuldt med andre brugere</li>
                  <li>• Følg alle gældende love og regler</li>
                  <li>• Rapporter problemer til vores support team</li>
                </ul>
              </div>
              
              <div className="bg-red-50 rounded-lg p-4">
                <h3 className="font-semibold text-red-900 mb-2">Forbudt brug:</h3>
                <ul className="space-y-2 text-red-800">
                  <li>• Spam, falske oplysninger eller svindel</li>
                  <li>• Chikane, trusler eller upassende adfærd</li>
                  <li>• Brug af platformen til ulovlige aktiviteter</li>
                  <li>• Automatiserede bots eller scraping</li>
                  <li>• Omgåelse af platformens sikkerhedsforanstaltninger</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Free Platform */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Heart className="w-8 h-8 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-900">2. Gratis Platform</h2>
            </div>
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="font-semibold text-green-900 mb-3">100% Gratis at Bruge</h3>
              <ul className="space-y-2 text-green-800">
                <li>• Alle funktioner er tilgængelige uden betaling</li>
                <li>• Ingen skjulte gebyrer eller abonnementer</li>
                <li>• Ingen kommission på dine aftaler</li>
                <li>• Du betaler kun for de rengøringsservices du aftaler</li>
                <li>• Platformen finansieres via reklamer og partnerskaber</li>
              </ul>
            </div>
          </div>

          {/* Responsibility */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="w-8 h-8 text-orange-600" />
              <h2 className="text-2xl font-bold text-gray-900">3. Ansvar og Garanti</h2>
            </div>
            <div className="space-y-4 text-gray-700">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-900 mb-2">⚠️ Vigtigt at vide:</h3>
                <ul className="space-y-2 text-yellow-800">
                  <li>• Vi er kun en platform der forbinder brugere</li>
                  <li>• Brugere er selv ansvarlige for deres aftaler</li>
                  <li>• Vi garanterer ikke kvaliteten af udførte services</li>
                  <li>• Sørg selv for passende forsikring ved arbejde</li>
                  <li>• Dokumenter altid aftaler skriftligt</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Privacy */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Lock className="w-8 h-8 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">4. Persondata (GDPR)</h2>
            </div>
            <div className="space-y-4 text-gray-700">
              <h3 className="font-semibold text-gray-900">Dine rettigheder:</h3>
              <ul className="space-y-2">
                <li>• Du kan altid ændre eller slette dine oplysninger</li>
                <li>• Du kan anmode om indsigt i alle data vi har om dig</li>
                <li>• Du kan slette din konto og alle data når som helst</li>
                <li>• Vi deler aldrig dine data med tredjeparter uden samtykke</li>
                <li>• Du kan trække samtykke tilbage når som helst</li>
              </ul>
              
              <div className="bg-blue-50 rounded-lg p-4 mt-4">
                <p className="text-blue-800">
                  <strong>Kontakt for dataindsigt:</strong> privacy@privaterengoring.dk
                </p>
              </div>
            </div>
          </div>

          {/* Changes */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Globe className="w-8 h-8 text-gray-600" />
              <h2 className="text-2xl font-bold text-gray-900">5. Ændringer af Vilkår</h2>
            </div>
            <div className="text-gray-700">
              <p className="mb-4">
                Vi forbeholder os retten til at opdatere disse vilkår når som helst. 
                Væsentlige ændringer vil blive kommunikeret via:
              </p>
              <ul className="space-y-2">
                <li>• Email til alle registrerede brugere</li>
                <li>• Notifikation i appen</li>
                <li>• Opdatering på denne side</li>
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Mail className="w-8 h-8 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-900">6. Kontakt</h2>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Har du spørgsmål til vilkårene?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">Generel support</p>
                    <p className="text-gray-600">support@privaterengoring.dk</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium text-gray-900">Juridiske spørgsmål</p>
                    <p className="text-gray-600">legal@privaterengoring.dk</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Acceptance */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-blue-900 mb-3">✅ Ved at bruge Private Rengøring accepterer du:</h3>
            <ul className="space-y-2 text-blue-800">
              <li>• Alle ovenstående vilkår og betingelser</li>
              <li>• Vores privatlivspolitik</li>
              <li>• At følge platformens retningslinjer</li>
              <li>• At behandle andre brugere med respekt</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}