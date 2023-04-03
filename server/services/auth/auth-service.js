const {
  User,
  Admin,
  School,
  Teacher,
  Student,
  TeacherSubject,
  Subject,
} = require('../../models');
const ApiError = require('../../exceptions/api-error');

const tokenService = require('./token/token-service');

const { AdminDto, SchoolDto, StudentDto, TeacherDto } = require('../../dtos');

class UserService {
  async login(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw ApiError.BadRequest('Пользователь с таким email не найден');
    }
    const isPassEquals = user.password == password;
    if (!isPassEquals) {
      throw ApiError.BadRequest('Неверный пароль');
    }

    console.log(user.role);

    let userDto;
    switch (user.role) {
      case 'ADMIN':
        const admin = await Admin.findOne({ where: { userId: user.id } });
        userDto = new AdminDto(user, admin);
        break;
      case 'SCHOOL':
        const school = await School.findOne({ where: { userId: user.id } });
        userDto = new SchoolDto(user, school);
        break;
      case 'TEACHER':
        const teacher = await Teacher.findOne({ where: { userId: user.id } });
        const teacherSubject = await TeacherSubject.findOne({
          where: { teacherId: teacher.id },
        });
        const subject = await Subject.findByPk(teacherSubject.subjectId);
        userDto = new TeacherDto(user, teacher, subject);
        break;
      case 'STUDENT':
        const student = await Student.findOne({ where: { userId: user.id } });
        userDto = new StudentDto(user, student);
        break;
      default:
        throw new ApiError.BadRequest('Роль пользователя неверная');
    }

    console.log({ userDto });

    const tokens = tokenService.generateTokens(Object.assign({}, userDto));
    await tokenService.saveToken(user.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }

    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }

    const user = await User.findByPk(userData.userId);

    if (!user) {
      throw ApiError.UnauthorizedError();
    }

    let userDto;
    switch (user.role) {
      case 'ADMIN':
        const admin = await Admin.findOne({ where: { userId: user.id } });
        userDto = new AdminDto(user, admin);
        break;
      case 'SCHOOL':
        const school = await School.findOne({ where: { userId: user.id } });
        userDto = new SchoolDto(user, school);
        break;
      case 'TEACHER':
        const teacher = await Teacher.findOne({ where: { userId: user.id } });
        const teacherSubject = await TeacherSubject.findOne({
          where: { teacherId: teacher.id },
        });
        const subject = await Subject.findByPk(teacherSubject.subjectId);
        userDto = new TeacherDto(user, teacher, subject);
        break;
      case 'STUDENT':
        const student = await Student.findOne({ where: { userId: user.id } });
        userDto = new StudentDto(user, student);
        break;
    }

    const tokens = tokenService.generateTokens(Object.assign({}, userDto));
    await tokenService.saveToken(user.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }
}

module.exports = new UserService();
