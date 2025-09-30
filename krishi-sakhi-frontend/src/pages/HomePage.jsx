import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLeaf, FaMicroscope, FaComments, FaStore, FaCloudSun, FaChartLine, FaShieldAlt, FaRocket, FaSignInAlt, FaUserPlus, FaUsers } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';

const HomePage = () => {
  const navigate = useNavigate();
  const { translate } = useLanguage();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);
  }, []);

  const features = [
    {
      icon: FaLeaf,
      title: 'Farm Analysis',
      description: 'Click on map to analyze soil health, water resources, and get personalized recommendations',
      path: '/farm-analysis',
      color: 'green'
    },
    {
      icon: FaMicroscope,
      title: 'Crop Analysis',
      description: 'Upload crop images for instant AI-powered disease detection and treatment advice',
      path: '/crop-analysis',
      color: 'purple'
    },
    {
      icon: FaComments,
      title: 'AI Assistant',
      description: 'Get 24/7 farming advice from our intelligent chatbot in your language',
      path: '/chatbot',
      color: 'blue'
    },
    {
      icon: FaStore,
      title: 'Marketplace',
      description: 'Buy and sell agricultural products directly with fair prices',
      path: '/marketplace',
      color: 'orange'
    },
    {
      icon: FaCloudSun,
      title: 'Weather Insights',
      description: 'Real-time weather data and agricultural forecasts for better planning',
      path: '/weather',
      color: 'cyan'
    },
    {
      icon: FaUsers,
      title: 'Community & Collaboration',
      description: 'Connect with farmers, experts, and share success stories',
      path: '/community',
      color: 'indigo'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-green-50 to-primary-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-primary-500/20"></div>
        
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-300/30 rounded-full blur-3xl transform translate-x-32 -translate-y-16"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary-300/30 rounded-full blur-3xl transform -translate-x-20 translate-y-20"></div>
        
        <div className="relative container mx-auto px-4 py-16 md:py-24">
          {/* Login/Signup buttons at top right */}
          {!isLoggedIn && (
            <div className="absolute top-4 right-4 flex gap-4">
              <button
                onClick={() => navigate('/login')}
                className="bg-white/90 backdrop-blur text-primary-600 px-6 py-2 rounded-full font-semibold hover:bg-white transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg inline-flex items-center gap-2"
              >
                <FaSignInAlt />
                Login
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="bg-primary-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-primary-700 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg inline-flex items-center gap-2"
              >
                <FaUserPlus />
                Sign Up
              </button>
            </div>
          )}
          
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-gray-800">Data-Driven</span>
              <br />
              <span className="text-primary-600">AI-Powered Farming</span>
              <br />
              <span className="text-gray-800">Decisions, Simplified</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Krishi Sakhi transforms complex agricultural and groundwater data into actionable insights. 
              Our platform helps farmers optimize irrigation, select suitable crops, and protect their 
              harvests using cutting-edge AI.
            </p>
            
            <button 
              onClick={() => navigate(isLoggedIn ? '/farm-analysis' : '/login')}
              className="bg-primary-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-primary-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center gap-3"
            >
              <FaRocket />
              {isLoggedIn ? 'Access Dashboard' : 'Get Started'}
            </button>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Empowering Farmers with Technology
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive tools and insights to modernize your farming practices
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              onClick={() => navigate(feature.path)}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer group"
            >
              <div className={`inline-flex p-4 rounded-full bg-${feature.color}-100 group-hover:bg-${feature.color}-200 transition-colors mb-6`}>
                <feature.icon className={`text-3xl text-${feature.color}-600`} />
              </div>
              
              <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-primary-600 transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
              
              <div className="mt-4 text-primary-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Explore →
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-primary-600 to-green-600 rounded-3xl p-8 md:p-12 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-20 -translate-y-20"></div>
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Transform Your Farming?
            </h3>
            <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
              Join thousands of farmers who are already using Krishi Sakhi to improve their yields and income
            </p>
            <button 
              onClick={() => navigate(isLoggedIn ? '/farm-analysis' : '/login')}
              className="bg-white text-primary-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
            >
              <FaChartLine />
              {isLoggedIn ? 'Start Analysis Now' : 'Login to Start'}
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default HomePage;