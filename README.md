# Digital Cemetery — Frontend

An atmospheric, dark-themed digital cemetery interface for visualising deceased files. Built with React, TypeScript, Vite, Tailwind CSS, TanStack Query, and Recharts.

## Architecture

- **SPA Routing:** React Router v6
- **Server State & Caching:** TanStack Query v5 with automatic polling
- **Styling:** Tailwind CSS with custom gothic/cemetery color palette
- **Data Visualizations:** Recharts (Extensions bar chart, Timeline area chart, Hour distribution)
- **Icons:** Lucide React

## Setup & Running

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Verify API base URL:**
   Review `.env`:
   ```env
   VITE_API_BASE_URL=http://localhost:8000
   ```

4. **Start Development Server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

5. **Build for Production:**
   ```bash
   npm run build
   ```

## Pages

1. **Dashboard (`/`):** Summary metrics (total deaths, deaths today, top file type, largest file) and recent departures.
2. **Cemetery Grounds (`/cemetery`):** 2D visual cemetery showing interactive gravestones positioned via deterministic coordinates (`cemetery_x`, `cemetery_y`), complete with candlelight hover animations and quick tooltips.
3. **Death Details (`/deaths/:id`):** Memorial record including lifespan, cause of death, epitaph, coordinates, and chronological event history.
4. **Timeline (`/timeline`):** Date-filterable death logs.
5. **Statistics (`/statistics`):** Visual distribution charts by extension, time of day, and deletion volume.
6. **Settings (`/settings`):** Manage monitored folders, ignore filters, and AI epitaph generation toggle.
