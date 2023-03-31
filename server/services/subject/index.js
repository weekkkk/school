const { subjectTeacherService } = require('./teacher');
const { subjectStudentService } = require('./student');
const { subjectTestService } = require('./test');
const subjectService = require('./subject-service');

module.exports = {
  subjectTeacherService,
  subjectStudentService,
  subjectTestService,
  subjectService,
};
