# Deployment Guide - Railway

## Prerequisites
1. GitHub account with repository
2. Railway account (https://railway.app)
3. MongoDB Atlas account for database

## Step-by-Step Deployment

### 1. MongoDB Atlas Setup
- Go to https://mongodb.com/cloud/atlas
- Create a free cluster
- Create database user with credentials
- Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/teamtaskmanager`
- Add IP whitelist (allow all: 0.0.0.0/0 for development)

### 2. GitHub Repository
```bash
git init
git add .
git commit -m "Initial commit: Team Task Manager"
git remote add origin https://github.com/YOUR-USERNAME/teamTaskManager.git
git branch -M main
git push -u origin main
```

### 3. Railway Deployment

#### Method 1: From GitHub UI
1. Go to https://railway.app
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Authorize GitHub and select your repository
5. Railway auto-detects it's a Node.js project

#### Method 2: Using Railway CLI
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Create project
railway init

# Deploy
railway up
```

### 4. Set Environment Variables in Railway

In Railway Dashboard → Project Settings → Variables:

```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/teamtaskmanager
JWT_SECRET=your_super_secure_random_string_here
JWT_EXPIRE=7d
NODE_ENV=production
FRONTEND_URL=https://your-railway-app.railway.app
```

### 5. Build Configuration

Railway automatically runs:
```bash
npm install
npm run postinstall  # This builds the client
npm start
```

### 6. Verify Deployment

Once deployed:
1. Copy the public Railway URL
2. Visit https://your-railway-app.railway.app
3. Sign up with test credentials
4. Create a project and task to verify functionality
5. Check Railway logs for errors

### 7. Custom Domain (Optional)

In Railway Project Settings:
1. Go to Domains
2. Add custom domain
3. Follow DNS configuration instructions

## Troubleshooting

### Build Fails
- Check `npm install` output for dependency errors
- Ensure `postinstall` script succeeds
- Check client/package.json for correct dependencies

### MongoDB Connection Error
- Verify MONGODB_URI is correct
- Check IP whitelist in MongoDB Atlas (should include Railway IP)
- Test connection locally first

### Frontend Not Loading
- Check that `client/dist` is built
- Verify `NODE_ENV=production` is set
- Check browser console for API URL issues

### CORS Errors
- Update FRONTEND_URL in environment variables
- Ensure CORS is properly configured in server/index.js
- Check Origin header in browser

## Performance Tips

1. **Database**: Use MongoDB Atlas M1 tier or higher
2. **CDN**: Consider Cloudflare for static assets
3. **Logging**: Use Railway logs for debugging
4. **Monitoring**: Set up Railway alerts for failures

## Updating After Deployment

```bash
# Make changes locally
git add .
git commit -m "Update message"
git push origin main

# Railway automatically redeploys on push
# Check deployment status in Railway Dashboard
```

## Local Development vs Production

**Local (.env)**
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/teamtaskmanager
JWT_SECRET=dev_secret
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

**Production (Railway)**
```
PORT=5000
MONGODB_URI=mongodb+srv://prod_user:pwd@cluster.mongodb.net/teamtaskmanager
JWT_SECRET=production_secure_secret
NODE_ENV=production
FRONTEND_URL=https://your-app.railway.app
```

## Security Checklist

- [ ] JWT_SECRET is strong and unique
- [ ] MongoDB credentials stored as environment variables
- [ ] CORS origin is your deployed URL
- [ ] IP whitelist configured in MongoDB
- [ ] No sensitive data in code or commits
- [ ] Use HTTPS (Railway provides free SSL)
- [ ] Regular backups enabled for MongoDB

## Post-Deployment Verification

1. Create a test account
2. Create a test project
3. Create a test task
4. Assign task to user
5. Update task status
6. Add comment to task
7. Check Dashboard stats
8. Test logout/login flow
9. Verify responsive design on mobile

---

For more help: https://docs.railway.app
