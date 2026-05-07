const express = require('express');
const {
  getProjectTasks,
  getMyTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  addComment
} = require('../controllers/taskController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.get('/my-tasks', getMyTasks);
router.get('/project/:projectId', getProjectTasks);
router.post('/', createTask);
router.get('/:id', getTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.post('/:id/comments', addComment);

module.exports = router;
