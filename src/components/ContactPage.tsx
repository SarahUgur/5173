import React, { useState } from 'react';
import { Mail, Phone, MessageCircle, AlertTriangle, Clock, Send, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    priority: 'normal'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Send real contact form
    console.log('Kontakt form sendt:', formData);
    
    // Send to real API
    fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    }).then(response => {
      if (response.ok) {
        setIsSubmitted(true);
        // Reset form after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            name: '',
            email: '',
            subject: '',
            message: '',
            priority: 'normal'
          });
        }, 3000);
      } else {
        alert('Der opstod en fejl. Prøv igen eller kontakt support@privaterengoring.dk');
      }
    }).catch(error => {
      console.error('Contact form error:', error);
      alert('Der opstod en fejl. Prøv igen eller kontakt support@privaterengoring.dk');
    });
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <div className="bg-green-50 border border-green-200 rounded-2xl p-8">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-green-900 mb-4">Besked sendt!</h2>
          <p className="text-green-700 mb-6">
            Tak for din henvendelse. Vi svarer inden for 24-48 timer på hverdage.
          </p>
          <p className="text-sm text-green-600">
            Du vil automatisk blive omdirigeret om et øjeblik...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-3 sm:p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageCircle className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Kontakt & Klager</h1>
        <p className="text-gray-600">Vi ønsker, at alle skal føle sig trygge på Privat Rengøring</p>
      </div>

      {/* Problem Alert */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
        <div className="flex items-start space-x-4">
          <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-red-900 mb-3">Har du oplevet et problem?</h3>
            <p className="text-red-800 mb-4">
              Vi ønsker, at alle skal føle sig trygge på Privat Rengøring – både kunder og rengøringshjælpere.
            </p>
            <div className="space-y-2 text-red-700">
              <p><strong>Hvis du oplever:</strong></p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                <div>• Uprofessionel opførsel</div>
                <div>• Misbrug eller chikane</div>
                <div>• Betalingskonflikt</div>
                <div>• Andre brud på vores vilkår</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Kontakt Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Send os en besked</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Navn</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Emne</label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Vælg emne...</option>
                <option value="klage">Klage over bruger</option>
                <option value="teknisk">Teknisk problem</option>
                <option value="betaling">Betalingsproblem</option>
                <option value="forslag">Forslag til forbedring</option>
                <option value="generel">Generel henvendelse</option>
                <option value="andet">Andet</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Prioritet</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setFormData({...formData, priority: 'low'})}
                  className={`p-3 rounded-lg border-2 transition-colors duration-200 ${
                    formData.priority === 'low'
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-sm font-medium">Lav</div>
                    <div className="text-xs text-gray-500">Ikke hastende</div>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({...formData, priority: 'normal'})}
                  className={`p-3 rounded-lg border-2 transition-colors duration-200 ${
                    formData.priority === 'normal'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-sm font-medium">Normal</div>
                    <div className="text-xs text-gray-500">Standard</div>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({...formData, priority: 'high'})}
                  className={`p-3 rounded-lg border-2 transition-colors duration-200 ${
                    formData.priority === 'high'
                      ? 'border-red-500 bg-red-50 text-red-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-sm font-medium">Høj</div>
                    <div className="text-xs text-gray-500">Akut</div>
                  </div>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Besked</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Beskriv dit problem eller spørgsmål så detaljeret som muligt..."
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Send besked</span>
            </button>
          </form>
        </div>

        {/* Kontakt Info */}
        <div className="space-y-6">
          {/* Direkte kontakt */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Direkte kontakt</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Email</p>
                  <a href="mailto:support@privaterengoring.dk" className="text-blue-600 hover:text-blue-700">
                    support@privaterengoring.dk
                  </a>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Telefon</p>
                  <p className="text-gray-600">Kun email support</p>
                </div>
              </div>
            </div>
          </div>

          {/* Åbningstider */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Clock className="w-5 h-5 text-gray-600" />
              <h3 className="font-semibold text-gray-900">Åbningstider</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Mandag - Fredag</span>
                <span className="font-medium text-gray-900">9:00 - 17:00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Weekend</span>
                <span className="font-medium text-gray-900">Kun email</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Svartid</span>
                <span className="font-medium text-green-600">24-48 timer</span>
              </div>
            </div>
          </div>

          {/* Alvorlige problemer */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <h3 className="font-semibold text-red-900 mb-3">Alvorlige overtrædelser</h3>
            <p className="text-red-800 text-sm mb-4">
              Ved grove overtrædelser kan brugere blive <strong>advaret, midlertidigt lukket eller permanent blokeret</strong>.
            </p>
            <div className="space-y-2 text-red-700 text-sm">
              <div>🚨 Trusler eller vold</div>
              <div>💰 Svindel eller bedrageri</div>
              <div>📸 Deling af private billeder</div>
              <div>🔞 Upassende indhold</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}