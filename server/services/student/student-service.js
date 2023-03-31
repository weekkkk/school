const { Student } = require('../../models');
const ApiError = require('../../exceptions/api-error');

const { userService } = require('../user');
const { roleService } = require('../role');
const { studentStudentService } = require('../student');

class StudentService {
  async create(name, email, password, studentId) {
    const role = await roleService.getByName('STUDENT');

    const { user, userRole } = await userService.create(
      name,
      email,
      password,
      role.id
    );

    const student = Student.create({ userId: user.id });

    const studentStudent = await studentStudentService.create(
      studentId,
      student
    );

    return { student, user, userRole, studentStudent };
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
      await studentStudentService.deleteStudent(id);
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
