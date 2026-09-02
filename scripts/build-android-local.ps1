param(
  [switch]$Clean
)
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

Write-Host "[ChungYack] Android local build" -ForegroundColor Cyan
Write-Host "Repo: $root"

if (-not (Get-Command node -ErrorAction SilentlyContinue)) { throw 'Node.js가 없습니다.' }
if (-not (Get-Command npm -ErrorAction SilentlyContinue)) { throw 'npm이 없습니다.' }

$version = (Get-Content "$root\VERSION" -Raw).Trim()
Write-Host "Version: $version"

npm install --no-audit --no-fund
if ($LASTEXITCODE -ne 0) { throw 'npm install failed' }

npm run qa
if ($LASTEXITCODE -ne 0) { throw 'QA failed' }

if ($Clean -and (Test-Path "$root\android")) {
  Write-Host '[ChungYack] Removing generated android directory...'
  Remove-Item "$root\android" -Recurse -Force
}

if (-not (Test-Path "$root\android")) {
  npx cap add android
  if ($LASTEXITCODE -ne 0) { throw 'npx cap add android failed' }
}

npx cap sync android
if ($LASTEXITCODE -ne 0) { throw 'npx cap sync android failed' }

npm run android:brand
if ($LASTEXITCODE -ne 0) { throw 'Android branding failed' }

$sdkPath = $env:ANDROID_HOME
if (-not $sdkPath) { $sdkPath = Join-Path $env:LOCALAPPDATA 'Android\Sdk' }
if (-not (Test-Path -LiteralPath $sdkPath)) { throw "Android SDK가 없습니다: $sdkPath" }
$sdkPropertyPath = $sdkPath.Replace('\', '/')
Set-Content -LiteralPath "$root\android\local.properties" -Value "sdk.dir=$sdkPropertyPath" -Encoding ascii
Write-Host "[ChungYack] Android SDK: $sdkPath"

Push-Location "$root\android"
try {
  .\gradlew.bat assembleDebug
  if ($LASTEXITCODE -ne 0) { throw 'Gradle assembleDebug failed' }
} finally {
  Pop-Location
}

$src = "$root\android\app\build\outputs\apk\debug\app-debug.apk"
if (-not (Test-Path $src)) { throw "APK not found: $src" }
$dist = "$root\dist"
New-Item -ItemType Directory -Force -Path $dist | Out-Null
$dst = "$dist\ChungYack-Radar-v$version-debug.apk"
Copy-Item $src $dst -Force
Write-Host "`nBUILD OK" -ForegroundColor Green
Write-Host $dst -ForegroundColor Green
