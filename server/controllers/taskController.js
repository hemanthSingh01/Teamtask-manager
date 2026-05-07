const Task = require('../models/Task');
const Project = require('../models/Project');

// @desc    Get all tasks for a project
// @route   GET /api/tasks/project/:projectId
exports.getProjectTasks = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const { status, priority, assignee } = req.query;

    // Check if user is member of project
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    const isMember = project.owner.toString() === req.user.id || 
                     project.members.some(m => m.userId.toString() === req.user.id);
    if (!isMember) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    let filter = { project: projectId };
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (assignee) filter.assignee = assignee;

    const tasks = await Task.find(filter)
      .populate('assignee', 'name email avatar role')
      .populate('createdBy', 'name email avatar role')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get user's tasks (dashboard)
// @route   GET /api/tasks/my-tasks
exports.getMyTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({
      $or: [
        { assignee: req.user.id },
        { createdBy: req.user.id }
      ]
    })
      .populate('assignee', 'name email avatar role')
      .populate('createdBy', 'name email avatar role')
      .populate('project', 'name')
      .sort('-createdAt');

    const overdue = tasks.filter(t => t.isOverdue && t.status !== 'Done');
    const inProgress = tasks.filter(t => t.status === 'In Progress');
    const completed = tasks.filter(t => t.status === 'Done');

    res.status(200).json({
      success: true,
      tasks,
      stats: {
        total: tasks.length,
        overdue: overdue.length,
        inProgress: inProgress.length,
        completed: completed.length
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single task
// @route   GET /api/tasks/:id
exports.getTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate('assignee', 'name email avatar role')
      .populate('createdBy', 'name email avatar role')
      .populate('project', 'name');

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    res.status(200).json({
      success: true,
      task
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create task
// @route   POST /api/tasks
exports.createTask = async (req, res, next) => {
  try {
    const { title, description, project, assignee, priority, dueDate } = req.body;

    if (!title || !project) {
      return res.status(400).json({ success: false, message: 'Please provide title and project' });
    }

    // Check if user is member of project
    const projectDoc = await Project.findById(project);
    if (!projectDoc) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    const isMember = projectDoc.owner.toString() === req.user.id || 
                     projectDoc.members.some(m => m.userId.toString() === req.user.id);
    if (!isMember) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    const task = await Task.create({
      title,
      description,
      project,
      assignee,
      priority: priority || 'Medium',
      dueDate,
      createdBy: req.user.id
    });

    const populatedTask = await Task.findById(task._id)
      .populate('assignee', 'name email avatar role')
      .populate('createdBy', 'name email avatar role')
      .populate('project', 'name');

    res.status(201).json({
      success: true,
      task: populatedTask
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
exports.updateTask = async (req, res, next) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    const { title, description, status, priority, assignee, dueDate } = req.body;

    task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, status, priority, assignee, dueDate },
      { returnDocument: 'after', runValidators: true }
    )
      .populate('assignee', 'name email avatar role')
      .populate('createdBy', 'name email avatar role')
      .populate('project', 'name');

    res.status(200).json({
      success: true,
      task
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Add comment to task
// @route   POST /api/tasks/:id/comments
exports.addComment = async (req, res, next) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ success: false, message: 'Please provide comment text' });
    }

    let task = await Task.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
            userId: req.user.id,
            text
          }
        }
      },
      { returnDocument: 'after' }
    )
      .populate('assignee', 'name email avatar')
      .populate('createdBy', 'name email avatar')
      .populate('comments.userId', 'name email avatar');

    res.status(200).json({
      success: true,
      task
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
