import React from 'react';
import { JOB_CATEGORIES, JOB_TYPES, type JobCategory, type JobType } from '../lib/jobCategories';

interface CategorySelectorProps {
  selectedCategory: string;
  selectedType: string;
  onCategoryChange: (categoryId: string) => void;
  onTypeChange: (typeId: string) => void;
  showDescriptions?: boolean;
  compact?: boolean;
}

export default function CategorySelector({
  selectedCategory,
  selectedType,
  onCategoryChange,
  onTypeChange,
  showDescriptions = true,
  compact = false
}: CategorySelectorProps) {
  
  if (compact) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Vælg kategori</option>
            {JOB_CATEGORIES.map((category) => (
              <option key={category.id} value={category.id}>
                {category.icon} {category.name} - {category.description}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
          <select
            value={selectedType}
            onChange={(e) => onTypeChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Vælg type</option>
            {JOB_TYPES.map((type) => (
              <option key={type.id} value={type.id}>
                {type.icon} {type.name} - {type.description}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Kategori Valg */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Vælg rengøringskategori
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {JOB_CATEGORIES.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => onCategoryChange(category.id)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 text-left hover:scale-105 ${
                selectedCategory === category.id
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
              }`}
            >
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-2xl">{category.icon}</span>
                <div>
                  <h3 className={`font-semibold ${
                    selectedCategory === category.id ? 'text-blue-900' : 'text-gray-900'
                  }`}>
                    {category.name}
                  </h3>
                  <p className={`text-sm ${
                    selectedCategory === category.id ? 'text-blue-700' : 'text-gray-600'
                  }`}>
                    {category.description}
                  </p>
                </div>
              </div>
              
              {showDescriptions && (
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className={selectedCategory === category.id ? 'text-blue-600' : 'text-gray-500'}>
                      💰 {category.averagePrice}
                    </span>
                    <span className={selectedCategory === category.id ? 'text-blue-600' : 'text-gray-500'}>
                      ⏱️ {category.duration}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    Eksempler: {category.examples.slice(0, 2).join(', ')}
                    {category.examples.length > 2 && '...'}
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Type Valg */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Vælg job type
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {JOB_TYPES.map((type) => (
            <button
              key={type.id}
              type="button"
              onClick={() => onTypeChange(type.id)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 text-left hover:scale-105 ${
                selectedType === type.id
                  ? 'border-green-500 bg-green-50 shadow-md'
                  : 'border-gray-200 hover:border-green-300 hover:bg-green-50'
              }`}
            >
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-2xl">{type.icon}</span>
                <div>
                  <h3 className={`font-semibold ${
                    selectedType === type.id ? 'text-green-900' : 'text-gray-900'
                  }`}>
                    {type.name}
                  </h3>
                  <p className={`text-sm ${
                    selectedType === type.id ? 'text-green-700' : 'text-gray-600'
                  }`}>
                    {type.description}
                  </p>
                </div>
              </div>
              
              {showDescriptions && (
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className={selectedType === type.id ? 'text-green-600' : 'text-gray-500'}>
                      📅 {type.frequency}
                    </span>
                    <span className={selectedType === type.id ? 'text-green-600' : 'text-gray-500'}>
                      🤝 {type.commitment}
                    </span>
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Valgte kategorier preview */}
      {(selectedCategory || selectedType) && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">📋 Dit valg:</h4>
          <div className="space-y-2">
            {selectedCategory && (
              <div className="flex items-center space-x-2">
                <span className="text-blue-800">Kategori:</span>
                <span className="font-semibold text-blue-900">
                  {JOB_CATEGORIES.find(c => c.id === selectedCategory)?.icon} {' '}
                  {JOB_CATEGORIES.find(c => c.id === selectedCategory)?.name}
                </span>
              </div>
            )}
            {selectedType && (
              <div className="flex items-center space-x-2">
                <span className="text-blue-800">Type:</span>
                <span className="font-semibold text-blue-900">
                  {JOB_TYPES.find(t => t.id === selectedType)?.icon} {' '}
                  {JOB_TYPES.find(t => t.id === selectedType)?.name}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}