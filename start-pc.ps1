# ChungYack PC launcher.
# Opens the same canonical live app used by the APK; local legacy public files are not served.
[CmdletBinding()]
param(
    [switch]$NoBrowser
)
$ErrorActionPreference = 'Stop'
$LiveUrl = 'https://kimjae134679.github.io/stock/chungyack/?pc=1&v=1050'
try {
    Write-Host 'ChungYack PC - LIVE v0.10.5' -ForegroundColor Green
    Write-Host "Opening: $LiveUrl"
    Write-Host 'PC and APK use the same live UI/data source.'
    if (-not $NoBrowser) {
        Start-Process $LiveUrl
    }
} catch {
    Write-Host "[ERROR] $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}
