import React from 'react';

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <h3 className="font-semibold mb-3 text-lg">Categories</h3>
      
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
              <span>{category.name}</span>
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
                    <span>{sub.name}</span>
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