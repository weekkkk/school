const { Classroom } = require('../../models');
const ApiError = require('../../exceptions/api-error');

const { classroomTeacherService } = require('./teacher');

class ClassroomService {
  async create(name, teacherId) {
    const classroom = await Classroom.create({ name });

    const classroomTeacher = classroomTeacherService.create(
      classroom.id,
      teacherId
    );

    return { classroom, classroomTeacher };
  }

  async update(id, name) {
    const classroom = await Classroom.findByPk(id);

    if (!classroom) {
      throw ApiError.BadRequest(`Класс с id ${id} не зарегистрирован`);
    }

    classroom.name = name;

    await classroom.save();

    return classroom;
  }

  async delete(id) {
    const classroom = await Classroom.findByPk(id);

    if (!classroom) {
      throw ApiError.BadRequest(`Класс с id ${id} не зарегистрирован`);
    }

    await classroomTeacherService.deleteClassroom(id);

    await Classroom.destroy(id);
  }
}

module.exports = new ClassroomService();
