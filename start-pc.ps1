# ChungYack PC launcher.
# The PC view now opens the same canonical live app used by the APK, so stale local public files cannot drift behind.
[CmdletBinding()]
param(
    [switch]$NoBrowser
)
$ErrorActionPreference = 'Stop'
$LiveUrl = 'https://kimjae134679.github.io/stock/chungyack/?pc=1'
try {
    Write-Host 'ChungYack PC - LIVE' -ForegroundColor Green
    Write-Host "Opening: $LiveUrl"
    Write-Host 'PC and APK now use the same live UI/data source.'
    if (-not $NoBrowser) {
        Start-Process $LiveUrl
    }
} catch {
    Write-Host "[ERROR] $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}
