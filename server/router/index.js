const express = require('express');
const router = express.Router();

const schoolRouter = require('./school-router');
const teacherRouter = require('./teacher-router');
// const roleRouter = require('./role-router');

router.use('/school', schoolRouter);
router.use('/teacher', teacherRouter);
// router.use('/role', roleRouter);

module.exports = router;
