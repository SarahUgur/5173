import React from 'react';

interface HeaderProps {
  // Add any props that App.tsx expects
}

export default function Header(props: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-900">Privat Rengøring</h1>
          </div>
        </div>
      </div>
    </header>
  );
}