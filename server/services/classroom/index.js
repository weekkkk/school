const { classroomTeacherService } = require('./teacher');
const { classroomStudentService } = require('./student');
const { classroomTestService } = require('./test');
const classroomService = require('./classroom-service');

module.exports = {
  classroomTeacherService,
  classroomStudentService,
  classroomTestService,
  classroomService,
};
