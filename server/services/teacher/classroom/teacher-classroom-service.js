const { Classroom } = require('../../models');
const ApiError = require('../../exceptions/api-error');

class ClassroomService {
  async create(teacherId, classroomId) {
    const classroom = await Classroom.create({ name });


    return { classroom };
  }
}

module.exports = new ClassroomService();
