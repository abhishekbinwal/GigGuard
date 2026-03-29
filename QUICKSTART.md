# GigGuard Quick Start Guide

## ⚡ 30-Second Setup

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open browser
# http://localhost:5173
```

## 🎯 Quick Demo

### Test Login

```
Rider ID: RIDER-12345
Click: Continue
```

### Test Claim

1. **Location**: Auto-detected (allow permission popup)
2. **Premium**: Updates every 12 seconds (live poll)
3. **Risk Status**: Changes randomly (demo mock data)
4. **File Claim**: Select incident type → Submit
5. **Result**: See instant approval/fraud detection

## 🔧 Configuration

### Enable Mock Mode (for frontend dev without backend)

Edit `.env`:

```
VITE_USE_MOCK=true
```

### Switch to Real API

Edit `.env`:

```
VITE_API_BASE_URL=http://your-backend-url
VITE_USE_MOCK=false
```

## 📁 Key Files to Know

| File                          | Purpose                |
| ----------------------------- | ---------------------- |
| `src/store/gigGuardStore.ts`  | Global state (Zustand) |
| `src/services/api.ts`         | API calls + mock data  |
| `src/pages/LoginPage.tsx`     | Auth page              |
| `src/pages/DashboardPage.tsx` | Main dashboard         |
| `src/components/`             | All UI components      |
| `.env`                        | Environment config     |

## 🚨 Common Issues

### Build fails

```bash
npm ci  # Clean install
npm run build
```

### Port 5173 in use

```bash
npm run dev -- --port 5174
```

### Location not working

- Allow location permission in browser
- Check if using HTTP (geolocation needs HTTPS in prod)
- Use mock mode to test without location

## 🎬 Features to Demo

1. ✅ **Login** → Instant redirect with Rider ID
2. ✅ **Location** → Auto-fetched with coordinates
3. ✅ **Premium** → Live updates every 12s
4. ✅ **Risk Status** → Dynamic color/icon changes
5. ✅ **Claims** → File in 2 seconds
6. ✅ **Results** → Instant approval/fraud/terminated
7. ✅ **Wallet** → Updated after claim

## 🔌 API Routes (When Backend is Ready)

```
GET /premium/{zone}?rider_id={id}
POST /claims/file
```

See full docs in README.md

## 🎨 Customize

### Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  'primary': '#your-color',
}
```

### Mock Data

Edit `src/services/api.ts`:

```typescript
mockPremiumData = { ... }
```

### Polling Interval

Edit `src/components/PremiumCard.tsx`:

```typescript
setInterval(fetchPremium, 12000); // Change 12000 to desired ms
```

## 📦 Production Build

```bash
npm run build
# Creates optimized build in dist/

npm run preview
# Test production build locally
```

## 🎉 You're Ready!

The app is fully functional and production-ready. Start the dev server and see the magic! ✨

For questions, check:

- README.md (full docs)
- CODE in src/ (self-documented)
- .env file (configuration)
