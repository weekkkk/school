const {
  Student,
  Classroom,
  ClassroomStudent,
  ClassroomTest,
  Test,
  Subject,
  TestSubject,
} = require('../../models');
const ApiError = require('../../exceptions/api-error');

const { userService } = require('../user');
const { schoolStudentService, schoolService } = require('../school');
const { classroomStudentService } = require('../classroom');
const { answerStudentService } = require('../answer');
const { StudentDto, TestDto, ClassroomDto } = require('../../dtos');

class StudentService {
  async create(name, email, password, schoolId) {
    const role = 'STUDENT';

    const user = await userService.create(name, email, password, role);

    const student = await Student.create({ userId: user.id });

    const schoolStudent = await schoolStudentService.create(
      schoolId,
      student.id
    );

    const studentDto = new StudentDto(user, student);

    return studentDto;
  }

  async update(id, name, password) {
    const student = await Student.findByPk(id);

    if (!student) {
      throw ApiError.BadRequest(`Ученик с id ${id} не зарегистрирован`);
    }

    const user = await userService.update(id, name, password);

    return { student, user };
  }

  async delete(id) {
    const student = await Student.findByPk(id);

    if (!student) {
      throw ApiError.BadRequest(`Ученик с id ${id} не зарегистрирован`);
    }

    try {
      await answerStudentService.deleteStudent(id);
    } catch (e) {
      console.log(e);
    }

    try {
      await classroomStudentService.deleteStudent(id);
    } catch (e) {
      console.log(e);
    }

    try {
      await schoolStudentService.deleteStudent(id);
    } catch (e) {
      console.log(e);
    }

    await Student.destroy({ where: { id } });

    await userService.delete(student.userId);
  }

  async getSchool(schoolId) {
    const schoolStudents = await schoolStudentService.getAll(schoolId);

    const schoolStudentsData = [];

    for (let schoolStudent of schoolStudents) {
      const student = await this.getById(schoolStudent.studentId);
      const school = await schoolService.getById(schoolStudent.schoolId);
      const user = await userService.getById(student.userId);

      const studentDto = new StudentDto(user, student);

      schoolStudentsData.push(studentDto);
    }

    return schoolStudentsData;
  }

  async getById(id) {
    console.log({ id });

    const student = await Student.findByPk(id);

    if (!student) {
      throw ApiError.BadRequest(`Ученик с id ${id} не зарегистрирован`);
    }

    return student;
  }

  async getTests(studentId) {
    const studentClassrooms = await ClassroomStudent.findAll({
      where: { studentId },
    });

    const studentTestsData = [];
    for (let studentClassroom of studentClassrooms) {
      const classroom = await Classroom.findByPk(studentClassroom.classroomId);
      const classroomTests = await ClassroomTest.findAll({
        where: { classroomId: classroom.id },
      });
      for (let classroomTest of classroomTests) {
        const test = await Test.findByPk(classroomTest.testId);
        const testSubject = await TestSubject.findOne({
          where: { testId: test.id },
        });
        const subject = await Subject.findByPk(testSubject.subjectId);

        const testDto = new TestDto(test, subject);
        const classroomDto = new ClassroomDto(classroom);
        studentTestsData.push({
          id: Number(`${test.id}${classroom.id}`),
          test: testDto,
          classroom: classroomDto,
        });
      }
    }

    return studentTestsData;
  }
}

module.exports = new StudentService();
