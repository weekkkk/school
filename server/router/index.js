const express = require('express');
const router = express.Router();

const schoolRouter = require('./school-router');
const teacherRouter = require('./teacher-router');
const studentRouter = require('./student-router');
const classroomRouter = require('./classroom-router');
const testRouter = require('./test-router');
const answerRouter = require('./answer-router');
const authRouter = require('./auth-router');

router.use('/school', schoolRouter);
router.use('/teacher', teacherRouter);
router.use('/student', studentRouter);
router.use('/classroom', classroomRouter);
router.use('/test', testRouter);
router.use('/answer', answerRouter);
router.use('/auth', authRouter);

module.exports = router;
