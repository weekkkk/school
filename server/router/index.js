const express = require('express');
const router = express.Router();

const schoolRouter = require('./school-router');
const roleRouter = require('./role-router');


router.use('/school', schoolRouter);
// router.use('/role', roleRouter);

module.exports = router;
