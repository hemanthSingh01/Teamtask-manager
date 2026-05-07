import React, { useState, useEffect } from 'react';
import { getMyTasks, createTask, updateTask, deleteTask, getProjects } from '../api';
import Sidebar from '../components/Sidebar';
import './Tasks.css';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    project: '',
    priority: 'Medium',
    dueDate: ''
  });

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
      setProjects(projectsRes.data.projects);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createTask(formData);
      setFormData({ title: '', description: '', project: '', priority: 'Medium', dueDate: '' });
      setShowForm(false);
      fetchData();
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await updateTask(taskId, { status: newStatus });
      fetchData();
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const handleDelete = async (taskId) => {
    if (window.confirm('Delete this task?')) {
      try {
        await deleteTask(taskId);
        fetchData();
      } catch (error) {
        console.error('Failed to delete task:', error);
      }
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
    <div className="tasks-container">
      <Sidebar />
      <div className="tasks-content">
        <div className="tasks-header">
          <h1>Tasks</h1>
          <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : '+ New Task'}
          </button>
        </div>

        {showForm && (
          <form className="task-form" onSubmit={handleCreate}>
            <input
              type="text"
              placeholder="Task Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            <select
              value={formData.project}
              onChange={(e) => setFormData({ ...formData, project: e.target.value })}
              required
            >
              <option value="">Select Project</option>
              {projects.map((p) => (
                <option key={p._id} value={p._id}>{p.name}</option>
              ))}
            </select>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Urgent</option>
            </select>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            />
            <button type="submit" className="btn-primary">Create Task</button>
          </form>
        )}

        {loading ? (
          <p>Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p className="no-tasks">No tasks yet</p>
        ) : (
          <div className="tasks-board">
            {['Todo', 'In Progress', 'In Review', 'Done'].map((status) => (
              <div key={status} className="task-column">
                <h3>{status}</h3>
                <div className="task-cards">
                  {tasks.filter((t) => t.status === status).map((task) => (
                    <div key={task._id} className="task-card">
                      <h4>{task.title}</h4>
                      <p>{task.description}</p>
                      <div className="task-footer">
                        <span className="priority" style={{ color: getPriorityColor(task.priority) }}>
                          {task.priority}
                        </span>
                        <select
                          value={task.status}
                          onChange={(e) => handleStatusChange(task._id, e.target.value)}
                          className="status-select"
                        >
                          <option>Todo</option>
                          <option>In Progress</option>
                          <option>In Review</option>
                          <option>Done</option>
                        </select>
                        <button
                          className="btn-delete"
                          onClick={() => handleDelete(task._id)}
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tasks;
