const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
// const { PORT = 3001 } = process.env; // local

const app = express();

app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://mesto.project.nomoredomains.rocks',
    'https://api.mesto.project.nomoredomains.rocks',
    'http://mesto.project.nomoredomains.rocks',
    'http://api.mesto.project.nomoredomains.rocks',
  ],
  credentials: true,
}));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(cookieParser());
app.use(express.json());

app.use(requestLogger);
app.use(router);
app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT);
