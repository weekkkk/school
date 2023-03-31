const ApiError = require('../exceptions/api-error');
const { schoolService } = require('../services/school');

class SchoolController {
  async create(req, res, next) {
    try {
      const { name, email, password } = req.body;

      const data = await schoolService.create(name, email, password);

      return res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { name, password } = req.body;

      const data = await schoolService.update(id, name, password);

      return res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;

      const data = schoolService.delete(id);

      return res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async getAll(req, res, next) {
    try {
      const data = await schoolService.getAll();

      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new SchoolController();
