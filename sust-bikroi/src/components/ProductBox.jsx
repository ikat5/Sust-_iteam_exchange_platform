import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductBox = ({ product }) => {
  const navigate = useNavigate();
  // Handle different data structures (backend vs frontend)
  const productName = product.productName || product.name;
  const productPrice = product.price;
  const productDescription = product.description;
  const productCondition = product.condition;
  const productImage = product.productImage?.[0] || product.image || '/api/placeholder/300/200';
  const owner = product.owner;
  const ownerName = owner?.fullName || product.sellerName || 'Unknown';
  const ownerPhone = owner?.phoneNumber || product.sellerPhone || 'N/A';
  const productId = product._id || product.id;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200">
      <div className="aspect-w-16 aspect-h-12">
        <img 
          src={productImage} 
          alt={productName}
          className="w-full h-48 object-cover"
        />
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {productName}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {productDescription}
        </p>
        
        <div className="flex justify-between items-center mb-3">
          <span className="text-xl font-bold text-green-600">
            ৳{productPrice}
          </span>
          <span className="text-sm text-gray-500 capitalize">
            {productCondition || 'Used'}
          </span>
        </div>
        
        <div className="border-t pt-3">
          <div className="flex justify-between items-center text-sm">
            <div>
              <p className="text-gray-700 font-medium">{ownerName}</p>
              <p className="text-gray-500">{ownerPhone}</p>
            </div>
            <button onClick={() => navigate(`/product/${productId}`)} className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors text-sm">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductBox;

