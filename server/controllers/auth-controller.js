const ApiError = require('../exceptions/api-error');
const authService = require('../services/auth/auth-service');

const fs = require('fs');
const path = require('path');

class AnswerController {
  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const userData = await authService.login(email, password);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new AnswerController();
