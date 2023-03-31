const { Test } = require('../../models');
const ApiError = require('../../exceptions/api-error');

const uuid = require('uuid');
const path = require('path');
const fs = require('fs');

const { subjectTestService } = require('../subject');
const { classroomTestService } = require('../classroom');

class TestService {
  async create(name, file, subjectId) {
    const testCondidate = await Test.findOne({ where: { name } });
    if (testCondidate) {
      throw ApiError.BadRequest(`Тест с таким name ${name} уже существует`);
    }

    const fileName = uuid.v4() + '.dosx';
    file.mv(path.resolve(__dirname, '..', '..', 'static', fileName));

    const test = await Test.create({ name, file: fileName });

    const subjectTest = await subjectTestService.create(subjectId, test.id);

    return { test, subjectTest };
  }

  async update(id, file) {
    const test = await Test.findByPk(id);
    if (!test) {
      throw ApiError.BadRequest(`Тест с id ${id} не существует`);
    }

    fs.unlink(`../../static/${test.file}`, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('Файл успешно удален');
    });

    file.mv(path.resolve(__dirname, '..', '..', 'static', test.file));

    return test;
  }

  async delete(id) {
    const test = await Test.findByPk(id);
    if (!test) {
      throw ApiError.BadRequest(`Тест с id ${id} не существует`);
    }

    try {
      await subjectTestService.deleteTest(id);
    } catch (e) {
      console.log(e);
    }

    try {
      await classroomTestService.deleteTest(id);
    } catch (e) {
      classroomTestService.deleteTest(id);
    }

    await Test.destroy({ where: { id } });

    fs.unlink(`../../static/${test.file}`, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('Файл успешно удален');
    });
  }
}

module.exports = new TestService();
