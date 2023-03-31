const { Student } = require('../../models');
const ApiError = require('../../exceptions/api-error');

const { userService } = require('../user');
const { roleService } = require('../role');
const { schoolStudentService } = require('../school');
const { classroomStudentService } = require('../classroom');

class StudentService {
  async create(name, email, password, schoolId) {
    const role = await roleService.getByName('STUDENT');

    const { user, userRole } = await userService.create(
      name,
      email,
      password,
      role.id
    );

    const student = Student.create({ userId: user.id });

    const schoolStudent = await schoolStudentService.create(schoolId, student);

    return { student, user, userRole, schoolStudent };
  }

  async update(id, name, password) {
    const student = await Student.findByPk(id);

    if (!student) {
      throw ApiError.BadRequest(`Ученик с id ${id} не зарегистрирован`);
    }

    const user = await userService.update(name, password);

    return { student, user };
  }

  async delete(id) {
    const student = await Student.findByPk(id);

    if (!student) {
      throw ApiError.BadRequest(`Ученик с id ${id} не зарегистрирован`);
    }

    try {
      await classroomStudentService.deleteStudent(id);
    } catch (e) {
      console.log(e);
    }

    try {
      await schoolStudentService.deleteStudent(id);
    } catch (e) {
      console.log(e);
    }

    await Student.destroy({ where: { id } });

    await userService.delete(student.userId);
  }

  async getAll() {
    const students = await Student.findAll();

    return students;
  }

  async getById(id) {
    const student = await Student.findByPk(id);

    if (!student) {
      throw ApiError.BadRequest(`Ученик с id ${id} не зарегистрирован`);
    }

    return student;
  }
}

module.exports = new StudentService();
