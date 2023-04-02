const { Test, TestSubject, Subject } = require('../../models');
const ApiError = require('../../exceptions/api-error');

const uuid = require('uuid');
const path = require('path');
const fs = require('fs');

const { subjectTestService } = require('../subject');
const { classroomTestService } = require('../classroom');
const { TestDto } = require('../../dtos');

class TestService {
  async create(name, file, subjectId) {
    const testCondidate = await Test.findOne({ where: { name } });
    if (testCondidate) {
      throw ApiError.BadRequest(`Тест с таким name ${name} уже существует`);
    }

    const fileName = uuid.v4() + '.docx';
    file.mv(path.resolve(__dirname, '..', '..', 'static', fileName));

    const test = await Test.create({ name, file: fileName });

    const subjectTest = await subjectTestService.create(subjectId, test.id);

    const subject = await Subject.findByPk(subjectTest.subjectId);

    const testDto = new TestDto(test, subject);

    return testDto;
  }

  async update(id, file) {
    const test = await Test.findByPk(id);
    if (!test) {
      throw ApiError.BadRequest(`Тест с id ${id} не существует`);
    }

    fs.unlink(
      path.resolve(__dirname, '..', '..', 'static', test.file),
      (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log('Файл успешно удален');
      }
    );

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
      console.log(e);
    }

    await Test.destroy({ where: { id } });

    fs.unlink(
      path.resolve(__dirname, '..', '..', 'static', test.file),
      (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log('Файл успешно удален');
      }
    );
  }

  async getAll() {
    const tests = await Test.findAll();

    const testsData = [];

    for (let test of tests) {
      const subjectTest = await TestSubject.findOne({
        where: { testId: test.id },
      });
      const subject = await Subject.findByPk(subjectTest.subjectId);
      const testDto = new TestDto(test, subject);
      testsData.push(testDto);
    }

    return testsData;
  }
}

module.exports = new TestService();
