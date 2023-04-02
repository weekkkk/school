const { subjectService } = require('../services/subject');


class AnswerController {
  async getAll(req, res, next) {
    try {
      
      const data = await subjectService.getAll();

      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new AnswerController();
