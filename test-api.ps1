# Test the backend API health endpoint
try {
    $response = Invoke-RestMethod -Uri "http://localhost:3001/api/health" -Method GET
    Write-Host "✅ Backend API is working!"
    Write-Host "Response: $($response | ConvertTo-Json)"
} catch {
    Write-Host "❌ Backend API test failed: $_"
}

# Test a simple file upload
try {
    $filePath = "test-rental-agreement.txt"
    if (Test-Path $filePath) {
        Write-Host "📄 Testing file upload with $filePath"
        $form = @{
            document = Get-Item $filePath
        }
        $response = Invoke-RestMethod -Uri "http://localhost:3001/api/analyze" -Method POST -Form $form
        Write-Host "✅ File upload and analysis successful!"
        Write-Host "Analysis: $($response.analysis.summary)"
    } else {
        Write-Host "❌ Test file not found: $filePath"
    }
} catch {
    Write-Host "❌ File upload test failed: $_"
}