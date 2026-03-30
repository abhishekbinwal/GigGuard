# 🚀 GigGuard Frontend - Setup & Launch Guide

## ✅ Pre-Requisites Check

Before starting, ensure you have:

### System Requirements

- [ ] **Node.js** (v16 or higher)
  - Check: `node --version`
  - Download: https://nodejs.org/

- [ ] **npm** (v8 or higher)
  - Check: `npm --version`
  - Usually comes with Node.js

- [ ] **Git** (optional, for version control)
  - Check: `git --version`
  - Download: https://git-scm.com/

- [ ] **Text Editor/IDE** (VS Code recommended)
  - Download: https://code.visualstudio.com/

### Browser Requirements

- [ ] Modern browser (Chrome, Firefox, Safari, or Edge)
- [ ] Location permission enabled (for auto-geolocation)
- [ ] JavaScript enabled

---

## 📥 Installation Steps

### Step 1: Navigate to Project Directory

```bash
cd c:\Users\Abhishek\ Binwal\OneDrive\Desktop\hackFrontend
```

### Step 2: Install Dependencies

```bash
npm install
```

**What it does:**

- Downloads all packages from `package.json`
- Creates `node_modules/` folder
- Sets up project dependencies

**Expected output:**

```
added 234 packages in 45s
```

**Troubleshooting:**

- If stuck: Press Ctrl+C and try again
- Clear cache: `npm cache clean --force`
- Delete node_modules: `rm -r node_modules` then reinstall

### Step 3: Verify Installation

```bash
npm --version   # Should be v8+
node --version  # Should be v16+
```

### Step 4: Check Environment Variables

```bash
# Verify .env file exists
cat .env

# Should show:
# VITE_API_BASE_URL=http://localhost:8000
```

---

## 🎬 Starting the Development Server

### Option 1: Quick Start (Recommended)

```bash
npm run dev
```

**What it does:**

- Starts Vite dev server
- Hot module reloading enabled
- Opens browser automatically at http://localhost:5173

**Expected output:**

```
  VITE v5.0.8  dev server running at:

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

### Option 2: Manual Start

```bash
# Start server
npm run dev

# Then open browser to:
# http://localhost:5173
```

### Option 3: Custom Port

```bash
npm run dev -- --port 5174
```

### Option 4: Open Remote Machine

```bash
npm run dev -- --host
# Then access from other machines on your network
```

---

## 🧪 Testing the Frontend

### Test 1: Login Flow

**Steps:**

1. Go to http://localhost:5173
2. See login page with GigGuard branding
3. Enter Rider ID: `RIDER-TEST-001`
4. Click "Continue"
5. **Expected**: Redirect to Dashboard

**What to verify:**

- ✓ Page loaded
- ✓ Form accepted input
- ✓ Navigation worked
- ✓ No console errors

### Test 2: Location Fetch

**Steps:**

1. Allow location permission when prompted
2. See LocationCard with coordinates
3. Verify latitude/longitude display

**Expected:**

```
Latitude: 51.5074
Longitude: -0.1278
```

**Troubleshooting:**

- Denied permission? Check browser settings
- Geolocation unavailable? Use mock mode
- Edit .env: `VITE_USE_MOCK=true`

### Test 3: Premium Polling

**Steps:**

1. Watch PremiumCard
2. See amount in ₹ (Indian Rupees)
3. Wait 12 seconds
4. Amount updates automatically

**Expected:**

- Live updates label shows "Polling every 12 seconds"
- Green pulse indicator
- Premium amount changes

### Test 4: File Claim

**Steps:**

1. Select incident type from dropdown
2. Click "Submit Claim"
3. Watch loading animation (1.5 seconds)
4. See claim result card

**Expected Results:**

- Approved claim: ₹1500 payout + bonus
- Fraud claim: Warning message
- Terminated: Account blocked message

### Test 5: Responsive Design

**Steps:**

1. Press F12 (Developer Tools)
2. Click responsive design mode
3. Test with: iPhone SE (375px), iPad (768px), Desktop (1024px)

**Expected:**

- All components readable
- Buttons clickable
- No horizontal scrolling

---

## 🛠️ Development Workflow

### File Changes

```bash
# 1. Edit files in src/
# 2. Save file
# 3. Browser auto-refreshes (HMR)
# 4. See changes instantly

Example:
- Edit src/components/Header.tsx
- Save (Ctrl+S)
- Browser updates immediately
```

### View Console Logs

```bash
# Terminal shows:
# - Server messages
# - TypeScript errors
# - Build warnings

# Browser console (F12) shows:
# - App logs
# - API calls
# - Errors/warnings
```

### Debug State

```bash
# In DashboardPage.tsx (or any component):
import { useGigGuardStore } from '../store/gigGuardStore';

