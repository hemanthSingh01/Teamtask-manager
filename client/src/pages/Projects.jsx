import React, { useState, useEffect } from 'react';
import { getProjects, createProject, deleteProject, addProjectMember, removeProjectMember, getAllUsers } from '../api';
import Sidebar from '../components/Sidebar';
import './Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '', color: '#3B82F6' });
  const [selectedProject, setSelectedProject] = useState(null);
  const [showMembers, setShowMembers] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [projectsRes, usersRes] = await Promise.all([
        getProjects(),
        getAllUsers()
      ]);
      setProjects(projectsRes.data.projects);
      setUsers(usersRes.data.users);
    } catch (error) {
      console.error('Failed to fetch data:', error);
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
      fetchData();
    } catch (error) {
      console.error('Failed to create project:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await deleteProject(id);
        fetchData();
      } catch (error) {
        console.error('Failed to delete project:', error);
      }
    }
  };

  const handleAddMember = async (projectId, userId) => {
    try {
      await addProjectMember(projectId, { userId, role: 'Member' });
      fetchData();
      alert('Member added successfully!');
    } catch (error) {
      console.error('Failed to add member:', error);
      alert('Error adding member');
    }
  };

  const handleRemoveMember = async (projectId, userId) => {
    if (window.confirm('Remove this member?')) {
      try {
        await removeProjectMember(projectId, userId);
        fetchData();
      } catch (error) {
        console.error('Failed to remove member:', error);
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
                  <button className="btn-secondary" onClick={() => setShowMembers(showMembers === project._id ? null : project._id)}>
                    {showMembers === project._id ? 'Hide Members' : 'Manage Members'}
                  </button>
                  <button className="btn-danger" onClick={() => handleDelete(project._id)}>Delete</button>
                </div>

                {showMembers === project._id && (
                  <div className="members-panel">
                    <h4>Team Members</h4>
                    <div className="members-list">
                      {project.members?.map((member) => (
                        <div key={member.userId} className="member-item">
                          <span className="member-name">{users.find(u => u._id === member.userId)?.name}</span>
                          <span className="member-role">{member.role}</span>
                          <button 
                            className="btn-remove"
                            onClick={() => handleRemoveMember(project._id, member.userId)}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                    
                    <div className="add-member">
                      <h5>Add New Member</h5>
                      <select defaultValue="" onChange={(e) => {
                        if (e.target.value) {
                          handleAddMember(project._id, e.target.value);
                          e.target.value = '';
                        }
                      }}>
                        <option value="">Select user...</option>
                        {users.filter(u => !project.members?.some(m => m.userId === u._id)).map(user => (
                          <option key={user._id} value={user._id}>{user.name} ({user.email})</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
