# 🚀 GitHub Setup Guide

## Step 1: Opret GitHub Repository

1. Gå til [github.com](https://github.com) og log ind
2. Klik "New repository" (grøn knap)
3. Repository navn: `privat-rengoring-app`
4. Beskrivelse: `Social platform for rengøringsservices i Danmark - Gratis at bruge`
5. Vælg "Public" (anbefalet for open source)
6. ✅ Tilføj README file
7. ✅ Tilføj .gitignore (Node)
8. ✅ Vælg MIT License (valgfrit)
9. Klik "Create repository"

## Step 2: Upload Projekt til GitHub

### Option A: Via GitHub Web Interface (Nemmest)
1. Download alle filer fra Bolt
2. På din nye repository side, klik "uploading an existing file"
3. Drag & drop alle projekt filer (undtagen node_modules)
4. Skriv commit message: "Initial commit - Privat Rengøring Platform"
5. Klik "Commit changes"

### Option B: Via Git Commands (Avanceret)
```bash
# Klon dit tomme repository
git clone https://github.com/DIT-BRUGERNAVN/privat-rengoring-app.git
cd privat-rengoring-app

# Kopier alle filer fra Bolt til denne mappe
# (undtagen node_modules og .git)

# Tilføj alle filer
git add .

# Commit ændringer
git commit -m "Initial commit - Privat Rengøring Platform"

# Push til GitHub
git push origin main
```

## Step 3: Konfigurer Repository

### Repository Settings
1. Gå til "Settings" tab
2. Under "General" → "Features":
   - ✅ Issues (for bug reports)
   - ✅ Projects (for project management)
   - ✅ Wiki (for dokumentation)

### Branch Protection (Anbefalet)
1. Gå til "Settings" → "Branches"
2. Klik "Add rule"
3. Branch name pattern: `main`
4. ✅ Require pull request reviews
5. ✅ Require status checks to pass

### Topics (Tags)
Tilføj disse topics for bedre synlighed:
- `cleaning-services`
- `social-platform`
- `react`
- `typescript`
- `pwa`
- `denmark`
- `rengoring`

## Step 4: Automatisk Deployment

### Netlify Integration
1. Gå til [netlify.com](https://netlify.com)
2. Klik "New site from Git"
3. Vælg "GitHub"
4. Vælg dit `privat-rengoring-app` repository
5. Build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
6. Klik "Deploy site"

### Auto-Deploy Setup
- ✅ **Auto-deploy** aktiveres automatisk
- ✅ **Hver push til main** deployer automatisk
- ✅ **Preview deploys** for pull requests

## Step 5: Repository Struktur

```
privat-rengoring-app/
├── README.md              # Projekt beskrivelse
├── package.json           # Dependencies
├── index.html            # HTML entry point
├── vite.config.ts        # Vite konfiguration
├── tailwind.config.js    # Tailwind CSS
├── netlify.toml          # Netlify deployment
├── deployment-guide.md   # Deployment guide
├── GITHUB_SETUP.md       # Denne guide
├── .gitignore           # Git ignore filer
├── src/                 # Source kode
│   ├── components/      # React komponenter
│   ├── hooks/          # Custom hooks
│   ├── data/           # Mock data
│   ├── lib/            # Utilities
│   ├── types/          # TypeScript types
│   └── App.tsx         # Main app
├── public/             # Statiske filer
│   ├── manifest.json   # PWA manifest
│   ├── sw.js          # Service worker
│   └── ...            # Ikoner og assets
└── api/               # Backend API (Netlify Functions)
    ├── auth.js        # Authentication
    ├── posts.js       # Posts API
    └── ...            # Andre endpoints
```

## Step 6: Collaboration Setup

### Issues Templates
Opret `.github/ISSUE_TEMPLATE/` med:
- `bug_report.md` - Bug rapporter
- `feature_request.md` - Feature ønsker
- `question.md` - Spørgsmål

### Pull Request Template
Opret `.github/pull_request_template.md`

### Contributing Guidelines
Opret `CONTRIBUTING.md` med bidrag regler

## Step 7: Documentation

### README Badges
Tilføj badges til README.md:
```markdown
![Build Status](https://img.shields.io/netlify/deployment-id)
![License](https://img.shields.io/github/license/username/privat-rengoring-app)
![Stars](https://img.shields.io/github/stars/username/privat-rengoring-app)
```

### Wiki Pages
Opret wiki sider for:
- API Documentation
- Deployment Guide
- User Manual
- Developer Setup

## Step 8: Security

### Secrets Management
1. Gå til "Settings" → "Secrets and variables" → "Actions"
2. Tilføj secrets for:
   - `NETLIFY_AUTH_TOKEN`
   - `NETLIFY_SITE_ID`

### Security Advisories
1. Gå til "Security" tab
2. Aktiver "Security advisories"
3. Aktiver "Dependency graph"

## Step 9: Monitoring

### GitHub Actions (CI/CD)
Opret `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Netlify
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
      with:
        node-version: '18'
    - run: npm install
    - run: npm run build
    - run: npm run lint
```

## ✅ Færdig!

Dit projekt er nu:
- ✅ **Hostet på GitHub** med fuld version kontrol
- ✅ **Auto-deployed** til Netlify
- ✅ **Dokumenteret** med guides og README
- ✅ **Sikret** med branch protection
- ✅ **Overvåget** med GitHub Actions

### 🔗 Links efter setup:
- **GitHub:** `https://github.com/DIT-BRUGERNAVN/privat-rengoring-app`
- **Live site:** `https://DIT-SITE-NAVN.netlify.app`
- **Admin panel:** `https://DIT-SITE-NAVN.netlify.app` (login som admin)

### 📞 Support
Hvis du har problemer med GitHub setup:
- 📧 Email: support@privatrengoring.dk
- 💬 Opret et issue på GitHub repository
- 📖 Læs GitHub dokumentation

**God fornøjelse med dit nye GitHub repository! 🎉**