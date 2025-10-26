Deployment (cPanel, static hosting)

1) Build locally
   - Install deps: npm install
   - Build: npm run build
   - The build creates the `dist/` folder. The `.htaccess` file is copied automatically.

2) Upload to cPanel
   - In File Manager, open your domain’s document root (usually `public_html`).
   - Upload the CONTENTS of `dist/` (not the folder itself) into `public_html`.
   - Ensure `.htaccess` is present in `public_html` after upload.

3) Configure API base URL (if backend is not on same origin)
   - Create `.env` in this `Frontend/` folder before building and set `VITE_API_BASE_URL`.
   - Example: `VITE_API_BASE_URL=https://api.e-sides.co.mz/api`
   - Rebuild (`npm run build`) and re-upload `dist/`.

4) Troubleshooting
   - Blank page with 404 for `/src/main.jsx`: you uploaded source files; upload the `dist/` build instead.
   - Deep links (e.g. /login) 404: ensure `.htaccess` from this repo is in `public_html`.
   - Stale cache: hard refresh (Ctrl/Cmd+Shift+R) or clear site data.

