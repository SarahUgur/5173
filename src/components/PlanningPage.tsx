import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Users, Briefcase, Star, TrendingUp } from 'lucide-react';

interface PlanningPageProps {
  currentUser: any;
}

const PlanningPage: React.FC<PlanningPageProps> = ({ currentUser }) => {
  const [plannedPosts, setPlannedPosts] = useState<any[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    scheduledDate: '',
    scheduledTime: '',
    price: '',
    contactInfo: ''
  });

  useEffect(() => {
    loadPlannedPosts();
  }, []);

  const loadPlannedPosts = async () => {
    try {
      const response = await fetch('/api/posts?type=planned');
      if (response.ok) {
        const posts = await response.json();
        setPlannedPosts(posts.filter((post: any) => post.userId === currentUser?.id));
      }
    } catch (error) {
      console.error('Error loading planned posts:', error);
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newPost,
          userId: currentUser?.id,
          userName: currentUser?.name,
          userEmail: currentUser?.email,
          type: 'planned',
          isPlanned: true,
          isBoosted: true,
          boostExpiresAt: null,
          createdAt: new Date().toISOString()
        }),
      });

      if (response.ok) {
        setNewPost({
          title: '',
          description: '',
          category: '',
          location: '',
          scheduledDate: '',
          scheduledTime: '',
          price: '',
          contactInfo: ''
        });
        setShowCreateForm(false);
        loadPlannedPosts();
      }
    } catch (error) {
      console.error('Error creating planned post:', error);
    }
  };

  const handleBoostPost = async (postId: string) => {
    try {
      const response = await fetch('/api/posts', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: postId,
          isBoosted: true,
          boostExpiresAt: null
        }),
      });

      if (response.ok) {
        loadPlannedPosts();
      }
    } catch (error) {
      console.error('Error boosting post:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Planlæg Opslag</h1>
        <p className="text-gray-600">Opret og administrer dine planlagte job opslag</p>
      </div>

      <div className="mb-6">
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Calendar className="w-5 h-5" />
          Opret Planlagt Opslag
        </button>
      </div>

      {showCreateForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Nyt Planlagt Opslag</h2>
          <form onSubmit={handleCreatePost} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Titel
              </label>
              <input
                type="text"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Beskrivelse
              </label>
              <textarea
                value={newPost.description}
                onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kategori
                </label>
                <select
                  value={newPost.category}
                  onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Vælg kategori</option>
                  <option value="rengøring">Rengøring</option>
                  <option value="havearbejde">Havearbejde</option>
                  <option value="malerarbejde">Malerarbejde</option>
                  <option value="flyttehjælp">Flyttehjælp</option>
                  <option value="babysitting">Babysitting</option>
                  <option value="hundeluftning">Hundeluftning</option>
                  <option value="madlavning">Madlavning</option>
                  <option value="andet">Andet</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Lokation
                </label>
                <input
                  type="text"
                  value={newPost.location}
                  onChange={(e) => setNewPost({ ...newPost, location: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="By eller område"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Planlagt Dato
                </label>
                <input
                  type="date"
                  value={newPost.scheduledDate}
                  onChange={(e) => setNewPost({ ...newPost, scheduledDate: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Planlagt Tid
                </label>
                <input
                  type="time"
                  value={newPost.scheduledTime}
                  onChange={(e) => setNewPost({ ...newPost, scheduledTime: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pris (DKK)
                </label>
                <input
                  type="number"
                  value={newPost.price}
                  onChange={(e) => setNewPost({ ...newPost, price: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kontakt Info
                </label>
                <input
                  type="text"
                  value={newPost.contactInfo}
                  onChange={(e) => setNewPost({ ...newPost, contactInfo: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Telefon eller email"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Opret Opslag
              </button>
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Annuller
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Mine Planlagte Opslag</h2>
        {plannedPosts.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Ingen planlagte opslag endnu</p>
          </div>
        ) : (
          plannedPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>
                  <p className="text-gray-600 mt-1">{post.description}</p>
                </div>
                {post.isBoosted && (
                  <div className="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm">
                    <TrendingUp className="w-4 h-4" />
                    Boostet
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <Briefcase className="w-4 h-4" />
                  {post.category}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {post.location}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {post.scheduledDate}
                </div>
                {post.scheduledTime && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {post.scheduledTime}
                  </div>
                )}
              </div>

              {post.price && (
                <div className="text-lg font-semibold text-green-600 mb-4">
                  {post.price} DKK
                </div>
              )}

              <div className="flex gap-2">
                {!post.isBoosted && (
                  <button
                    onClick={() => handleBoostPost(post.id)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors flex items-center gap-2"
                  >
                    <TrendingUp className="w-4 h-4" />
                    Boost Gratis For Altid
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PlanningPage;