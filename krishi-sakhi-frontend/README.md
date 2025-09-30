<<<<<<< HEAD
# Krishi Sakhi Frontend - Smart Farm Analysis Platform 🌱

![Krishi Sakhi](https://img.shields.io/badge/Krishi-Sakhi-green)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![Vite](https://img.shields.io/badge/Vite-5.4.20-purple)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-cyan)

A comprehensive agricultural platform designed for Indian farmers, providing AI-powered assistance, marketplace features, weather information, and farm analysis tools.

## 🚀 Features

### 1. **AI-Powered Chatbot** 🤖
- Integrated with Google Gemini AI (gemini-2.0-flash model)
- Bilingual support (English and Malayalam)
- Agricultural expertise for crop management, pest control, and farming techniques
- Context-aware conversations

### 2. **Marketplace** 🛒
- Browse and list agricultural products
- Product images with smart fallback system
- Category filtering and search functionality
- Price negotiation indicators
- Seller ratings and location information

### 3. **Comprehensive Profile Dashboard** 📊
- **Dashboard Tab**: Overview of earnings, orders, listings, and ratings
- **Activity Tab**: Timeline of recent activities
- **Analytics Tab**: Performance metrics and resource usage
- **Achievements Tab**: Gamified achievement system
- Profile statistics including:
  - Total earnings and monthly income
  - Order management
  - Product listings
  - Customer ratings
  - AI consultation usage

### 4. **Farm Analysis** 🌾
- Smart farm land analysis tools
- Crop recommendations
- Soil health monitoring
- Yield predictions

### 5. **Weather Information** ☁️
- Real-time weather updates
- Agricultural weather advisories
- Seasonal forecasting
- Location-based weather alerts

## 🛠️ Tech Stack

- **Frontend Framework**: React 18.3.1
- **Build Tool**: Vite 5.4.20
- **Styling**: TailwindCSS
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **AI Integration**: Google Gemini AI API
- **Icons**: React Icons
- **Charts**: Chart.js + React-ChartJS-2
- **Maps**: React Leaflet

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Google Gemini API Key

## 🔧 Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/krishi-sakhi-frontend.git
cd krishi-sakhi-frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env` file in the root directory:
```env
# Gemini API Configuration
VITE_GEMINI_API_KEY=your_gemini_api_key_here

# Backend API URL (optional - app works with mock data if backend is unavailable)
VITE_API_URL=http://localhost:3001/api

# Environment
NODE_ENV=development
```

4. **Start the development server**
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 📱 Features Overview

### Authentication
- User registration with email verification
- Secure login system
- Guest access option
- Local storage fallback for demo purposes

### User Interface
- Responsive design for mobile and desktop
- Bilingual support (English and Malayalam)
- Modern, clean UI with TailwindCSS
- Smooth animations and transitions

### Mock Data
The application includes comprehensive mock data for:
- 8 sample products in the marketplace
- User profiles and statistics
- Recent activities and achievements
- Performance analytics

## 🏗️ Project Structure

```
krishi-sakhi-frontend/
├── src/
│   ├── api/
│   │   ├── client.js          # Axios client configuration
│   │   ├── gemini.js          # Gemini AI integration
│   │   ├── mockData.js        # Mock data for marketplace
│   │   └── services.js        # API service functions
│   ├── assets/
│   │   └── placeholder-product.svg
│   ├── components/
│   │   ├── Header.jsx         # Main header with user menu
│   │   ├── Navigation.jsx     # Navigation bar
│   │   ├── ChatMessage.jsx    # Chat message component
│   │   ├── ChatInput.jsx      # Chat input component
│   │   ├── ProductCard.jsx    # Product display card
│   │   └── ...
│   ├── pages/
│   │   ├── LoginPage.jsx      # User login
│   │   ├── SignupPage.jsx     # User registration
│   │   ├── ProfilePage.jsx    # Comprehensive dashboard
│   │   ├── ChatbotPage.jsx    # AI assistant
│   │   ├── MarketplacePage.jsx # Product marketplace
│   │   ├── WeatherPage.jsx    # Weather information
│   │   └── FarmAnalysisPage.jsx
│   ├── App.jsx                # Main app component
│   ├── main.jsx               # App entry point
│   └── index.css              # Global styles
├── public/
├── .env                       # Environment variables
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GEMINI_API_KEY` | Google Gemini API key for AI features | Yes |
| `VITE_API_URL` | Backend API URL | No (uses mock data) |

## 📝 Key Features Implementation

### Gemini AI Integration
- Model: `gemini-2.0-flash`
- Supports agricultural queries in English and Malayalam
- Context-aware responses
- Rate limiting and error handling

### Marketplace Mock Data
- 8 pre-configured products
- Smart image loading with Unsplash integration
- Fallback to placeholder images
- Category filtering

### Profile Dashboard
- 4 main sections: Dashboard, Activity, Analytics, Achievements
- Real-time statistics
- Progress tracking
- Achievement system

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🐛 Known Issues

- Backend API integration is optional - app works with local storage and mock data
- Gemini API requires valid API key for chatbot functionality
- Some features may require backend implementation for production use

## 📞 Support

For support, email support@krishisakhi.com or join our Slack channel.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with ❤️ for Indian Farmers 🌾
- Thanks to Google Gemini AI for powering our chatbot
- Icons by React Icons
- UI components styled with TailwindCSS

---

**Note**: This is a frontend application that can work independently with mock data. For production deployment, integrate with the backend API for full functionality.
=======
# sih25168
>>>>>>> 4a5124f0120430258c0ced712a51122fc7d75f7b
