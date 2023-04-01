const express = require('express');
const router = express.Router();

const classroomController = require('../controllers/classroom-controller');
const { body } = require('express-validator');

router.post('/teacher/:teacherId', classroomController.create);

router.post('/:id', classroomController.update);

router.delete('/:id', classroomController.delete);

router.get('/teacher/:teacherId', classroomController.getTeacher);

module.exports = router;
