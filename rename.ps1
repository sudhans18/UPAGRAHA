
$path = "c:\MyCareer\UPAGRAHA\assets\frames"
$files = Get-ChildItem -Path $path -Filter "*.webp" | Sort-Object Name

# Counter starts at 1
$i = 1

foreach ($file in $files) {
    # New name format frame_001.webp
    $newName = "frame_{0:D3}.webp" -f $i
    $newPath = Join-Path -Path $path -ChildPath $newName
    
    Write-Host "Renaming $($file.Name) to $newName"
    try {
        Move-Item -LiteralPath $file.FullName -Destination $newPath -Force
    } catch {
        Write-Error "Failed to rename $($file.Name): $_"
    }
    $i++
}
