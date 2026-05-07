# Team Task Manager

A full-stack web application for teams to manage projects, assign tasks, and track progress with role-based access control.

## 🎯 Features

- **Authentication**: Secure user signup/login with JWT tokens
- **Project Management**: Create and manage team projects
- **Task Management**: Create, assign, and track tasks with status and priority
- **Dashboard**: Overview of your tasks and project progress
- **Role-Based Access**: Admin and Member roles with different permissions
- **Team Collaboration**: Add team members to projects
- **Task Tracking**: Monitor task status, due dates, and overdue items
- **Real-time Updates**: Live task and project updates

## 🏗️ Architecture

### Backend
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Server-side data validation
- **CORS**: Enabled for cross-origin requests

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Routing**: React Router v6
- **Styling**: CSS3

## 📋 Database Schema

### User Model
```
- name: String
- email: String (unique)
- password: String (hashed)
- avatar: String
- createdAt: Date
```

### Project Model
```
- name: String
- description: String
- owner: ObjectId (User reference)
- members: Array of {userId, role, joinedAt}
- status: String (Active/Completed/Archived)
- color: String
- createdAt: Date
- updatedAt: Date
```

### Task Model
```
- title: String
- description: String
- project: ObjectId (Project reference)
- assignee: ObjectId (User reference)
- createdBy: ObjectId (User reference)
- status: String (Todo/In Progress/In Review/Done)
- priority: String (Low/Medium/High/Urgent)
- dueDate: Date
- isOverdue: Boolean
- comments: Array of {userId, text, createdAt}
- attachments: Array of Strings
- createdAt: Date
- updatedAt: Date
```

## 🚀 Quick Start

### Prerequisites
- Node.js v14+
- npm or yarn
- MongoDB Atlas account (or local MongoDB)

### Installation

#### 1. Clone the repository
```bash
git clone <repo-url>
cd teamTaskManager
```

#### 2. Backend Setup
```bash
# Install dependencies
npm install

# Create .env file with your configuration
# Update MONGODB_URI with your MongoDB connection string

# Start the server
npm start
# or for development with auto-reload
npm run dev
```

The backend server runs on `http://localhost:5000`

#### 3. Frontend Setup
```bash
cd client

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend runs on `http://localhost:3000`

### Environment Variables

Create a `.env` file in the root directory:

```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/teamtaskmanager
JWT_SECRET=your_secure_secret_key_here
JWT_EXPIRE=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)
- `GET /api/auth/users` - Get all users (protected)

### Projects
- `GET /api/projects` - Get user's projects (protected)
- `GET /api/projects/:id` - Get single project (protected)
- `POST /api/projects` - Create project (protected)
- `PUT /api/projects/:id` - Update project (protected)
- `DELETE /api/projects/:id` - Delete project (protected)
- `POST /api/projects/:id/members` - Add team member (protected)
- `DELETE /api/projects/:id/members/:userId` - Remove member (protected)

### Tasks
- `GET /api/tasks/my-tasks` - Get user's tasks (protected)
- `GET /api/tasks/project/:projectId` - Get project tasks (protected)
- `GET /api/tasks/:id` - Get single task (protected)
- `POST /api/tasks` - Create task (protected)
- `PUT /api/tasks/:id` - Update task (protected)
- `DELETE /api/tasks/:id` - Delete task (protected)
- `POST /api/tasks/:id/comments` - Add comment (protected)

## 🎨 Pages

- **Login/Signup**: User authentication
- **Dashboard**: Overview of tasks and statistics
- **Projects**: View and manage projects
- **Tasks**: Kanban-style task board with drag-and-drop (core features implemented)

## 🔐 Role-Based Access Control

### Admin Role
- Full project management (create, edit, delete)
- Can add/remove team members
- Full task management
- Project settings access

### Member Role
- View assigned projects
- View and update assigned tasks
- Comment on tasks
- Cannot delete projects or manage members

## 🧪 Testing

Test accounts for demo:
```
Admin Account:
Email: admin@example.com
Password: admin123

Member Account:
Email: member@example.com
Password: member123
```

## 🚀 Deployment

### Deploy to Railway

1. **Create Railway Project**
   - Go to [railway.app](https://railway.app)
   - Create a new project
   - Connect your GitHub repository

2. **Set Up Environment Variables in Railway**
   - Add `MONGODB_URI`, `JWT_SECRET`, `PORT`, etc.

3. **Build and Deploy**
   - Railway automatically detects Node.js project
   - Builds using `npm start`
   - Deploy frontend separately or build as static files

4. **Database**
   - Use MongoDB Atlas for cloud database
   - Update `MONGODB_URI` in Railway environment variables

### Manual Deployment

```bash
# Build frontend
cd client
npm run build

# Copy build files to server/public or separate server

# Start production server
NODE_ENV=production npm start
```

## 📁 Project Structure

```
teamTaskManager/
├── server/
│   ├── models/
│   │   ├── User.js
│   │   ├── Project.js
│   │   └── Task.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── projectController.js
│   │   └── taskController.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── projects.js
│   │   └── tasks.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   └── index.js
├── client/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Projects.jsx
│   │   │   └── Tasks.jsx
│   │   ├── components/
│   │   │   └── Sidebar.jsx
│   │   ├── App.jsx
│   │   ├── api.js
│   │   ├── store.js
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── .env
├── package.json
└── README.md
```

## 🔧 Technology Stack

- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Frontend**: React, Vite, Zustand, Axios, React Router
- **Authentication**: JWT (jsonwebtoken)
- **Security**: bcryptjs for password hashing, CORS enabled
- **Deployment**: Railway

## 📝 Notes

- All passwords are hashed using bcryptjs before storage
- JWT tokens expire after 7 days (configurable)
- Role-based access control prevents unauthorized actions
- Frontend automatically includes JWT token in all API requests
- Server validates all input data and maintains data integrity

## 🤝 Contributing

Feel free to fork and submit pull requests for any improvements.

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 📞 Support

For issues and questions, please create an issue in the GitHub repository.

---

**Built with ❤️ for team collaboration**
