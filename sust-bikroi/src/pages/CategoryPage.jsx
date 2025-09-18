import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductBox from '../components/ProductBox';

// Updated CategoryPage.jsx
// - Detects when a category key does not exist in the `allProducts` map and shows
//   a specific "not available right now" message.
// - Keeps the existing filtering (price range) and sorting logic.
// - Uses a safe display name if category is unknown.

const CategoryPage = () => {
  const { category } = useParams();
  const [sortBy, setSortBy] = useState('newest');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

  // Sample products data - in a real app this would come from an API
  const allProducts = {
    cycle: [
      {
        id: 1,
        name: "Road Bike - Trek",
        description: "Lightweight road bike, great for campus commuting",
        price: 12000,
        sellerName: "Fatima Khan",
        sellerPhone: "01898765432",
        image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop",
        condition: "Good"
      },
      {
        id: 2,
        name: "Mountain Bike - Giant",
        description: "Sturdy mountain bike for rough terrains",
        price: 15000,
        sellerName: "Ahmed Ali",
        sellerPhone: "01712345678",
        image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=300&h=200&fit=crop",
        condition: "Used"
      }
    ],
    book: [
      {
        id: 3,
        name: "Physics Textbooks Set",
        description: "Complete set of physics textbooks for engineering students",
        price: 2500,
        sellerName: "Karim Hassan",
        sellerPhone: "01987654321",
        image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop",
        condition: "Used"
      },
      {
        id: 4,
        name: "Programming Books Collection",
        description: "Various programming books including Java, Python, C++",
        price: 3000,
        sellerName: "Sara Ahmed",
        sellerPhone: "01612345678",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop",
        condition: "Good"
      }
    ],
    furniture: [
      {
        id: 5,
        name: "Study Table & Chair",
        description: "Wooden study table with comfortable chair",
        price: 3500,
        sellerName: "Ayesha Rahman",
        sellerPhone: "01612345678",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop",
        condition: "Good"
      },
      {
        id: 6,
        name: "Bookshelf - 5 Tier",
        description: "Large wooden bookshelf perfect for students",
        price: 2000,
        sellerName: "Rahim Uddin",
        sellerPhone: "01512345678",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop",
        condition: "Used"
      }
    ],
    electronics: [
      {
        id: 7,
        name: "MacBook Pro 13-inch",
        description: "Excellent condition MacBook Pro, perfect for students",
        price: 45000,
        sellerName: "Rahim Ahmed",
        sellerPhone: "01712345678",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=200&fit=crop",
        condition: "Used"
      },
      {
        id: 8,
        name: "Gaming Laptop - ASUS",
        description: "High-performance gaming laptop with RTX graphics",
        price: 55000,
        sellerName: "Tariq Islam",
        sellerPhone: "01812345678",
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop",
        condition: "Good"
      },
       {
        id: 9,
        name: "Electric Fan - Walton",
        description: "3-speed electric fan, works perfectly",
        price: 1200,
        sellerName: "Farhana Begum",
        sellerPhone: "01412345678",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop",
        condition: "Used"
      }
    ],
    motorcycle: [
      {
        id: 10,
        name: "Honda CB Hornet",
        description: "Well-maintained motorcycle, perfect for city commuting",
        price: 85000,
        sellerName: "Nazmul Hasan",
        sellerPhone: "01912345678",
        image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop",
        condition: "Good"
      }
    ]
   
  };

  const categoryNames = {
    cycle: "Cycles",
    book: "Books",
    furniture: "Furniture",
    motorcycle: "Motorcycles",
    electronics: "Electronics",
    mess_border: "Household Items"
  };

  // Check whether the selected category actually exists in our data map
  const categoryExists = Object.prototype.hasOwnProperty.call(allProducts, category);
  const products = categoryExists ? allProducts[category] : [];

  const displayName = categoryNames[category] || (category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Category');

  // Filtering by price range (safe number parsing)
  const filteredProducts = products.filter((product) => {
    const min = priceRange.min !== '' ? Number(priceRange.min) : null;
    const max = priceRange.max !== '' ? Number(priceRange.max) : null;
    if (min !== null && product.price < min) return false;
    if (max !== null && product.price > max) return false;
    return true;
  });

  // Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'newest':
      default:
        // assuming higher `id` = newer
        return b.id - a.id;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-green-600">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                </svg>
                Home
              </Link>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                </svg>
                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">{displayName}</span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {displayName} ({categoryExists ? products.length : 0} items)
          </h1>
          <p className="text-gray-600">
            Browse through {displayName.toLowerCase()} available for sale
          </p>
        </div>

        {/* If category key doesn't exist, show a clear "not available" message */}
        {!categoryExists ? (
          <div className="text-center py-20">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Products for {displayName} are not available right now.</h3>
            <p className="text-gray-500 mb-6">We don't have listings under this category at the moment. You can list an item or browse other categories.</p>
            <div className="flex justify-center gap-4">
              <Link
                to="/sell"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                List Your Product
              </Link>
              <Link
                to="/"
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
              >
                Browse Home
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Filters and Sort */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Sort */}
                <div>
                  <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-2">
                    Sort by
                  </label>
                  <select
                    id="sort"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="newest">Newest First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range (৳)
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Clear Filters */}
                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setPriceRange({ min: '', max: '' });
                      setSortBy('newest');
                    }}
                    className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid or No-results message */}
            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedProducts.map((product) => (
                  <Link key={product.id} to={`/product/${product.id}`}>
                    <ProductBox product={product} />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your filters or check back later for new listings.</p>
                <Link
                  to="/sell"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  List Your Product
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
