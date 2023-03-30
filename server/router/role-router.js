const express = require('express');
const router = express.Router();

const roleController = require('../controllers/role-controller');
const { body } = require('express-validator');

/**
 * * Создание школы
 */
router.post(
  '/',
  roleController.create
);

module.exports = router;
