import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Building, Users, CheckCircle, X } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { mockUsers } from '../data/mockData';
import type { User as UserType } from '../types';

interface AuthScreenProps {
  onLogin: (user: UserType) => void;
}

export default function AuthScreen({ onLogin }: AuthScreenProps) {
  const { t } = useLanguage();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [userType, setUserType] = useState<'private' | 'professional' | 'small_business' | 'large_business'>('private');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Real authentication API call
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
      let data;
      try {
        const responseText = await response.text();
        if (responseText) {
          data = JSON.parse(responseText);
        } else {
          throw new Error('Empty response from server');
        }
      } catch (parseError) {
        console.error('JSON parsing error:', parseError);
        setError('Server fejl - kunne ikke forbinde til database. Kontakt support.');
        setLoading(false);
        return;
      }
          userType: isLogin ? undefined : userType,
          acceptedTerms: isLogin ? undefined : acceptedTerms
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login fejlede');
      }

      const userData = await response.json();
      
      // Store authentication token
      localStorage.setItem('authToken', userData.token);
      
      // Login user
      onLogin(userData.user);
      
    } catch (error) {
      console.error('Authentication error:', error);
      alert(error instanceof Error ? error.message : 'Der opstod en fejl. Prøv igen.');
    }
    
    setLoading(false);
  };

  const userTypes = [
    { id: 'private', label: 'Privat person', icon: User, description: 'Jeg har brug for rengøring' },
    { id: 'professional', label: 'Professionel', icon: CheckCircle, description: 'Jeg tilbyder rengøringsservice' },
    { id: 'small_business', label: 'Lille virksomhed', icon: Building, description: '1-10 medarbejdere' },
    { id: 'large_business', label: 'Stor virksomhed', icon: Users, description: '10+ medarbejdere' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-center">
            <h1 className="text-2xl font-bold text-white mb-2">Privat Rengøring</h1>
            <p className="text-blue-100">Danmarks største platform for rengøring</p>
          </div>

          {/* Form */}
          <div className="p-6">
            <div className="flex mb-6">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                  isLogin ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Log ind
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                  !isLogin ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Opret konto
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fulde navn</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Dit fulde navn"
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="din@email.dk"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Adgangskode</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Din adgangskode"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Jeg er...</label>
                  <div className="space-y-2">
                    {userTypes.map((type) => {
                      const IconComponent = type.icon;
                      return (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setUserType(type.id as any)}
                          className={`w-full p-3 rounded-lg border-2 transition-colors text-left ${
                            userType === type.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <IconComponent className={`w-5 h-5 ${
                              userType === type.id ? 'text-blue-600' : 'text-gray-400'
                            }`} />
                            <div>
                              <div className={`font-medium ${
                                userType === type.id ? 'text-blue-900' : 'text-gray-900'
                              }`}>
                                {type.label}
                              </div>
                              <div className={`text-sm ${
                                userType === type.id ? 'text-blue-700' : 'text-gray-500'
                              }`}>
                                {type.description}
                              </div>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {!isLogin && (
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    required
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    Jeg accepterer{' '}
                    <button
                      type="button"
                      onClick={() => setShowTerms(true)}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      vilkår og betingelser
                    </button>{' '}
                    og{' '}
                    <button
                      type="button"
                      onClick={() => setShowPrivacy(true)}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      privatlivspolitik
                    </button>
                  </label>
                  </div>
                  
                  {!acceptedTerms && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <p className="text-yellow-800 text-sm">
                        ⚠️ Du skal acceptere vilkår og betingelser for at oprette en konto
                      </p>
                    </div>
                  )}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || (!isLogin && !acceptedTerms)}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Vent venligst...' : isLogin ? 'Log ind' : 'Opret konto'}
              </button>
            </form>

          </div>
        </div>
      </div>

      {/* Terms Modal */}
      {showTerms && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Vilkår & Betingelser</h2>
                <button
                  onClick={() => setShowTerms(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <div className="space-y-4 text-sm">
                <section>
                  <h3 className="text-base font-semibold text-gray-900 mb-3">1. Brug af platformen</h3>
                  <div className="space-y-2 text-gray-700 text-sm">
                    <p>• Du må ikke misbruge platformen, sende spam eller dele falske oplysninger</p>
                    <p>• Alle brugere skal tale pænt og respektfuldt til hinanden</p>
                    <p>• Chikane, mobning eller krænkende adfærd tolereres ikke</p>
                    <p>• Giv altid korrekte og ærlige oplysninger i dine opslag</p>
                    <p>• Professionel adfærd forventes i alle arbejdsrelaterede samtaler</p>
                    <p>• Undgå gentagne eller irrelevante opslag (spam)</p>
                  </div>
                </section>
                
                <section>
                  <h3 className="text-base font-semibold text-gray-900 mb-3">2. Pro abonnement og betaling</h3>
                  <div className="space-y-2 text-gray-700 text-sm">
                    <p>• Pro koster 29 kr/måned og kan opsiges når som helst</p>
                    <p>• Automatisk fornyelse via Stripe</p>
                    <p>• Opsigelse via email til support@privatrengoring.dk</p>
                    <p>• Ingen refund for allerede betalte perioder</p>
                    <p>• Sikker betaling håndteres af Stripe (PCI DSS certificeret)</p>
                    <p>• Faktura sendes på email efter betaling</p>
                  </div>
                </section>
                
                <section>
                  <h3 className="text-base font-semibold text-gray-900 mb-3">3. Ansvar og garanti</h3>
                  <div className="space-y-2 text-gray-700 text-sm">
                    <p>• Vi er kun en platform der forbinder brugere</p>
                    <p>• Brugere er selv ansvarlige for deres aftaler</p>
                    <p>• Vi garanterer ikke kvaliteten af udførte services</p>
                    <p>• Sørg selv for passende forsikring ved arbejde</p>
                    <p>• Tvister løses mellem de involverede parter</p>
                    <p>• Dokumenter altid aftaler skriftligt</p>
                  </div>
                </section>
                
                <section>
                  <h3 className="text-base font-semibold text-gray-900 mb-3">4. Persondata (GDPR)</h3>
                  <div className="space-y-2 text-gray-700 text-sm">
                    <p>• Vi indsamler kun oplysninger du selv oplyser</p>
                    <p>• Dine data deles ikke med tredjeparter uden samtykke</p>
                    <p>• Du kan altid ændre eller slette dine oplysninger</p>
                    <p>• Kontakt support@privatrengoring.dk for dataindsigt</p>
                  </div>
                </section>
                
                <section>
                  <h3 className="text-base font-semibold text-gray-900 mb-3">5. Kontakt og support</h3>
                  <div className="space-y-2 text-gray-700 text-sm">
                    <p>• Email: support@privatrengoring.dk</p>
                    <p>• Svartid: 24-48 timer på hverdage</p>
                    <p>• Rapporter problemer via app eller email</p>
                  </div>
                </section>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex-shrink-0">
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowTerms(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Luk
                </button>
                <button
                  onClick={() => {
                    setAcceptedTerms(true);
                    setShowTerms(false);
                  }}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Accepter & Luk
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Policy Modal */}
      {showPrivacy && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Privatlivspolitik</h2>
                <button
                  onClick={() => setShowPrivacy(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <div className="space-y-4 text-sm">
                <section>
                  <h3 className="text-base font-semibold text-gray-900 mb-3">1. Hvilke data indsamler vi?</h3>
                  <div className="space-y-2 text-gray-700 text-sm">
                    <p>• Navn, email og telefonnummer (som du selv oplyser)</p>
                    <p>• Profilbillede og beskrivelse (valgfrit)</p>
                    <p>• Lokation (kun by/område, ikke præcis adresse)</p>
                    <p>• Dine opslag og kommentarer på platformen</p>
                    <p>• Brugsstatistikker (anonymiseret)</p>
                    <p>• IP-adresse og browser information (teknisk nødvendigt)</p>
                  </div>
                </section>
                
                <section>
                  <h3 className="text-base font-semibold text-gray-900 mb-3">2. Hvordan bruger vi dine data?</h3>
                  <div className="space-y-2 text-gray-700 text-sm">
                    <p>• At vise din profil til andre brugere</p>
                    <p>• At matche dig med relevante jobs i dit område</p>
                    <p>• At sende dig notifikationer (hvis du tillader det)</p>
                    <p>• At forbedre platformen og brugeroplevelsen</p>
                    <p>• At forhindre misbrug og spam</p>
                    <p>• At levere kundeservice og support</p>
                  </div>
                </section>
                
                <section>
                  <h3 className="text-base font-semibold text-gray-900 mb-3">3. Dine rettigheder (GDPR)</h3>
                  <div className="space-y-2 text-gray-700 text-sm">
                    <p>• Du kan altid ændre eller slette dine oplysninger</p>
                    <p>• Du kan anmode om indsigt i alle data vi har om dig</p>
                    <p>• Du kan slette din konto og alle data når som helst</p>
                    <p>• Vi deler aldrig dine data med tredjeparter uden samtykke</p>
                    <p>• Du kan trække samtykke tilbage når som helst</p>
                    <p>• Du kan klage til Datatilsynet hvis du er utilfreds</p>
                  </div>
                </section>
                
                <section>
                  <h3 className="text-base font-semibold text-gray-900 mb-3">4. Cookies og tracking</h3>
                  <div className="space-y-2 text-gray-700 text-sm">
                    <p>• Vi bruger kun nødvendige cookies til login og indstillinger</p>
                    <p>• Ingen tracking eller reklame cookies</p>
                    <p>• Du kan slå cookies fra i din browser</p>
                    <p>• Session cookies slettes når du lukker browseren</p>
                    <p>• Præference cookies husker dine indstillinger</p>
                  </div>
                </section>
                
                <section>
                  <h3 className="text-base font-semibold text-gray-900 mb-3">5. Datasikkerhed</h3>
                  <div className="space-y-2 text-gray-700 text-sm">
                    <p>• SSL kryptering af alle data</p>
                    <p>• Sikre servere i EU (GDPR compliance)</p>
                    <p>• Regelmæssige sikkerhedsopdateringer</p>
                    <p>• Begrænset adgang til persondata</p>
                  </div>
                </section>
                
                <section>
                  <h3 className="text-base font-semibold text-gray-900 mb-3">6. Kontakt vedrørende persondata</h3>
                  <div className="space-y-2 text-gray-700 text-sm">
                    <p>• Email: privacy@privatrengoring.dk</p>
                    <p>• Eller: support@privatrengoring.dk</p>
                    <p>• Vi svarer inden for 30 dage (GDPR krav)</p>
                  </div>
                </section>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex-shrink-0">
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowPrivacy(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Luk
                </button>
                <button
                  onClick={() => {
                    setAcceptedTerms(true);
                    setShowPrivacy(false);
                  }}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Accepter & Luk
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}