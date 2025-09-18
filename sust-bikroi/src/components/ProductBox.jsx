import React from 'react';

const ProductBox = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200">
      <div className="aspect-w-16 aspect-h-12">
        <img 
          src={product.image || '/api/placeholder/300/200'} 
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex justify-between items-center mb-3">
          <span className="text-xl font-bold text-green-600">
            ৳{product.price}
          </span>
          <span className="text-sm text-gray-500">
            {product.condition || 'Used'}
          </span>
        </div>
        
        <div className="border-t pt-3">
          <div className="flex justify-between items-center text-sm">
            <div>
              <p className="text-gray-700 font-medium">{product.sellerName}</p>
              <p className="text-gray-500">{product.sellerPhone}</p>
            </div>
            <button className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors text-sm">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductBox;
