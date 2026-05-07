import React, { useState, useEffect } from 'react';
import { getProjects, createProject, deleteProject } from '../api';
import Sidebar from '../components/Sidebar';
import './Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '', color: '#3B82F6' });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await getProjects();
      setProjects(response.data.projects);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createProject(formData);
      setFormData({ name: '', description: '', color: '#3B82F6' });
      setShowForm(false);
      fetchProjects();
    } catch (error) {
      console.error('Failed to create project:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await deleteProject(id);
        fetchProjects();
      } catch (error) {
        console.error('Failed to delete project:', error);
      }
    }
  };

  return (
    <div className="projects-container">
      <Sidebar />
      <div className="projects-content">
        <div className="projects-header">
          <h1>Projects</h1>
          <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : '+ New Project'}
          </button>
        </div>

        {showForm && (
          <form className="project-form" onSubmit={handleCreate}>
            <input
              type="text"
              placeholder="Project Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            <input
              type="color"
              value={formData.color}
              onChange={(e) => setFormData({ ...formData, color: e.target.value })}
            />
            <button type="submit" className="btn-primary">Create Project</button>
          </form>
        )}

        {loading ? (
          <p>Loading projects...</p>
        ) : projects.length === 0 ? (
          <p className="no-projects">No projects yet. Create one to get started!</p>
        ) : (
          <div className="projects-grid">
            {projects.map((project) => (
              <div key={project._id} className="project-card" style={{ borderTopColor: project.color }}>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <div className="project-stats">
                  <span>{project.members?.length || 0} members</span>
                  <span>{project.status}</span>
                </div>
                <div className="project-actions">
                  <button className="btn-secondary">View</button>
                  <button className="btn-danger" onClick={() => handleDelete(project._id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
