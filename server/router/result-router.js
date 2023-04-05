const express = require('express');
const router = express.Router();

const resultController = require('../controllers/result-controller');
const { body } = require('express-validator');

router.get('/school/:schoolId/subject/:subjectId', resultController.getAll);

module.exports = router;
