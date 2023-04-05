const {
  Answer,
  Classroom,
  TeacherClassroom,
  ClassroomTestAnswer,
  ClassroomStudent,
  Student,
  User,
  ClassroomTest,
  StudentAnswer,
} = require('../../models');
const ApiError = require('../../exceptions/api-error');

const uuid = require('uuid');
const path = require('path');
const fs = require('fs');

const { answerStudentService } = require('./student');
const { answerClassroomTestService } = require('./classroom-test');
const { AnswerDto } = require('../../dtos');

class AnswerService {
  async create(file, studentId, classroomTestId) {
    const fileName = uuid.v4() + '.docx';
    file.mv(path.resolve(__dirname, '..', '..', 'static', fileName));

    const answer = await Answer.create({ file: fileName });

    const answerStudent = await answerStudentService.create(
      studentId,
      answer.id
    );

    const answerClassroomTest = await answerClassroomTestService.create(
      classroomTestId,
      answer.id
    );

    return { answer, answerStudent, answerClassroomTest };
  }

  async getAnswer(answerId) {
    const answer = await Answer.findByPk(answerId);
    const studentAnswer = await StudentAnswer.findOne({
      where: { answerId: answer.id },
    });
    const student = await Student.findByPk(studentAnswer.studentId);
    const user = await User.findByPk(student.userId);
    const answerDto = new AnswerDto(answer, user, student, studentAnswer.grade);
    return answerDto;
  }

  async getAnswers(teacherId) {
    const teacherClassrooms = await TeacherClassroom.findAll({
      where: { teacherId },
    });
    const answersData = [];
    for (let teacherClassroom of teacherClassrooms) {
      const classroomTests = await ClassroomTest.findAll({
        where: { classroomId: teacherClassroom.classroomId },
      });
      for (let classroomTest of classroomTests) {
        const classroomTestAnswers = await ClassroomTestAnswer.findAll({
          where: { classroomTestId: classroomTest.id },
        });
        for (let classroomTestAnswer of classroomTestAnswers) {
          const classroomStudents = await ClassroomStudent.findAll({
            where: { classroomId: teacherClassroom.classroomId },
          });
          for (let classroomStudent of classroomStudents) {
            const student = await Student.findByPk(classroomStudent.studentId);
            const user = await User.findByPk(student.userId);
            const answer = await Answer.findByPk(classroomTestAnswer.answerId);
            const studentAnswer = await StudentAnswer.findOne({
              answerId: answer.id,
              studentId: student.id,
            });
            const answerDto = new AnswerDto(
              answer,
              user,
              student,
              studentAnswer.grade
            );
            answersData.push(answerDto);
          }
        }
      }
    }
    return answersData;
  }
}

module.exports = new AnswerService();
