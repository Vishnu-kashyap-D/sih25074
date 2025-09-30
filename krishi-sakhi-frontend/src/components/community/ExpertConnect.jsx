import React, { useState, useEffect } from 'react';
import { FaUserMd, FaVideo, FaPhone, FaStar, FaClock, FaCalendarAlt, FaFilter, FaSearch, FaCheckCircle } from 'react-icons/fa';
import { useLanguage } from '../../context/LanguageContext';

const ExpertConnect = () => {
  const { translate } = useLanguage();
  const [experts, setExperts] = useState([]);
  const [filteredExperts, setFilteredExperts] = useState([]);
  const [selectedExpertise, setSelectedExpertise] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    date: '',
    time: '',
    consultationType: 'video',
    issue: ''
  });

  // Mock expert data
  const mockExperts = [
    {
      id: 1,
      name: 'Dr. Rajesh Sharma',
      expertise: ['Crop Protection', 'Organic Farming'],
      languages: ['Hindi', 'English'],
      experience: '15 years',
      rating: 4.8,
      consultations: 250,
      rate: {
        video: 500,
        audio: 300,
        free: '15 min free consultation on first call'
      },
      availability: ['Mon-Fri: 10AM-6PM', 'Sat: 10AM-2PM'],
      verified: true,
      image: '/api/placeholder/150/150',
      bio: 'Specialized in sustainable farming practices and integrated pest management.'
    },
    {
      id: 2,
      name: 'Dr. Priya Patel',
      expertise: ['Soil Science', 'Water Management'],
      languages: ['Hindi', 'Gujarati', 'English'],
      experience: '12 years',
      rating: 4.9,
      consultations: 180,
      rate: {
        video: 600,
        audio: 400,
        free: '10 min free Q&A daily at 5PM'
      },
      availability: ['Mon-Sat: 9AM-5PM'],
      verified: true,
      image: '/api/placeholder/150/150',
      bio: 'Expert in soil health management and efficient irrigation techniques.'
    },
    {
      id: 3,
      name: 'Agri. Engineer Suresh Kumar',
      expertise: ['Farm Machinery', 'Precision Agriculture'],
      languages: ['Hindi', 'Punjabi'],
      experience: '10 years',
      rating: 4.7,
      consultations: 120,
      rate: {
        video: 400,
        audio: 250,
        free: 'Free group sessions every Sunday'
      },
      availability: ['Tue-Sat: 11AM-7PM'],
      verified: true,
      image: '/api/placeholder/150/150',
      bio: 'Helping farmers adopt modern farming technologies and equipment.'
    }
  ];

  const expertiseCategories = [
    { id: 'all', label: translate('allExperts', 'All Experts') },
    { id: 'crop-protection', label: translate('cropProtection', 'Crop Protection') },
    { id: 'soil-science', label: translate('soilScience', 'Soil Science') },
    { id: 'organic-farming', label: translate('organicFarming', 'Organic Farming') },
    { id: 'water-management', label: translate('waterManagement', 'Water Management') },
    { id: 'farm-machinery', label: translate('farmMachinery', 'Farm Machinery') }
  ];

  useEffect(() => {
    // In real app, fetch from API
    setExperts(mockExperts);
    setFilteredExperts(mockExperts);
  }, []);

  useEffect(() => {
    let filtered = experts;

    if (searchTerm) {
      filtered = filtered.filter(expert =>
        expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expert.expertise.some(exp => exp.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedExpertise !== 'all') {
      filtered = filtered.filter(expert =>
        expert.expertise.some(exp => 
          exp.toLowerCase().replace(' ', '-') === selectedExpertise
        )
      );
    }

    setFilteredExperts(filtered);
  }, [searchTerm, selectedExpertise, experts]);

  const handleBookConsultation = (expert) => {
    setSelectedExpert(expert);
    setShowBookingModal(true);
  };

  const handleSubmitBooking = (e) => {
    e.preventDefault();
    // In real app, submit to API
    alert(translate('bookingSuccess', 'Your consultation has been booked successfully!'));
    setShowBookingModal(false);
    setBookingDetails({
      date: '',
      time: '',
      consultationType: 'video',
      issue: ''
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {translate('connectWithExperts', 'Connect with Agricultural Experts')}
        </h2>
        <p className="text-gray-600">
          {translate('expertDescription', 'Get personalized advice from verified agronomists and agricultural scientists')}
        </p>
      </div>

      {/* Filters */}
      <div className="bg-gray-50 p-4 rounded-lg space-y-4">
        <div className="flex items-center gap-2 text-gray-700 mb-2">
          <FaFilter />
          <span className="font-semibold">{translate('filterExperts', 'Filter Experts')}</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={translate('searchExperts', 'Search experts by name or expertise...')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Expertise Filter */}
          <select
            value={selectedExpertise}
            onChange={(e) => setSelectedExpertise(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            {expertiseCategories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Experts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExperts.map(expert => (
          <div key={expert.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            {/* Expert Header */}
            <div className="flex items-start gap-4 mb-4">
              <img 
                src={expert.image} 
                alt={expert.name}
                className="w-20 h-20 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  {expert.name}
                  {expert.verified && <FaCheckCircle className="text-primary-600 text-sm" />}
                </h3>
                <p className="text-sm text-gray-600">{expert.experience} experience</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1">
                    <FaStar className="text-yellow-500 text-sm" />
                    <span className="text-sm font-medium">{expert.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">({expert.consultations} consultations)</span>
                </div>
              </div>
            </div>

            {/* Expertise */}
            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-700 mb-2">{translate('expertise', 'Expertise')}:</p>
              <div className="flex flex-wrap gap-2">
                {expert.expertise.map((exp, index) => (
                  <span key={index} className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full">
                    {exp}
                  </span>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">{translate('languages', 'Languages')}:</span> {expert.languages.join(', ')}
              </p>
            </div>

            {/* Bio */}
            <p className="text-sm text-gray-600 mb-4">{expert.bio}</p>

            {/* Rates */}
            <div className="border-t pt-4 mb-4">
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <FaVideo className="text-gray-500" />
                    {translate('videoCall', 'Video Call')}
                  </span>
                  <span className="font-semibold">₹{expert.rate.video}/hour</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <FaPhone className="text-gray-500" />
                    {translate('audioCall', 'Audio Call')}
                  </span>
                  <span className="font-semibold">₹{expert.rate.audio}/hour</span>
                </div>
                {expert.rate.free && (
                  <p className="text-xs text-primary-600 italic">{expert.rate.free}</p>
                )}
              </div>
            </div>

            {/* Book Button */}
            <button
              onClick={() => handleBookConsultation(expert)}
              className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors font-semibold"
            >
              {translate('bookConsultation', 'Book Consultation')}
            </button>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {showBookingModal && selectedExpert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4">
              {translate('bookConsultationWith', 'Book Consultation with')} {selectedExpert.name}
            </h3>
            
            <form onSubmit={handleSubmitBooking} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  {translate('consultationType', 'Consultation Type')}
                </label>
                <select
                  value={bookingDetails.consultationType}
                  onChange={(e) => setBookingDetails({...bookingDetails, consultationType: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  <option value="video">{translate('videoCall', 'Video Call')} - ₹{selectedExpert.rate.video}/hour</option>
                  <option value="audio">{translate('audioCall', 'Audio Call')} - ₹{selectedExpert.rate.audio}/hour</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {translate('preferredDate', 'Preferred Date')}
                </label>
                <input
                  type="date"
                  value={bookingDetails.date}
                  onChange={(e) => setBookingDetails({...bookingDetails, date: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {translate('preferredTime', 'Preferred Time')}
                </label>
                <input
                  type="time"
                  value={bookingDetails.time}
                  onChange={(e) => setBookingDetails({...bookingDetails, time: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {translate('describeIssue', 'Describe Your Issue')}
                </label>
                <textarea
                  value={bookingDetails.issue}
                  onChange={(e) => setBookingDetails({...bookingDetails, issue: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 h-24"
                  placeholder={translate('issuePlaceholder', 'Briefly describe what you need help with...')}
                  required
                />
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowBookingModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  {translate('cancel', 'Cancel')}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                  {translate('confirmBooking', 'Confirm Booking')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpertConnect;