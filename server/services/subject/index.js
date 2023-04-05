const { subjectTeacherService } = require('./teacher');
const { subjectStudentService } = require('./student');
const { subjectTestService } = require('./test');
const { subjectMaterialService } = require('./material');
const subjectService = require('./subject-service');

module.exports = {
  subjectTeacherService,
  subjectStudentService,
  subjectTestService,
  subjectService,
  subjectMaterialService,
};
