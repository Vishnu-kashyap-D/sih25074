import React, { useState, useEffect } from 'react';
import { chatAPI } from '../api/services';
import { FaQuestionCircle, FaSpinner } from 'react-icons/fa';

const PopularQuestions = ({ onQuestionClick, language }) => {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchQuestions();
  }, [language]);

  const fetchQuestions = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await chatAPI.getPopularQuestions(language);
      if (response.success) {
        setQuestions(response.data.questions);
      }
    } catch (error) {
      console.error('Failed to fetch popular questions:', error);
      setError('Failed to load questions');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-center space-x-2 text-gray-500">
          <FaSpinner className="animate-spin" />
          <span>Loading...</span>
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
        <h3 className="font-bold text-lg text-gray-800">
          {language === 'ml' ? 'സാധാരണ ചോദ്യങ്ങൾ' : 'Popular Questions'}
        </h3>
      </div>

      <p className="text-sm text-gray-600 mb-4">
        {language === 'ml'
          ? 'വേഗത്തിൽ ആരംഭിക്കാൻ ഒരു ചോദ്യം ക്ലിക്ക് ചെയ്യുക'
          : 'Click a question to get started quickly'}
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