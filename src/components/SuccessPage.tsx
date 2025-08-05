import React from 'react';
import { CheckCircle, Home, Briefcase } from 'lucide-react';

interface SuccessPageProps {
  onNavigateHome: () => void;
  onNavigateJobs: () => void;
}

export default function SuccessPage({ onNavigateHome, onNavigateJobs }: SuccessPageProps) {
  return (
    <div className="max-w-md mx-auto p-6 text-center">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-12 h-12 text-green-600" />
      </div>
      
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Succes!</h1>
      <p className="text-gray-600 mb-8">Din handling blev gennemført succesfuldt.</p>
      
      <div className="space-y-3">
        <button
          onClick={onNavigateHome}
          className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <Home className="w-5 h-5" />
          <span>Gå til Hjem</span>
        </button>
        
        <button
          onClick={onNavigateJobs}
          className="w-full flex items-center justify-center space-x-2 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200"
        >
          <Briefcase className="w-5 h-5" />
          <span>Se Jobs</span>
        </button>
      </div>
    </div>
  );
}