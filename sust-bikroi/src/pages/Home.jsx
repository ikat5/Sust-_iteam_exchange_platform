import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const categories = [
    { name: "Electronics", icon: "📱", link: "/category/electronics" },
    { name: "Books", icon: "📚", link: "/category/books" },
    { name: "Furniture", icon: "🪑", link: "/category/furniture" },
    { name: "Cycles", icon: "🚲", link: "/category/cycles" },
    { name: "Motorcycles", icon: "🏍️", link: "/category/motorcycles" },
    { name: "Clothing", icon: "👕", link: "/category/clothing" },
    { name: "Sports", icon: "⚽", link: "/category/sports" },
    { name: "Others", icon: "📦", link: "/category/others" }
  ];

  const features = [
    {
      icon: '👥',
      title: 'For Students, By Students',
      description: 'Built exclusively for the SUST community, ensuring a trusted and safe environment for everyone.',
    },
    {
      icon: '🌍',
      title: 'Sustainable & Smart',
      description: 'Promote a circular economy on campus. Save money, reduce waste, and make a positive impact.',
    },
    {
      icon: '🔒',
      title: 'Simple & Secure',
      description: 'List items in seconds, chat directly with buyers and sellers, and manage your transactions with ease.',
    },
  ];

  const steps = [
    {
      number: '01',
      title: 'Create Your Account',
      description: 'Sign up in seconds using your SUST student email to join our exclusive community.',
    },
    {
      number: '02',
      title: 'List or Find Items',
      description: 'Easily upload items you want to sell or browse through a wide variety of products listed by fellow students.',
    },
    {
      number: '03',
      title: 'Connect & Transact',
      description: 'Use our secure chat to connect with others, arrange a meeting on campus, and complete your exchange.',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-500 to-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-6">
            Your Campus Marketplace, Reimagined.
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-green-100 mb-10">
            Discover a sustainable way to buy, sell, and connect within the SUST community. From textbooks to electronics, find what you need or turn your unused items into cash.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="bg-white text-green-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Explore Marketplace
            </Link>
            <Link
              to="/sell"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-green-600 transition-all duration-300 transform hover:scale-105"
            >
              List an item right now
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold">Why Choose our platform?</h2>
            <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">The official, student-run platform designed to make your campus life easier and more sustainable. It's secure.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="text-5xl mb-5">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold">Get Started in 3 Easy Steps</h2>
            <p className="text-lg text-gray-600 mt-4">Join the community and start trading today.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {steps.map((step, index) => (
              <div key={index} className="relative p-8">
                <div className="text-7xl font-extrabold text-gray-100 absolute -top-4 -left-2">{step.number}</div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
            Explore Our Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-5">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={category.link}
                className="bg-white rounded-xl p-6 text-center hover:shadow-lg hover:bg-green-100 transition-all duration-300 transform hover:-translate-y-1 border border-gray-200"
              >
                <div className="text-5xl mb-4">{category.icon}</div>
                <h3 className="font-semibold text-gray-800">{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      {/* <section className="bg-gradient-to-r from-emerald-600 to-green-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Join the Community?</h2>
          <p className="text-xl text-green-100 mb-8">
            Become a part of SUST's circular economy. Sign up today and start exploring deals or listing your own items.
          </p>
          <Link
            to="/signup"
            className="bg-white text-green-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl"
          >
            Sign Up Now
          </Link>
        </div>
      </section> */}
    </div>
  );
};

export default Home;