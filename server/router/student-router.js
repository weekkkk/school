const express = require('express');
const router = express.Router();

const studentController = require('../controllers/student-controller');
const { body } = require('express-validator');

router.post('/school/:schoolId', studentController.create);

router.post('/:id', studentController.update);

router.delete('/:id', studentController.delete);

router.get('/school/:schoolId',studentController.getSchool);

router.get('/:studentId/test', studentController.getTests);

module.exports = router;
