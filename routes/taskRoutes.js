const express = require('express');
const router = express.Router()
const taskController = require('../controllers/taskControllers')


router.route('/')
    .get(taskController.getTasks)
    .post(taskController.createTask)


router.route('/:id')
    .get(taskController.getOneTask) 
    // .put(taskController.updateTask) 
    // .delete(taskController.deleteTask);

// router.route('/remove/')
//     .post(taskController.deleteTask) 
  

module.exports = router;
