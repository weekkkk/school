require('dotenv').config();

const express = require('express');
const sequelize = require('./db');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middlewares/error-middleware');

const router = require('./router');

const models = require('./models');

const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: function (origin, callback) {
      callback(null, true);
    },
  })
);
app.use('/api', router);

// Обработка ошибок, последний Middleware
app.use(errorMiddleware);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Serve port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
