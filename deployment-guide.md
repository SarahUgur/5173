# Deployment Guide

Denne guide beskriver hvordan du deployer Private Rengøring platformen til produktion.

## Forudsætninger

- Supabase projekt oprettet og konfigureret
- Netlify konto
- GitHub repository med koden

## 1. Supabase Setup

### Database Schema
Kør følgende SQL i Supabase SQL Editor:

```sql
-- Se supabase/migrations/ for komplette database scripts
```

### Environment Variables
Sæt følgende miljøvariabler i Supabase:
- `JWT_SECRET`
- `STRIPE_SECRET_KEY` (hvis du bruger betalinger)

## 2. Netlify Deployment

### Automatisk Deployment
1. Forbind dit GitHub repository til Netlify
2. Konfigurer build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Functions directory: `api`

### Environment Variables
Tilføj følgende i Netlify dashboard:
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `JWT_SECRET`
- `STRIPE_SECRET_KEY`

## 3. Domain Setup

1. Tilføj dit custom domain i Netlify
2. Konfigurer DNS records
3. Aktivér HTTPS (automatisk via Let's Encrypt)

## 4. Performance Optimering

- Aktivér Netlify's CDN
- Konfigurer caching headers
- Optimér billeder og assets
- Aktivér gzip compression

## 5. Monitoring

- Sæt Netlify Analytics op
- Konfigurer error tracking
- Overvåg Supabase usage

## 6. Backup Strategy

- Automatisk database backups via Supabase
- Konfigurer retention policies
- Test restore procedures

## Security Checklist

- [ ] HTTPS aktiveret
- [ ] Environment variables sikret
- [ ] Database RLS policies aktiveret
- [ ] API rate limiting konfigureret
- [ ] CORS korrekt konfigureret

## Troubleshooting

### Build Fejl
- Tjek at alle dependencies er installeret
- Verificer TypeScript konfiguration
- Kontroller miljøvariabler

### Runtime Fejl
- Tjek Netlify Functions logs
- Verificer Supabase forbindelse
- Kontroller CORS indstillinger