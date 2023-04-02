const { Classroom } = require('../../models');
const ApiError = require('../../exceptions/api-error');

const { classroomTeacherService } = require('./teacher');
const { classroomTestService } = require('./test');
const { teacherService } = require('../teacher');

class ClassroomService {
  async create(name, teacherId) {
    const classroom = await Classroom.create({ name });

    const classroomTeacher = await classroomTeacherService.create(
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

    try {
      await classroomTestService.deleteClassroom(id);
    } catch (e) {
      console.log(e);
    }

    try {
      await classroomTeacherService.deleteClassroom(id);
    } catch (e) {
      console.log(e);
    }

    await Classroom.destroy({ where: { id } });
  }

  async getTeacher(teacherId) {
    const teacherClassrooms = await classroomTeacherService.getAll(teacherId);

    const teacherClassroomsData = [];

    for (let teacherClassroom of teacherClassrooms) {
      const classroom = await this.getById(teacherClassroom.classroomId);
      const teacher = await teacherService.getById(teacherClassroom.teacherId);
      teacherClassroomsData.push({ teacherClassroom, classroom, teacher });
    }

    return teacherClassroomsData;
  }

  async getById(id) {
    const classroom = await Classroom.findByPk(id);

    if (!classroom) {
      throw ApiError.BadRequest(`Класс с id ${id} не зарегистрирован`);
    }

    return classroom;
  }
}

module.exports = new ClassroomService();
