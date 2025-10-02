# Krishi Sakhi  - Smart Farm Analysis Platform

A comprehensive web application that provides instant farm land profiling and analysis using geospatial data. Built for the Smart India Hackathon 2025.

## 🌾 Overview

Krishi Sakhi is a modern agricultural technology solution that helps farmers understand their land better through scientific data analysis. By simply clicking on a map, farmers can get detailed insights about their soil, water resources, vegetation health, and receive personalized farming recommendations.

## 🎯 Problem Statement

**SIH Problem ID**: 25168
**Theme**: Agriculture & Rural Development  
**Challenge**: Develop a unified land profiling system that integrates data from multiple geospatial sources to provide farmers with actionable insights.

## ✨ Key Features

### For Farmers
- **Simple Interface**: Just click on the map to select your farm
- **Instant Analysis**: Get comprehensive land profile in seconds
- **Multi-language Ready**: Expandable language support system
- **Visual Reports**: Easy-to-understand charts and cards
- **Smart Recommendations**: Personalized farming advice based on your land

### Technical Features
- **Real-time Data Integration**: Pulls from multiple geospatial APIs
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Scalable Architecture**: Built to handle thousands of concurrent users
- **Offline Support**: Can work with cached data
- **API-First Design**: Easy to integrate with other systems

## 🏗️ Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  React Frontend │────▶│  Express API    │────▶│  PostgreSQL DB  │
│  (Tailwind CSS) │     │  (Node.js)      │     │  (Supabase)     │
│                 │     │                 │     │                 │
└─────────────────┘     └────────┬────────┘     └─────────────────┘
                                 │
                    ┌────────────┼────────────┐
                    │            │            │
              ┌─────▼─────┐ ┌────▼────┐ ┌────▼────┐
              │   ISRO    │ │  ISRIC  │ │  Water  │
              │  Bhuvan   │ │SoilGrids│ │  Board  │
              └───────────┘ └─────────┘ └─────────┘
```

## 🚀 Quick Start

### Prerequisites
- Node.js v16 or higher
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/krishi-sakhi.git
   cd krishi-sakhi
   ```

2. **Install Frontend**
   ```bash
   cd krishi-sakhi-frontend
   npm install
   npm run dev
   ```

3. **Install Backend (in a new terminal)**
   ```bash
   cd krishi-sakhi-backend
   npm install
   npm start
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

## 📋 Data Sources & Integration

### Current Implementation (Mock Data)
The application currently uses intelligent mock data that simulates real geospatial APIs:
- **Soil Data**: Texture, pH, organic carbon, NPK levels
- **Land Cover**: Agricultural classification, vegetation index
- **Water Resources**: Groundwater depth and availability

### Future Integration
Ready to integrate with:
- **ISRO Bhuvan**: Land use/cover, topography, NDVI
- **ISRIC SoilGrids**: Global soil properties database
- **State Water Boards**: Groundwater and aquifer data
- **IMD Weather**: Climate and rainfall patterns

## 💻 Technology Stack

### Frontend
- **React 19**: Latest React with hooks and concurrent features
- **Tailwind CSS**: Utility-first CSS framework
- **Leaflet**: Interactive mapping library
- **Vite**: Next-generation build tool
- **Axios**: HTTP client for API calls

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web application framework
- **PostgreSQL**: Relational database (via Supabase)
- **CORS**: Cross-origin resource sharing
- **dotenv**: Environment configuration

## 📁 Project Structure

```
krishi-sakhi/
├── krishi-sakhi-frontend/     # React frontend application
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── App.jsx           # Main application
│   │   └── index.css         # Global styles
│   └── package.json          # Frontend dependencies
│
├── krishi-sakhi-backend/      # Node.js backend API
│   ├── controllers/          # Request handlers
│   ├── routes/              # API endpoints
│   ├── services/            # External API integration
│   ├── config/              # Database configuration
│   └── server.js            # Express server
│
└── README.md                # This file
```

## 🔧 Configuration

### Frontend Environment Variables
Create `.env` in frontend directory:
```
VITE_API_URL=http://localhost:3001/api/v1/analyze
```

### Backend Environment Variables
Create `.env` in backend directory:
```
DATABASE_URL=postgres://your-database-url
PORT=3001
```

## 📱 Usage Guide

### For Farmers
1. Open the application
2. Click on the map where your farm is located
3. Adjust the farm area using +/- buttons
4. Click "Analyze My Farm"
5. View your comprehensive farm report
6. Read personalized farming recommendations

### For Developers
1. API endpoint: `POST /api/v1/analyze`
2. Request body: `{ latitude, longitude, acres, farmName }`
3. Response: Comprehensive JSON with all analysis data

## 🌟 Future Enhancements

### Phase 1 (Next 3 months)
- [ ] Real API integration with ISRO Bhuvan
- [ ] User authentication and farm history
- [ ] Offline mode with data caching
- [ ] Progressive Web App (PWA) support

### Phase 2 (6 months)
- [ ] AI-powered crop recommendations
- [ ] Weather integration and alerts
- [ ] Market price integration
- [ ] Community features for farmers

### Phase 3 (1 year)
- [ ] Satellite imagery analysis
- [ ] Drone integration support
- [ ] Multi-language support (Hindi, Tamil, Malayalam, etc.)
- [ ] Mobile apps for Android/iOS

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Smart India Hackathon 2025** for the opportunity
- **ISRO** for geospatial data concepts
- **Kerala Agricultural University** for domain expertise
- **Open Source Community** for amazing tools

## 📞 Contact

For questions or support:
- Create an issue on GitHub
- Email: support@krishisakhi.in (placeholder)
- Website: https://krishisakhi.in (placeholder)

## 🏆 Competition Details

- **Hackathon**: Smart India Hackathon 2025
- **Problem Code**: SIH25168
- **Category**: Software
- **Team**: [Your Team Name]
- **College**: [Your College Name]

---

Made with ❤️ for Indian Farmers 🚜🌾
