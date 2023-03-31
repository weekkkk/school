const express = require('express');
const router = express.Router();

const teacherController = require('../controllers/teacher-controller');
const { body } = require('express-validator');

router.post('/school/:schoolId', teacherController.create);

router.post('/:id', teacherController.update);

router.delete('/:id', teacherController.delete);

router.get('/school/:schoolId', teacherController.getSchool);

module.exports = router;
