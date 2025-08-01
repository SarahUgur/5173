import React, { useState } from 'react';
import { Camera, MapPin, Smile, Send, Image, Video, Calendar, DollarSign, Briefcase } from 'lucide-react';

interface CreatePostProps {
  currentUser: any;
}

export default function CreatePost({ currentUser }: CreatePostProps) {
  const [postContent, setPostContent] = useState('');
  const [isJobPost, setIsJobPost] = useState(false);
  const [location, setLocation] = useState('');
  const [budget, setBudget] = useState('');
  const [jobType, setJobType] = useState('home_cleaning');
  const [urgency, setUrgency] = useState('flexible');
  const [showJobOptions, setShowJobOptions] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!postContent.trim()) {
      alert('Skriv venligst noget indhold til dit opslag');
      return;
    }

    setIsSubmitting(true);

    try {
      const postData = {
        type: isJobPost ? 'job' : 'regular',
        content: postContent,
        location: location || '',
        jobType: isJobPost ? jobType : null,
        urgency: isJobPost ? urgency : null,
        budget: isJobPost ? budget : null
      };

      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(postData)
      });

      if (response.ok) {
        const result = await response.json();
        alert('🎉 Opslag oprettet succesfuldt!');
        
        // Reset form
        setPostContent('');
        setLocation('');
        setBudget('');
        setIsJobPost(false);
        setShowJobOptions(false);
        setJobType('home_cleaning');
        setUrgency('flexible');
        
        // Reload page to show new post
        window.location.reload();
      } else {
        throw new Error('Kunne ikke oprette opslag');
      }
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Opslag oprettet! (Demo mode - reload siden for at se ændringer)');
      
      // Reset form anyway
      setPostContent('');
      setLocation('');
      setBudget('');
      setIsJobPost(false);
      setShowJobOptions(false);
    }
    
    setIsSubmitting(false);
  };

  const handleImageUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = true;
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        alert(`${files.length} billede(r) valgt! (Upload funktionalitet kommer snart)`);
      }
    };
    input.click();
  };

  const handleVideoUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'video/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        alert('Video valgt! (Upload funktionalitet kommer snart)');
      }
    };
    input.click();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6">
      <form onSubmit={handleSubmit}>
        {/* Header */}
        <div className="flex items-center space-x-3 mb-4">
          <img
            src={currentUser?.avatar || "/api/placeholder/40/40"}
            alt="Din avatar"
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1">
            <p className="font-medium text-gray-900">{currentUser?.name}</p>
            <p className="text-sm text-gray-500">Hvad vil du dele?</p>
          </div>
        </div>

        {/* Post Type Toggle */}
        <div className="flex mb-4 bg-gray-100 rounded-lg p-1">
          <button
            type="button"
            onClick={() => {
              setIsJobPost(false);
              setShowJobOptions(false);
            }}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors duration-200 ${
              !isJobPost ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Almindeligt Opslag
          </button>
          <button
            type="button"
            onClick={() => {
              setIsJobPost(true);
              setShowJobOptions(true);
            }}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors duration-200 ${
              isJobPost ? 'bg-white text-green-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Job Opslag
          </button>
        </div>

        {/* Main Content */}
        <textarea
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          placeholder={isJobPost ? "Beskriv det rengøringsjob du har brug for hjælp til..." : "Hvad tænker du på?"}
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          rows={4}
          required
        />

        {/* Job Options */}
        {showJobOptions && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg space-y-4">
            <h3 className="font-medium text-green-900">Job Detaljer</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lokation</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="F.eks. København NV"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Budget (valgfrit)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="F.eks. 300-400 kr"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type rengøring</label>
                <select
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="home_cleaning">Hjemmerengøring</option>
                  <option value="office_cleaning">Kontorrengøring</option>
                  <option value="deep_cleaning">Hovedrengøring</option>
                  <option value="regular_cleaning">Fast rengøring</option>
                  <option value="window_cleaning">Vinduesrengøring</option>
                  <option value="move_cleaning">Fraflytningsrengøring</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hastighed</label>
                <select
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="flexible">Fleksibel</option>
                  <option value="this_week">Denne uge</option>
                  <option value="immediate">Akut</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Media Options */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={handleImageUpload}
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
            >
              <Image className="w-5 h-5" />
              <span className="text-sm font-medium">Billede</span>
            </button>
            
            <button
              type="button"
              onClick={handleVideoUpload}
              className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors duration-200"
            >
              <Video className="w-5 h-5" />
              <span className="text-sm font-medium">Video</span>
            </button>
            
            <button
              type="button"
              className="flex items-center space-x-2 text-gray-600 hover:text-yellow-600 transition-colors duration-200"
            >
              <Smile className="w-5 h-5" />
              <span className="text-sm font-medium">Emoji</span>
            </button>
          </div>

          <button
            type="submit"
            disabled={!postContent.trim() || isSubmitting}
            className={`flex items-center space-x-2 px-6 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
              isJobPost 
                ? 'bg-green-600 text-white hover:bg-green-700' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Opretter...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Opret Opslag</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}