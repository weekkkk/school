const { School } = require('../../models');
const ApiError = require('../../exceptions/api-error');

const { userService } = require('../user');
const { schoolTeacherService } = require('./teacher');
const { schoolStudentService } = require('./student');

class SchoolService {
  async create(name, email, password) {
    const role = 'SCHOOL';
    const user = await userService.create(name, email, password, role);

    const school = await School.create({ userId: user.id });

    return { school, user };
  }

  async update(id, name, password) {
    const school = await School.findByPk(id);

    if (!school) {
      throw ApiError.BadRequest(`Школа с id ${id} не зарегистрирована`);
    }

    const user = await userService.update(school.userId, name, password);

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

    const schoolsData = [];

    for (let school of schools) {
      const user = await userService.getById(school.userId);
      schoolsData.push({ user, school });
    }

    return schoolsData;
  }

  async getById(id) {
    const school = await School.findByPk(id);

    const user = await userService.getById(school.userId);

    return { school, user };
  }
}

module.exports = new SchoolService();
