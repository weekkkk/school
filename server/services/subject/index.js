const { subjectTeacherService } = require('./teacher');
const { subjectStudentService } = require('./student');
const subjectService = require('./subject-service');

module.exports = {
  subjectTeacherService,
  subjectStudentService,
  subjectService,
};
