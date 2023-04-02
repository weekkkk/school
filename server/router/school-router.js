const express = require('express');
const router = express.Router();

const schoolController = require('../controllers/school-controller');
// const { body } = require('express-validator');

router.post('/', schoolController.create);

router.delete('/:id', schoolController.delete);

router.post('/:id', schoolController.update);

router.get('/', schoolController.getAll);

module.exports = router;
