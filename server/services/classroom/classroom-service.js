const { Classroom, ClassroomTest } = require('../../models');
const ApiError = require('../../exceptions/api-error');

const { classroomTeacherService } = require('./teacher');
const { classroomTestService } = require('./test');
const { teacherService } = require('../teacher');
const { ClassroomDto } = require('../../dtos');

class ClassroomService {
  async create(name, teacherId) {
    console.log({ name, teacherId });
    const classroom = await Classroom.create({ name });

    const classroomTeacher = await classroomTeacherService.create(
      classroom.id,
      teacherId
    );

    console.log(classroom);

    const classroomDto = new ClassroomDto(classroom);

    return classroomDto;
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
      const classroomTests = await ClassroomTest.findAll({
        where: { classroomId: classroom.id },
      });
      const teacher = await teacherService.getById(teacherClassroom.teacherId);
      const classroomDto = new ClassroomDto(
        classroom,
        classroomTests.map((el) => ({ id: el.testId }))
      );
      teacherClassroomsData.push(classroomDto);
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
