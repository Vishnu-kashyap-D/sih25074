import React, { useState, useEffect } from 'react';
import { chatAPI } from '../api/services';
import { useLanguage } from '../context/LanguageContext';
import { FaQuestionCircle, FaSpinner } from 'react-icons/fa';

const PopularQuestions = ({ onQuestionClick }) => {
  const { translate } = useLanguage();
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Use hardcoded popular questions instead of API
  useEffect(() => {
    const mockQuestions = [
      {
        category: translate('cropManagement', 'Crop Management'),
        questions: [
          translate('soilFertilityQuestion', 'How to improve soil fertility for rice cultivation?'),
          translate('pestControlQuestion', 'What are the best practices for pest control in vegetables?'),
          translate('tomatoPlantingQuestion', 'When is the best time to plant tomatoes?')
        ]
      },
      {
        category: translate('weatherClimate', 'Weather & Climate'),
        questions: [
          translate('monsoonQuestion', 'How does monsoon affect crop planning?'),
          translate('droughtCropsQuestion', 'What crops are suitable for drought conditions?'),
          translate('rainfallProtectionQuestion', 'How to protect crops from excessive rainfall?')
        ]
      },
      {
        category: translate('marketPricing', 'Market & Pricing'),
        questions: [
          translate('coconutPriceQuestion', 'What is the current market price for coconuts?'),
          translate('organicBuyersQuestion', 'How to find buyers for organic produce?'),
          translate('spiceStorageQuestion', 'What are the storage requirements for spices?')
        ]
      }
    ];
    setQuestions(mockQuestions);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-center space-x-2 text-gray-500">
          <FaSpinner className="animate-spin" />
          <span>{translate('loading', 'Loading...')}</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <p className="text-red-600 text-sm text-center">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 overflow-y-auto max-h-[calc(100vh-200px)]">
      <div className="flex items-center space-x-2 mb-4">
        <FaQuestionCircle className="text-primary-600" size={20} />
        <h3 className="font-bold text-lg text-gray-800">{translate('popularQuestions', 'Popular Questions')}</h3>
      </div>

      <p className="text-sm text-gray-600 mb-4">
        {translate('clickQuestionPrompt', 'Click a question to get started quickly')}
      </p>

      <div className="space-y-4">
        {questions.map((category, catIndex) => (
          <div key={catIndex}>
            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">
              {category.category}
            </h4>
            <div className="space-y-2">
              {category.questions.map((question, qIndex) => (
                <button
                  key={qIndex}
                  onClick={() => onQuestionClick(question)}
                  className="w-full text-left p-3 bg-gray-50 hover:bg-primary-50 border border-gray-200 hover:border-primary-300 rounded-lg transition-all text-sm text-gray-700 hover:text-primary-700"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularQuestions;