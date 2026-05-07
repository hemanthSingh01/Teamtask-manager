# 🚀 RAILWAY DEPLOYMENT - STEP BY STEP

## Quick Links
- Railway: https://railway.app
- MongoDB Atlas: https://www.mongodb.com/cloud/atlas
- GitHub: https://github.com

---

## PART 1: MongoDB Atlas Setup (10 minutes)

### Step 1.1: Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Sign Up"
3. Choose "Create for Free" option
4. Register with email (or Google/GitHub)
5. Verify email

### Step 1.2: Create a Database Cluster
1. Click "Create a Deployment"
2. Select "Shared" (Free tier)
3. Choose cloud provider: AWS, GCP, or Azure
4. Select region closest to you
5. Click "Create Deployment" (wait ~3 minutes)

### Step 1.3: Create Database User
1. Go to "Security" → "Database Access"
2. Click "Add New Database User"
3. Username: `admin` (or any name)
4. Password: Generate strong password (copy it!)
5. Click "Add User"

### Step 1.4: Get Connection String
1. Go to "Deployment" → "Drivers"
2. Select "Node.js" driver
3. Copy connection string: `mongodb+srv://...`
4. Replace `<password>` with your password
5. Keep this string safe - you'll need it for .env

### Step 1.5: Configure IP Whitelist
1. Go to "Security" → "Network Access"
2. Click "Add IP Address"
3. Select "Allow access from anywhere" (0.0.0.0/0)
4. Click "Confirm"

**Your MongoDB URI should look like:**
```
mongodb+srv://admin:yourpassword@cluster0.xyz.mongodb.net/teamtaskmanager?retryWrites=true&w=majority
```

---

## PART 2: GitHub Repository Setup (5 minutes)

### Step 2.1: Create GitHub Repository
1. Go to https://github.com
2. Click "+" → "New repository"
3. Name: `teamTaskManager`
4. Description: "Full-stack task management application"
5. Select "Public" (or Private)
6. Click "Create repository"

### Step 2.2: Push Code to GitHub
```bash
cd c:\Users\sanka\OneDrive\Desktop\teamTaskManager

# Add GitHub remote
git remote add origin https://github.com/YOUR-USERNAME/teamTaskManager.git

# Rename branch to main (if not already)
git branch -M main

# Push code
git push -u origin main
```

**Expected output:**
```
Enumerating objects: 42, done.
Counting objects: 100% (42/42), done.
...
To github.com:YOUR-USERNAME/teamTaskManager.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

✅ Code is now on GitHub!

---

## PART 3: Railway Deployment (10 minutes)

### Step 3.1: Create Railway Account
1. Go to https://railway.app
2. Click "Sign Up"
3. Choose "GitHub" for quick signup
4. Authorize Railway to access your GitHub
5. Select "Only select repositories"
6. Choose your `teamTaskManager` repo
7. Click "Install & Authorize"

### Step 3.2: Create Railway Project
1. Go to https://railway.app/dashboard
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your `teamTaskManager` repository
5. Railway auto-detects Node.js
6. Click "Deploy"

**Wait for initial deployment** (2-5 minutes)

### Step 3.3: Set Environment Variables
1. In Railway Dashboard, go to your project
2. Click on the Node.js service
3. Go to "Variables" tab
4. Add these variables:

| Key | Value |
|-----|-------|
| `PORT` | `5000` |
| `MONGODB_URI` | `mongodb+srv://admin:password@cluster0.abc.mongodb.net/teamtaskmanager` |
| `JWT_SECRET` | `generate_a_random_strong_secret_here_minimum_32_chars` |
| `JWT_EXPIRE` | `7d` |
| `NODE_ENV` | `production` |
| `FRONTEND_URL` | Will update after getting Railway URL |

**To generate JWT_SECRET**, use this:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 3.4: Get Your Railway URL
1. Go to Railway "Deployments" tab
2. Find the latest deployment
3. Click on it and go to "Networking"
4. Copy the public URL (e.g., `https://yourapp-production.up.railway.app`)

### Step 3.5: Update FRONTEND_URL
1. Go back to "Variables" tab
2. Update `FRONTEND_URL`:
   ```
   https://yourapp-production.up.railway.app
   ```
3. Save changes
4. Railway will auto-redeploy with new variables

---

## PART 4: Test Your Deployment (5 minutes)

### Step 4.1: Verify API Health
Open in browser:
```
https://yourapp-production.up.railway.app/api/health
```

Should show:
```json
{"status":"OK","message":"Server is running"}
```

