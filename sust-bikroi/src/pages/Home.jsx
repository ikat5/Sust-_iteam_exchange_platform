import React from 'react';
import { Link } from 'react-router-dom';
import ProductBox from '../components/ProductBox';

const Home = () => {
  // Sample product data - in real app, this would come from API
  const featuredProducts = [
    {
      id: 1,
      name: "MacBook Pro 13-inch",
      description: "Excellent condition MacBook Pro, perfect for students",
      price: 45000,
      sellerName: "Rahim Ahmed",
      sellerPhone: "01712345678",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=200&fit=crop",
      condition: "Used"
    },
    {
      id: 2,
      name: "Road Bike - Trek",
      description: "Lightweight road bike, great for campus commuting",
      price: 12000,
      sellerName: "Fatima Khan",
      sellerPhone: "01898765432",
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop",
      condition: "Good"
    },
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
      name: "Study Table & Chair",
      description: "Wooden study table with comfortable chair",
      price: 3500,
      sellerName: "Ayesha Rahman",
      sellerPhone: "01612345678",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop",
      condition: "Good"
    }
  ];

  const categories = [
    { name: "Cycles", icon: "🚲", link: "/category/cycle", count: "25 items" },
    { name: "Books", icon: "📚", link: "/category/book", count: "150 items" },
    { name: "Furniture", icon: "🪑", link: "/category/furniture", count: "45 items" },
    { name: "Motorcycles", icon: "🏍️", link: "/category/motorcycle", count: "12 items" },
    { name: "Electronics", icon: "📱", link: "/category/electronics", count: "80 items" },
    { name: "Mess_boarder", icon: "🏠", link: "/category/Mess_boarder", count: "60 items" },
    { name: "Clothing", icon: "👕", link: "/category/clothing", count: "35 items" },
    { name: "Sports", icon: "⚽", link: "/category/sports", count: "20 items" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to Sust Bikroi
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Your trusted marketplace for buying and selling used products at SUST. 
              Find great deals and connect with fellow students.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/categories"
                className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Browse Products
              </Link>
              <Link
                to="/sell"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
              >
                Sell Your Items
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={category.link}
                className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-300 border border-gray-200 hover:border-green-500"
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.count}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
             Latest Products
            </h2>
            <Link
              to="/products"
              className="text-green-600 hover:text-green-700 font-semibold"
            >
              View All Products →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductBox key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">500+</div>
              <div className="text-gray-600">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">1000+</div>
              <div className="text-gray-600">Products Sold</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">50+</div>
              <div className="text-gray-600">Categories</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📝</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Create Account</h3>
              <p className="text-gray-600">Sign up with your SUST email to get started</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛍️</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Browse or Sell</h3>
              <p className="text-gray-600">Find products you need or list items to sell</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Connect & Trade</h3>
              <p className="text-gray-600">Contact sellers directly and make deals</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
