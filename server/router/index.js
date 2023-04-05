const express = require('express');
const router = express.Router();

const schoolRouter = require('./school-router');
const teacherRouter = require('./teacher-router');
const studentRouter = require('./student-router');
const classroomRouter = require('./classroom-router');
const testRouter = require('./test-router');
const answerRouter = require('./answer-router');
const authRouter = require('./auth-router');
const subjectRouter = require('./subject-router');
const resultRouter = require('./result-router');
const materialRouter = require('./material-router');

router.use('/result', resultRouter);
router.use('/school', schoolRouter);
router.use('/teacher', teacherRouter);
router.use('/student', studentRouter);
router.use('/classroom', classroomRouter);
router.use('/test',testRouter);
router.use('/material', materialRouter);
router.use('/answer', answerRouter);
router.use('/auth', authRouter);
router.use('/subject', subjectRouter);

module.exports = router;
