# KSTM Explorer - Complete Setup & Structure Guide (Tamil + Simple English)

இந்த guide **programming தெரியாதவருக்கும்** easy-ஆ follow பண்ண முடியுமா என்று simple-ஆ எழுதப்பட்டுள்ளது.

## 1) Project என்ன?

`KSTM Explorer` என்பது Sri Lanka tourist web app:
- Places browse
- Province filter
- Hotels
- Trip planner
- Emergency tab
- Login/Register (Firebase)
- APK build support (Android - Capacitor)

---

## 2) GitHub-லிருந்து Clone பண்ணுவது

### Windows Laptop (Recommended Commands)

1. **Git install** (ஒரு தடவை மட்டும்):  
   [https://git-scm.com/download/win](https://git-scm.com/download/win)

2. **Node.js install** (LTS):  
   [https://nodejs.org](https://nodejs.org)

3. **PowerShell** அல்லது **Command Prompt** open பண்ணவும்.

4. Clone command:

```bash
git clone https://github.com/kapilashkapilash2025-netizen/KSTM-Explorer.git
cd KSTM-Explorer
```

---

## 3) Local Setup (First Time)

### Install all libraries/dependencies

```bash
npm install
```

### `.env.local` file உருவாக்கவும்

Project root-ல் `.env.local` create பண்ணி இந்த keys set பண்ணவும்:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_SITE_URL=http://localhost:9999
```

> Note: Firebase values இல்லையென்றாலும் சில pages வேலை செய்யும். ஆனால் login/register வேலை செய்யாது.

---

## 4) Project Run Commands (Windows)

### Port 9999-ல் run (recommended)

```bash
npm run dev:9999
```

Browser open:

```text
http://localhost:9999
```

### Quick health check

```bash
npm run check:9999
```

### Quality checks

```bash
npm run lint
npm run type-check
npm run build
```

---

## 5) Password Gate

App open பண்ணும் போது code கேடும்.

Current access code:

```text
TRAVEL2026$
```

File location:
- `src/components/auth/AppAccessGate.tsx`

---

## 6) Clean-up / Speed-up Commands

Build cache மற்றும் heavy temporary files clean பண்ண:

```bash
npm run clean
```

Clean + reinstall fresh:

```bash
npm run fresh
```

---

## 7) Project Folder Structure (Simple Map)

```text
KSTM-Explorer/
  src/
    app/                  -> Pages (home, places, hotels, provinces, etc.)
    components/           -> Reusable UI blocks
      auth/               -> Access gate, route protection
      common/             -> Shared widgets (credit, splash, headers)
      layout/             -> Sidebar, topbar, footer, nav
      places/             -> Place cards/map/detail
      hotels/             -> Hotel cards
    data/                 -> Static data (places/hotels/provinces/emergency)
    context/              -> Theme & Language global state
    lib/                  -> Filters, trip engine, firebase helpers
  public/
    places/               -> Tourist images
    hotels/               -> Hotel images
    logo.png, sl-map.png  -> Static assets
  scripts/
    dev-9999.mjs          -> Smart dev start on port 9999
    check-9999.mjs        -> Port/server health check
    clean-workspace.mjs   -> Cleanup tool
  tests/                  -> Unit/component/integration/e2e tests
  android/                -> Capacitor Android project
  next.config.ts          -> Next.js config
  tsconfig.json           -> TypeScript + alias config
  package.json            -> all npm commands
```

---

## 8) முக்கியமான Files எதில் என்ன?

- `src/app/page.tsx` -> Homepage + Discover section
- `src/app/places/page.tsx` -> Places listing, filters, map/grid toggle
- `src/app/provinces/page.tsx` -> 9 provinces view
- `src/app/trip-planner/page.tsx` -> AI trip plan UI
- `src/app/emergency/page.tsx` -> emergency contacts
- `src/context/LanguageContext.tsx` -> Tamil/English/Sinhala text switch
- `src/context/ThemeContext.tsx` -> dark/light mode state
- `src/data/places.ts` -> all tourist places data
- `src/data/hotels.ts` -> hotels data
- `src/lib/firebase.ts` -> Firebase init

---

## 9) Git update flow (after changes)

```bash
git status
git add -A
git commit -m "your message"
git push origin main
```

---

## 10) Vercel Live Deploy (GitHub இருந்து)

1. Vercel login
2. New Project → Import `KSTM-Explorer`
3. Add env variables
4. Deploy

Deploy error வந்தால்:

```bash
npm run type-check
npm run build
```

இந்த இரண்டும் local-ல் pass ஆன பிறகு மீண்டும் deploy செய்யவும்.

---

## 11) Troubleshooting Quick Fix

### Error: `localhost refused to connect`

```bash
npm run dev:9999
```

### Error: `next: command not found`

```bash
npm install
npm run dev:9999
```

### Dependency/caching issue

```bash
npm run clean
npm install
npm run dev:9999
```

---

## 12) Security Basic Notes

- `.env.local` git-க்கு push செய்யக்கூடாது.
- Firebase keys மட்டும் `NEXT_PUBLIC_*` format-ல் தான் clientக்கு.
- Productionக்கு Firebase auth rules strictா set பண்ணவும்.

---

இந்த guide follow பண்ணினா **clone → setup → run → modify → deploy** முழு flow easy-ஆ செய்ய முடியும்.
