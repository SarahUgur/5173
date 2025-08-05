import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, AlertTriangle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    priority: 'normal'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Besked sendt succesfuldt! Vi vender tilbage inden for 24-48 timer.');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          priority: 'normal'
        });
      } else {
        throw new Error('Kunne ikke sende besked');
      }
    } catch (error) {
      console.error('Error sending contact form:', error);
      alert('Fejl ved afsendelse af besked. Prøv igen.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-3 sm:p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Kontakt & Klager</h1>
        <p className="text-xl text-gray-600">Vi er her for at hjælpe dig</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Send os en besked</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Navn</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Dit fulde navn"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="din@email.dk"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Emne</label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Vælg emne</option>
                <option value="support">Teknisk support</option>
                <option value="complaint">Klage</option>
                <option value="billing">Fakturering</option>
                <option value="feature">Funktionsforslag</option>
                <option value="partnership">Partnerskab</option>
                <option value="other">Andet</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Prioritet</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="low">Lav</option>
                <option value="normal">Normal</option>
                <option value="high">Høj</option>
                <option value="urgent">Akut</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Besked</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Beskriv dit problem eller spørgsmål detaljeret..."
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Sender...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Send Besked</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Kontakt Information</h2>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Mail className="w-6 h-6 text-blue-600" />
                <div>
                  <h3 className="font-semibold text-gray-900">Email Support</h3>
                  <p className="text-gray-600">support@privaterengoring.dk</p>
                  <p className="text-sm text-gray-500">Svartid: 24-48 timer</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Shield className="w-6 h-6 text-green-600" />
                <div>
                  <h3 className="font-semibold text-gray-900">Admin</h3>
                  <p className="text-gray-600">admin@privaterengoring.dk</p>
                  <p className="text-sm text-gray-500">For alvorlige problemer</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Clock className="w-6 h-6 text-purple-600" />
                <div>
                  <h3 className="font-semibold text-gray-900">Åbningstider</h3>
                  <p className="text-gray-600">Mandag - Fredag: 9:00 - 17:00</p>
                  <p className="text-sm text-gray-500">Weekend: Kun akutte sager</p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Ofte Stillede Spørgsmål</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Hvordan fungerer platformen?</h3>
                <p className="text-gray-700 text-sm">Du opretter en profil, finder jobs eller poster dine egne rengøringsbehov, og forbinder direkte med andre brugere.</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Er det gratis at bruge?</h3>
                <p className="text-gray-700 text-sm">Ja, Private Rengøring er 100% gratis at bruge. Ingen skjulte gebyrer eller abonnementer.</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Hvordan rapporterer jeg et problem?</h3>
                <p className="text-gray-700 text-sm">Brug kontaktformularen eller send en email til support@privaterengoring.dk med detaljer om problemet.</p>
              </div>
            </div>
          </div>

          {/* Emergency */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-red-600" />
              <h3 className="text-lg font-semibold text-red-900">Akut Problem?</h3>
            </div>
            <p className="text-red-800 mb-4">
              Hvis du oplever alvorlige sikkerhedsproblemer eller misbrug, kontakt os øjeblikkeligt.
            </p>
            <a
              href="mailto:admin@privaterengoring.dk?subject=AKUT%20-%20Sikkerhedsproblem"
              className="inline-flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
            >
              <Mail className="w-4 h-4" />
              <span>Kontakt Admin</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}