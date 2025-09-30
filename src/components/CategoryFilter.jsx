import React from 'react';

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <h3 className="font-semibold mb-3 text-lg">
        Categories
        <span className="text-sm text-gray-500 ml-2">(വിഭാഗങ്ങൾ)</span>
      </h3>
      
      <div className="space-y-2">
        <button
          onClick={() => onCategoryChange('')}
          className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
            selectedCategory === ''
              ? 'bg-primary-600 text-white'
              : 'hover:bg-gray-100 text-gray-700'
          }`}
        >
          All Categories
        </button>
        
        {categories.map((category) => (
          <div key={category.id}>
            <button
              onClick={() => onCategoryChange(category.id)}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                selectedCategory === category.id
                  ? 'bg-primary-600 text-white'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{category.name}</span>
                <span className="text-xs opacity-75">({category.malayalam})</span>
              </div>
            </button>
            
            {/* Subcategories - show only if parent is selected */}
            {selectedCategory === category.id && category.subcategories && (
              <div className="ml-4 mt-2 space-y-1">
                {category.subcategories.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => onCategoryChange(sub.id)}
                    className="w-full text-left px-3 py-1.5 text-sm rounded hover:bg-gray-100 text-gray-600"
                  >
                    <div className="flex items-center justify-between">
                      <span>{sub.name}</span>
                      <span className="text-xs opacity-75">({sub.malayalam})</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;