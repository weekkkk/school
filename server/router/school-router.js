const express = require('express');
const router = express.Router();

const schoolController = require('../controllers/school-controller');
const { body } = require('express-validator');

/**
 * * Создание школы
 */
router.post(
  '/',
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 32 }),
  schoolController.create
);

module.exports = router;
