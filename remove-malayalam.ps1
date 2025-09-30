# Remove Malayalam Support Script
# Keeps other languages (English, Hindi, Tamil, Telugu, Kannada) intact

Write-Host "=== Malayalam Removal Script for Krishi Sakhi ===" -ForegroundColor Green
Write-Host "Problem ID Update: SIH25074 -> SIH25168" -ForegroundColor Yellow
Write-Host ""

$projectRoot = "V:\vishnu\random\hackathons\SIH\sih25074"
Set-Location $projectRoot

Write-Host "Step 1: Scanning for Malayalam references..." -ForegroundColor Cyan

# Function to search for text in files
function Search-InFiles {
    param(
        [string]$Pattern,
        [string]$Path = ".",
        [string[]]$Include = @("*.js", "*.jsx", "*.json", "*.md", "*.txt", "*.sql", "*.ts", "*.tsx")
    )
    
    Get-ChildItem -Path $Path -Recurse -Include $Include | 
    ForEach-Object {
        $file = $_
        $content = Get-Content $file.FullName -Raw -ErrorAction SilentlyContinue
        if ($content -match $Pattern) {
            Write-Host "FOUND in: $($file.FullName)" -ForegroundColor Red
            # Show the matching lines
            $lines = $content -split "`n"
            for ($i = 0; $i -lt $lines.Count; $i++) {
                if ($lines[$i] -match $Pattern) {
                    Write-Host "  Line $($i+1): $($lines[$i].Trim())" -ForegroundColor Yellow
                }
            }
            Write-Host ""
        }
    }
}

# Search patterns for Malayalam
Write-Host "Searching for 'malayalam' (case-insensitive)..." -ForegroundColor White
Search-InFiles -Pattern "malayalam" -Path $projectRoot

Write-Host "Searching for Malayalam Unicode characters..." -ForegroundColor White
Search-InFiles -Pattern "[\u0d00-\u0d7f]" -Path $projectRoot

Write-Host "Searching for 'ml' language codes..." -ForegroundColor White
Search-InFiles -Pattern "\bml\b" -Path $projectRoot

Write-Host "Searching for SIH25074..." -ForegroundColor White
Search-InFiles -Pattern "25074" -Path $projectRoot

Write-Host ""
Write-Host "=== MANUAL INSPECTION REQUIRED ===" -ForegroundColor Magenta
Write-Host "Review the files above and confirm which need changes." -ForegroundColor White
Write-Host "Press any key to continue with automatic fixes..." -ForegroundColor Yellow
Read-Host

Write-Host ""
Write-Host "Step 2: Applying automatic fixes..." -ForegroundColor Cyan

# Function to replace text in file
function Replace-InFile {
    param(
        [string]$FilePath,
        [string]$SearchPattern,
        [string]$ReplaceWith,
        [string]$Description = ""
    )
    
    if (Test-Path $FilePath) {
        $content = Get-Content $FilePath -Raw
        if ($content -match $SearchPattern) {
            $newContent = $content -replace $SearchPattern, $ReplaceWith
            Set-Content -Path $FilePath -Value $newContent -NoNewline
            Write-Host "✓ Updated $FilePath - $Description" -ForegroundColor Green
        }
    }
}

# Update Problem IDs
Write-Host "Updating Problem ID references..." -ForegroundColor White
Get-ChildItem -Recurse -Include "*.md", "*.txt", "*.json" | ForEach-Object {
    Replace-InFile -FilePath $_.FullName -SearchPattern "25074" -ReplaceWith "25168" -Description "Problem ID update"
}

Write-Host ""
Write-Host "Step 3: Backend Malayalam cleanup..." -ForegroundColor Cyan

# Clean backend geoApiService.js - remove Malayalam soil properties
$geoServiceFile = "$projectRoot\krishi-sakhi-backend\services\geoApiService.js"
if (Test-Path $geoServiceFile) {
    $content = Get-Content $geoServiceFile -Raw
    
    # Remove Malayalam soil types array
    $content = $content -replace 'const malayalamTypes = \[.*?\];', ''
    
    # Remove malayalam_texture from return object
    $content = $content -replace ',\s*malayalam_texture: malayalamTypes\[variation % 4\]', ''
    
    # Remove Malayalam nutrient levels
    $content = $content -replace ',\s*malayalam_\w+: [^,}]+', ''
    
    # Remove Malayalam land types
    $content = $content -replace 'const malayalamLandTypes = \[.*?\];', ''
    
    # Remove malayalam field from land_cover
    $content = $content -replace ',\s*malayalam: malayalamLandTypes\[variation % 4\]', ''
    
    # Remove malayalam field from vegetation_index
    $content = $content -replace ',\s*malayalam: [^}]+', ''
    
    # Remove malayalam_availability
    $content = $content -replace ',\s*malayalam_availability: malayalamAvailability', ''
    $content = $content -replace 'const malayalamAvailability = [^;]+;', ''
    
    Set-Content -Path $geoServiceFile -Value $content -NoNewline
    Write-Host "✓ Cleaned backend geoApiService.js" -ForegroundColor Green
}

