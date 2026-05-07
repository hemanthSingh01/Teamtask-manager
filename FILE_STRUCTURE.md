# 📁 Project File Structure Guide

## Complete Directory Tree

```
teamTaskManager/
│
├── 📄 Configuration Files
│   ├── .env                          # Environment variables (local - DO NOT COMMIT)
│   ├── .env.example                  # Template for .env file
│   ├── .gitignore                    # Git ignore patterns
│   ├── package.json                  # Backend dependencies & scripts
│   └── Procfile                      # Railway deployment configuration
│
├── 📚 Documentation
│   ├── README.md                     # Main documentation (START HERE)
│   ├── QUICK_START.md                # Quick setup guide
│   ├── DEPLOYMENT.md                 # Detailed deployment guide
│   ├── RAILWAY_DEPLOYMENT.md         # Step-by-step Railway guide
│   ├── IMPLEMENTATION_SUMMARY.md     # What was built & statistics
│   └── FILE_STRUCTURE.md             # This file
│
├── 🔧 Backend (Node.js + Express)
│   └── server/
│       ├── index.js                  # Main server entry point
│       │   └── Starts Express server on port 5000
│       │   └── Connects to MongoDB
│       │   └── Serves frontend build in production
│       │
│       ├── 🔐 middleware/
│       │   ├── auth.js               # JWT verification middleware
│       │   │   └── protect() - validates JWT tokens
│       │   └── errorHandler.js       # Global error handling
│       │
│       ├── 📦 models/                # MongoDB Schemas
│       │   ├── User.js
│       │   │   ├── name, email, password, avatar
│       │   │   └── matchPassword() method
│       │   ├── Project.js
│       │   │   ├── name, description, owner, members
│       │   │   ├── status (Active/Completed/Archived)
│       │   │   └── color coding
│       │   └── Task.js
│       │       ├── title, description, status
│       │       ├── priority (Low/Medium/High/Urgent)
│       │       ├── assignee, createdBy
│       │       ├── dueDate, isOverdue tracking
│       │       └── comments array
│       │
│       ├── 🎮 controllers/           # Business Logic
│       │   ├── authController.js     # Authentication
│       │   │   ├── signup()  - POST /api/auth/signup
│       │   │   ├── login()   - POST /api/auth/login
│       │   │   ├── getMe()   - GET /api/auth/me
│       │   │   └── getAllUsers() - GET /api/auth/users
│       │   │
│       │   ├── projectController.js  # Project Management
│       │   │   ├── getProjects()     - GET /api/projects
│       │   │   ├── getProject()      - GET /api/projects/:id
│       │   │   ├── createProject()   - POST /api/projects
│       │   │   ├── updateProject()   - PUT /api/projects/:id
│       │   │   ├── deleteProject()   - DELETE /api/projects/:id
│       │   │   ├── addMember()       - POST /api/projects/:id/members
│       │   │   └── removeMember()    - DELETE /api/projects/:id/members/:userId
│       │   │
│       │   └── taskController.js     # Task Management
│       │       ├── getProjectTasks()   - GET /api/tasks/project/:projectId
│       │       ├── getMyTasks()        - GET /api/tasks/my-tasks
│       │       ├── getTask()           - GET /api/tasks/:id
│       │       ├── createTask()        - POST /api/tasks
│       │       ├── updateTask()        - PUT /api/tasks/:id
│       │       ├── deleteTask()        - DELETE /api/tasks/:id
│       │       └── addComment()        - POST /api/tasks/:id/comments
│       │
│       └── 🛣️  routes/               # API Route Definitions
│           ├── auth.js               # Auth routes
│           ├── projects.js           # Project routes
│           └── tasks.js              # Task routes
│
├── 🎨 Frontend (React + Vite)
│   └── client/
│       ├── index.html                # HTML template
│       ├── vite.config.js            # Vite build configuration
│       ├── package.json              # Frontend dependencies
│       │
│       ├── 📦 dist/                  # Production build (auto-generated)
│       │   ├── index.html            # Built HTML
│       │   └── assets/               # Bundled JS & CSS
│       │
│       └── src/                      # Source code
│           ├── main.jsx              # React entry point
│           │   └── Renders App to #root
│           │
│           ├── App.jsx               # Main app component
│           │   ├── Routing with React Router
│           │   ├── Protected routes
│           │   └── Auth checking
│           │
│           ├── App.css               # Global styles
│           │
│           ├── 🔌 api.js             # API client
│           │   ├── Axios instance with interceptors
│           │   ├── Adds JWT token to requests
│           │   └── All API method exports
│           │
│           ├── 🏪 store.js           # State Management (Zustand)
│           │   ├── useAuthStore      # User & token state
│           │   ├── useProjectStore   # Projects state
│           │   └── useTaskStore      # Tasks state
│           │
│           ├── 📄 pages/             # Page Components
│           │   ├── Login.jsx         # Login form
│           │   │   └── Auth.css
│           │   │
│           │   ├── Signup.jsx        # Signup form
│           │   │   └── Auth.css
│           │   │
│           │   ├── Dashboard.jsx     # Dashboard with stats
│           │   │   ├── Task overview
│           │   │   ├── Statistics cards
│           │   │   └── Dashboard.css
│           │   │
│           │   ├── Projects.jsx      # Projects management
│           │   │   ├── CRUD operations
│           │   │   ├── Grid layout
│           │   │   └── Projects.css
│           │   │
│           │   └── Tasks.jsx         # Kanban board
│           │       ├── 4-column layout
│           │       ├── Status management
│           │       └── Tasks.css
│           │
│           └── 🧩 components/        # Reusable Components
│               ├── Sidebar.jsx       # Navigation sidebar
│               │   ├── User profile
│               │   ├── Navigation
│               │   ├── Logout button
│               │   └── Sidebar.css
│               │
│               └── [Future components]
│                   ├── TaskCard.jsx  # (future feature)
│                   ├── ProjectCard.jsx
│                   └── etc.
│
└── 📋 Setup Scripts
    ├── setup.sh                      # Linux/Mac setup script
    └── setup.bat                     # Windows setup script

```

