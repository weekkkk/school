const express = require('express');
const router = express.Router();

const teacherController = require('../controllers/teacher-controller');
const { body } = require('express-validator');

/**
 * * Создание
 */
router.post(
  '/',
  body('name').isLength({ min: 5, max: 32 }),
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 32 }),
  teacherController.create
);

/**
 * * Удаление
 */
router.delete('/:id', teacherController.remove);

/**
 * * Редактирование
 */
router.post(
  '/:id',
  body('name').isLength({ min: 5, max: 32 }),
  body('password').isLength({ min: 3, max: 32 }),
  teacherController.edit
);

/**
 * * Получить
 */
router.get('/',teacherController.getAll);

/**
 * * Получить по id школы
 */
router.get('/school/:id', teacherController.getSchoolTeachers);

/**
 * * Получить по id
 */
router.get('/:id', teacherController.getById);

module.exports = router;
