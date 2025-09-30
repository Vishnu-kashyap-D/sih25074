import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaUser, FaEdit, FaMapMarkerAlt, FaPhone, FaEnvelope, FaLeaf, 
  FaHistory, FaChartLine, FaWallet, FaShoppingCart, FaComments, 
  FaCalendarAlt, FaTractor, FaSeedling, FaStar, FaClock, 
  FaCheckCircle, FaBell, FaChartPie, FaDownload, FaUpload, 
  FaPercent, FaAward, FaGraduationCap, FaHandshake
} from 'react-icons/fa';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    // Load user data
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser({
        ...userData,
        joinedDate: 'January 2024',
        profileImage: 'https://ui-avatars.com/api/?name=' + encodeURIComponent(userData.name) + '&background=059669&color=fff&size=200'
      });
    } else {
      navigate('/login');
    }
  }, [navigate]);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const stats = {
    totalEarnings: 245000,
    monthlyEarnings: 45000,
    totalOrders: 152,
    completedOrders: 148,
    activeListings: 12,
    soldItems: 89,
    rating: 4.8,
    reviews: 67,
    aiConsultations: 156,
    farmAnalyses: 24,
    savedReports: 18,
    certificates: 3
  };

  const recentActivities = [
    { icon: FaShoppingCart, text: 'Order #1458 delivered successfully', time: '2 hours ago', type: 'success' },
    { icon: FaComments, text: 'AI consultation on pest control completed', time: '5 hours ago', type: 'info' },
    { icon: FaLeaf, text: 'New listing: Organic Tomatoes (50kg)', time: 'Yesterday', type: 'primary' },
    { icon: FaStar, text: 'Received 5-star rating from buyer', time: '2 days ago', type: 'warning' },
    { icon: FaChartLine, text: 'Farm analysis report generated', time: '3 days ago', type: 'info' },
  ];

  const achievements = [
    { icon: FaAward, title: 'Top Seller', description: 'Sold 100+ products', color: 'bg-yellow-500' },
    { icon: FaHandshake, title: 'Trusted Farmer', description: '50+ positive reviews', color: 'bg-blue-500' },
    { icon: FaGraduationCap, title: 'AI Expert', description: '100+ consultations', color: 'bg-purple-500' },
    { icon: FaLeaf, title: 'Organic Champion', description: 'All organic products', color: 'bg-green-500' },
  ];

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-white mb-6">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
          <img 
            src={user.profileImage} 
            alt={user.name}
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
          />
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm opacity-90">
              <span className="flex items-center"><FaMapMarkerAlt className="mr-1" /> {user.location || 'Kerala, India'}</span>
              <span className="flex items-center"><FaPhone className="mr-1" /> {user.phone || '+91 98765 43210'}</span>
              <span className="flex items-center"><FaEnvelope className="mr-1" /> {user.email}</span>
              <span className="flex items-center"><FaCalendarAlt className="mr-1" /> Joined {user.joinedDate}</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs">Verified Farmer</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs">Organic Certified</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs">Premium Seller</span>
            </div>
          </div>
          <button className="bg-white text-primary-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
            <FaEdit className="inline mr-2" /> Edit Profile
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-sm mb-6 p-1">
        <div className="flex flex-wrap">
          {['dashboard', 'activity', 'analytics', 'achievements'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-4 py-3 rounded-lg font-medium capitalize transition-colors ${
                activeTab === tab ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Dashboard Tab */}
      {activeTab === 'dashboard' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* Stat Cards */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <FaWallet className="text-3xl text-green-500" />
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">+12%</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">₹{stats.totalEarnings.toLocaleString()}</h3>
            <p className="text-gray-600 text-sm">Total Earnings</p>
            <div className="mt-4 text-xs text-gray-500">
              ₹{stats.monthlyEarnings.toLocaleString()} this month
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <FaShoppingCart className="text-3xl text-blue-500" />
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Active</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">{stats.totalOrders}</h3>
            <p className="text-gray-600 text-sm">Total Orders</p>
            <div className="mt-4 text-xs text-gray-500">
              {stats.completedOrders} completed
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <FaLeaf className="text-3xl text-purple-500" />
              <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">{stats.activeListings}</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">{stats.soldItems}</h3>
            <p className="text-gray-600 text-sm">Products Sold</p>
            <div className="mt-4 text-xs text-gray-500">
              {stats.activeListings} active listings
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <FaStar className="text-3xl text-yellow-500" />
              <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Excellent</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">{stats.rating}</h3>
            <p className="text-gray-600 text-sm">Average Rating</p>
            <div className="mt-4 text-xs text-gray-500">
              {stats.reviews} reviews
            </div>
          </div>
        </div>
      )}

      {/* Activity Tab */}
      {activeTab === 'activity' && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Activities</h2>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
                <div className={`p-3 rounded-full bg-${activity.type === 'success' ? 'green' : activity.type === 'warning' ? 'yellow' : activity.type === 'primary' ? 'blue' : 'gray'}-100`}>
                  <activity.icon className={`text-${activity.type === 'success' ? 'green' : activity.type === 'warning' ? 'yellow' : activity.type === 'primary' ? 'blue' : 'gray'}-600`} />
                </div>
                <div className="flex-1">
                  <p className="text-gray-800 font-medium">{activity.text}</p>
                  <p className="text-gray-500 text-sm mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Performance Overview</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Sales Target</span>
                  <span className="font-medium">82%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{width: '82%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Customer Satisfaction</span>
                  <span className="font-medium">96%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{width: '96%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Response Rate</span>
                  <span className="font-medium">89%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{width: '89%'}}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Resource Usage</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <FaComments className="text-3xl text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-800">{stats.aiConsultations}</p>
                <p className="text-sm text-gray-600">AI Consultations</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <FaChartLine className="text-3xl text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-800">{stats.farmAnalyses}</p>
                <p className="text-sm text-gray-600">Farm Analyses</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <FaDownload className="text-3xl text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-800">{stats.savedReports}</p>
                <p className="text-sm text-gray-600">Saved Reports</p>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <FaAward className="text-3xl text-yellow-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-800">{stats.certificates}</p>
                <p className="text-sm text-gray-600">Certificates</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Achievements Tab */}
      {activeTab === 'achievements' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((achievement, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 text-center hover:shadow-md transition-shadow">
              <div className={`w-20 h-20 ${achievement.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <achievement.icon className="text-3xl text-white" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">{achievement.title}</h3>
              <p className="text-sm text-gray-600">{achievement.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <button 
          onClick={() => navigate('/')}
          className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-xl hover:shadow-lg transition-shadow text-center"
        >
          <FaLeaf className="text-2xl mx-auto mb-2" />
          <span className="block text-sm font-medium">Analyze Farm</span>
        </button>
        <button 
          onClick={() => navigate('/chatbot')}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-xl hover:shadow-lg transition-shadow text-center"
        >
          <FaComments className="text-2xl mx-auto mb-2" />
          <span className="block text-sm font-medium">AI Assistant</span>
        </button>
        <button 
          onClick={() => navigate('/marketplace')}
          className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-xl hover:shadow-lg transition-shadow text-center"
        >
          <FaShoppingCart className="text-2xl mx-auto mb-2" />
          <span className="block text-sm font-medium">Marketplace</span>
        </button>
        <button 
          onClick={() => navigate('/weather')}
          className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-xl hover:shadow-lg transition-shadow text-center"
        >
          <FaChartLine className="text-2xl mx-auto mb-2" />
          <span className="block text-sm font-medium">Weather Info</span>
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;