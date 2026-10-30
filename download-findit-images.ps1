# Run this script from the FindIt project root (the folder containing client/).
$assetDir = Join-Path (Get-Location) 'client\src\assets'
New-Item -ItemType Directory -Force -Path $assetDir | Out-Null

$images = @(
    @{ Name = 'campus.jpg'; Url = 'https://www.rit.edu/sites/rit.edu/files/styles/full/https/cdn.rit.edu/images/news/2019-11/Makerspace.jpg?itok=TxcbBY5S' },
    @{ Name = 'wallet.jpg'; Url = 'https://images.unsplash.com/photo-1639789972200-4c5dafacb6fd?fm=jpg&q=85&w=1200' },
    @{ Name = 'headphones.jpg'; Url = 'https://images.unsplash.com/photo-1505751171710-1f6d0ace5a85?fm=jpg&q=85&w=1200' },
    @{ Name = 'smartwatch.jpg'; Url = 'https://images.unsplash.com/photo-1624096104992-9b4fa3a279dd?fm=jpg&q=85&w=1200' },
    @{ Name = 'notebook.jpg'; Url = 'https://papierniczeni.pl/cdn/shop/files/2305_domowebiuro_01.jpg?v=1686736060&width=1800' }
)

foreach ($image in $images) {
    $destination = Join-Path $assetDir $image.Name
    try {
        Invoke-WebRequest -Uri $image.Url -OutFile $destination -UseBasicParsing
        Write-Host "Downloaded $($image.Name)" -ForegroundColor Green
    }
    catch {
        Write-Host "Could not download $($image.Name): $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "`nImages folder: $assetDir" -ForegroundColor Cyan
