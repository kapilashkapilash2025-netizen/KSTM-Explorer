# Sri Lanka Travel Explorer

## Description
A smart Sri Lanka tourism assistant platform for discovering places, hotels, trip planning, favourites, dashboard, emergency contacts and tourist safety tools. 

This application is designed as a production-style tourism platform and can be extended with AI/RAG, real maps, booking integrations, and government tourism APIs.

## Beginner Full Guide (Tamil)
- Complete step-by-step setup, clone, run, structure map, and Windows commands:
- [SETUP_AND_STRUCTURE_GUIDE_TA.md](./SETUP_AND_STRUCTURE_GUIDE_TA.md)

## Features
- Interactive tourism map (Placeholder for future GIS integration)
- Places discovery with rich details
- Hotels discovery with star ratings and amenities
- Province/category filters and advanced search
- Trip planner (Automated day-by-day itinerary generation)
- Favourites system (Local Storage based)
- User Dashboard with statistics and recent activity
- Authentication (Mock Local Storage based)
- Protected routes
- Emergency contacts and offline access
- Quick SOS feature (Simulation)
- Fully responsive modern design (Tailwind CSS V4)

## Tech Stack
- Next.js 16+ (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion (Animations)
- Lucide React (Icons)

## Run commands

Install dependencies:
```bash
npm install
```

Start the development server (default):
```bash
npm run dev
```

Start with stable port 9999 (recommended):
```bash
npm run dev:9999
```

Health check for port 9999:
```bash
npm run check:9999
```

Build for production:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## Reliable Local Run (9999)
1. Start the app:
```bash
npm run dev:9999
```
2. Verify it is reachable:
```bash
npm run check:9999
```
3. Open in browser:
`http://localhost:9999`

Notes:
- `dev:9999` automatically checks port `9999`, stops stale Node/Next listeners, and prints clear startup logs.
- If a non-node process is occupying the port, the script stops with guidance instead of failing silently.

## Future Upgrades (Ready)
- Replace local mock data with PostgreSQL/Prisma
- Add NextAuth for secure authentication
- Integrate Google Maps or Mapbox for true interactive mapping
- Connect a genuine RAG AI pipeline for the Trip Planner engine


## Google Login Setup
1. Create a Firebase project and enable **Authentication > Sign-in method > Google**.
2. Add your local domain in Firebase authorized domains (for example `localhost`).
3. Copy `.env.example` values into `.env.local` with your Firebase credentials.
4. Restart the dev server and click **Continue with Google** on Login/Register pages.
