import React, { useState, useEffect } from 'react';
import { FaTrophy, FaPlay, FaMapMarkerAlt, FaCalendar, FaChartLine, FaSeedling, FaThumbsUp, FaShare } from 'react-icons/fa';
import { useLanguage } from '../../context/LanguageContext';

const SuccessStories = () => {
  const { translate } = useLanguage();
  const [stories, setStories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStory, setSelectedStory] = useState(null);
  const [showVideoModal, setShowVideoModal] = useState(false);

  // Mock success stories data
  const mockStories = [
    {
      id: 1,
      farmerName: 'Ramesh Kumar',
      location: 'Bhiwani, Haryana',
      title: 'From Loss to Profit: My Organic Farming Journey',
      summary: 'Switched to organic farming and increased profit by 200% in 2 years',
      story: `After continuous losses with chemical farming, I decided to switch to organic methods. 
              Initially, it was challenging, but with guidance from Krishi Sakhi's AI assistant and 
              expert consultations, I learned proper composting, natural pest control, and crop rotation. 
              My soil health improved dramatically, and now I earn 3x more with premium organic produce.`,
      category: 'organic-farming',
      beforeIncome: '₹2,00,000/year',
      afterIncome: '₹6,00,000/year',
      cropTypes: ['Vegetables', 'Wheat', 'Pulses'],
      videoUrl: '/api/placeholder/video',
      thumbnail: '/api/placeholder/400/300',
      date: new Date('2024-01-10'),
      likes: 156,
      keyTakeaways: [
        'Started with small 1-acre organic plot',
        'Used cow dung and vermicompost',
        'Direct marketing to urban consumers',
        'Premium pricing for organic produce'
      ]
    },
    {
      id: 2,
      farmerName: 'Sunita Devi',
      location: 'Hisar, Haryana',
      title: 'Water Conservation Success with Drip Irrigation',
      summary: 'Saved 60% water and doubled tomato yield with modern irrigation',
      story: `Facing severe water shortage, I installed drip irrigation system with help from 
              government subsidy information found on Krishi Sakhi. The platform's weather predictions 
              helped me optimize irrigation schedules. Result: 60% water savings and my tomato yield 
              doubled from 20 tons to 40 tons per acre.`,
      category: 'water-management',
      beforeYield: '20 tons/acre',
      afterYield: '40 tons/acre',
      cropTypes: ['Tomato', 'Cucumber', 'Capsicum'],
      thumbnail: '/api/placeholder/400/300',
      date: new Date('2024-01-05'),
      likes: 89,
      keyTakeaways: [
        'Installed drip system with 50% subsidy',
        'Water usage reduced from 500L to 200L per day',
        'Fertigation improved nutrient efficiency',
        'ROI achieved in just 18 months'
      ]
    },
    {
      id: 3,
      farmerName: 'Jaswant Singh',
      location: 'Karnal, Haryana',
      title: 'Disease Management Saved My Wheat Crop',
      summary: 'Timely disease detection through app saved 90% of crop from yellow rust',
      story: `When I noticed unusual yellowing in my wheat field, I immediately used Krishi Sakhi's 
              crop analysis feature. The AI detected Yellow Rust disease in early stage. Following the 
              app's recommendations and expert advice, I sprayed appropriate fungicide and saved 90% 
              of my 50-acre wheat crop that could have been completely destroyed.`,
      category: 'crop-protection',
      areaSaved: '45 acres out of 50 acres',
      moneySaved: '₹4,50,000',
      cropTypes: ['Wheat'],
      videoUrl: '/api/placeholder/video',
      thumbnail: '/api/placeholder/400/300',
      date: new Date('2023-12-20'),
      likes: 234,
      keyTakeaways: [
        'Early detection is crucial',
        'AI image analysis identified disease instantly',
        'Timely fungicide application',
        'Regular monitoring prevents spread'
      ]
    },
    {
      id: 4,
      farmerName: 'Geeta Rani',
      location: 'Rohtak, Haryana',
      title: 'Direct Marketing Through Digital Platform',
      summary: 'Eliminated middlemen and increased income by 40%',
      story: `Using Krishi Sakhi's marketplace feature, I started selling vegetables directly to 
              consumers in nearby cities. The platform helped me connect with bulk buyers like hotels 
              and restaurants. By eliminating 3-4 middlemen, I now get better prices and my income 
              increased by 40% with the same production.`,
      category: 'marketing',
      beforePrice: '₹15/kg (through middlemen)',
      afterPrice: '₹25/kg (direct selling)',
      cropTypes: ['Mixed Vegetables'],
      thumbnail: '/api/placeholder/400/300',
      date: new Date('2023-12-15'),
      likes: 178,
      keyTakeaways: [
        'Built customer base through app',
        'Regular supply contracts with hotels',
        'Better price realization',
        'Reduced post-harvest losses'
      ]
    }
  ];

  const categories = [
    { id: 'all', label: translate('allStories', 'All Stories'), icon: FaTrophy },
    { id: 'organic-farming', label: translate('organicFarming', 'Organic Farming'), icon: FaSeedling },
    { id: 'water-management', label: translate('waterManagement', 'Water Management'), icon: '💧' },
    { id: 'crop-protection', label: translate('cropProtection', 'Crop Protection'), icon: '🛡️' },
    { id: 'marketing', label: translate('marketing', 'Marketing'), icon: FaChartLine }
  ];

  useEffect(() => {
    // In real app, fetch from API
    setStories(mockStories);
  }, []);

  const filteredStories = selectedCategory === 'all' 
    ? stories 
    : stories.filter(story => story.category === selectedCategory);

  const handleStoryClick = (story) => {
    setSelectedStory(story);
  };

  const handleWatchVideo = (story) => {
    setSelectedStory(story);
    setShowVideoModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {translate('farmerSuccessStories', 'Farmer Success Stories')}
        </h2>
        <p className="text-gray-600">
          {translate('storiesDescription', 'Real stories from farmers who transformed their farming with Krishi Sakhi')}
        </p>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-full transition-all duration-300 ${
              selectedCategory === cat.id
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span className="flex items-center gap-2">
              {typeof cat.icon === 'string' ? cat.icon : <cat.icon />}
              {cat.label}
            </span>
          </button>
        ))}
      </div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredStories.map(story => (
          <div 
            key={story.id} 
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => handleStoryClick(story)}
          >
            {/* Thumbnail with Video Indicator */}
            <div className="relative">
              <img 
                src={story.thumbnail} 
                alt={story.title}
                className="w-full h-48 object-cover"
              />
              {story.videoUrl && (
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleWatchVideo(story);
                    }}
                    className="bg-white bg-opacity-90 rounded-full p-4 hover:bg-opacity-100 transition-all"
                  >
                    <FaPlay className="text-primary-600 text-xl" />
                  </button>
                </div>
              )}
              <div className="absolute top-2 right-2 bg-primary-600 text-white px-3 py-1 rounded-full text-sm">
                {categories.find(cat => cat.id === story.category)?.label}
              </div>
            </div>

            {/* Story Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{story.title}</h3>
              
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                <span className="flex items-center gap-1">
                  <FaMapMarkerAlt />
                  {story.location}
                </span>
                <span className="flex items-center gap-1">
                  <FaCalendar />
                  {story.date.toLocaleDateString()}
                </span>
              </div>

              <p className="text-gray-700 mb-4">{story.summary}</p>

              {/* Key Metrics */}
              <div className="bg-green-50 p-3 rounded-lg mb-4">
                {story.beforeIncome && (
                  <div className="text-sm">
                    <span className="text-gray-600">Income: </span>
                    <span className="line-through text-gray-500">{story.beforeIncome}</span>
                    <span className="text-green-600 font-bold ml-2">→ {story.afterIncome}</span>
                  </div>
                )}
                {story.beforeYield && (
                  <div className="text-sm">
                    <span className="text-gray-600">Yield: </span>
                    <span className="line-through text-gray-500">{story.beforeYield}</span>
                    <span className="text-green-600 font-bold ml-2">→ {story.afterYield}</span>
                  </div>
                )}
                {story.moneySaved && (
                  <div className="text-sm">
                    <span className="text-gray-600">Money Saved: </span>
                    <span className="text-green-600 font-bold">{story.moneySaved}</span>
                  </div>
                )}
              </div>

              {/* Farmer Info */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-800">{story.farmerName}</p>
                  <p className="text-sm text-gray-600">
                    {story.cropTypes.join(', ')}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-1 text-gray-600 hover:text-primary-600">
                    <FaThumbsUp />
                    <span className="text-sm">{story.likes}</span>
                  </button>
                  <button className="flex items-center gap-1 text-gray-600 hover:text-primary-600">
                    <FaShare />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Story Modal */}
      {selectedStory && !showVideoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold text-gray-800">{selectedStory.title}</h3>
              <button
                onClick={() => setSelectedStory(null)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ✕
              </button>
            </div>

            <div className="flex items-center gap-4 text-gray-600 mb-4">
              <span className="font-semibold">{selectedStory.farmerName}</span>
              <span>•</span>
              <span>{selectedStory.location}</span>
              <span>•</span>
              <span>{selectedStory.date.toLocaleDateString()}</span>
            </div>

            <div className="prose max-w-none mb-6">
              <p className="whitespace-pre-line text-gray-700">{selectedStory.story}</p>
            </div>

            <div className="bg-primary-50 p-4 rounded-lg mb-6">
              <h4 className="font-bold text-primary-800 mb-2">
                {translate('keyTakeaways', 'Key Takeaways')}
              </h4>
              <ul className="list-disc list-inside space-y-1">
                {selectedStory.keyTakeaways.map((takeaway, index) => (
                  <li key={index} className="text-primary-700">{takeaway}</li>
                ))}
              </ul>
            </div>

            {selectedStory.videoUrl && (
              <button
                onClick={() => setShowVideoModal(true)}
                className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2"
              >
                <FaPlay />
                {translate('watchVideo', 'Watch Video')}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Video Modal */}
      {showVideoModal && selectedStory && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setShowVideoModal(false)}
              className="absolute -top-10 right-0 text-white text-xl hover:text-gray-300"
            >
              ✕ Close
            </button>
            <div className="bg-black rounded-lg overflow-hidden">
              <div className="aspect-video bg-gray-800 flex items-center justify-center">
                <p className="text-white">Video Player Placeholder</p>
              </div>
            </div>
            <h3 className="text-white text-xl mt-4">{selectedStory.title}</h3>
            <p className="text-gray-300">{selectedStory.farmerName} - {selectedStory.location}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuccessStories;