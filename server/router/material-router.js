const express = require('express');
const router = express.Router();

const materialController = require('../controllers/material-controller');
const { body } = require('express-validator');

router.post('/subject/:subjectId', materialController.create);

router.post('/:id', materialController.update);

router.delete('/:id',materialController.delete);

router.get('/', materialController.getAll);


module.exports = router;
