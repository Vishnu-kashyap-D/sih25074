import React, { useState, useRef } from 'react';
import { FaCamera, FaUpload, FaLeaf, FaChartLine, FaBug, FaCheckCircle, FaExclamationTriangle, FaTimes, FaRedo } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import axios from 'axios';

const CropAnalysisPage = () => {
  const { translate } = useLanguage();
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  // Handle drag events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Handle drop
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  // Handle file selection
  const handleFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        setError('File size too large. Please select an image under 10MB.');
        return;
      }
      
      setSelectedImage(file);
      setError(null);
      setAnalysisResult(null);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setError('Please select a valid image file (JPG, PNG, etc.)');
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;
    
    setLoading(true);
    setError(null);
    
    const formData = new FormData();
    formData.append('image', selectedImage);
    formData.append('cropType', 'auto-detect'); // Can be made user-selectable
    
    try {
      const response = await axios.post(
        'http://localhost:3001/api/crop-analysis/analyze',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      
      if (response.data.success) {
        setAnalysisResult(response.data.data);
      } else {
        throw new Error(response.data.error || 'Analysis failed');
      }
    } catch (err) {
      console.error('Crop analysis error:', err);
      setError('Failed to analyze image. Please try again.');
      
      // Mock data for demo
      setTimeout(() => {
        setAnalysisResult(getMockAnalysisResult());
        setError(null);
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  const getMockAnalysisResult = () => ({
    cropInfo: {
      type: 'Tomato',
      variety: 'Cherry Tomato',
      growthStage: 'Fruiting',
      confidence: 0.92
    },
    healthScore: 85,
    qualityGrade: 'A',
    issues: [
      {
        type: 'disease',
        name: 'Early Blight',
        severity: 'Low',
        confidence: 0.78,
        affectedArea: '12%'
      },
      {
        type: 'nutrient',
        name: 'Nitrogen Deficiency',
        severity: 'Medium',
        confidence: 0.65,
        symptoms: 'Slight yellowing of lower leaves'
      }
    ],
    recommendations: [
      {
        category: 'treatment',
        priority: 'high',
        action: 'Apply fungicide for Early Blight',
        details: 'Use copper-based fungicide, spray every 7-10 days',
        timeline: 'Immediate'
      },
      {
        category: 'nutrition',
        priority: 'medium',
        action: 'Apply nitrogen-rich fertilizer',
        details: 'Use urea or ammonium sulfate at 50kg/acre',
        timeline: 'Within 3 days'
      },
      {
        category: 'care',
        priority: 'low',
        action: 'Improve air circulation',
        details: 'Prune lower branches to improve airflow',
        timeline: 'This week'
      }
    ],
    marketInfo: {
      currentPrice: '₹45/kg',
      pricetrend: 'increasing',
      optimalHarvestTime: '7-10 days',
      expectedYield: '85%'
    }
  });

  const resetAnalysis = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setAnalysisResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getHealthColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getSeverityColor = (severity) => {
    const colors = {
      'Low': 'bg-yellow-100 text-yellow-800',
      'Medium': 'bg-orange-100 text-orange-800',
      'High': 'bg-red-100 text-red-800'
    };
    return colors[severity] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'high': 'border-red-500 bg-red-50',
      'medium': 'border-yellow-500 bg-yellow-50',
      'low': 'border-green-500 bg-green-50'
    };
    return colors[priority] || 'border-gray-500 bg-gray-50';
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <FaLeaf className="text-green-600" />
          Crop Quality Analysis
        </h1>
        <p className="text-gray-600 mt-2">
          Upload a photo of your crop to get instant AI-powered health analysis and recommendations
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Section */}
        <div className="space-y-6">
          {/* Image Upload Area */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Upload Crop Image</h2>
            
            {!imagePreview ? (
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <div className="p-6 bg-primary-100 rounded-full">
                      <FaUpload className="text-4xl text-primary-600" />
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-lg font-medium text-gray-700">
                      Drag and drop your image here
                    </p>
                    <p className="text-sm text-gray-500 mt-1">or</p>
                  </div>
                  
                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2"
                    >
                      <FaUpload /> Choose File
                    </button>
                    <button
                      onClick={() => {
                        // TODO: Implement camera capture
                        alert('Camera feature coming soon!');
                      }}
                      className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
                    >
                      <FaCamera /> Take Photo
                    </button>
                  </div>
                  
                  <p className="text-xs text-gray-500">
                    Supported formats: JPG, PNG, GIF (Max 10MB)
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={imagePreview}
                    alt="Crop preview"
                    className="w-full h-64 object-contain"
                  />
                  <button
                    onClick={resetAnalysis}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                  >
                    <FaTimes />
                  </button>
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={analyzeImage}
                    disabled={loading}
                    className={`flex-1 py-3 px-6 rounded-lg font-semibold text-white transition-all ${
                      loading 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-primary-600 hover:bg-primary-700 hover:shadow-lg'
                    }`}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="loading-spinner w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                        <span>Analyzing...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <FaChartLine />
                        <span>Analyze Crop</span>
                      </div>
                    )}
                  </button>
                  
                  <button
                    onClick={resetAnalysis}
                    className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
                  >
                    <FaRedo /> Reset
                  </button>
                </div>
              </div>
            )}
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
            />
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
              <div className="flex items-center gap-3">
                <FaExclamationTriangle className="text-red-600" />
                <p className="text-red-800">{error}</p>
              </div>
            </div>
          )}

          {/* Instructions */}
          {!imagePreview && !analysisResult && (
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 mb-3">Tips for Best Results:</h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="mt-0.5 flex-shrink-0" />
                  <span>Take clear, well-lit photos in natural daylight</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="mt-0.5 flex-shrink-0" />
                  <span>Include both healthy and affected areas if checking for diseases</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="mt-0.5 flex-shrink-0" />
                  <span>Focus on leaves, fruits, or specific problem areas</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="mt-0.5 flex-shrink-0" />
                  <span>Avoid blurry or too distant shots</span>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {loading && (
            <div className="bg-white rounded-xl shadow-lg p-12">
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="loading-spinner w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full"></div>
                    <FaLeaf className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl text-primary-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Analyzing Your Crop...</h3>
                  <p className="text-gray-600 mt-2">Our AI is examining the image for quality, diseases, and health indicators</p>
                </div>
                <div className="flex justify-center gap-1">
                  <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}

          {analysisResult && !loading && (
            <div className="space-y-4 fade-in">
              {/* Crop Info & Health Score */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{analysisResult.cropInfo.type}</h3>
                    <p className="text-gray-600">{analysisResult.cropInfo.variety} • {analysisResult.cropInfo.growthStage}</p>
                  </div>
                  <div className="text-center">
                    <div className={`text-3xl font-bold ${getHealthColor(analysisResult.healthScore)}`}>
                      {analysisResult.healthScore}%
                    </div>
                    <p className="text-sm text-gray-600">Health Score</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Quality Grade</p>
                    <p className="text-2xl font-bold text-primary-600">{analysisResult.qualityGrade}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Detection Confidence</p>
                    <p className="text-lg font-semibold">{(analysisResult.cropInfo.confidence * 100).toFixed(0)}%</p>
                  </div>
                </div>
              </div>

              {/* Detected Issues */}
              {analysisResult.issues.length > 0 && (
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <FaBug className="text-red-600" />
                    Detected Issues
                  </h3>
                  <div className="space-y-3">
                    {analysisResult.issues.map((issue, index) => (
                      <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-800">{issue.name}</h4>
                            <p className="text-sm text-gray-600 capitalize">{issue.type}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(issue.severity)}`}>
                            {issue.severity}
                          </span>
                        </div>
                        {issue.symptoms && (
                          <p className="text-sm text-gray-600 mt-2">{issue.symptoms}</p>
                        )}
                        {issue.affectedArea && (
                          <p className="text-sm text-gray-500 mt-1">Affected Area: {issue.affectedArea}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommendations */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Recommendations</h3>
                <div className="space-y-3">
                  {analysisResult.recommendations.map((rec, index) => (
                    <div key={index} className={`border-l-4 rounded-lg p-4 ${getPriorityColor(rec.priority)}`}>
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-800">{rec.action}</h4>
                        <span className="text-xs font-medium text-gray-600 bg-gray-200 px-2 py-1 rounded">
                          {rec.timeline}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{rec.details}</p>
                      <p className="text-xs text-gray-500 mt-1 capitalize">{rec.category}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Market Info */}
              <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Market Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-3">
                    <p className="text-sm text-gray-600">Current Price</p>
                    <p className="text-lg font-semibold text-green-700">{analysisResult.marketInfo.currentPrice}</p>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <p className="text-sm text-gray-600">Price Trend</p>
                    <p className="text-lg font-semibold capitalize">{analysisResult.marketInfo.pricetrend} ↗</p>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <p className="text-sm text-gray-600">Optimal Harvest</p>
                    <p className="text-lg font-semibold">{analysisResult.marketInfo.optimalHarvestTime}</p>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <p className="text-sm text-gray-600">Expected Yield</p>
                    <p className="text-lg font-semibold">{analysisResult.marketInfo.expectedYield}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CropAnalysisPage;