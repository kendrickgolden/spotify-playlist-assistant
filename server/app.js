require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const callbackRouter = require('./routes/callback');
const lsRouter = require('./routes/liked_songs');
const upRouter = require('./routes/update_playlists')
const testRouter = require('./routes/test')
const createFromArtistRouter = require('./routes/playlists/create/from_artists');
const artistImagesRouter = require('./routes/artists/images');
const app = express();

const mongoose = require('mongoose');
const mongoDB = process.env.DATABASE_URL;
mongoose.connect(mongoDB);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, OPTIONS');
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/callback', callbackRouter.router);
app.use('/liked_songs', lsRouter);
app.use('/update_playlists', upRouter);
app.use('/test', testRouter);
app.use('/playlists/create/from_artists', createFromArtistRouter);
app.use('/artists/images', artistImagesRouter);

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
