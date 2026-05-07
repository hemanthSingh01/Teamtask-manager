const Project = require('../models/Project');
const User = require('../models/User');

// @desc    Get all projects for user
// @route   GET /api/projects
exports.getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({
      $or: [
        { owner: req.user.id },
        { 'members.userId': req.user.id }
      ]
    }).populate('owner', 'name email avatar').populate('members.userId', 'name email avatar');

    res.status(200).json({
      success: true,
      count: projects.length,
      projects
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single project
// @route   GET /api/projects/:id
exports.getProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('owner', 'name email avatar')
      .populate('members.userId', 'name email avatar');

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    // Check if user is member or owner
    const isMember = project.owner.toString() === req.user.id || 
                     project.members.some(m => m.userId._id.toString() === req.user.id);

    if (!isMember) {
      return res.status(403).json({ success: false, message: 'Not authorized to access this project' });
    }

    res.status(200).json({
      success: true,
      project
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create project
// @route   POST /api/projects
exports.createProject = async (req, res, next) => {
  try {
    const { name, description, color } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, message: 'Please provide project name' });
    }

    const project = await Project.create({
      name,
      description,
      color: color || '#3B82F6',
      owner: req.user.id,
      members: [
        {
          userId: req.user.id,
          role: 'Admin'
        }
      ]
    });

    await project.populate('owner', 'name email avatar').populate('members.userId', 'name email avatar');

    res.status(201).json({
      success: true,
      project
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
exports.updateProject = async (req, res, next) => {
  try {
    let project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    // Check authorization (only owner and admins can update)
    if (project.owner.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this project' });
    }

    const { name, description, status, color } = req.body;

    project = await Project.findByIdAndUpdate(
      req.params.id,
      { name, description, status, color },
      { new: true, runValidators: true }
    ).populate('owner', 'name email avatar').populate('members.userId', 'name email avatar');

    res.status(200).json({
      success: true,
      project
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
exports.deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    // Check authorization (only owner can delete)
    if (project.owner.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this project' });
    }

    await Project.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Add member to project
// @route   POST /api/projects/:id/members
exports.addMember = async (req, res, next) => {
  try {
    const { userId, role } = req.body;

    let project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    // Check authorization
    if (project.owner.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    // Check if user already member
    if (project.members.some(m => m.userId.toString() === userId)) {
      return res.status(400).json({ success: false, message: 'User already a member' });
    }

    project.members.push({
      userId,
      role: role || 'Member'
    });

    await project.save();
    await project.populate('owner', 'name email avatar').populate('members.userId', 'name email avatar');

    res.status(200).json({
      success: true,
      project
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Remove member from project
// @route   DELETE /api/projects/:id/members/:userId
exports.removeMember = async (req, res, next) => {
  try {
    let project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    // Check authorization
    if (project.owner.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    project.members = project.members.filter(m => m.userId.toString() !== req.params.userId);
    await project.save();
    await project.populate('owner', 'name email avatar').populate('members.userId', 'name email avatar');

    res.status(200).json({
      success: true,
      project
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
