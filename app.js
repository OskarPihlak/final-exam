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
const session = require('express-session');
const passport = require('passport');
const expressValidator = require('express-validator');

/*
* Routing variables
* */
const indexRouter = require('./routes/main_page');
/*
* Database
* */
mongoose.connect('mongodb://exam_client:WorkDragon88@ds159880.mlab.com:59880/exam');
let db = mongoose.connection;

//check connection
db.once('open',()=>{
    console.log('Connected to mongodb')
});

//check for db errors
db.on('error', (err)=>{
    console.log(err)
});

/*
* App init
* */
const app = express();

// view engine setup
app.engine('hbs',hbs({extname:'hbs', defaultLayout:'template'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
            , root    = namespace.shift()
            , formParam = root;

        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg   : msg,
            value : value
        };
    }
}));
/*
* Routing usages
* */
app.use('/', indexRouter);

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
