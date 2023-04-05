const ApiError = require('../exceptions/api-error');
const { materialService } = require('../services/material');

const fs = require('fs');
const path = require('path');

class MaterialController {
  async create(req, res, next) {
    try {
      const { subjectId } = req.params;
      const { name } = req.body;
      const { file } = req.files;

      const data = await materialService.create(name, file, subjectId);

      return res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { file } = req.files;

      const data = await materialService.update(id, file);

      return res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;

      const data = await materialService.delete(id);

      return res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async getAll(req, res, next) {
    try {
      const data = await materialService.getAll();

      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new MaterialController();
