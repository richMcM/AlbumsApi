var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var port = process.env.PORT || 4000;
var routes = require('./routes/index')
var bodyParser = require('body-parser');
//var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
//var $ = require('jquery');
//var methodOverride = require('method-override')


// Setup express app
var app = express();

//Connect to mongo db
mongoose.connect('mongodb://localhost/albumgo');
mongoose.Promise = global.Promise;

// Pass JSON through routes
app.use(bodyParser.json());

// Pass form data through routes
app.use(bodyParser.urlencoded({ extended: false }))

//use and intitialise routes
app.use(routes);

//Listen for requests
app.listen(port, function(){
    console.log('Now listening for requests on port ' + port);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
//app.use('/users', usersRouter);

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
