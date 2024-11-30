var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const session = require('express-session');

var logger = require('morgan');
var knex = require('knex')

var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var login = require('./routes/login');
var dashboard = require('./routes/dashboard');
var morning = require('./routes/morning');
var day = require('./routes/day');
var night = require('./routes/night');
var image = require('./routes/image');
var kalyan = require('./routes/kalyan');
var main_bajar = require('./routes/main_bajar');
var chakri = require('./routes/chakri');
var teer = require('./routes/teer');
var n_teer = require('./routes/night_teer');
var excel = require('./routes/excel');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/assets', express.static(path.join(__dirname, 'public')));
app.use('/plugins', express.static(path.join(__dirname, 'plugins')));
app.use('/bootstrap', express.static(path.join(__dirname, 'bootstrap')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/less', express.static(path.join(__dirname, 'less')));
app.use(
  "/published-images",
  express.static(path.join(__dirname, "/routes/image"))
);

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  // cookie: { secure: true }sss
}))


app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/login', login);
app.use('/dashboard', dashboard);
app.use('/morning', morning);
app.use('/day', day);
app.use('/night', night);
app.use('/image', image);
app.use('/kalyan', kalyan);
app.use('/main_bajar', main_bajar);
app.use('/chakri', chakri);
app.use('/teer', teer);
app.use('/night_teer', n_teer);
app.use('/excel', excel);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
