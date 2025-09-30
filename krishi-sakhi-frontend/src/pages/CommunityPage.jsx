import React, { useState } from 'react';
import { FaUsers, FaUserMd, FaTrophy, FaComments, FaVideo, FaStar } from 'react-icons/fa';
import ForumSection from '../components/community/ForumSection';
import ExpertConnect from '../components/community/ExpertConnect';
import SuccessStories from '../components/community/SuccessStories';
import { useLanguage } from '../context/LanguageContext';

const CommunityPage = () => {
  const [activeTab, setActiveTab] = useState('forum');
  const { translate } = useLanguage();

  const tabs = [
    {
      id: 'forum',
      label: translate('communityForum', 'Community Forum'),
      icon: FaComments,
      description: 'Connect with farmers in your area'
    },
    {
      id: 'experts',
      label: translate('expertConnect', 'Connect with Experts'),
      icon: FaUserMd,
      description: 'Get personalized advice from agronomists'
    },
    {
      id: 'stories',
      label: translate('successStories', 'Success Stories'),
      icon: FaTrophy,
      description: 'Learn from fellow farmers'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
            <FaUsers className="text-primary-600" />
            {translate('communityCollaboration', 'Community & Collaboration')}
          </h1>
          <p className="text-xl text-gray-600">
            {translate('communityDescription', 'Connect, Learn, and Grow Together')}
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-lg mb-8 p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`p-4 rounded-lg transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-primary-600 text-white shadow-xl transform scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-primary-100 hover:text-primary-700'
                  }`}
                >
                  <Icon className="text-3xl mb-2 mx-auto" />
                  <h3 className="font-bold text-lg">{tab.label}</h3>
                  <p className={`text-sm mt-1 ${activeTab === tab.id ? 'text-white/90' : 'text-gray-600'}`}>
                    {tab.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          {activeTab === 'forum' && <ForumSection />}
          {activeTab === 'experts' && <ExpertConnect />}
          {activeTab === 'stories' && <SuccessStories />}
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;