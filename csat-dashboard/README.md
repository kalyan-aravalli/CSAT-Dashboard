# CSAT Dashboard – Setup Guide

## What you get
- `your-app.vercel.app` → Public read-only dashboard (share this with the team)
- `your-app.vercel.app/admin` → Password-protected admin upload page (only you)

---

## Step 1 — Firebase setup (5 minutes)

1. Go to https://console.firebase.google.com
2. Create a new project → call it `csat-dashboard`
3. Click **Firestore Database** → Create database → Start in **test mode**
4. Click the gear icon → **Project settings** → scroll to **Your apps** → click `</>` (Web)
5. Register the app → copy the `firebaseConfig` object values

You'll need:
- `apiKey`
- `authDomain`
- `projectId`

---

## Step 2 — Update Firebase config in both HTML files

In `public/index.html` and `public/admin.html`, replace these placeholders:

```js
apiKey: "FIREBASE_API_KEY",         // paste your value
authDomain: "FIREBASE_AUTH_DOMAIN", // paste your value  
projectId: "FIREBASE_PROJECT_ID",   // paste your value
```

---

## Step 3 — Set your admin password

In `public/admin.html`, find this line:

```js
const ADMIN_PASSWORD = "ADMIN_PASSWORD_PLACEHOLDER";
```

Replace `ADMIN_PASSWORD_PLACEHOLDER` with whatever password you want.

---

## Step 4 — Push to GitHub

```bash
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/YOUR_USERNAME/csat-dashboard.git
git push -u origin main
```

---

## Step 5 — Deploy on Vercel

1. Go to https://vercel.com/new
2. Import your GitHub repo `csat-dashboard`
3. In **Environment Variables**, add:
   - Key: `ANTHROPIC_API_KEY`
   - Value: your Anthropic API key (from https://console.anthropic.com)
4. Click **Deploy**

---

## Step 6 — You're live

- Public dashboard: `https://your-app.vercel.app`
- Admin panel: `https://your-app.vercel.app/admin`

---

## How to update data after survey closes (23 April)

1. Export both internal and external responses from Microsoft Forms as Excel (.xlsx)
2. Go to `/admin` → enter password
3. Upload internal Excel → upload external Excel
4. Click **Publish to dashboard**
5. Dashboard refreshes live for everyone instantly
