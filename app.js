/*
* NPM packages used
* */
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const hbs = require('express-handlebars');

/*
* Routing variables
* */
const indexRouter = require('./routes/main_page');
const usersRouter = require('./routes/users');

/*
* App init
* */
const app = express();

mongoose.connect('mongodb://exam_client:WorkDragon88@ds159880.mlab.com:59880/exam');
console.log(mongoose.connection);


// view engine setup
app.engine('hbs',hbs({extname:'hbs', defaultLayout:'template'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*
* Routing usages
* */
app.use('/', indexRouter);
app.use('/users', usersRouter);

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
