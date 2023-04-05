const ApiError = require('../exceptions/api-error');
const resultService = require('../services/result/result-service');

const fs = require('fs');
const path = require('path');

class ResultController {
  async getAll(req, res, next) {
    try {
      const { schoolId, subjectId } = req.params;

      const data = await resultService.getAll(schoolId, subjectId);

      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new ResultController();
