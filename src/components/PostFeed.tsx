import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import PostCard from './PostCard';

interface PostFeedProps {
  currentUser: any;
}

export default function PostFeed({ currentUser }: PostFeedProps) {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRealPosts();
  }, []);

  const loadRealPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/posts', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      
      // Check if response is HTML (indicates we're hitting the wrong endpoint)
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('text/html')) {
        console.warn('Received HTML response instead of JSON. Make sure to access the app through Netlify Dev (http://localhost:8888)');
        setPosts([]);
        setLoading(false);
        return;
      }
      
      if (response.ok) {
        const text = await response.text();
        if (!text) {
          console.log('Empty response from API');
          setPosts([]);
          setLoading(false);
          return;
        }
        
        try {
          const data = JSON.parse(text);
          setPosts(data.posts || []);
        } catch (jsonError) {
          console.error('Invalid JSON response:', text);
          setPosts([]);
        }
      } else {
        setPosts([]);
      }
    } catch (error) {
      console.error('Error loading posts:', error);
      setPosts([]);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Indlæser opslag...</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Ingen opslag endnu</h3>
        <p className="text-gray-600 mb-4">Vær den første til at dele et opslag!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 xs:space-y-4 sm:space-y-6">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          currentUser={currentUser}
        />
      ))}
    </div>
  );
}