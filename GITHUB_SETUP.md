# GitHub Setup Guide

Denne guide hjælper dig med at sætte projektet op på GitHub og konfigurere automatisk deployment.

## 1. Opret GitHub Repository

1. Gå til [GitHub](https://github.com) og log ind
2. Klik på "New repository"
3. Navngiv dit repository (f.eks. "private-rengoring-platform")
4. Vælg "Public" eller "Private"
5. Klik "Create repository"

## 2. Push kode til GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/dit-brugernavn/dit-repository.git
git push -u origin main
```

## 3. Konfigurer Secrets

Gå til dit repository på GitHub og naviger til Settings > Secrets and variables > Actions.

Tilføj følgende secrets:

- `SUPABASE_URL`: Din Supabase projekt URL
- `SUPABASE_ANON_KEY`: Din Supabase anon key
- `SUPABASE_SERVICE_ROLE_KEY`: Din Supabase service role key
- `JWT_SECRET`: En sikker random string til JWT tokens

## 4. Netlify Integration

1. Gå til [Netlify](https://netlify.com)
2. Klik "New site from Git"
3. Vælg dit GitHub repository
4. Konfigurer build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Tilføj miljøvariabler i Netlify dashboard

## 5. Automatisk Deployment

Nu vil dit site automatisk blive deployed hver gang du pusher til main branch.

## Troubleshooting

- Tjek at alle miljøvariabler er korrekt konfigureret
- Verificer at Supabase database er sat op korrekt
- Kontroller at Netlify Functions er aktiveret