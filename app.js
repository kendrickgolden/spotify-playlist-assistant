require('dotenv').config();
console.log(process.env.DATABASE_URL);

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const callbackRouter = require('./routes/callback');
const loginRouter = require('./routes/login');
const lsRouter = require('./routes/liked_songs');
const upRouter = require('./routes/update_playlists')

const app = express();

const mongoose = require('mongoose');
const mongoDB = process.env.DATABASE_URL;
mongoose.connect(mongoDB);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongDB connection error'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/callback', callbackRouter.router);
app.use('/login', loginRouter);
app.use('/liked_songs', lsRouter);
app.use('/update_playlists', upRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
