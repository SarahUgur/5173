import React from 'react';
import { Shield, Users, CreditCard, AlertTriangle, FileText, Lock, Globe, Mail } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto p-3 sm:p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileText className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Vilkår & Betingelser</h1>
        <p className="text-gray-600">Sidst opdateret: Januar 2025</p>
      </div>

      {/* Quick Navigation */}
      <div className="bg-blue-50 rounded-xl p-4 mb-8">
        <h3 className="font-semibold text-blue-900 mb-3">Hurtig navigation:</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
          <a href="#brug" className="text-blue-700 hover:text-blue-800 underline">Brug af platformen</a>
          <a href="#persondata" className="text-blue-700 hover:text-blue-800 underline">Persondata (GDPR)</a>
          <a href="#betaling" className="text-blue-700 hover:text-blue-800 underline">Betaling</a>
          <a href="#ansvar" className="text-blue-700 hover:text-blue-800 underline">Ansvar</a>
        </div>
      </div>

      <div className="space-y-8">
        {/* Brug af platformen */}
        <section id="brug">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Brug af platformen</h2>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <p className="text-gray-700 mb-4">
              Ved at oprette en konto hos Privat Rengøring accepterer du vores vilkår og forpligter dig til at opføre dig respektfuldt over for andre brugere.
            </p>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">Du må ikke misbruge platformen, sende spam eller dele falske oplysninger</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">Alle brugere skal tale pænt og respektfuldt til hinanden</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">Chikane, mobning eller krænkende adfærd tolereres ikke</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">Giv altid korrekte og ærlige oplysninger i dine opslag</p>
              </div>
            </div>
          </div>
        </section>

        {/* Persondata (GDPR) */}
        <section id="persondata">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Lock className="w-5 h-5 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Persondata (GDPR)</h2>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <p className="text-gray-700 mb-4">
              Vi indsamler kun de oplysninger, som du selv vælger at oplyse – fx navn, e-mail, lokation og profilbillede.
            </p>
            <p className="text-gray-700 mb-4">
              Dine oplysninger opbevares sikkert og deles ikke med tredjeparter uden samtykke.
            </p>
            
            <div className="bg-green-50 rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-green-900 mb-2">Dine rettigheder:</h4>
              <div className="space-y-2 text-sm text-green-800">
                <div className="flex items-center space-x-2">
                  <span>✅</span>
                  <span>Ændre dine oplysninger når som helst</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>✅</span>
                  <span>Slette din konto og alle data</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>✅</span>
                  <span>Anmode om indsigt i, hvad vi har gemt om dig</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>✅</span>
                  <span>Trække samtykke tilbage</span>
                </div>
              </div>
            </div>

            <p className="text-gray-700 text-sm">
              Vi bruger cookies og tekniske værktøjer til at forbedre brugeroplevelsen. 
              Du kan læse mere i vores <a href="#" className="text-blue-600 hover:text-blue-700 underline">privatlivspolitik</a>.
            </p>
          </div>
        </section>

        {/* Betaling og abonnement */}
        <section id="betaling">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Gratis platform</h2>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Gratis at bruge</h4>
                <div className="space-y-2 text-gray-700">
                  <p>• Privat Rengøring er helt gratis at bruge</p>
                  <p>• Alle funktioner er tilgængelige uden betaling</p>
                  <p>• Ingen skjulte gebyrer eller abonnementer</p>
                  <p>• Du betaler kun for de rengøringsservices du aftaler med andre brugere</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Hvordan tjener vi penge</h4>
                <div className="space-y-2 text-gray-700">
                  <p>• Platformen tjener penge via reklamer og partnerskaber</p>
                  <p>• Vi tager ikke kommission af dine aftaler</p>
                  <p>• Ingen skjulte gebyrer</p>
                  <p>• Transparent forretningsmodel</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ansvarsfraskrivelse */}
        <section id="ansvar">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Ansvarsfraskrivelse</h2>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
              <p className="text-orange-800 font-medium">
                Privat Rengøring er en platform og påtager sig ikke ansvar for aftaler, betaling eller udførelse af rengøringsopgaver mellem brugere.
              </p>
            </div>
            <p className="text-gray-700 mb-4">
              Vi anbefaler kraftigt, at alle aftaler dokumenteres skriftligt, og at begge parter er enige om:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-blue-600">📋</span>
                  <span className="text-gray-700">Opgavens omfang</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-600">💰</span>
                  <span className="text-gray-700">Pris og betalingsbetingelser</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-600">📅</span>
                  <span className="text-gray-700">Tidspunkt og varighed</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-blue-600">🏠</span>
                  <span className="text-gray-700">Adgang til lokation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-600">🧽</span>
                  <span className="text-gray-700">Materialer og udstyr</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-600">📞</span>
                  <span className="text-gray-700">Kontaktinformation</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Kontakt */}
        <section>
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white text-center">
            <Mail className="w-8 h-8 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Har du spørgsmål til vores vilkår?</h3>
            <p className="text-blue-100 mb-4">Vi er her for at hjælpe dig</p>
            <a
              href="mailto:support@privaterengoring.dk?subject=Spørgsmål til vilkår og betingelser"
              className="inline-flex items-center space-x-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors duration-200"
            >
              <Mail className="w-4 h-4" />
              <span>Kontakt os</span>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}