const express = require('express');
const router = express.Router();

const testController = require('../controllers/test-controller');
const { body } = require('express-validator');

router.post('/subject/:subjectId', testController.create);

router.post('/:id', testController.update);

router.delete('/:id',testController.delete);

router.get('/', testController.getAll);


module.exports = router;
