# 🚀 Deployment Guide - GitHub + Netlify

## Step 1: Download Project
1. Download alle filer fra Bolt til en mappe på din computer
2. Eller klon dette repository

## Step 2: GitHub Setup
1. Gå til [github.com](https://github.com) og log ind
2. Klik "New repository" (grøn knap)
3. Repository navn: `private-rengoring-app`
4. Beskrivelse: `Social platform for rengøringsservices i Danmark`
5. Vælg "Public" (eller Private hvis du vil)
6. Klik "Create repository"

## Step 3: Upload til GitHub

### Option A: Via GitHub Web Interface (Nemmest)
1. På din nye repository side, klik "uploading an existing file"
2. Drag & drop alle dine projekt filer
3. Skriv commit message: "Initial commit - Privat Rengøring App"
4. Klik "Commit changes"

### Option B: Via Git Commands (Avanceret)
```bash
git init
git add .
git commit -m "Initial commit - Private Rengøring App"
git branch -M main
git remote add origin https://github.com/DIT-BRUGERNAVN/private-rengoring-app.git
git push -u origin main
```
# Ingen environment variables påkrævet for basic funktionalitet
# DATABASE_URL=your_database_url (kun hvis du bruger database)
# JWT_SECRET=your_jwt_secret (kun hvis du bruger authentication)
## Step 4: Netlify Deployment
1. Gå til [netlify.com](https://netlify.com)
2. Klik "Sign up" og vælg "GitHub" login
3. Klik "New site from Git"
4. Vælg "GitHub" som provider
5. Find og vælg dit `private-rengoring-app` repository
6. Deployment settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Node version:** 18
7. Klik "Deploy site"

## Step 5: Custom Domain (Valgfrit)
1. I Netlify dashboard, gå til "Domain settings"
2. Klik "Add custom domain"
3. Indtast dit domæne (f.eks. privatrengoring.dk)
4. Følg DNS instruktioner

## Step 6: Environment Variables
1. I Netlify dashboard, gå til "Site settings" → "Environment variables"
2. Tilføj:
   - `VITE_STRIPE_PUBLISHABLE_KEY` = dit Stripe publishable key
   - `DATABASE_URL` = din PostgreSQL database connection string
   - `JWT_SECRET` = en sikker random string til JWT tokens (mindst 32 karakterer)
   - `NODE_ENV` = production

## Step 7: SSL Certificate
1. Netlify aktiverer automatisk HTTPS
2. Vent 1-2 minutter på SSL certificate

## ✅ Færdig!
Din app er nu live på: `https://DIT-SITE-NAVN.netlify.app`

## 🔄 Fremtidige Updates
1. Lav ændringer i koden
2. Push til GitHub: `git push`
3. Netlify deployer automatisk!

## 🛠️ Troubleshooting

### Build Fejl
- Check Node version er 18+
- Sørg for alle dependencies er i package.json
- Check build logs i Netlify

### 404 Fejl
- Sørg for netlify.toml er uploaded
- Check redirects er konfigureret korrekt

### PWA Problemer
- Sørg for manifest.json og sw.js er i public/
- Check HTTPS er aktiveret

## 📞 Hjælp
Hvis du har problemer, spørg mig i Bolt! 😊

### 📞 Support
Hvis du har problemer med GitHub setup:
- 📧 Email: support@privatrengoring.dk
- 💬 Opret et issue på GitHub repository