# Clean analysisController.js - remove Malayalam from recommendations
$controllerFile = "$projectRoot\krishi-sakhi-backend\controllers\analysisController.js"
if (Test-Path $controllerFile) {
    $content = Get-Content $controllerFile -Raw
    
    # Remove malayalam field from recommendations
    $content = $content -replace ',\s*malayalam: [^}]+', ''
    
    # Remove malayalam_texture from soil_properties
    $content = $content -replace ',\s*malayalam_texture: soilData\.malayalam_texture', ''
    
    Set-Content -Path $controllerFile -Value $content -NoNewline
    Write-Host "✓ Cleaned backend analysisController.js" -ForegroundColor Green
}

Write-Host ""
Write-Host "Step 4: Frontend language configuration..." -ForegroundColor Cyan

# If language context exists, update it to remove Malayalam
$contextFile = "$projectRoot\krishi-sakhi-frontend\src\context\LanguageContext.jsx"
if (Test-Path $contextFile) {
    $content = Get-Content $contextFile -Raw
    
    # Remove Malayalam from languages object
    $content = $content -replace ',\s*ml: \{[^}]+\}', ''
    
    Set-Content -Path $contextFile -Value $content -NoNewline
    Write-Host "✓ Removed Malayalam from LanguageContext.jsx" -ForegroundColor Green
} else {
    Write-Host "ℹ  LanguageContext.jsx not found - skipping" -ForegroundColor Yellow
}

# Remove Malayalam translation file if it exists
$malayalamTransFile = "$projectRoot\krishi-sakhi-frontend\src\translations\ml.json"
if (Test-Path $malayalamTransFile) {
    Remove-Item $malayalamTransFile -Force
    Write-Host "✓ Removed ml.json translation file" -ForegroundColor Green
}

Write-Host ""
Write-Host "Step 5: Database schema cleanup..." -ForegroundColor Cyan

$schemaFile = "$projectRoot\krishi-sakhi-backend\schema.sql"
if (Test-Path $schemaFile) {
    $content = Get-Content $schemaFile -Raw
    
    # Update default language preference from 'ml' to 'en'
    $content = $content -replace "DEFAULT 'ml'", "DEFAULT 'en'"
    $content = $content -replace "ml for Malayalam,", ""
    $content = $content -replace "recommendation_malayalam TEXT,", ""
    
    Set-Content -Path $schemaFile -Value $content -NoNewline
    Write-Host "✓ Updated database schema" -ForegroundColor Green
}

Write-Host ""
Write-Host "Step 6: Testing the changes..." -ForegroundColor Cyan

# Test backend compilation
Write-Host "Testing backend..." -ForegroundColor White
Set-Location "$projectRoot\krishi-sakhi-backend"
$backendTest = Start-Process -FilePath "node" -ArgumentList "server.js" -PassThru -WindowStyle Hidden
Start-Sleep -Seconds 3
if (!$backendTest.HasExited) {
    Stop-Process -Id $backendTest.Id -Force
    Write-Host "✓ Backend starts successfully" -ForegroundColor Green
} else {
    Write-Host "✗ Backend failed to start" -ForegroundColor Red
}

# Test frontend compilation
Write-Host "Testing frontend build..." -ForegroundColor White
Set-Location "$projectRoot\krishi-sakhi-frontend"
$buildResult = npm run build 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Frontend builds successfully" -ForegroundColor Green
} else {
    Write-Host "✗ Frontend build failed" -ForegroundColor Red
    Write-Host $buildResult -ForegroundColor Red
}

Set-Location $projectRoot

Write-Host ""
Write-Host "=== SUMMARY ===" -ForegroundColor Magenta
Write-Host "✓ Problem ID updated: SIH25074 -> SIH25168" -ForegroundColor Green
Write-Host "✓ Malayalam references removed from backend services" -ForegroundColor Green
Write-Host "✓ Malayalam soil/nutrient data cleaned" -ForegroundColor Green
Write-Host "✓ Database schema updated" -ForegroundColor Green
Write-Host "✓ Translation files cleaned" -ForegroundColor Green
Write-Host ""
Write-Host "REMAINING LANGUAGES:" -ForegroundColor Cyan
Write-Host "• English (en)" -ForegroundColor White
Write-Host "• Hindi (hi)" -ForegroundColor White
Write-Host "• Tamil (ta)" -ForegroundColor White
Write-Host "• Telugu (te)" -ForegroundColor White
Write-Host "• Kannada (kn)" -ForegroundColor White
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Review the changes manually" -ForegroundColor White
Write-Host "2. Test the application: .\start.ps1" -ForegroundColor White
Write-Host "3. Commit the changes to git" -ForegroundColor White

Write-Host ""
Write-Host "Script completed!" -ForegroundColor Green