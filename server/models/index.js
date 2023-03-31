const sequelize = require('../db');
const { DataTypes } = require('sequelize');

/**
 * * Пользователь
 */
const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  isActivated: { type: DataTypes.BOOLEAN, defaultValue: false },
  activationLink: { type: DataTypes.STRING },
});
/**
 * * Токен
 */
const Token = sequelize.define('token', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  refreshToken: { type: DataTypes.STRING(5000), unique: true },
});
/**
 * * Токен пользователя
 */
const UserToken = sequelize.define('userToken', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});
/**
 * * Роль
 */
const Role = sequelize.define('role', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true },
});
/**
 * * Роль пользователя
 */
const UserRole = sequelize.define('userRole', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

/**
 * * Админ
 */
const Admin = sequelize.define('admin', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});
/**
 * * Школа
 */
const School = sequelize.define('school', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});
/**
 * * Учитель
 */
const Teacher = sequelize.define('teacher', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});
/**
 * * Ученик
 */
const Student = sequelize.define('student', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

/**
 * * Учитель школы
 */
const SchoolTeacher = sequelize.define('schoolTeacher', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});
/**
 * * Ученик школы
 */
const SchoolStudent = sequelize.define('schoolStudent', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

/**
 * * Материал
 */
const Material = sequelize.define('material', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true },
  description: { type: DataTypes.STRING },
  file: { type: DataTypes.STRING, unique: true },
});
/**
 * * Материал учителя
 */
const TeacherMaterial = sequelize.define('teacherMaterial', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

/**
 * * Класс
 */
const Classroom = sequelize.define('classroom', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true },
});
/**
 * * Класс учителя
 */
const TeacherClassroom = sequelize.define('teacherClassroom', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});
/**
 * * Ученик класса
 */
const ClassroomStudent = sequelize.define('classroomStudent', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

/**
 * * Предмет
 */
const Subject = sequelize.define('subject', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true },
});
/**
 * * Предмет учителя
 */
const TeacherSubject = sequelize.define('teacherSubject', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

/**
 * * Тест
 */
const Test = sequelize.define('test', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true },
  file: { type: DataTypes.STRING, unique: true },
});
/**
 * * Предмет теста
 */
const TestSubject = sequelize.define('testSubject', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});
/**
 * * Тест в классе
 */
const ClassroomTest = sequelize.define('classroomTest', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

/**
 * * Ответ
 */
const Answer = sequelize.define('answer', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  file: { type: DataTypes.STRING, unique: true },
});
/**
 * * Ответ на тест в классе
 */
const ClassroomTestAnswer = sequelize.define('classroomTestAnswer', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});
/**
 * * Ответ ученика
 */
const StudentAnswer = sequelize.define('studentAnswer', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  grade: { type: DataTypes.INTEGER },
});

User.hasOne(UserToken);
UserToken.belongsTo(User);

Token.hasOne(UserToken);
UserToken.belongsTo(Token);

User.hasOne(UserRole);
UserRole.belongsTo(User);

Role.hasMany(UserRole);
UserRole.belongsTo(Role);

User.hasOne(Admin);
Admin.belongsTo(User);

User.hasOne(School);
School.belongsTo(User);

User.hasOne(Teacher);
Teacher.belongsTo(User);

User.hasOne(Student);
Student.belongsTo(User);

School.hasMany(SchoolTeacher);
SchoolTeacher.belongsTo(School);

Teacher.hasOne(SchoolTeacher);
SchoolTeacher.belongsTo(Teacher);

School.hasMany(SchoolStudent);
SchoolStudent.belongsTo(School);

Student.hasOne(SchoolStudent);
SchoolStudent.belongsTo(Student);

Student.hasMany(StudentAnswer);
StudentAnswer.belongsTo(Student);

Material.hasOne(TeacherMaterial);
TeacherMaterial.belongsTo(Material);

Teacher.hasMany(TeacherMaterial);
TeacherMaterial.belongsTo(Teacher);

Teacher.hasMany(TeacherClassroom);
TeacherClassroom.belongsTo(Teacher);

Classroom.hasOne(TeacherClassroom);
TeacherClassroom.belongsTo(Classroom);

Classroom.hasMany(ClassroomStudent);
ClassroomStudent.belongsTo(Classroom);

Classroom.hasMany(ClassroomTest);
ClassroomTest.belongsTo(Classroom);

ClassroomTest.hasMany(ClassroomTestAnswer);
ClassroomTestAnswer.belongsTo(ClassroomTest);

Student.hasMany(ClassroomStudent);
ClassroomStudent.belongsTo(Student);

Subject.hasMany(TeacherSubject);
TeacherSubject.belongsTo(Subject);

Subject.hasMany(TestSubject);
TestSubject.belongsTo(Subject);

Test.hasOne(TestSubject);
TestSubject.belongsTo(Test);

Test.hasMany(ClassroomTest);
ClassroomTest.belongsTo(Test);

Answer.hasOne(StudentAnswer);
StudentAnswer.belongsTo(Answer);

Answer.hasOne(ClassroomTestAnswer);
ClassroomTestAnswer.belongsTo(Answer);

module.exports = {
  Admin,
  Answer,
  Classroom,
  ClassroomStudent,
  ClassroomTest,
  ClassroomTestAnswer,
  Material,
  Role,
  School,
  SchoolStudent,
  SchoolTeacher,
  Student,
  StudentAnswer,
  Subject,
  Teacher,
  TeacherClassroom,
  TeacherMaterial,
  TeacherSubject,
  Test,
  TestSubject,
  Token,
  User,
  UserRole,
  UserToken,
};
