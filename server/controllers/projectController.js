const Project = require('../models/Project');

// @desc    Get all projects for user
// @route   GET /api/projects
exports.getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({
      $or: [
        { owner: req.user.id },
        { 'members.userId': req.user.id }
      ]
    });
    res.status(200).json({ success: true, count: projects.length, projects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single project
// @route   GET /api/projects/:id
exports.getProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    const isMember = project.owner.toString() === req.user.id || 
                     project.members.some(m => m.userId.toString() === req.user.id);
    if (!isMember) return res.status(403).json({ success: false, message: 'Not authorized' });
    res.status(200).json({ success: true, project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create project
// @route   POST /api/projects
exports.createProject = async (req, res, next) => {
  try {
    console.log('========= CREATE PROJECT CALLED =========');
    console.log('User:', req.user);
    console.log('Body:', req.body);
    
    const { name, description, color } = req.body;
    
    console.log('Extracted:', { name, description, color });
    
    if (!name) {
      console.log('No name provided');
      return res.status(400).json({ success: false, message: 'Please provide project name' });
    }
    
    console.log('Creating project in DB...');
    const projectData = {
      name,
      description: description || '',
      color: color || '#3B82F6',
      owner: req.user.id,
      members: [{ userId: req.user.id, role: 'Admin' }]
    };
    console.log('Project data:', projectData);
    
    const project = await Project.create(projectData);
    
    console.log('Project created successfully:', project._id);
    res.status(201).json({ success: true, project });
  } catch (error) {
    console.error('========= CREATE PROJECT ERROR =========');
    console.error('Message:', error.message);
    console.error('Stack:', error.stack);
    console.error('Full error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
exports.updateProject = async (req, res, next) => {
  try {
    let project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    if (project.owner.toString() !== req.user.id) return res.status(403).json({ success: false, message: 'Not authorized' });
    
    const { name, description, status, color } = req.body;
    project = await Project.findByIdAndUpdate(req.params.id, { name, description, status, color }, { returnDocument: 'after' });
    res.status(200).json({ success: true, project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
exports.deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    if (project.owner.toString() !== req.user.id) return res.status(403).json({ success: false, message: 'Not authorized' });
    
    await Project.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Add member
// @route   POST /api/projects/:id/members
exports.addMember = async (req, res, next) => {
  try {
    const { userId, role } = req.body;
    let project = await Project.findById(req.params.id);
    
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    if (project.owner.toString() !== req.user.id) return res.status(403).json({ success: false, message: 'Not authorized' });
    if (project.members.some(m => m.userId.toString() === userId)) return res.status(400).json({ success: false, message: 'User already a member' });
    
    project.members.push({ userId, role: role || 'Member' });
    await project.save();
    res.status(200).json({ success: true, project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Remove member
// @route   DELETE /api/projects/:id/members/:userId
exports.removeMember = async (req, res, next) => {
  try {
    let project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    if (project.owner.toString() !== req.user.id) return res.status(403).json({ success: false, message: 'Not authorized' });
    
    project.members = project.members.filter(m => m.userId.toString() !== req.params.userId);
    await project.save();
    res.status(200).json({ success: true, project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
