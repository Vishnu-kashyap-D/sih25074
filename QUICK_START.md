# 🚀 QUICK START GUIDE - Krishi Sakhi

## To Run the Application:

### Method 1: PowerShell (Recommended)
```powershell
# In PowerShell, run:
.\start.ps1
```

### Method 2: Manual Start

**Terminal 1 - Backend:**
```bash
cd krishi-sakhi-backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd krishi-sakhi-frontend  
npm run dev
```

## 📱 How to Use:

1. Wait for both servers to start
2. Open http://localhost:3000 in your browser
3. Click anywhere on the map to select your farm location
4. Use +/- buttons to set farm area (acres)
5. Click "Analyze My Farm" button
6. View the analysis results!

## ✅ Check if Working:

- Backend API: http://localhost:3001 (should show API info)
- Frontend: http://localhost:3000 (should show the app)

## 🔧 If Not Working:

1. Make sure Node.js is installed: `node --version`
2. Kill any process using ports 3000 or 3001
3. Delete node_modules and reinstall:
   ```bash
   # In both frontend and backend folders:
   Remove-Item -Recurse -Force node_modules
   npm install
   ```

## 📌 Features:
- Interactive map (click to select location)
- Farm area adjustment (0.5 to 100 acres)
- Instant analysis with mock data
- Clean, intuitive interface
- Beautiful UI with animations

## 🎯 For SIH Demo:
1. Show the map interaction
2. Demonstrate the analysis process
3. Show the AI chatbot functionality
4. Show the recommendations
5. Explain the architecture