require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
// const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

// const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const userLikesRouter = require('./routes/userLikes');
const memoriesRouter = require('./routes/memories');
const authRouter = require('./routes/auth');
const { ForbiddenException } = require('./services/auth');

/**
 * Configurar express
 */
const app = express();


app.use(cors({ origin: '*' }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'files')));


/**
 * Configurar rutas
 */
// app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/userLikes', userLikesRouter);
app.use('/memories', memoriesRouter);
app.use('/auth', authRouter);

/**
 * Configurar manejadores de error
 */
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {  
  console.error(err);
  res.status(err.status || 500).json(err);
});

module.exports = app;
