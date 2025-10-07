$files = git ls-files --others --exclude-standard

if ($files.Count -eq 0) {
    Write-Host "No untracked files found."
    exit
}

$currentDate = [datetime]"2025-10-07T10:15:00"
$commitsToday = 0
$random = New-Object System.Random

foreach ($f in $files) {
    git add "`"$f`""
    
    $fileName = Split-Path $f -Leaf
    $msg = "Add $fileName"
    
    $gitDate = $currentDate.ToString("yyyy-MM-dd HH:mm:ss")
    $env:GIT_COMMITTER_DATE = $gitDate
    
    Invoke-Expression "git commit -m `"$msg`" --date=`"$gitDate`""
    
    $commitsToday++
    
    if ($commitsToday -ge 3) {
        $daysToSkip = $random.Next(1, 3) # 1 or 2
        $currentDate = $currentDate.AddDays($daysToSkip)
        $currentDate = $currentDate.Date.AddHours($random.Next(9, 18)).AddMinutes($random.Next(0, 60))
        $commitsToday = 0
    } else {
        $currentDate = $currentDate.AddHours($random.Next(1, 4)).AddMinutes($random.Next(10, 50))
    }
}

Write-Host "Done committing $($files.Count) files."
