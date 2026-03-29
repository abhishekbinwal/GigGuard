# GigGuard - Production-Ready React Frontend

🚀 A modern, fintech-style insurance SaaS frontend for gig workers built with React, Vite, Tailwind CSS, and Zustand.

## 🌟 Features

- **Authentication System**: Simple but secure login with Rider ID
- **Real-time Location Tracking**: Auto-fetch GPS coordinates with fallback UI
- **Live Premium Updates**: Polling-based premium fetch every 12 seconds
- **Smart Risk Indicators**: Dynamic UI based on risk level (high/normal/safe)
- **One-Click Claims**: File claims with incident type and auto-location
- **Instant Claim Results**: Real-time claim status with instant payout display
- **Mock Mode**: Development-friendly mock API responses
- **Skeleton Loading**: Professional placeholder states for async operations
- **Toast Notifications**: Non-intrusive feedback for user actions
- **Fully Responsive**: Mobile-first design that works on all devices
- **Production-Ready**: TypeScript, ESLint, proper error handling

## 🧱 Tech Stack

| Technology          | Purpose                 |
| ------------------- | ----------------------- |
| **React 18**        | UI framework            |
| **Vite**            | Build tool & dev server |
| **TypeScript**      | Type safety             |
| **Tailwind CSS**    | Styling                 |
| **React Router v6** | Multi-page routing      |
| **Zustand**         | State management        |
| **Axios**           | HTTP client             |
| **Lucide Icons**    | Icon library            |

## 📁 Project Structure

```
gigguard-frontend/
├── src/
│   ├── components/
│   │   ├── ClaimForm.tsx          # Claim filing form
│   │   ├── ClaimResult.tsx        # Claim result display
│   │   ├── Header.tsx             # Top navigation bar
│   │   ├── LocationCard.tsx       # GPS location display
│   │   ├── PremiumCard.tsx        # Live premium display
│   │   ├── SkeletonLoader.tsx     # Loading placeholders
│   │   └── Toast.tsx              # Notification system
│   ├── pages/
│   │   ├── LoginPage.tsx          # Login/auth page
│   │   └── DashboardPage.tsx      # Main dashboard
│   ├── services/
│   │   └── api.ts                 # API service with mock support
│   ├── store/
│   │   └── gigGuardStore.ts       # Zustand global store
│   ├── utils/
│   │   └── helpers.ts             # Utility functions
│   ├── App.tsx                    # Main app component
│   ├── main.tsx                   # Entry point
│   └── index.css                  # Global styles
├── .env                           # Environment variables
├── .env.example                   # Environment template
├── .gitignore                     # Git ignore rules
├── index.html                     # HTML entry
├── package.json                   # Dependencies
├── postcss.config.js              # PostCSS config
├── tailwind.config.js             # Tailwind config
├── tsconfig.json                  # TypeScript config
└── vite.config.ts                 # Vite config
```

## 🚀 Getting Started

### Prerequisites

- **Node.js**: 16.0.0 or higher
- **npm** or **yarn**: Package manager

### Installation

1. **Clone or navigate to the project**:

   ```bash
   cd gigguard-frontend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   ```bash
   cp .env.example .env
   ```

   Edit `.env`:

   ```
   VITE_API_BASE_URL=http://localhost:8000
   ```

4. **Enable mock mode (Development)**:
   Edit `.env` to add:

   ```
   VITE_USE_MOCK=true
   ```

5. **Start development server**:
   ```bash
   npm run dev
   ```
   Opens automatically at `http://localhost:5173`

## 🎯 User Flow

### 1. **Login Page** (`/`)

- Enter Rider ID (e.g., `RIDER-12345`)
- Click "Continue"
- Rider ID stored in Zustand

### 2. **Dashboard Page** (`/dashboard`)

- Auto-fetches GPS location
- Displays wallet balance
- Shows live premium (polls every 12s)
- Displays risk status and hints
- File claim form with dropdown

### 3. **Claim Submission**

- Select incident type (Bike Slip, Accident, Rain Issue, etc.)
- Auto-includes location & rider ID
- Submit → Processing animation
- See claim status in result card

### 4. **Claim Result**

- Status: Approved/Fraud/Terminated
- Payout amount (if approved)
- Transaction ID
- Updated wallet balance

## 🌐 Environment Configuration

**Development (.env)**:

```
VITE_API_BASE_URL=http://localhost:8000
VITE_USE_MOCK=true
```

**Production (.env.production)**:

```
VITE_API_BASE_URL=https://api.gigguard.com
VITE_USE_MOCK=false
```

## 🔌 API Integration

### Mock Mode

When `VITE_USE_MOCK=true`, the app uses hardcoded mock responses with simulated network delays. Perfect for frontend development without backend.

### Real API Mode

When `VITE_USE_MOCK=false`, actual HTTP requests are made:

#### Fetch Premium

```
GET /premium/{zone}?rider_id={id}

Response:
{
  "premium": 450,
  "status": "Active Coverage",
  "risk_level": "normal",
  "risk_hint": "Clear weather, Normal traffic"
}
```

#### File Claim

