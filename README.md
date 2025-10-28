# CyberShield Backend - Render bundle

This bundle contains a minimal Node.js + Express backend ready to deploy on **Render**.
It includes a simple authentication endpoint and a seed script to create an admin user.

## Files included
- `server.js`          - Main server
- `package.json`       - Node dependencies and scripts
- `seed.js`            - Script to create admin user (email: admin@cybershield.co.ke / password: demo123456)
- `.env.sample`        - Example environment variables
- `README.md`          - This file

## How to deploy on Render
1. Create a GitHub repo and push the `backend` folder contents.
2. Go to https://render.com and create a new **Web Service**.
3. Connect to your GitHub repo and select the backend folder (branch).
4. Set the **Build Command**: `npm install`
5. Set the **Start Command**: `npm start`
6. Add Environment Variables in Render Dashboard:
   - `MONGODB_URI`  (your Atlas connection string)
   - `JWT_SECRET`   (a strong secret, e.g., use a long random string)
7. Deploy. Render will provide you a live URL, e.g. `https://cybershield-backend.onrender.com`

## After deployment
- Run the seed script to create the admin user (either locally or via Render shell):
  - Locally: `npm run seed` (with .env set)
  - On Render: use the `Shell` feature and run `npm run seed`
- Update your frontend (Netlify) `CONFIG.API_URL` to point to your Render URL:
  ```js
  API_URL: "https://YOUR-RENDER-URL.onrender.com/api"
  ```

## Notes
- This backend is intentionally minimal to keep deployment simple.
- For production, consider adding HTTPS enforcement, stricter CORS, logging, and monitoring.
