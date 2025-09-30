import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaRupeeSign } from 'react-icons/fa';
import placeholderProduct from '../assets/placeholder-product.svg';

const ProductCard = ({ product, viewMode = 'grid' }) => {
  const navigate = useNavigate();

  // Mock image URLs based on product title
  const getProductImage = (title) => {
    const titleLower = title?.toLowerCase() || '';
    if (titleLower.includes('coconut')) {
      return 'https://images.unsplash.com/photo-1581375321224-79da6fd32f6e?w=400&h=300&fit=crop';
    } else if (titleLower.includes('rice') || titleLower.includes('paddy')) {
      return 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop';
    } else if (titleLower.includes('pepper')) {
      return 'https://images.unsplash.com/photo-1599687351724-dfa3c4ff81b1?w=400&h=300&fit=crop';
    } else if (titleLower.includes('banana')) {
      return 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=300&fit=crop';
    } else if (titleLower.includes('mango')) {
      return 'https://images.unsplash.com/photo-1564750497011-ead0ce4b9448?w=400&h=300&fit=crop';
    } else if (titleLower.includes('tomato')) {
      return 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=300&fit=crop';
    } else if (titleLower.includes('fertilizer')) {
      return 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop';
    } else if (titleLower.includes('seed')) {
      return 'https://images.unsplash.com/photo-1535048637252-3a8c40fa2172?w=400&h=300&fit=crop';
    }
    return placeholderProduct;
  };

  const productImage = product.images?.[0]?.url || getProductImage(product.title);

  const handleClick = () => {
    navigate(`/marketplace/${product.id}`);
  };

  if (viewMode === 'list') {
    return (
      <div
        onClick={handleClick}
        className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer p-4 flex space-x-4"
      >
        <img
          src={productImage}
          alt={product.title}
          className="w-32 h-32 object-cover rounded-lg"
          onError={(e) => { e.target.src = placeholderProduct; }}
        />
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-gray-800 mb-2">{product.title}</h3>
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FaRupeeSign className="text-primary-600" />
              <span className="text-xl font-bold text-primary-600">
                {product.price}
              </span>
              <span className="text-gray-500 text-sm">/ {product.unit}</span>
            </div>
            <div className="flex items-center text-gray-500 text-sm">
              <FaMapMarkerAlt className="mr-1" />
              <span>{product.location?.district}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer overflow-hidden group"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={productImage}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          onError={(e) => { e.target.src = placeholderProduct; }}
        />
        {product.isNegotiable && (
          <span className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs font-semibold px-2 py-1 rounded">
            Negotiable
          </span>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg text-gray-800 line-clamp-2 flex-1">
            {product.title}
          </h3>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <FaRupeeSign className="text-primary-600" size={16} />
            <span className="text-2xl font-bold text-primary-600">
              {product.price}
            </span>
            <span className="text-gray-500 text-sm">/ {product.unit}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
          <div className="flex items-center text-gray-500 text-xs">
            <FaMapMarkerAlt className="mr-1" />
            <span>{product.location?.district}, {product.location?.state}</span>
          </div>
          <span className="text-xs text-gray-400">
            {product.seller?.name}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;