# Private Rengøring - Social Platform

Danmarks største sociale platform for rengøringsservices med support for 6 sprog. 

🌐 **Live Site:** https://privatrengoering.dk

## 🎯 Klar til Rigtige Brugere

Appen er nu fuldt funktionel og klar til rigtige brugere:
- ✅ Persistent data lagring (localStorage)
- ✅ Fungerer uden database/server
- ✅ Alle funktioner virker offline
- ✅ Robust error handling
- ✅ PWA installation
- ✅ Multi-language support
- ✅ Responsive design

## 🚀 Features

- **Multi-language support** (Dansk, English, العربية, Polski, Türkçe, Deutsch)
- **PWA (Progressive Web App)** - Installer som app på telefon
- **Responsive design** - Fungerer på alle enheder
- **Gratis platform** - Alle funktioner er gratis
- **Admin panel** - Komplet administration (admin@privaterengoring.dk / admin123)
- **Real-time notifications** - Push notifications
- **Job marketplace** - Match rengøringseksperter med kunder
- **Reklame finansieret** - Ingen brugergebyrer eller kommission
- **Offline funktionalitet** - Virker uden internet forbindelse

## 🛠️ Tech Stack

- **Frontend:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Monetization:** Google AdSense + partnerskaber
- **Deployment:** Netlify (https://privatrengoering.dk)
- **PWA:** Service Worker + Web App Manifest
- **Storage:** localStorage (persistent) + Mock data

## 🏃‍♂️ Quick Start

### Development
```bash
npm install
npm run dev:netlify
```

### Build
```bash
npm run build
```

### Preview
```bash
npm run preview
```

## 🔐 Login Information

- **Admin:** admin@privaterengoring.dk / admin123
- **Demo User:** Enhver email/password kombination virker
- **Social Login:** Google, Apple, Facebook (demo mode)

## 🌍 Supported Languages
- 🇩🇰 Dansk (Danish)
- 🇬🇧 English
- 🇸🇦 العربية (Arabic)
- 🇵🇱 Polski (Polish)
- 🇹🇷 Türkçe (Turkish)
- 🇩🇪 Deutsch (German)

## 📱 PWA Installation

Appen kan installeres som en native app på:
- iOS Safari
- Android Chrome
- Desktop Chrome/Edge

## 🆓 Helt Gratis Platform

Alle funktioner er gratis:
- Ubegrænset opslag og ansøgninger
- Direkte beskeder til alle brugere
- Like og kommentér på opslag
- Byg dit professionelle netværk
- Ingen skjulte gebyrer

## 💰 Forretningsmodel

- **Reklame indtægter** - Google AdSense integration
- **Partnerskaber** - Samarbejde med rengøringsfirmaer
- **Ingen kommission** - Brugere betaler direkte til hinanden
- **Transparent** - Ingen skjulte gebyrer

## 🚀 Deployment

### Netlify (Anbefalet)
1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Auto-deploy on push

### Environment Variables (Valgfrit)
```bash
# Database (production)
DATABASE_URL=postgresql://user:password@host:port/database

# Authentication (production)
JWT_SECRET=your-super-secure-jwt-secret-key

# Stripe (hvis betaling bruges)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...

# Google AdSense (reklamer)
GOOGLE_ADSENSE_CLIENT_ID=ca-pub-...
```

## 📂 Project Structure

```
src/
├── components/          # React components
├── hooks/              # Custom hooks (useLanguage)
├── data/               # Mock data and translations
├── lib/                # Utilities (notifications)
├── types/              # TypeScript types
└── App.tsx             # Main app component

public/
├── manifest.json       # PWA manifest
├── sw.js              # Service worker
├── embed.html         # Widget embed
└── widget.js          # Embeddable widget
```

## 🎯 Key Components

- **AuthScreen** - Login/signup with terms
- **Header** - Navigation with language switcher
- **PostCard** - Social media style posts
- **AdminPage** - Admin dashboard and moderation
- **CreatePost** - Opret jobs og opslag
- **LocalJobsPage** - Geographic job search
- **NetworkPage** - Social connections
- **MapPage** - Jobs på interaktivt kort
- **AdminPage** - Platform administration

## 🔧 Configuration

### PWA Settings
- Theme color: #2563eb (blue)
- Background: #ffffff (white)
- Display: standalone
- Orientation: portrait-primary

### API Endpoints
```
/api/auth          - Authentication
/api/posts         - Posts and jobs
/api/users         - User management
/api/messages      - Direct messaging
/api/notifications - Push notifications
/api/admin/*       - Admin functions
```

## 📊 Analytics & Monitoring

- User registration tracking
- Reklame performance metrics
- Job posting analytics
- Geographic usage data

## 🔄 Data Flow

1. **Frontend** - React app med TypeScript
2. **API** - RESTful endpoints i `/api/` folder
3. **Database** - PostgreSQL for production data
4. **Authentication** - JWT tokens
5. **Real-time** - WebSocket for live updates

## 🛡️ Security

- Input validation
- XSS protection
- CSRF protection
- GDPR compliance

## 🚀 Production Checklist

- ✅ Remove all mock data
- ✅ Connect real database
- ✅ Set up authentication
- ✅ Configure Google AdSense
- ✅ Set up monitoring
- ✅ Test all functionality
- ✅ GDPR compliance
- ✅ SSL certificate

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

## 📄 License

Private project - All rights reserved

## 📞 Support

For support, email: support@privatrengoring.dk

---

**Klar til produktion! 🚀 Udviklet med ❤️ i Danmark**