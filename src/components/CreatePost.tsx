import React, { useState } from 'react';
import { MapPin, Briefcase, Clock, DollarSign, Users, Camera, X } from 'lucide-react';
import type { User } from '../types';

interface CreatePostProps {
  currentUser: User;
}

export default function CreatePost({ currentUser }: CreatePostProps) {
  const [showForm, setShowForm] = useState(false);
  const [postType, setPostType] = useState<'regular' | 'job'>('regular');
  const [content, setContent] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [jobCategory, setJobCategory] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [urgency, setUrgency] = useState('');
  const [budget, setBudget] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({
          type: postType,
          content,
          location,
          jobType: postType === 'job' ? jobType : null,
          jobCategory: postType === 'job' ? jobCategory : null,
          targetAudience: postType === 'job' ? targetAudience : null,
          urgency: postType === 'job' ? urgency : null,
          budget: postType === 'job' ? budget : null
        })
      });

      if (response.ok) {
        // Reset form
        setContent('');
        setLocation('');
        setJobType('');
        setJobCategory('');
        setTargetAudience('');
        setUrgency('');
        setBudget('');
        setShowForm(false);
        
        // Reload page to show new post
        window.location.reload();
      } else {
        alert('Fejl ved oprettelse af opslag');
      }
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Fejl ved oprettelse af opslag');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!showForm) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              {currentUser.name?.charAt(0) || 'U'}
            </span>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex-1 text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-full text-gray-600 transition-colors duration-200"
          >
            Hvad tænker du på, {currentUser.name?.split(' ')[0] || 'bruger'}?
          </button>
        </div>
        
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <button
            onClick={() => {
              setPostType('regular');
              setShowForm(true);
            }}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
          >
            <Camera className="w-5 h-5" />
            <span className="text-sm font-medium">Almindeligt opslag</span>
          </button>
          
          <button
            onClick={() => {
              setPostType('job');
              setShowForm(true);
            }}
            className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
          >
            <Briefcase className="w-5 h-5" />
            <span className="text-sm font-medium">Job opslag</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {postType === 'job' ? 'Opret job opslag' : 'Opret opslag'}
        </h3>
        <button
          onClick={() => setShowForm(false)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={postType === 'job' ? 'Beskriv jobbet...' : 'Hvad tænker du på?'}
            className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={4}
            required
          />
        </div>

        <div className="flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Tilføj lokation"
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {postType === 'job' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
              <select
                value={jobCategory}
                onChange={(e) => setJobCategory(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Vælg kategori</option>
                <option value="hjemmerengoring">🏠 Hjemmerengøring</option>
                <option value="kontorrengoring">🏢 Kontorrengøring</option>
                <option value="hovedrengoring">✨ Hovedrengøring</option>
                <option value="vinduesrengoring">🪟 Vinduesrengøring</option>
                <option value="gulvrengoring">🧽 Gulvrengøring</option>
                <option value="tappetrengoring">🛋️ Tæpperengøring</option>
                <option value="fraflytningsrengoring">📦 Fraflytningsrengøring</option>
                <option value="byggererengoring">🔨 Byggerengøring</option>
                <option value="hotelrengoring">🏨 Hotel/Restaurant</option>
                <option value="butikrengoring">🏪 Butik/Showroom</option>
                <option value="industrirengoring">🏭 Industrirengøring</option>
                <option value="specialrengoring">⭐ Specialrengøring</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Vælg type</option>
                <option value="engangsjob">🔄 Engangsjob</option>
                <option value="fast_ugentlig">📅 Fast ugentlig</option>
                <option value="fast_14_dage">📅 Fast hver 14. dag</option>
                <option value="fast_maanedlig">📅 Fast månedlig</option>
                <option value="efter_behov">🎯 Efter behov</option>
                <option value="akut">🚨 Akut (samme dag)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Målgruppe</label>
              <select
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Vælg målgruppe</option>
                <option value="individuals">Privatpersoner</option>
                <option value="companies">Virksomheder</option>
                <option value="both">Begge</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hastighed</label>
              <select
                value={urgency}
                onChange={(e) => setUrgency(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Vælg hastighed</option>
                <option value="low">Lav</option>
                <option value="medium">Medium</option>
                <option value="high">Høj</option>
                <option value="urgent">Akut</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Budget (DKK)</label>
              <div className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="Indtast budget"
                  className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="0"
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-4">
            <button
              type="button"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              <Camera className="w-5 h-5" />
              <span className="text-sm">Billede</span>
            </button>
          </div>

          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              Annuller
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !content.trim()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isSubmitting ? 'Opretter...' : 'Del'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}