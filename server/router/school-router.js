const express = require('express');
const router = express.Router();

const schoolController = require('../controllers/school-controller');
const { body } = require('express-validator');

/**
 * * Создание школы
 */
router.post(
  '/',
  body('name').isLength({ min: 5, max: 32 }),
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 32 }),
  schoolController.create
);

/**
 * * Удаление школы
 */
router.delete('/:id', schoolController.remove);

/**
 * * Редактирование школы
 */
router.post(
  '/:id',
  body('name').isLength({ min: 5, max: 32 }),
  body('password').isLength({ min: 3, max: 32 }),
  schoolController.edit
);

/**
 * * Получить школы
 */
router.get('/',schoolController.getAll);

/**
 * * Получить школу
 */
router.get('/:id', schoolController.getById);

module.exports = router;
