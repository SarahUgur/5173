# Private Rengøring - Danmarks Platform for Rengøringsservices

Find hjælp. Få job. Gør rent.

## 🌟 Om Projektet

Private Rengøring er Danmarks største platform for rengøringsservices. Vi forbinder mennesker der har brug for rengøring med pålidelige rengøringseksperter i hele landet.

## 🚀 Funktioner

- ✅ **Bruger Authentication** - Sikker login/registrering
- ✅ **Job Opslag** - Opret og find rengøringsjobs
- ✅ **Interaktivt Kort** - Se jobs på Google Maps
- ✅ **Messaging System** - Direkte kommunikation mellem brugere
- ✅ **Profil Management** - Komplet bruger profiler
- ✅ **Admin Panel** - Platform administration
- ✅ **PWA Support** - Installer som app på mobil/desktop
- ✅ **Responsive Design** - Virker på alle enheder
- ✅ **Real-time Notifications** - Push notifikationer

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deployment**: Netlify
- **API**: Netlify Functions
- **Database**: Ready for Supabase integration

## 📦 Installation

1. **Clone repository**:
```bash
git clone https://github.com/SarahUgur/5173.git
cd 5173
```

2. **Install dependencies**:
```bash
npm install
```

3. **Start development server**:
```bash
npm run dev:netlify
```

4. **Open browser**:
```
http://localhost:8888
```

## 🔧 Available Scripts

```bash
# Development with Netlify Functions
npm run dev:netlify

# Regular Vite development
npm run dev

# Build for production
npm run build

# Lint code
npm run lint
```

## 🌐 Deployment

### Netlify Deployment

1. **Connect to Netlify**:
   - Go to [Netlify](https://netlify.com)
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `dist`

2. **Environment Variables** (if needed):
   - Add any required environment variables in Netlify dashboard

3. **Domain Setup**:
   - Configure custom domain: `privaterengoring.dk`
   - Set up redirects from `privatrengoering.dk`

## 📱 PWA Features

- **Offline Support** - Service Worker caching
- **Install Prompt** - Add to home screen
- **Push Notifications** - Browser notifications
- **Mobile Optimized** - Touch-friendly interface

## 🔐 Admin Access

- **Email**: admin@privaterengoring.dk
- **Password**: admin123

## 📧 Contact

- **Support**: support@privaterengoring.dk
- **Admin**: admin@privaterengoring.dk
- **Website**: https://privaterengoring.dk

## 🏗️ Project Structure

```
src/
├── components/          # React komponenter
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries
├── types/              # TypeScript type definitions
└── data/               # Mock data (kun admin)

api/                    # Netlify Functions
├── auth.js            # Authentication
├── posts.js           # Post management
├── messages.js        # Messaging system
└── admin/             # Admin endpoints

public/                 # Static assets
├── manifest.json      # PWA manifest
├── sw.js             # Service Worker
└── embed.html        # Embeddable widget
```

## 🔒 Security Features

- **JWT Authentication** - Secure token-based auth
- **Input Validation** - All user inputs validated
- **CORS Protection** - Proper CORS headers
- **Rate Limiting** - API rate limiting
- **GDPR Compliance** - Privacy by design

## 🎨 Design System

- **Color Palette**: Blue/Purple gradient theme
- **Typography**: System fonts with proper hierarchy
- **Spacing**: 8px grid system
- **Components**: Reusable UI components
- **Animations**: Smooth micro-interactions

## 📊 Analytics & Revenue

- **Ad Integration** - Google AdSense ready
- **Revenue Tracking** - Real-time ad revenue monitoring
- **User Analytics** - Platform usage statistics
- **Performance Metrics** - App performance tracking

## 🌍 Internationalization

- **Danish** (Primary)
- **English** (Secondary)
- Ready for additional languages

## 🔄 API Endpoints

```
POST /api/auth          # User authentication
GET  /api/posts         # Get posts
POST /api/posts         # Create post
GET  /api/messages      # Get conversations
POST /api/messages      # Send message
GET  /api/notifications # Get notifications
POST /api/contact       # Contact form
GET  /api/admin/*       # Admin endpoints
```

## 🚀 Getting Started for Development

1. **Setup development environment**:
```bash
npm install
npm run dev:netlify
```

2. **Login as admin**:
   - Email: admin@privaterengoring.dk
   - Password: admin123

3. **Test features**:
   - Create posts
   - Send messages
   - Use admin panel
   - Test PWA features

## 📝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

## 📄 License

© 2024 Private Rengøring. All rights reserved.

## 🆘 Support

Hvis du har problemer:
1. Tjek denne README
2. Se [Issues](https://github.com/SarahUgur/5173/issues)
3. Kontakt support@privaterengoring.dk

---

**Bygget med ❤️ i Danmark**