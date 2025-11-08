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
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group">
      <div className="aspect-w-16 aspect-h-9 overflow-hidden">
        <img 
          src={productImage} 
          alt={productName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 h-14">
          {productName}
        </h3>
        
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-extrabold text-green-600">
            ৳{productPrice}
          </span>
          <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full capitalize">
            {productCondition || 'Used'}
          </span>
        </div>
        
        <div className="border-t border-gray-100 pt-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-gray-600">{ownerName.charAt(0).toUpperCase()}</span>
              </div>
              <div>
                <p className="text-gray-800 font-semibold text-sm">{ownerName}</p>
                <p className="text-gray-500 text-xs">{ownerPhone}</p>
              </div>
            </div>
            <button 
              onClick={() => navigate(`/product/${productId}`)} 
              className="bg-green-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-green-600 transition-colors text-sm whitespace-nowrap"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductBox;

