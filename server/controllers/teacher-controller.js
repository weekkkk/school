const ApiError = require('../exceptions/api-error');
const { teacherService } = require('../services/teacher');

class TeacherController {
  async create(req, res, next) {
    try {
      const { schoolId } = req.params;
      const { name, email, password, subjectId } = req.body;

      const data = await teacherService.create(name, email, password, schoolId, subjectId);

      return res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { name, password } = req.body;

      const data = await teacherService.update(id, name, password);

      return res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;

      const data = teacherService.delete(id);

      return res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async getSchool(req, res, next) {
    try {
      const { schoolId } = req.params;

      const data = await teacherService.getSchool(schoolId);

      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new TeacherController();
