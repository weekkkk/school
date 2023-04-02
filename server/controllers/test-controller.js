const ApiError = require('../exceptions/api-error');
const { testService } = require('../services/test');

const fs = require('fs');
const path = require('path');

class TestController {
  async create(req, res, next) {
    try {
      const { subjectId } = req.params;
      const { name } = req.body;
      const { file } = req.files;

      const data = await testService.create(name, file, subjectId);

      return res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { file } = req.files;

      const data = await testService.update(id, file);

      return res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;

      const data = await testService.delete(id);

      return res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async getAll(req, res, next) {
    try {
      const data = await testService.getAll();

      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new TestController();
