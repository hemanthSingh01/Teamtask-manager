import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store';
import { getMyTasks, getProjects } from '../api';
import Sidebar from '../components/Sidebar';
import './Dashboard.css';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({ total: 0, overdue: 0, inProgress: 0, completed: 0 });
  const [loading, setLoading] = useState(true);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [tasksRes, projectsRes] = await Promise.all([
        getMyTasks(),
        getProjects()
      ]);

      setTasks(tasksRes.data.tasks);
      setStats(tasksRes.data.stats);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'Urgent': '#ff6b6b',
      'High': '#ee5a6f',
      'Medium': '#ffa94d',
      'Low': '#51cf66'
    };
    return colors[priority] || '#999';
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Welcome, {user?.name}!</h1>
          <p>Here's your task overview</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>{stats.total}</h3>
            <p>Total Tasks</p>
          </div>
          <div className="stat-card overdue">
            <h3>{stats.overdue}</h3>
            <p>Overdue</p>
          </div>
          <div className="stat-card inprogress">
            <h3>{stats.inProgress}</h3>
            <p>In Progress</p>
          </div>
          <div className="stat-card completed">
            <h3>{stats.completed}</h3>
            <p>Completed</p>
          </div>
        </div>

        <div className="tasks-section">
          <h2>My Tasks</h2>
          {loading ? (
            <p>Loading tasks...</p>
          ) : tasks.length === 0 ? (
            <p className="no-tasks">No tasks assigned yet</p>
          ) : (
            <div className="tasks-list">
              {tasks.map((task) => (
                <div key={task._id} className="task-item">
                  <div className="task-content">
                    <h4>{task.title}</h4>
                    <p>{task.description}</p>
                    <div className="task-meta">
                      <span className="badge" style={{ borderLeftColor: getPriorityColor(task.priority) }}>
                        {task.priority}
                      </span>
                      <span className="status">{task.status}</span>
                      {task.project?.name && <span className="project">{task.project.name}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