## 📊 File Statistics

| Category | Count | Purpose |
|----------|-------|---------|
| Backend Routes | 3 | API endpoints |
| Controllers | 3 | Business logic |
| Models | 3 | Database schemas |
| Middleware | 2 | Authentication & errors |
| Frontend Pages | 5 | User interfaces |
| Frontend Components | 1 | Reusable UI |
| Configuration | 5 | Setup files |
| Documentation | 6 | Guides & info |
| **Total** | **42** | - |

## 🔑 Key Files Explained

### Backend Entry Point
**`server/index.js`** (50 lines)
- Creates Express server
- Connects to MongoDB
- Mounts all routes
- Serves frontend in production
- Handles errors globally

### Frontend Entry Point
**`client/src/App.jsx`** (50 lines)
- Routes to pages
- Protected routes
- Auth checking
- Page-level routing

### API Client
**`client/src/api.js`** (40 lines)
- Axios instance
- JWT injection
- All API methods
- Error handling

### State Management
**`client/src/store.js`** (50 lines)
- Auth store (user, token)
- Project store
- Task store
- Zustand configuration

## 🔄 Data Flow

### User Signup Flow
```
UI (Signup.jsx)
  ↓
API Call (api.js: signup())
  ↓
Backend Route (auth.js)
  ↓
Controller (authController.js: signup)
  ↓
Model (User.js)
  ↓
MongoDB
  ↓
Response with token
  ↓
Store (useAuthStore.setUser)
  ↓
Redirect to Dashboard
```

### Task Creation Flow
```
UI (Tasks.jsx)
  ↓
Form submission
  ↓
API Call (api.js: createTask)
  ↓
Backend Route (tasks.js)
  ↓
Auth Middleware (verify token)
  ↓
Controller (taskController.js: createTask)
  ↓
Model (Task.js)
  ↓
MongoDB
  ↓
Response with task data
  ↓
UI Update (setTasks)
  ↓
Task appears on board
```

## 🗂️ Configuration Files Explained

### `.env` (Development)
```
PORT=5000                          # Local server port
MONGODB_URI=mongodb://...          # Local/Atlas MongoDB
JWT_SECRET=dev_key                 # For local development
NODE_ENV=development               # Development mode
FRONTEND_URL=http://localhost:3000 # Local frontend
```

### `.env.example` (Template)
Shows what variables are needed without exposing secrets.
Users copy this to `.env` and fill in their values.

### `package.json` (Backend)
```json
{
  "main": "server/index.js",
  "scripts": {
    "start": "node server/index.js",
    "dev": "nodemon server/index.js",
    "build": "cd client && npm run build"
  },
  "dependencies": {
    "express": "^4.18",
    "mongoose": "^7.0",
    "jsonwebtoken": "^9.0",
    "bcryptjs": "^2.4"
  }
}
```

### `client/package.json` (Frontend)
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18",
    "react-router-dom": "^6",
    "zustand": "^4",
    "axios": "^1"
  }
}
```

## 📈 Code Organization Principles

### Backend
- **Controllers**: Pure business logic
- **Models**: Data validation & relationships
- **Routes**: Endpoint definitions
- **Middleware**: Cross-cutting concerns

### Frontend
- **Pages**: Full-page components
- **Components**: Reusable UI parts
- **API**: Server communication
- **Store**: Global state
- **Styles**: CSS per component

## 🔒 Security File Handling

```
DO NOT COMMIT:
├── .env (has secrets)
├── node_modules/
├── client/node_modules/
└── .DS_Store

DO COMMIT:
├── .env.example (template)
├── package.json
├── package-lock.json
├── Source code files
└── Documentation
```

## 🚀 Deployment File Locations

### Railway Deployment
- Entry point: `server/index.js`
- Frontend build: `client/dist/`
- Config: `Procfile` & `.env` vars in Railway dashboard
- Auto-detection: Node.js detected from `package.json`

### Build Process
```
Railway Setup
  ↓
npm install (both root & client)
  ↓
npm run postinstall
  (builds client: cd client && npm run build)
  ↓
npm start (runs server/index.js)
  ↓
Express serves:
  - API routes
  - Static frontend files from client/dist/
```

## 📚 Navigation Guide

**New to the project?** Read in this order:
1. `README.md` - Overview
2. `QUICK_START.md` - Get running locally
3. `RAILWAY_DEPLOYMENT.md` - Deploy to production
4. `IMPLEMENTATION_SUMMARY.md` - What's included

**Want to modify code?**
1. Start in relevant `pages/` or `controllers/`
2. Check `api.js` for endpoints
3. Review `models/` for data structure
4. Update `store.js` if adding new state

**Deploying?**
1. Read `RAILWAY_DEPLOYMENT.md`
2. Follow step-by-step instructions
3. Reference environment variables in `.env.example`

---

This structure is designed for:
- ✅ **Scalability** - Easy to add new features
- ✅ **Maintainability** - Clear separation of concerns
- ✅ **Collaboration** - Team-friendly organization
- ✅ **Deployment** - Production-ready structure
