const ApiError = require('../exceptions/api-error');
const { studentService } = require('../services/student');

class StudentController {
  async create(req, res, next) {
    try {
      const { schoolId } = req.params;
      const { name, email, password } = req.body;

      const data = await studentService.create(name, email, password, schoolId);

      return res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { name, password } = req.body;

      const data = await studentService.update(id, name, password);

      return res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;

      const data = studentService.delete(id);

      return res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async getSchool(req, res, next) {
    try {
      const { schoolId } = req.params;

      const data = await studentService.getSchool(schoolId);

      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new StudentController();
