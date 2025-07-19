import React from 'react';

interface NetworkPageProps {
  // Add any props that App.tsx expects
}

export default function NetworkPage(props: NetworkPageProps) {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Netværk</h2>
      <p className="text-gray-600">Opbyg dit professionelle netværk inden for rengøringsbranchen.</p>
    </div>
  );
}