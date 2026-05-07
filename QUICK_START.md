# QUICK START GUIDE

## What is Team Task Manager?

A modern web application for teams to collaborate on projects and manage tasks efficiently.

## Features at a Glance

✅ User authentication (Signup/Login)
✅ Create and manage projects
✅ Create and assign tasks with priorities
✅ Track task status (Todo → Done)
✅ Dashboard with task statistics
✅ Team member management
✅ Real-time updates
✅ Mobile-responsive design

## Installation (5 minutes)

### Option 1: Automated Setup (Recommended)

**Windows:**
```bash
setup.bat
```

**Mac/Linux:**
```bash
bash setup.sh
```

### Option 2: Manual Setup

**1. Install dependencies:**
```bash
# Backend
npm install

# Frontend
cd client
npm install
cd ..
```

**2. Create .env file in root:**
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/teamtaskmanager
JWT_SECRET=dev_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

**3. Install MongoDB (if local)**
- Download from https://www.mongodb.com/try/download/community
- Or use MongoDB Atlas (cloud): https://mongodb.com/cloud/atlas

## Running Locally

**Terminal 1 - Start Backend:**
```bash
npm start
# Server runs on http://localhost:5000
```

**Terminal 2 - Start Frontend:**
```bash
cd client
npm run dev
# App runs on http://localhost:3000
```

Visit **http://localhost:3000** in your browser.

## First Time Usage

1. **Sign Up**
   - Click "Sign Up"
   - Enter Name, Email, Password
   - Click "Sign Up" button

2. **Create Project**
   - Go to "Projects" tab
   - Click "+ New Project"
   - Enter project details
   - Click "Create Project"

3. **Create Task**
   - Go to "Tasks" tab
   - Click "+ New Task"
   - Select the project
   - Set priority and due date
   - Click "Create Task"

4. **Track Progress**
   - Go to "Dashboard" to see statistics
   - Drag tasks between columns to change status
   - Add comments to tasks

## File Structure

```
teamTaskManager/
├── server/              # Backend code
│   ├── models/         # MongoDB schemas
│   ├── controllers/    # Business logic
│   ├── routes/         # API endpoints
│   └── index.js        # Main server file
├── client/             # Frontend React app
│   ├── src/
│   │   ├── pages/     # Page components
│   │   ├── components/# Reusable components
│   │   └── api.js     # API client
│   └── vite.config.js # Build config
├── .env               # Environment variables
└── README.md          # Full documentation
```

## API Endpoints Summary

### Auth
- `POST /api/auth/signup` - Create account
- `POST /api/auth/login` - Login

### Projects
- `GET /api/projects` - List projects
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Tasks
- `GET /api/tasks/my-tasks` - Get your tasks
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## Deployment

See `DEPLOYMENT.md` for complete Railway deployment guide.

Quick deploy:
```bash
git init
git add .
git commit -m "Initial commit"
git push -u origin main

# Then connect repo to Railway.app
```

## Troubleshooting

### Can't connect to MongoDB
- **Local**: Start MongoDB service
- **Atlas**: Check connection string and IP whitelist
- **Fix**: Update MONGODB_URI in .env

### Port already in use
- Change PORT in .env
- Kill process: `lsof -ti:5000 | xargs kill -9` (Mac/Linux)

### Frontend shows blank page
- Check browser console for errors
- Verify backend is running
- Clear browser cache

### API calls failing
- Ensure backend is running on correct port
- Check CORS settings in server/index.js
- Verify FRONTEND_URL in .env

## Tech Stack

**Backend:**
- Node.js + Express.js
- MongoDB + Mongoose
- JWT authentication
- bcryptjs password hashing

**Frontend:**
- React 18
- Vite (fast build)
- Zustand (state management)
- Axios (HTTP client)

## Key Features Explained

### Authentication
- Passwords hashed with bcryptjs
- JWT tokens for session management
- Token persists in localStorage

### Projects
- Owner has full control
- Can add members with Admin/Member roles
- Track project status

### Tasks
- Assign to team members
- Set priority and due dates
- Track as Todo → In Progress → Review → Done
- Comments for collaboration
- Automatic overdue detection

### Dashboard
- Quick overview of statistics
- Shows assigned tasks
- Highlights overdue items
- Displays in-progress count

## Best Practices

1. **Security**
   - Change JWT_SECRET in production
   - Use strong passwords
   - Enable HTTPS (auto with Railway)

2. **Performance**
   - Use MongoDB indexes
   - Implement pagination for large datasets
   - Cache frequently accessed data

3. **Collaboration**
   - Add team members before assigning
   - Use clear task titles
   - Update task status regularly
   - Comment on blockers

## Support & Resources

- Full README: `README.md`
- Deployment Guide: `DEPLOYMENT.md`
- GitHub Issues: Report bugs here
- MongoDB Docs: https://docs.mongodb.com
- Express Docs: https://expressjs.com
- React Docs: https://react.dev

## Next Steps

1. ✅ Install and run locally
2. ✅ Create test project and tasks
3. ✅ Customize colors and layout (if needed)
4. ✅ Deploy to Railway
5. ✅ Share URL with team
6. ✅ Invite team members

---

**Happy task tracking! 🎯**
