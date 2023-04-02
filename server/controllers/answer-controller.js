const ApiError = require('../exceptions/api-error');
const { answerService, answerStudentService } = require('../services/answer');

const fs = require('fs');
const path = require('path');

class AnswerController {
  async create(req, res, next) {
    try {
      const { studentId, classroomTestId } = req.params;
      const { file } = req.files;

      const data = await answerService.create(file, studentId, classroomTestId);

      return res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async setGrade(req, res, next) {
    try {
      const { id } = req.params;
      const { grade } = req.body;

      const data = await answerStudentService.setGrade(id, grade);

      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new AnswerController();
