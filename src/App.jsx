import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Navigation from './components/Navigation';
import FarmAnalysisPage from './pages/FarmAnalysisPage';
import ChatbotPage from './pages/ChatbotPage';
import MarketplacePage from './pages/MarketplacePage';
import WeatherPage from './pages/WeatherPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  const location = useLocation();
  const hideNavigation = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      <Header />
      {!hideNavigation && <Navigation />}
      
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/" element={<FarmAnalysisPage />} />
        <Route path="/chatbot" element={<ChatbotPage />} />
        <Route path="/marketplace" element={<MarketplacePage />} />
        <Route path="/marketplace/:id" element={<div className="p-8">Product Detail Coming Soon</div>} />
        <Route path="/marketplace/create" element={<div className="p-8">Create Product Coming Soon</div>} />
        <Route path="/weather" element={<WeatherPage />} />
      </Routes>
    </div>
  );
}

export default App;