function MyComponent() {
  const store = useGigGuardStore();

  // Access state:
  console.log('Rider ID:', store.riderId);
  console.log('Location:', store.latitude, store.longitude);
  console.log('Premium:', store.premium);
  console.log('Balance:', store.walletBalance);
}
```

---

## 🎨 Customization Examples

### Change Brand Colors

**File:** `tailwind.config.js`

```javascript
theme: {
  extend: {
    colors: {
      'primary': '#YOUR_COLOR', // Change blue
      'success': '#YOUR_COLOR', // Change green
    }
  }
}
```

### Modify Polling Interval

**File:** `src/components/PremiumCard.tsx` (Line 40)

```typescript
// Change from 12 seconds to 5 seconds:
setInterval(fetchPremium, 5000); // 5000ms = 5 seconds
```

### Edit Mock Data

**File:** `src/services/api.ts` (Line 45)

```typescript
const mockPremiumData = {
  "zone-1": {
    premium: 450, // Change amount
    status: "Custom", // Change message
    risk_level: "high", // Change risk level
  },
};
```

### Change API Base URL

**File:** `.env`

```
VITE_API_BASE_URL=http://your-api.example.com
VITE_USE_MOCK=false  # Use real API
```

---

## 🚨 Debugging Tips

### Problem: Port Already in Use

```bash
# Solution: Use different port
npm run dev -- --port 5174

# Or kill existing process:
# Windows: taskkill /f /im node.exe
# Mac/Linux: lsof -i :5173 | grep node | awk '{print $2}' | xargs kill
```

### Problem: Module Not Found

```bash
# Error: './components' module not found
# Solution: Check imports in App.tsx

// Wrong:
import Header from './Header'

// Correct:
import { Header } from './components'
// or
import Header from './components/Header'
```

### Problem: State Not Updating

```bash
# Check if using update correctly:

// Wrong:
const store = useGigGuardStore();
store.walletBalance = 100; // Direct assignment doesn't work

// Correct:
const store = useGigGuardStore();
store.setWalletBalance(100); // Use setter method
```

### Problem: Location Not Working

```bash
# Verify in browser console:
const geo = navigator.geolocation;
if (geo) {
  console.log('Geolocation available');
} else {
  console.log('Geolocation not supported');
}

# Use mock mode as fallback:
# Edit .env: VITE_USE_MOCK=true
```

### Problem: Network Errors

```bash
# Check network tab (F12 → Network):
# 1. See if requests are made
# 2. Check response status (200 = OK, 500 = server error)
# 3. View request/response in Details

# Check API URL:
console.log(import.meta.env.VITE_API_BASE_URL);
```

---

## 🏗️ Building for Production

### Create Optimized Build

```bash
npm run build
```

**What it does:**

- Minifies code
- Bundles modules
- Optimizes assets
- Creates `dist/` folder

**Expected:**

```
dist/index.html                      2.45 kB
dist/assets/index-ABC123.js         42.15 kB
dist/assets/index-DEF456.css         8.32 kB
```

### Preview Production Build

```bash
npm run preview
```

**Tests locally before deployment**

### Deploy to Hosting

**Option 1: Vercel (Recommended)**

```bash
npm i -g vercel
vercel
```

**Option 2: Netlify**

1. Drag `dist/` folder to netlify.com

**Option 3: GitHub Pages**

```bash
# Update package.json:
"homepage": "https://yourusername.github.io/gigguard"

# Build and deploy
npm run build
npx gh-pages -d dist
```

---

## 📋 Verify Everything Works

### Checklist

```
Development Server:
  [ ] npm install completed
  [ ] npm run dev starts successfully
  [ ] http://localhost:5173 loads
  [ ] No console errors

Frontend Features:
  [ ] Login page appears
  [ ] Can enter Rider ID
  [ ] Can click Continue button
  [ ] Redirects to Dashboard
  [ ] Location appears (or ask for permission)
  [ ] Premium amount shows
  [ ] Can select incident type
  [ ] Can submit claim
  [ ] See claim result

Production Build:
  [ ] npm run build succeeds
  [ ] dist/ folder created
  [ ] npm run preview works
  [ ] All features work in preview
```

---

## 📞 Getting Help

### Check These First

1. **QUICKSTART.md** - For quick answers
2. **README.md** - For detailed docs
3. **PROJECT_OVERVIEW.md** - For architecture
4. **FILE_MANIFEST.md** - For file structure

### Search Issues

- Check browser console (F12)
- Check npm output
- Search GitHub issues
- Check Vite docs: https://vitejs.dev/

### Common Error Solutions

```bash
# Restart everything:
Ctrl+C (stop server)
npm install (reinstall)
npm run dev (restart)

# Clear caches:
rm -rf node_modules
npm cache clean --force
npm install
```

---

## 🎉 You're Ready!

Everything is set up and working. Now:

1. ✅ Run `npm install`
2. ✅ Run `npm run dev`
3. ✅ Test the app
4. ✅ Make changes
5. ✅ Build for production

**Happy coding!** 🚀

---

**Version**: 1.0.0  
**Last Updated**: 2024  
**Status**: Production Ready
