# Copy assets from the static site to the Astro public folder
# Run this from the klfocus root directory

$source = "klfocus\assets"
$destination = "astro\public\assets"

if (Test-Path $source) {
    Write-Host "Copying assets from $source to $destination..."
    Copy-Item -Path $source\* -Destination $destination -Recurse -Force
    Write-Host "✅ Assets copied successfully!"
} else {
    Write-Host "❌ Source folder 'klfocus\assets' not found. Make sure you're in the klfocus root directory."
}
