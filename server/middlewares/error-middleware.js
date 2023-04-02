const APiError = require('../exceptions/api-error');

/**
 * * Отправление ошибки на клиент
 */
module.exports = function (err, req, res, next) {
  console.log(err);
  if (err instanceof APiError) {
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors });
  }
  return res.status(500).json({ message: 'Непредвиденая ошибка' });
};
