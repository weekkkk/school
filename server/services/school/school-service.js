const { School } = require('../../models');
const ApiError = require('../../exceptions/api-error');

const { userService } = require('../user');
const { roleService } = require('../role');
const { schoolTeacherService } = require('./teacher');
const { schoolStudentService } = require('./student');

class SchoolService {
  async create(name, email, password) {
    const role = await roleService.getByName('SCHOOL');

    const { user, userRole } = await userService.create(
      name,
      email,
      password,
      role.id
    );

    const school = School.create({ userId: user.id });

    return { school, user, userRole };
  }

  async update(id, name, password) {
    const school = await School.findByPk(id);

    if (!school) {
      throw ApiError.BadRequest(`Школа с id ${id} не зарегистрирована`);
    }

    const user = await userService.update(name, password);

    return { school, user };
  }

  async delete(id) {
    const school = await School.findByPk(id);

    if (!school) {
      throw ApiError.BadRequest(`Школа с id ${id} не зарегистрирована`);
    }

    try {
      await schoolTeacherService.deleteSchool(id);
    } catch (e) {
      console.log(e);
    }

    try {
      await schoolStudentService.deleteSchool(id);
    } catch (e) {
      console.log(e);
    }

    await School.destroy({ where: { id } });

    await userService.delete(school.userId);
  }

  async getAll() {
    const schools = await School.findAll();

    return schools;
  }

  async getById(id) {
    const school = await School.findByPk(id);

    if (!school) {
      throw ApiError.BadRequest(`Школа с id ${id} не зарегистрирована`);
    }

    return school;
  }
}

module.exports = new SchoolService();
