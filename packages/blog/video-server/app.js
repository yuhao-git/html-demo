var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var routes = require('./routes/routes');
var app = express(); 

// view engine setup
app.set('views', path.join(__dirname, 'views')); // 视图目录
app.set('view engine', 'jade'); // 视图引擎

app.use(logger('dev')); // 日志
app.use(express.json()); // 解析请求体
app.use(express.urlencoded({ extended: false })); // 解析请求体
app.use(cookieParser()); // 解析cookie
app.use(express.static(path.join(__dirname, 'public'))); // 静态资源

// 路由
app.use(routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404)); // 404错误
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message; // 错误信息
  res.locals.error = req.app.get('env') === 'development' ? err : {}; // 错误信息

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
