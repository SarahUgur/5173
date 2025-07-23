import React from 'react';
import { X, Check, Star, MessageCircle, Heart, Users, Shield, Zap, CreditCard } from 'lucide-react';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribe: () => void;
  userEmail: string;
}

export default function SubscriptionModal({ isOpen, onClose, onSubscribe, userEmail }: SubscriptionModalProps) {
  if (!isOpen) return null;

  const features = [
    {
      icon: Heart,
      title: 'Ubegrænset Likes',
      description: 'Like og gem alle de opslag du finder interessante'
    },
    {
      icon: MessageCircle,
      title: 'Direkte Beskeder',
      description: 'Kontakt kunder og rengøringseksperter direkte'
    },
    {
      icon: Users,
      title: 'Netværk & Kontakter',
      description: 'Byg dit professionelle netværk inden for rengøring'
    },
    {
      // Create checkout session with user data
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({
          userEmail,
          successUrl: `${window.location.origin}/success`,
          cancelUrl: `${window.location.origin}/cancel`,
        })
      });
      
      if (!response.ok) {
        throw new Error('Kunne ikke oprette betalingssession');
      }
      
      const session = await response.json();
      icon: Star,
      title: 'Prioriteret Visning',
      description: 'Dine opslag vises højere i søgeresultaterne'
    },
    {
      icon: Shield,
      title: 'Verificeret Profil',
      description: 'Få det blå flueben og øg tilliden til din profil'
    },
    {
      icon: Zap,
      title: 'Avancerede Funktioner',
      description: 'Få adgang til alle premium funktioner først'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[95vh] overflow-y-auto shadow-strong animate-slideUp">
        {/* Header */}
        <div className="relative p-4 sm:p-6 border-b border-gray-200 bg-gradient-to-r from-white to-blue-50">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 hover:bg-gray-100 rounded-full transition-all duration-200 hover:scale-110"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
          </button>
          
          <div className="text-center pr-10">
            <div className="w-12 h-12 sm:w-16 sm:h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-strong animate-pulse">
              <Star className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold gradient-text mb-2">Opgrader til Pro</h2>
            <p className="text-sm sm:text-base text-gray-600">Få adgang til alle funktioner og byg dit rengøringsnetværk</p>
          </div>
        </div>

        {/* Pricing */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <span className="text-4xl sm:text-5xl font-bold gradient-text">29</span>
              <div className="text-left">
                <div className="text-base sm:text-lg font-semibold gradient-text">kr</div>
                <div className="text-xs sm:text-sm text-gray-600">per måned</div>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-gray-600">Månedligt abonnement • Opsig når som helst ved at skrive til support</p>
            <p className="text-xs text-blue-600 mt-1">📧 support@privatrengoring.dk</p>
          </div>
        </div>

        {/* Features */}
        <div className="p-4 sm:p-6">
          {/* Comparison Table */}
          <div className="mb-6 bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 text-center">
              <h3 className="font-bold text-lg">Gratis vs Pro Medlemskab</h3>
            </div>
            <div className="p-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 font-medium text-gray-900">Funktion</th>
                    <th className="text-center py-2 font-medium text-gray-600">Gratis</th>
                    <th className="text-center py-2 font-medium text-blue-600">Pro (29 kr/md)</th>
                  </tr>
                </thead>
                <tbody className="space-y-2">
                  <tr className="border-b border-gray-100">
                    <td className="py-2 text-gray-700">Se jobs og opslag</td>
                    <td className="text-center py-2"><span className="text-green-600 text-lg">✅</span></td>
                    <td className="text-center py-2"><span className="text-green-600 text-lg">✅</span></td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 text-gray-700">Ansøg om jobs</td>
                    <td className="text-center py-2"><span className="text-red-500 text-lg">❌</span></td>
                    <td className="text-center py-2"><span className="text-green-600 text-lg">✅</span></td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 text-gray-700">Send beskeder direkte</td>
                    <td className="text-center py-2"><span className="text-red-500 text-lg">❌</span></td>
                    <td className="text-center py-2"><span className="text-green-600 text-lg">✅</span></td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 text-gray-700">Like og gem opslag</td>
                    <td className="text-center py-2"><span className="text-red-500 text-lg">❌</span></td>
                    <td className="text-center py-2"><span className="text-green-600 text-lg">✅</span></td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 text-gray-700">Prioriteret visning</td>
                    <td className="text-center py-2"><span className="text-red-500 text-lg">❌</span></td>
                    <td className="text-center py-2"><span className="text-green-600 text-lg">✅</span></td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 text-gray-700">Verificeret profil badge</td>
                    <td className="text-center py-2"><span className="text-red-500 text-lg">❌</span></td>
                    <td className="text-center py-2"><span className="text-green-600 text-lg">✅</span></td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-700">Jobstatistikker</td>
                    <td className="text-center py-2"><span className="text-red-500 text-lg">❌</span></td>
                    <td className="text-center py-2"><span className="text-green-600 text-lg">✅</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-3">🌟 Hvorfor vælger folk Pro?</h3>
            <div className="text-sm text-blue-800 space-y-2">
              <p>• <strong>Få flere jobs</strong> - Kun Pro kan ansøge og kontakte kunder</p>
              <p>• <strong>Byg netværk</strong> - Forbind med andre rengøringseksperter</p>
              <p>• <strong>Øg tillid</strong> - Verificeret badge giver mere troværdighed</p>
              <p>• <strong>Spar tid</strong> - Prioriteret visning og avancerede filtre</p>
              <p>• <strong>Ingen reklamer</strong> - Fokuseret og professionel oplevelse</p>
            </div>
          </div>

          <h3 className="text-lg sm:text-xl font-semibold gradient-text mb-4">Hvad får du med Pro?</h3>
          <div className="grid grid-cols-1 gap-3 sm:gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 hover:scale-105 card">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">{feature.title}</h4>
                  <p className="text-xs sm:text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="p-4 sm:p-6 border-t border-gray-200">
          <button
            onClick={onSubscribe}
            className="w-full btn-primary text-white py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg shadow-strong flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none hover:scale-105"
          >
            <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Start Pro Abonnement via Stripe</span>
          </button>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 mt-4 text-xs sm:text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 animate-bounce" />
              <span>Sikker månedlig betaling via Stripe</span>
            </div>
            <div className="flex items-center space-x-1">
              <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 animate-bounce" />
              <span>Øjeblikkelig adgang</span>
            </div>
            <div className="flex items-center space-x-1">
              <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 animate-bounce" />
              <span>Opsig via support email</span>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-blue-800 text-center">
              💳 <strong>Månedligt abonnement:</strong> 29 kr trækkes automatisk hver måned via Stripe<br/>
              📧 <strong>Opsigelse:</strong> Skriv til support@privatrengoring.dk for at opsige
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}