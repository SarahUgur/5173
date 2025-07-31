import React from 'react';
import { useState, useEffect } from 'react';
import { Heart, Users, Shield, Star, Award, Target, Zap, Globe } from 'lucide-react';

export default function AboutPage() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    completedJobs: 0,
    postsToday: 0
  });

  useEffect(() => {
    // Load real stats from API
    fetch('/api/stats/public')
      .then(response => response.json())
      .then(data => {
        setStats({
          totalUsers: data.totalUsers || 0,
          completedJobs: data.completedJobs || 0,
          postsToday: data.postsToday || 0
        });
      })
      .catch(() => {
        // Keep default values if API fails
      });
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-3 sm:p-6">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
          <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
            <path d="M19 15L19.5 17L21.5 17.5L19.5 18L19 20L18.5 18L16.5 17.5L18.5 17L19 15Z"/>
            <path d="M5 15L5.5 17L7.5 17.5L5.5 18L5 20L4.5 18L2.5 17.5L4.5 17L5 15Z"/>
          </svg>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Om Privat Rengøring</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Vi forbinder personer, der søger rengøringshjælp, med dygtige rengøringsfolk og virksomheder i hele Danmark.
        </p>
      </div>

      {/* Mission */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 sm:p-8 mb-12">
        <div className="text-center">
          <Target className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Vores Mission</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Vi ønsker at gøre det <strong>trygt, nemt og effektivt</strong> at finde hjælp til alt fra hjemmerengøring til specialopgaver – uden dyre mellemled. 
            Hos os er <strong>gennemsigtighed, kvalitet og fællesskab</strong> i centrum.
          </p>
        </div>
      </div>

      {/* Værdier */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Vores Værdier</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Tryghed</h3>
            <p className="text-gray-600 text-sm">Verificerede profiler og sikker platform for alle brugere</p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Kvalitet</h3>
            <p className="text-gray-600 text-sm">Høje standarder og anmeldelsessystem for bedste service</p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Fællesskab</h3>
            <p className="text-gray-600 text-sm">Stærkt netværk af rengøringseksperter og kunder</p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Effektivitet</h3>
            <p className="text-gray-600 text-sm">Hurtig matching og nem kommunikation</p>
          </div>
        </div>
      </div>

      {/* Statistikker */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Privat Rengøring i Tal</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{stats.totalUsers}</div>
            <div className="text-gray-600">Aktive brugere</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{stats.completedJobs}</div>
            <div className="text-gray-600">Afsluttede jobs</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">4.8</div>
            <div className="text-gray-600">Gennemsnitlig rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">{stats.postsToday}</div>
            <div className="text-gray-600">Opslag i dag</div>
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">Bag Platformen</h2>
        <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
          Bag platformen står et lille team med erfaring inden for både rengøring, IT og kundeservice. 
          Vi lytter til vores brugere og udvikler konstant nye funktioner baseret på jeres behov.
        </p>
        
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 text-center">
          <Heart className="w-8 h-8 text-red-500 mx-auto mb-4" />
          <h3 className="font-semibold text-gray-900 mb-2">Har du spørgsmål, ideer eller brug for hjælp?</h3>
          <p className="text-gray-600 mb-4">Du er altid velkommen til at kontakte os.</p>
          <div className="space-y-2">
            <p className="font-medium text-blue-600">📧 support@privatrengoring.dk</p>
            <p className="text-gray-600 text-sm">Vi svarer inden for 24-48 timer</p>
          </div>
        </div>
      </div>

      {/* Fremtiden */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 sm:p-8 text-white text-center">
        <Globe className="w-12 h-12 mx-auto mb-4 opacity-90" />
        <h2 className="text-2xl font-bold mb-4">Fremtiden for Privat Rengøring</h2>
        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
          Vi arbejder konstant på at forbedre platformen med nye funktioner som AI-matching, 
          udvidet geografisk dækning og endnu bedre brugeroplevelse.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <Award className="w-6 h-6 mx-auto mb-2" />
            <div className="font-medium">AI Matching</div>
            <div className="text-blue-200 text-xs">Intelligent job forslag</div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <Globe className="w-6 h-6 mx-auto mb-2" />
            <div className="font-medium">Større Dækning</div>
            <div className="text-blue-200 text-xs">Hele Norden</div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <Zap className="w-6 h-6 mx-auto mb-2" />
            <div className="font-medium">Mobil App</div>
            <div className="text-blue-200 text-xs">iOS & Android</div>
          </div>
        </div>
      </div>
    </div>
  );
}