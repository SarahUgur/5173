import React from 'react';

interface LocalJobsPageProps {
  // Add any props that App.tsx expects
}

export default function LocalJobsPage(props: LocalJobsPageProps) {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Lokale Jobs</h2>
      <p className="text-gray-600">Her kan du se lokale rengøringsjobs i dit område.</p>
    </div>
  );
}