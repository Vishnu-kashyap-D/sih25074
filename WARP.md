# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Krishi Sakhi is an agricultural technology platform built for Smart India Hackathon 2025 (Problem ID: SIH25168). It provides instant farm land profiling and analysis using geospatial data integration. The system helps farmers understand their land through scientific data analysis and AI-powered recommendations.

## Common Development Commands

### Quick Start
```bash
# Start both frontend and backend in development mode
# From project root:
cd krishi-sakhi-backend && npm start &
cd ../krishi-sakhi-frontend && npm run dev
```

### Frontend Development
```bash
cd krishi-sakhi-frontend

# Install dependencies
npm install

# Run development server (Vite)
npm run dev

# Build for production  
npm run build

# Lint code
npm run lint

# Preview production build
npm run preview
```

### Backend Development  
```bash
cd krishi-sakhi-backend

# Install dependencies
npm install

# Run server (production mode)
npm start

# Run server with auto-reload (development)
npm run dev

# No test suite configured yet
```

### Single Test/Component Development
- Frontend uses Vite for hot reloading - changes are reflected immediately
- Backend uses nodemon in dev mode for auto-restart on file changes
- No formal test suite exists yet - relies on manual testing via API endpoints

## High-Level Architecture

### System Architecture
The application follows a microservices-inspired architecture with clear separation between frontend, backend API, and data layers:

```
Frontend (React/Vite) ↔ Backend API (Express) ↔ Database (SQLite) 
                               ↓
                      External Services (Gemini AI, Mock Geospatial APIs)
```

### Frontend Architecture (React + Vite)
- **Framework**: React 18 with functional components and hooks
- **Routing**: React Router v6 for SPA navigation
- **Styling**: Tailwind CSS with custom primary color scheme
- **State Management**: React Context for language switching, local state for components
- **Map Integration**: Leaflet with React-Leaflet for interactive mapping
- **Charts**: Chart.js with react-chartjs-2 for data visualization
- **API Client**: Axios for HTTP requests

**Key Frontend Patterns**:
- Page-based routing (`/pages/` directory)
- Reusable components (`/components/` directory) 
- Context providers for global state (LanguageContext)
- Service layer pattern (`/api/` directory) for API calls

### Backend Architecture (Node.js + Express)
- **Framework**: Express.js with RESTful API design
- **Database**: SQLite with Sequelize ORM
- **Authentication**: JWT-based with bcrypt for password hashing
- **AI Integration**: Google Gemini API for agricultural chatbot
- **Security**: Helmet, CORS, rate limiting, request logging with Morgan

**Key Backend Patterns**:
- MVC pattern: Routes → Controllers → Services → Models
- Middleware chain for authentication, logging, error handling
- Service layer for external API integration (chatbot, geospatial)
- Conditional route loading to handle missing features gracefully

### Database Design
Uses SQLite with Sequelize ORM featuring:
- User management with authentication
- Chat message history with session tracking
- Marketplace products and categories
- Weather data caching
- Model associations defined separately in `/models/associations.js`

### External Service Integration
- **Gemini AI**: Powers the agricultural chatbot with farming-specific prompts
- **Mock Geospatial APIs**: Simulates ISRO Bhuvan, ISRIC SoilGrids for farm analysis
- **Weather Services**: Placeholder for IMD weather integration
- **Future APIs**: Ready for real ISRO, ISRIC, State Water Board integration

### Key Business Logic
- **Farm Analysis**: Click-to-analyze workflow using coordinates and farm size
- **AI Chatbot**: Context-aware agricultural advice with conversation history
- **Multi-language Support**: Expandable system (currently English focus)
- **Marketplace**: Product listings for agricultural goods
- **User Profiles**: Farmer account management and farm history

## Development Notes

### Environment Setup
- Frontend runs on port 3000 (Vite default)
- Backend runs on port 3001
- SQLite database stored in `krishi-sakhi-backend/database/`
- Environment variables in `.env` files (see `.env.example` in backend)

### Current State
- Uses mock data for geospatial analysis (realistic simulations)
- Gemini AI integration is functional for chatbot
- Authentication system is implemented but not fully integrated in frontend
- Database migrations handled by Sequelize sync

### Key Configuration Files
- `vite.config.js` - Frontend build configuration
- `tailwind.config.js` - Styling system configuration  
- `package.json` files - Dependencies and scripts
- `.env` files - Environment variables for API keys and database paths

## API Endpoints Structure

### Core Analysis API
- `POST /api/v1/analyze` - Farm analysis with lat/lng coordinates

### Authentication API
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login  
- `GET /api/auth/profile` - User profile

### Chatbot API
- `POST /api/chat/message` - Send message to AI
- `GET /api/chat/history/:sessionId` - Conversation history
- `GET /api/chat/popular-questions` - Predefined questions

### Additional APIs
- Marketplace, Weather, Language support endpoints available

The codebase is structured for easy horizontal scaling and feature addition, with clear separation of concerns and modular design patterns throughout.