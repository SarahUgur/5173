import React from 'react';
import { X, Shield, Users, CreditCard, HelpCircle, AlertTriangle } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
}

export default function TermsModal({ isOpen, onClose, onAccept }: TermsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
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
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Vilkår & Betingelser</h2>
            <p className="text-gray-600">Læs venligst vores regler og betingelser</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="space-y-6">
            {/* Generelle regler */}
            <section>
              <div className="flex items-center space-x-2 mb-3">
                <Users className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">1. Generelle Regler</h3>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 space-y-2 text-sm text-gray-700">
                <p>• <strong>Respektfuld kommunikation:</strong> Alle brugere skal tale pænt og respektfuldt til hinanden</p>
                <p>• <strong>Ingen chikane:</strong> Chikane, mobning eller krænkende adfærd tolereres ikke</p>
                <p>• <strong>Ærlige oplysninger:</strong> Giv altid korrekte og ærlige oplysninger i dine opslag</p>
                <p>• <strong>Professionel adfærd:</strong> Hold en professionel tone i alle arbejdsrelaterede samtaler</p>
                <p>• <strong>Ingen spam:</strong> Undgå gentagne eller irrelevante opslag</p>
              </div>
            </section>

            {/* Brugsregler */}
            <section>
              <div className="flex items-center space-x-2 mb-3">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                <h3 className="text-lg font-semibold text-gray-900">2. Brugsregler</h3>
              </div>
              <div className="bg-orange-50 rounded-lg p-4 space-y-2 text-sm text-gray-700">
                <p>• <strong>Kun rengøringsrelateret:</strong> Platformen er kun til rengøringsservices</p>
                <p>• <strong>Verificerede oplysninger:</strong> Sørg for at dine kontaktoplysninger er korrekte</p>
                <p>• <strong>Overholdelse af aftaler:</strong> Overhold indgåede aftaler og mødetider</p>
                <p>• <strong>Rapporter problemer:</strong> Rapporter upassende adfærd til administratorerne</p>
                <p>• <strong>Beskyt personlige data:</strong> Del ikke følsomme personlige oplysninger offentligt</p>
              </div>
            </section>

            {/* Abonnement og betaling */}
            <section>
              <div className="flex items-center space-x-2 mb-3">
                <CreditCard className="w-5 h-5 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-900">3. Abonnement & Betaling</h3>
              </div>
              <div className="bg-green-50 rounded-lg p-4 space-y-2 text-sm text-gray-700">
                <p>• <strong>Pro abonnement:</strong> 29 kr/måned for fuld adgang til alle funktioner</p>
                <p>• <strong>Automatisk fornyelse:</strong> Abonnementet fornyes automatisk hver måned</p>
                <p>• <strong>Opsigelsesret:</strong> Du kan altid opsige dit abonnement uden binding</p>
                <p>• <strong>Opsigelse:</strong> Opsig via din profil eller kontakt kundeservice</p>
                <p>• <strong>Refund politik:</strong> Ingen refund for allerede betalte perioder</p>
                <p>• <strong>Sikker betaling:</strong> Alle betalinger håndteres sikkert via Stripe</p>
              </div>
            </section>

            {/* Ansvar og garanti */}
            <section>
              <div className="flex items-center space-x-2 mb-3">
                <Shield className="w-5 h-5 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-900">4. Ansvar & Garanti</h3>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 space-y-2 text-sm text-gray-700">
                <p>• <strong>Platform ansvar:</strong> Vi er kun en platform der forbinder brugere</p>
                <p>• <strong>Bruger ansvar:</strong> Brugere er selv ansvarlige for deres aftaler</p>
                <p>• <strong>Kvalitetssikring:</strong> Vi garanterer ikke kvaliteten af udførte services</p>
                <p>• <strong>Forsikring:</strong> Sørg selv for passende forsikring ved arbejde</p>
                <p>• <strong>Tvister:</strong> Tvister løses mellem de involverede parter</p>
              </div>
            </section>

            {/* Kontakt og support */}
            <section>
              <div className="flex items-center space-x-2 mb-3">
                <HelpCircle className="w-5 h-5 text-indigo-600" />
                <h3 className="text-lg font-semibold text-gray-900">5. Support & Kontakt</h3>
              </div>
              <div className="bg-indigo-50 rounded-lg p-4 space-y-2 text-sm text-gray-700">
                <p>• <strong>Kundeservice:</strong> support@privatrengoring.dk</p>
                <p>• <strong>Teknisk hjælp:</strong> Brug hjælp-funktionen i appen</p>
                <p>• <strong>Rapporter problemer:</strong> Kontakt os ved problemer med andre brugere</p>
                <p>• <strong>Feedback:</strong> Vi værdsætter din feedback til forbedringer</p>
              </div>
            </section>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200"
            >
              Læs senere
            </button>
            <button
              onClick={onAccept}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
            >
              Accepter & Fortsæt
            </button>
          </div>
          <p className="text-xs text-gray-500 text-center mt-3">
            Ved at acceptere bekræfter du at du har læst og forstået vores vilkår & betingelser
          </p>
        </div>
      </div>
    </div>
  );
}