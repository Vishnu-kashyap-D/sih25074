-- Database Schema for Krishi Sakhi
-- Run this in your Supabase SQL editor

-- Table to store information about each farm
CREATE TABLE farms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    farmer_id UUID, -- Foreign key to a potential 'farmers' table
    farm_name VARCHAR(255),
    latitude DECIMAL(9, 6) NOT NULL,
    longitude DECIMAL(9, 6) NOT NULL,
    area_acres DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table to cache the results of farm analysis
-- Using a JSONB column is highly efficient for storing complex, structured data.
CREATE TABLE analysis_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    farm_id UUID REFERENCES farms(id) ON DELETE CASCADE,
    report_data JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_farms_location ON farms (latitude, longitude);
CREATE INDEX idx_farms_farmer ON farms (farmer_id);
CREATE INDEX idx_analysis_farm ON analysis_reports (farm_id);
CREATE INDEX idx_analysis_created ON analysis_reports (created_at DESC);

-- Optional: Table for farmers/users
CREATE TABLE farmers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(255) UNIQUE,
    language_preference VARCHAR(10) DEFAULT 'en', -- en for English, expandable for other languages
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Optional: Table for storing recommendations history
CREATE TABLE recommendation_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    farm_id UUID REFERENCES farms(id) ON DELETE CASCADE,
    analysis_report_id UUID REFERENCES analysis_reports(id) ON DELETE CASCADE,
    recommendation_type VARCHAR(50), -- soil, water, nutrient, crop
    recommendation_text TEXT,
    priority VARCHAR(20), -- high, medium, low
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create a view for easy access to recent analyses
CREATE VIEW recent_analyses AS
SELECT 
    f.id as farm_id,
    f.farm_name,
    f.latitude,
    f.longitude,
    f.area_acres,
    ar.report_data,
    ar.created_at as analysis_date
FROM farms f
JOIN analysis_reports ar ON f.id = ar.farm_id
WHERE ar.created_at >= NOW() - INTERVAL '30 days'
ORDER BY ar.created_at DESC;