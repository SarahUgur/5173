import React from 'react';
import { Shield, Users, Target, Award, Heart, Globe, Mail, Phone, ExternalLink } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto p-3 sm:p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Om Private Rengøring</h1>
        <p className="text-xl text-gray-600">Find hjælp. Få job. Gør rent.</p>
      </div>

      {/* Mission */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <Target className="w-8 h-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Vores Mission</h2>
        </div>
        <p className="text-gray-700 text-lg leading-relaxed">
          Private Rengøring er Danmarks største platform for rengøringsservices. Vi forbinder mennesker der har brug for rengøring med pålidelige rengøringseksperter i hele landet. Vores mål er at gøre det nemt, sikkert og overkommeligt for alle at få hjælp til rengøring.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 rounded-xl p-6 text-center">
          <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-blue-900 mb-2">10,000+</h3>
          <p className="text-blue-700">Registrerede brugere</p>
        </div>
        <div className="bg-green-50 rounded-xl p-6 text-center">
          <Award className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-green-900 mb-2">25,000+</h3>
          <p className="text-green-700">Afsluttede jobs</p>
        </div>
        <div className="bg-purple-50 rounded-xl p-6 text-center">
          <Heart className="w-12 h-12 text-purple-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-purple-900 mb-2">4.8/5</h3>
          <p className="text-purple-700">Gennemsnitlig rating</p>
        </div>
      </div>

      {/* Values */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Vores Værdier</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start space-x-4">
            <Shield className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Sikkerhed & Tillid</h3>
              <p className="text-gray-700">Alle brugere verificeres og vi har strenge sikkerhedsforanstaltninger for at beskytte både kunder og rengøringseksperter.</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <Heart className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Kvalitet</h3>
              <p className="text-gray-700">Vi stræber efter den højeste kvalitet i alle rengøringsservices og brugeroplevelser på vores platform.</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <Globe className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Bæredygtighed</h3>
              <p className="text-gray-700">Vi promoverer miljøvenlige rengøringsmetoder og produkter for en grønnere fremtid.</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <Users className="w-8 h-8 text-purple-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fællesskab</h3>
              <p className="text-gray-700">Vi bygger et stærkt fællesskab hvor alle hjælper hinanden og deler erfaringer.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Kontakt Teamet</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <Mail className="w-8 h-8 text-blue-600" />
            <div>
              <h3 className="font-semibold text-gray-900">Generel Support</h3>
              <p className="text-gray-600">support@privaterengoring.dk</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <Shield className="w-8 h-8 text-green-600" />
            <div>
              <h3 className="font-semibold text-gray-900">Admin</h3>
              <p className="text-gray-600">admin@privaterengoring.dk</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-8">
        <p className="text-gray-600">
          © 2024 Private Rengøring. Alle rettigheder forbeholdes.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Bygget med ❤️ i Danmark
        </p>
      </div>
    </div>
  );
}