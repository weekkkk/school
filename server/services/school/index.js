const { schoolTeacherService } = require('./teacher');
const { schoolStudentService } = require('./student');
const schoolService = require('./school-service');

module.exports = {
  schoolService,
  schoolTeacherService,
  schoolStudentService,
};
