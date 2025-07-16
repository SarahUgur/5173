# Privat Rengøring - Social Platform

En moderne social platform for rengøringsservices i Danmark med support for 6 sprog.

## 🚀 Features

- **Multi-language support** (Dansk, English, العربية, Polski, Türkçe, Deutsch)
- **PWA (Progressive Web App)** - Installer som app på telefon
- **Responsive design** - Fungerer på alle enheder
- **Pro subscription system** - Stripe integration
- **Admin panel** - Bruger og content moderation
- **Real-time notifications** - Push notifications
- **Job marketplace** - Match rengøringseksperter med kunder

## 🛠️ Tech Stack

- **Frontend:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Payments:** Stripe
- **Deployment:** Netlify
- **PWA:** Service Worker + Web App Manifest

## 🏃‍♂️ Quick Start

### Development
```bash
npm install
npm run dev
```

### Build
```bash
npm run build
```

### Preview
```bash
npm run preview
```

## 🔐 Admin Login

- **Email:** admin@privatrengoring.dk
- **Password:** admin123

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

## 💳 Stripe Integration

Pro abonnement: 29 DKK/måned
- Ubegrænset likes og kommentarer
- Direkte beskeder
- Prioriteret visning
- Verificeret profil badge

## 🚀 Deployment

### Netlify (Anbefalet)
1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Auto-deploy on push

### Environment Variables
```
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_key
```

## 📂 Project Structure

```
src/
├── components/          # React components
├── hooks/              # Custom hooks (useLanguage)
├── data/               # Mock data and translations
├── lib/                # Utilities (Stripe config)
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
- **Sidebar** - Main navigation menu
- **PostCard** - Social media style posts
- **AdminPage** - Admin dashboard and moderation
- **SubscriptionModal** - Stripe payment integration
- **LocalJobsPage** - Geographic job search
- **NetworkPage** - Social connections

## 🔧 Configuration

### PWA Settings
- Theme color: #2563eb (blue)
- Background: #ffffff (white)
- Display: standalone
- Orientation: portrait-primary

### Stripe Configuration
- Currency: DKK (Danish Kroner)
- Subscription: 29 DKK/month
- Payment methods: Card

## 📊 Analytics & Monitoring

- User registration tracking
- Pro conversion metrics
- Job posting analytics
- Geographic usage data

## 🛡️ Security

- Input validation
- XSS protection
- CSRF protection
- Secure payment processing

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

**Udviklet med ❤️ i Danmark**