const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth-controller');
const { body } = require('express-validator');

router.post('/', authController.login);

module.exports = router;
