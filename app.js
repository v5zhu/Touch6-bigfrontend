var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
// var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
/********设置nodejs路由对应的文件*************/
var home=require('./routes/user/home');
var ccap=require('./routes/ccap');
var login=require('./routes/user/login');
var register=require('./routes/user/register');
var mobile=require('./routes/user/mobile');
var sendEmail=require('./routes/email');
var touchcApp=require('./routes/touchcApp/touchcApp');
var uptoken=require('./routes/uptoken');
var account=require('./routes/user/account');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
var log4js = require('log4js');
log4js.configure({
    appenders: [
        { type: 'console' }, //控制台输出
        {
            type: 'file', //文件输出
            filename: 'logs/access.log',
            maxLogSize: 1024,
            backups:3,
            category: 'normal'
        }
    ],
    replaceConsole: true
});
var logger = log4js.getLogger('normal');
logger.setLevel('debug');
app.use(log4js.connectLogger(logger, {level:log4js.levels.DEBUG, format:':method :url'}));

// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

app.use('/home',home);
//验证码；
app.use('/ccap',ccap);
app.use('/login',login);
app.use('/register',register);
app.use('/mobile',mobile);
app.use('/sendEmail',sendEmail);
app.use('/touchcApp',touchcApp);
app.use('/uptoken',uptoken);
app.use('/account',account);





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
module.exports = app;
