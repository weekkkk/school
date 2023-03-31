const { Subject } = require('../../models');
const ApiError = require('../../exceptions/api-error');

const { subjectTeacherService } = require('./teacher');

class SubjectService {
  async create(name, teacherId) {
    const subject = await Subject.create({ name });

    const subjectTeacher = subjectTeacherService.create(
      subject.id,
      teacherId
    );

    return { subject, subjectTeacher };
  }

  async update(id, name) {
    const subject = await Subject.findByPk(id);

    if (!subject) {
      throw ApiError.BadRequest(`Класс с id ${id} не зарегистрирован`);
    }

    subject.name = name;

    await subject.save();

    return subject;
  }

  async delete(id) {
    const subject = await Subject.findByPk(id);

    if (!subject) {
      throw ApiError.BadRequest(`Класс с id ${id} не зарегистрирован`);
    }

    await subjectTeacherService.deleteSubject(id);

    await Subject.destroy(id);
  }
}

module.exports = new SubjectService();
