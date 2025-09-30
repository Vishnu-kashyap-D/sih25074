# Krishi Sakhi - Backend Server

This is the Node.js backend for the Krishi Sakhi application. It provides a REST API for analyzing farm data by fetching information from various geospatial services.

## Features

- 🌍 **Geospatial Analysis**: Fetches soil, vegetation, and groundwater data based on farm coordinates
- 🚀 **High Performance**: Parallel data fetching for fast response times
- 🗄️ **Database Ready**: Includes PostgreSQL schema for Supabase integration
- 🌐 **Bilingual Support**: Returns data in both English and Malayalam
- 📊 **Smart Recommendations**: Generates farming recommendations based on analysis

## API Endpoint

### Analyze Farm
- **Endpoint:** `POST /api/v1/analyze`
- **Description:** Analyzes a farm based on its location and size.

**Request Body (JSON):**
```json
{
  "latitude": 9.9312,
  "longitude": 76.2673,
  "acres": 2.5,
  "farmName": "My Paddy Field" // Optional
}
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "farm_id": "farm_1234567890",
    "farm_name": "My Paddy Field",
    "location": {
      "latitude": 9.9312,
      "longitude": 76.2673,
      "acres": 2.5
    },
    "land_cover": {
      "class": "Agricultural Land",
      "malayalam": "കൃഷിഭൂമി"
    },
    "vegetation_index": {
      "ndvi": 0.78,
      "remark": "Healthy Vegetation",
      "malayalam": "ആരോഗ്യകരമായ സസ്യങ്ങൾ"
    },
    "soil_properties": {
      "texture": "Sandy Loam",
      "malayalam_texture": "മണൽ കലർന്ന പശിമരാശി മണ്ണ്",
      "ph": 6.2,
      "organic_carbon_percent": 1.1
    },
    "nutrient_levels": {
      "nitrogen": "Low",
      "phosphorus": "Medium",
      "potassium": "High",
      "malayalam_nitrogen": "കുറവ്",
      "malayalam_phosphorus": "ഇടത്തരം",
      "malayalam_potassium": "ഉയർന്നത്"
    },
    "groundwater": {
      "depth_meters": 15,
      "availability": "Good",
      "malayalam_availability": "നല്ല ലഭ്യത"
    },
    "recommendations": [
      {
        "type": "nutrient",
        "priority": "high",
        "message": "Low nitrogen levels detected. Apply organic compost or nitrogen-rich fertilizers.",
        "malayalam": "നൈട്രജൻ അളവ് കുറവാണ്. ജൈവ കമ്പോസ്റ്റ് അല്ലെങ്കിൽ നൈട്രജൻ സമൃദ്ധമായ വളങ്ങൾ പ്രയോഗിക്കുക."
      }
    ]
  }
}
```

## Setup and Installation

### Prerequisites
- Node.js (v16 or newer)
- npm or yarn package manager
- (Optional) Supabase account for database integration

### Installation Steps

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Set Up Environment Variables:**
   - Copy `.env.example` to `.env`
   - Add your database connection string (optional for mock data)
   ```
   DATABASE_URL="postgres://postgres:[YOUR-PASSWORD]@[YOUR-SUPABASE-HOST]:5432/postgres"
   PORT=3001
   ```

3. **Set Up Database (Optional):**
   If you have a Supabase account:
   - Go to the **SQL Editor** in your Supabase project
   - Copy the SQL from `schema.sql`
   - Run it to create the required tables

4. **Run the Server:**
   ```bash
   npm start
   ```
   
   For development with auto-reload:
   ```bash
   npm run dev
   ```

The server will run at `http://localhost:3001`

## Project Structure

```
krishi-sakhi-backend/
├── config/
│   └── db.js           # Database connection configuration
├── controllers/
│   └── analysisController.js  # Business logic for analysis
├── routes/
│   └── analysisRoutes.js     # API route definitions
├── services/
│   └── geoApiService.js      # External API integration
├── server.js            # Main application entry point
├── schema.sql          # Database schema
└── package.json        # Dependencies and scripts
```

## Mock Data Mode

The backend currently runs with mock data for demonstration purposes. This allows you to test the application without setting up external API integrations.

To integrate real APIs:
1. Replace the mock functions in `services/geoApiService.js`
2. Add API keys to your `.env` file
3. Update the axios calls to use actual API endpoints

## API Integration Points

### 1. Soil Data (ISRIC SoilGrids)
- Endpoint: `https://rest.isric.org/soilgrids/v2.0/`
- Data: Soil texture, pH, organic carbon, nutrients

### 2. Land Cover & Vegetation (ISRO Bhuvan)
- Endpoint: `https://bhuvan-api.nrsc.gov.in/`
- Data: Land use classification, NDVI

### 3. Groundwater (State/Central Water Boards)
- Various state-specific endpoints
- Data: Water table depth, aquifer information

## Error Handling

The API includes comprehensive error handling:

- **400 Bad Request**: Invalid input parameters
- **500 Internal Server Error**: Server-side errors

All errors return a JSON response with an error message.

## Development

### Running in Development Mode
```bash
npm run dev
```

### Adding New Features
1. Add new service functions in `services/`
2. Update controller logic in `controllers/`
3. Add new routes if needed in `routes/`

### Testing
```bash
# Add your test command here
npm test
```

## Deployment

### Deploying to Heroku
1. Create a new Heroku app
2. Set environment variables
3. Push to Heroku:
   ```bash
   git push heroku main
   ```

### Deploying to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

ISC License

## Support

For issues and questions, please create an issue in the GitHub repository.