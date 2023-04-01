const ApiError = require('../exceptions/api-error');
const { classroomService } = require('../services/classroom');

class ClassroomController {
  async create(req, res, next) {
    try {
      const { teacherId } = req.params;
      const { name } = req.body;

      const data = await classroomService.create(name, teacherId);

      return res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { name } = req.body;

      const data = await classroomService.update(id, name);

      return res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;

      const data = classroomService.delete(id);

      return res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async getTeacher(req, res, next) {
    try {
      const { teacherId } = req.params;

      const data = await classroomService.getTeacher(teacherId);

      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new ClassroomController();
