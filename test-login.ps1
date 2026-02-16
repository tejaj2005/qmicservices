$body = @{
    email = "government@user.in"
    password = "Password12"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "https://qmicservices.vercel.app/api/auth/login" -Method Post -ContentType "application/json" -Body $body
    Write-Host "SUCCESS:" ($response | ConvertTo-Json)
} catch {
    $statusCode = $_.Exception.Response.StatusCode
    Write-Host "STATUS: $statusCode"
    $stream = $_.Exception.Response.GetResponseStream()
    $reader = New-Object System.IO.StreamReader($stream)
    $responseBody = $reader.ReadToEnd()
    Write-Host "BODY: $responseBody"
}
