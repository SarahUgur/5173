import React, { useState } from 'react';
import { X, Send, User, Briefcase, Star, MapPin, Clock, MessageCircle, Phone, Mail, FileText, Paperclip } from 'lucide-react';

interface JobApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: any;
  currentUser: any;
  onSendApplication: (postId: string, message: string, contactMethod: string) => void;
}

export default function JobApplicationModal({ 
  isOpen, 
  onClose, 
  post, 
  currentUser,
  onSendApplication 
}: JobApplicationModalProps) {
  const [applicationMessage, setApplicationMessage] = useState('');
  const [contactMethod, setContactMethod] = useState<'chat' | 'email' | 'phone'>('chat');
  const [includeProfile, setIncludeProfile] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !post) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!applicationMessage.trim()) {
      alert('Skriv venligst en besked til job ejeren');
      return;
    }

    setIsSubmitting(true);

    try {
      // Mock successful application
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success feedback
       alert('🎉 Ansøgning sendt succesfuldt! Job ejeren vil kontakte dig snart.');
      
      // Reset form
      setApplicationMessage('');
      setContactMethod('chat');
      setIncludeProfile(true);
      onClose();
      
    } catch (error) {
      alert('Ansøgning sendt! (Demo mode)');
    }
    
    setIsSubmitting(false);
  };

  const getContactMethodLabel = (method: string) => {
    switch (method) {
      case 'chat': return 'Direkte besked i appen';
      case 'email': return 'Email besked';
      case 'phone': return 'Telefon opkald';
      default: return method;
    }
  };

  const getContactMethodIcon = (method: string) => {
    switch (method) {
      case 'chat': return <MessageCircle className="w-4 h-4" />;
      case 'email': return <Mail className="w-4 h-4" />;
      case 'phone': return <Phone className="w-4 h-4" />;
      default: return <MessageCircle className="w-4 h-4" />;
    }
  };

  // Pre-filled message templates
  const messageTemplates = [
    "Hej! Jeg er interesseret i dit rengøringsjob og vil gerne høre mere om opgaven.",
    "Hej! Jeg har erfaring med denne type rengøring og vil gerne tilbyde mine tjenester.",
    "Hej! Jeg kan hjælpe dig med denne opgave. Hvornår passer det dig bedst?",
    "Hej! Jeg er professionel rengøringsekspert og interesseret i dit job."
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="relative p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-green-50">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Ansøg om Job</h2>
            <p className="text-gray-600">Send en besked til job ejeren</p>
          </div>
        </div>

        {/* Job Info */}
        <div className="p-6 bg-gray-50 border-b border-gray-200">
          <div className="flex items-start space-x-4">
            <img
              src={post.user.avatar}
              alt={post.user.name}
              className="w-12 h-12 rounded-full"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">{post.content.substring(0, 60)}...</h3>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{post.location}</span>
                </div>
                {post.budget && (
                  <div className="flex items-center space-x-1">
                    <span className="font-semibold text-green-600">{post.budget}</span>
                  </div>
                )}
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{post.createdAt}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <span className="text-sm font-medium text-gray-900">{post.user.name}</span>
                {post.user.verified && (
                  <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Application Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            {/* Message Templates */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Hurtige beskeder:</label>
              <div className="grid grid-cols-1 gap-2">
                {messageTemplates.map((template, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setApplicationMessage(template)}
                    className="text-left p-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors duration-200 text-sm"
                  >
                    {template}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Din besked til {post.user.name}:</label>
              <textarea
                value={applicationMessage}
                onChange={(e) => setApplicationMessage(e.target.value)}
                placeholder="Skriv en personlig besked om hvorfor du er den rette til jobbet..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                {applicationMessage.length}/500 tegn
              </p>
            </div>

            {/* Contact Method */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Hvordan vil du kontaktes?</label>
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setContactMethod('chat')}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg border-2 transition-colors duration-200 ${
                    contactMethod === 'chat'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <MessageCircle className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-medium">Direkte besked</div>
                    <div className="text-sm opacity-75">Få svar direkte i appen</div>
                  </div>
                </button>
                
                <button
                  type="button"
                  onClick={() => setContactMethod('email')}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg border-2 transition-colors duration-200 ${
                    contactMethod === 'email'
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Mail className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-medium">Email</div>
                    <div className="text-sm opacity-75">Få svar på {currentUser?.email}</div>
                  </div>
                </button>
                
                <button
                  type="button"
                  onClick={() => setContactMethod('phone')}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg border-2 transition-colors duration-200 ${
                    contactMethod === 'phone'
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Phone className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-medium">Telefon</div>
                    <div className="text-sm opacity-75">Få et opkald på {currentUser?.phone || 'dit nummer'}</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Include Profile */}
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="includeProfile"
                checked={includeProfile}
                onChange={(e) => setIncludeProfile(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="includeProfile" className="text-sm text-gray-700">
                Inkluder mit profil og rating i ansøgningen
              </label>
            </div>

            {/* Profile Preview */}
            {includeProfile && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-3">Dit profil vil blive inkluderet:</h4>
                <div className="flex items-center space-x-3">
                  <img
                    src={currentUser?.avatar}
                    alt={currentUser?.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium text-blue-900">{currentUser?.name}</p>
                    <div className="flex items-center space-x-2 text-sm text-blue-700">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span>{currentUser?.rating || 'Ny bruger'}</span>
                      <span>•</span>
                      <span>{currentUser?.completedJobs || 0} jobs</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex space-x-3 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Annuller
            </button>
            <button
              type="submit"
              disabled={!applicationMessage.trim() || isSubmitting}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:from-blue-700 hover:to-green-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Sender...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Ansøgning</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Footer Info */}
        <div className="px-6 pb-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">💡 Tips til en god ansøgning:</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Vær høflig og professionel</li>
              <li>• Nævn din erfaring med lignende opgaver</li>
              <li>• Spørg om specifikke detaljer hvis nødvendigt</li>
              <li>• Foreslå et møde eller telefonopkald</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}