import React, { useState } from 'react';
import { MapPin, Briefcase, Clock, DollarSign, Users, Camera, X, MessageCircle, Image, Video } from 'lucide-react';
import CategorySelector from './CategorySelector';
import type { User } from '../types';

interface CreatePostProps {
  currentUser: User;
  onPostCreated?: () => void;
}

export default function CreatePost({ currentUser, onPostCreated }: CreatePostProps) {
  const [showForm, setShowForm] = useState(false);
  const [postType, setPostType] = useState<'regular' | 'job'>('regular');
  const [content, setContent] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [jobCategory, setJobCategory] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [urgency, setUrgency] = useState('');
  const [budget, setBudget] = useState('');
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const apiUrl = `${window.location.origin}/.netlify/functions/posts`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({
          type: postType,
          content,
          location,
          images: selectedImages,
          jobType: postType === 'job' ? jobType : undefined,
          jobCategory: postType === 'job' ? jobCategory : undefined,
          targetAudience: postType === 'job' ? targetAudience : undefined,
          urgency: postType === 'job' ? urgency : undefined,
          budget: postType === 'job' ? budget : undefined,
          isJobPost: postType === 'job'
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
        setSelectedImages([]);
        setShowForm(false);
        
        // Call callback to refresh posts
        if (onPostCreated) {
          onPostCreated();
        }
        
        alert('✅ Opslag oprettet succesfuldt!');
        
        // Reload page to show new post
        window.location.reload();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Kunne ikke oprette opslag');
      }
    } catch (error) {
      console.error('Error creating post:', error);
      alert(`Fejl: ${error instanceof Error ? error.message : 'Kunne ikke oprette opslag. Prøv igen.'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = () => {
    // Mock image upload - i virkeligheden ville dette uploade til cloud storage
    const mockImageUrl = `https://images.pexels.com/photos/4107123/pexels-photo-4107123.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop&t=${Date.now()}`;
    setSelectedImages(prev => [...prev, mockImageUrl]);
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
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
          // Automatically boost all posts for free
          setTimeout(() => {
            alert('🎉 Opslag oprettet og boostet GRATIS!\n\n✨ Dit opslag vil nu være synligt for flere brugere i 7 dage');
          }, 1000);
          
          <button
            onClick={() => {
              setPostType('job');
              setShowForm(true);
            }}
            className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 hover:scale-105"
          >
            <Briefcase className="w-5 h-5" />
            <span className="text-sm font-medium">Job Opslag</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {postType === 'job' ? '💼 Opret Job Opslag' : '📝 Opret Almindeligt Opslag'}
        </h3>
        <button
          onClick={() => setShowForm(false)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      {/* Post Type Selector */}
      <div className="flex mb-4 bg-gray-100 rounded-lg p-1">
        <button
          type="button"
          onClick={() => setPostType('regular')}
          className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md font-medium transition-colors duration-200 ${
            postType === 'regular' 
              ? 'bg-white text-gray-900 shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <MessageCircle className="w-4 h-4" />
          <span>Almindeligt</span>
        </button>
        <button
          type="button"
          onClick={() => setPostType('job')}
          className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md font-medium transition-colors duration-200 ${
            postType === 'job' 
              ? 'bg-white text-gray-900 shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Job</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={postType === 'job' ? 'Beskriv rengøringsjobbet detaljeret...' : 'Hvad vil du dele med fællesskabet?'}
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

        {/* Image Upload */}
        {selectedImages.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {selectedImages.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        {postType === 'job' && (
          <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-900 flex items-center space-x-2">
              <Briefcase className="w-5 h-5" />
              <span>Job Detaljer</span>
            </h4>
            
            <CategorySelector
              selectedCategory={jobCategory}
              selectedType={jobType}
              onCategoryChange={setJobCategory}
              onTypeChange={setJobType}
              showDescriptions={false}
              compact={true}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hastighed</label>
                <select
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Vælg hastighed</option>
                  <option value="flexible">🎯 Fleksibel</option>
                  <option value="this_week">📅 Denne uge</option>
                  <option value="urgent">🚨 Akut</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Budget (valgfrit)</label>
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="F.eks. 300-500 kr"
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={handleImageUpload}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              <Image className="w-5 h-5" />
              <span className="text-sm">Billede</span>
            </button>
            <button
              type="button"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              <Video className="w-5 h-5" />
              <span className="text-sm">Video</span>
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
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
            >
              {isSubmitting ? 'Opretter...' : postType === 'job' ? '💼 Opret Job' : '📝 Del Opslag'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}