### Step 4.2: Test Application
1. Visit: `https://yourapp-production.up.railway.app`
2. You should see the Team Task Manager login page
3. Click "Sign Up"
4. Create a test account:
   - Name: `Test User`
   - Email: `test@example.com`
   - Password: `Test123!`
5. Click "Sign Up" button

### Step 4.3: Test Core Features
- ✅ Dashboard loads with 0 tasks
- ✅ Click "Projects" → "+ New Project"
- ✅ Create project "Test Project"
- ✅ Click "Tasks" → "+ New Task"
- ✅ Create task "Test Task"
- ✅ Drag task between columns
- ✅ Click logout

**If all tests pass: 🎉 Deployment successful!**

---

## PART 5: Troubleshooting

### Issue: Deployment fails during build
**Solution:**
1. Check Railway logs (Deployments → View logs)
2. Common causes:
   - Missing dependencies: Run `npm install` locally first
   - Node version: Railway uses Node 18 by default
   - Build script: Check `postinstall` in package.json

**Fix:**
```bash
# Locally
npm install
npm run build
git add .
git commit -m "Fix build"
git push origin main

# Railway will auto-redeploy
```

### Issue: MongoDB connection error
**Error message:** `querySrv ENOTFOUND`

**Solution:**
1. Verify MONGODB_URI is correct
2. Check IP whitelist in MongoDB Atlas
3. Test URI locally:
   ```bash
   # Update .env with your URI
   npm start
   ```
4. If it works locally, update Railway variables

### Issue: CORS error in frontend
**Error:** `Access to XMLHttpRequest blocked by CORS`

**Solution:**
1. Update FRONTEND_URL in Railway variables with exact URL
2. Check server/index.js has correct CORS config
3. Clear browser cache
4. Try incognito mode

### Issue: Blank page after login
**Solution:**
1. Open browser DevTools (F12)
2. Check Console tab for errors
3. Check Network tab - see API calls?
4. If API calls fail, check FRONTEND_URL variable

### Issue: Tasks not saving
**Solution:**
1. Check MongoDB connection string
2. Verify database exists
3. Check browser console for errors
4. Verify JWT token is being sent

---

## PART 6: Production Checklist

Before sharing with others:

- [ ] Change JWT_SECRET to strong random value
- [ ] Verify MONGODB_URI is production database
- [ ] Test signup works
- [ ] Test project creation
- [ ] Test task creation and status changes
- [ ] Check responsive design on mobile
- [ ] Test logout and login flow
- [ ] Verify no errors in Railway logs
- [ ] All API endpoints working (/api/health, etc.)
- [ ] Share URL with team

---

## PART 7: Make Updates After Deployment

### To Update Your App:

```bash
# Make changes locally
cd teamTaskManager
# Edit files...

# Commit and push
git add .
git commit -m "Add new feature"
git push origin main

# Railway automatically redeploys!
# Check deployment in Railway Dashboard
```

**No manual redeploy needed** - Railway watches your GitHub repo!

---

## PART 8: Custom Domain (Optional)

### Add Your Own Domain

1. Get a domain from Namecheap, Godaddy, or similar
2. In Railway "Networking" tab
3. Click "Custom Domain"
4. Enter your domain
5. Railway shows DNS records to add
6. Add records to your domain registrar
7. Wait ~24 hours for DNS propagation

---

## 📋 Final Setup Confirmation

After deployment, you should have:

```
✅ MongoDB Atlas cluster running
✅ Repository on GitHub
✅ App deployed on Railway
✅ All environment variables set
✅ API responding at /api/health
✅ Frontend loading and working
✅ User signup/login functional
✅ Project creation working
✅ Task management working
```

---

## 🎯 Summary

| Step | Time | Status |
|------|------|--------|
| MongoDB Setup | 10 min | ⏳ |
| GitHub Push | 5 min | ⏳ |
| Railway Deploy | 10 min | ⏳ |
| Testing | 5 min | ⏳ |
| **Total** | **30 min** | ⏳ |

---

## 🚨 Emergency Rollback

If something breaks after deployment:

```bash
# Revert to previous version
git revert HEAD
git push origin main

# OR reset to earlier commit
git reset --hard <commit-hash>
git push origin main -f
```

Railway will auto-deploy the reverted code.

---

## 📞 Help & Support

- **Railway Docs**: https://docs.railway.app
- **MongoDB Help**: https://docs.mongodb.com
- **React Issues**: https://github.com/facebook/react/issues
- **Project Issues**: Check Rails logs for detailed errors

---

## 🎉 You're Done!

Your Team Task Manager is now live on Railway!

Share your URL: `https://your-app-production.up.railway.app`

Invite team members and start managing tasks! 🚀
