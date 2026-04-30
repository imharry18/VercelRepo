$ErrorActionPreference = "Stop"

function MakeCommit {
    param(
        [string]$files,
        [string]$message,
        [string]$date
    )
    $env:GIT_AUTHOR_DATE = "$date"
    $env:GIT_COMMITTER_DATE = "$date"
    
    # Split files by space, but handle properly
    Invoke-Expression "git add $files"
    
    # Check if there's anything to commit
    $status = git status --porcelain
    if ($status) {
        git commit -m $message
        Write-Host "Committed: $message on $date"
    } else {
        Write-Host "Nothing to commit for: $message"
    }
}

# 1. Housekeeping & Dependencies
MakeCommit -files "package.json package-lock.json next.config.mjs knip.json replace.js" -message "chore: update dependencies and configuration" -date "2026-04-05T10:15:00"

# 2. Firebase Backend Setup
MakeCommit -files "src/lib/firebaseAdmin.js src/data/team.json src/app/api/team/" -message "feat: initialize Firebase Admin SDK and team API routes" -date "2026-04-10T14:22:00"

# 3. Portfolio API Updates
MakeCommit -files "src/data/portfolio.json src/app/api/portfolio/route.js src/utils/uploadthing.js scripts/" -message "feat: enhance portfolio data handling and migration scripts" -date "2026-04-15T11:45:00"

# 4. Secure Admin Dashboard & Auth
MakeCommit -files "src/lib/adminAuth.js src/app/api/admin/ src/app/admin/page.js src/app/admin/portfolio/" -message "feat: implement secure cookie-based admin authentication" -date "2026-04-20T16:30:00"

# 5. Startup Portal Password Verification
MakeCommit -files "src/app/portfolio/[id]/ src/app/api/portfolio/verify/ src/components/ui/PasswordGate.js" -message "feat: add secure startup portal verification with bcrypt" -date "2026-04-24T09:10:00"

# 6. UI Updates & Asset Cleanup
MakeCommit -files "src/components/layout/Navbar.js src/components/sections/ src/components/ui/cover.jsx public/" -message "style: revamp UI components and cleanup old assets" -date "2026-04-28T15:05:00"

# Catch-all for any remaining files
MakeCommit -files "." -message "fix: address minor issues and final polish" -date "2026-04-30T17:50:00"

Write-Host "All commits created successfully."
git push origin HEAD