```
POST /claims/file

Request:
{
  "rider_id": "RIDER-12345",
  "latitude": 28.7041,
  "longitude": 77.1025,
  "incident_type": "accident",
  "description": "Optional description"
}

Response:
{
  "status": "approved",
  "message": "Claim Approved!",
  "payout": 1500,
  "bonus": "Heavy Rain Bonus +15%",
  "transaction_id": "TXN-2024-001234",
  "wallet_balance": 6500
}
```

## 🧠 Global State (Zustand Store)

**Key selectors**:

```typescript
const {
  riderId,
  latitude,
  longitude,
  premium,
  premiumStatus,
  riskLevel,
  walletBalance,
  claimResult,
  setRiderId,
  setLocation,
  setPremium,
  setClaimResult,
  reset,
} = useGigGuardStore();
```

**Persisted data**:

- `riderId` (localStorage)
- `walletBalance` (localStorage)

## 🎨 Design System

### Colors

- **Primary**: `#2563eb` (Blue)
- **Success**: `#10b981` (Green)
- **Warning**: `#f59e0b` (Amber)
- **Error**: `#ef4444` (Red)
- **Neutral**: `#6b7280` (Gray)

### Components

- **Cards**: `card` class (soft shadows, rounded)
- **Buttons**: `btn-primary`, `btn-secondary`, `btn-danger`
- **Inputs**: `input-field` class with focus states
- **Badges**: `badge`, `badge-success`, `badge-warning`, `badge-error`
- **Toasts**: `toast-success`, `toast-error`, `toast-warning`

### Tailwind Utilities

- Shadows: `shadow-soft`, `shadow-medium`, `shadow-lg`
- Animations: `animate-pulse`, `animate-fade-in`, `animate-slide-in`

## 📱 Responsive Design

- **Mobile**: 320px+ (iPhone SE, Android phones)
- **Tablet**: 768px+ (iPad, Tablets)
- **Desktop**: 1024px+ (Laptops, Desktops)

All components use Tailwind's responsive prefixes (`sm:`, `md:`, `lg:`, etc.).

## 🔐 Security Considerations

- **HTTPS Only**: Use HTTPS in production
- **CORS**: Backend should allow CORS for frontend domain
- **XSS Protection**: React escapes content by default
- **CSRF**: Include tokens in API requests if needed
- **Sensitive Data**: Never store tokens in localStorage (use httpOnly cookies if available)
- **Environment Variables**: Never commit `.env` files

## 🧪 Testing & Development

### Mock Data

Edit `src/services/api.ts` to modify mock responses:

```typescript
const mockPremiumData = {
  'zone-1': { premium: 450, ... },
  'zone-2': { premium: 620, ... },
};
```

### Debug Location

Edit `.env`:

```
VITE_DEBUG_LOCATION=true
```

### Simulate Errors

Toggle in `src/services/api.ts`:

```typescript
const SIMULATE_ERROR = true;
```

## 📊 Performance Optimizations

- ✅ Code splitting (Vite)
- ✅ Lazy loading routes (React Router)
- ✅ Image optimization (lucide-react)
- ✅ Tailwind CSS purging
- ✅ Minification on build
- ✅ Service worker ready (PWA)

## 🏗️ Build & Deployment

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

Generates optimized bundle in `dist/` folder.

### Preview Build

```bash
npm run preview
```

### Deployment

Supports all static hosting:

- **Vercel**: `vercel deploy`
- **Netlify**: Drag & drop `dist/` folder
- **GitHub Pages**: Push to `gh-pages` branch
- **AWS S3 + CloudFront**: Upload `dist/` to S3

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Change port in vite.config.ts
npm run dev -- --port 5174
```

### Location Not Working

1. Check browser permissions
2. Ensure HTTPS on production
3. Use mock mode for testing

### Premium Not Updating

1. Check network tab for API calls
2. Verify polling interval (12s in code)
3. Check `VITE_API_BASE_URL` in .env

### Build Errors

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 🚀 Production Checklist

- [ ] Update API URLs (`VITE_API_BASE_URL`)
- [ ] Disable mock mode (`VITE_USE_MOCK=false`)
- [ ] Add analytics (Google Analytics, Mixpanel)
- [ ] Set up error tracking (Sentry)
- [ ] Configure CORS headers on backend
- [ ] Test on real devices
- [ ] Set up CI/CD pipeline
- [ ] Add monitoring & logging
- [ ] Performance testing (1.5s first paint)
- [ ] SEO optimization

## 📚 Documentation Links

- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Zustand Docs](https://github.com/pmndrs/zustand)
- [React Router](https://reactrouter.com)
- [Axios](https://axios-http.com)

## 📄 License

MIT License - Feel free to use for your hackathon!

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/amazing-feature`
2. Commit changes: `git commit -m 'Add amazing feature'`
3. Push: `git push origin feature/amazing-feature`
4. Open Pull Request

## 📞 Support

For issues or questions:

1. Check existing GitHub issues
2. Create new issue with detailed description
3. Include error logs and reproduction steps

---

**Built with ❤️ for GigGuard | Making gig worker insurance zero-touch & instant**
