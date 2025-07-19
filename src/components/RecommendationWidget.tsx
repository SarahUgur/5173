import React from 'react';

interface RecommendationWidgetProps {
  // Add any props that App.tsx expects
}

export default function RecommendationWidget(props: RecommendationWidgetProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Anbefalinger</h3>
      <p className="text-gray-600">Her vises personaliserede anbefalinger baseret på din aktivitet.</p>
    </div>
  );
}