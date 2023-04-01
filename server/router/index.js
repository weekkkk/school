const express = require('express');
const router = express.Router();

const schoolRouter = require('./school-router');
const teacherRouter = require('./teacher-router');
const studentRouter = require('./student-router');
const classroomRouter = require('./classroom-router');
const testRouter = require('./test-router');
// const roleRouter = require('./role-router');

router.use('/school', schoolRouter);
router.use('/teacher', teacherRouter);
router.use('/student', studentRouter);
router.use('/classroom', classroomRouter);
router.use('/test', testRouter);

module.exports = router;
