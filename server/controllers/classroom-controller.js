const ApiError = require('../exceptions/api-error');
const {
  classroomService,
  classroomStudentService,
  classroomTestService,
} = require('../services/classroom');

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

  async addStudents(req, res, next) {
    try {
      const { classroomId } = req.params;
      const { studentIds } = req.body;

      const classroomStudentsData = [];
      for (let studentId of studentIds) {
        const classroomStudent = await classroomStudentService.create(
          classroomId,
          studentId
        );
        classroomStudentsData.push(classroomStudent);
      }

      return res.json(classroomStudentsData);
    } catch (e) {
      next(e);
    }
  }

  async removeStudent(req, res, next) {
    try {
      const { classroomId, studentId } = req.params;

      const data = await classroomStudentService.delete(classroomId, studentId);

      return res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async addTest(req, res, next) {
    try {
      const { classroomId, testId } = req.params;

      const data = await classroomTestService.create(classroomId, testId);

      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new ClassroomController();
