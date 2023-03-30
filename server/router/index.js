const express = require('express');
const router = express.Router();

const schoolRouter = require('./school-router');

router.use('/school', schoolRouter);

module.exports = router;
