const express = require('express');
const router = express.Router();

const answerController = require('../controllers/answer-controller');
const { body } = require('express-validator');

router.post(
  '/student/:studentId/classroomTest/:classroomTestId',
  answerController.create
);
router.post('/:id', answerController.setGrade);
router.get('/teacher/:teacherId', answerController.getAnswers);
router.get('/:id', answerController.getAnswer);

module.exports = router;
