const express = require('express');
const router = express.Router();

//importing controllers
const {
  getAllTasks,
  updateTasks,
  createTasks,
  getSingleTask,
  deleteTasks,
} = require('../controllers/tasks');

router.get('/', getAllTasks);
router.post('/', createTasks);
router.get('/:id', getSingleTask);
router.patch('/:id', updateTasks);
router.delete('/:id', deleteTasks);

module.exports = router;
