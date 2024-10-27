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
app.use(express.json()); // 使用 express 内置的 json 解析
app.use(express.urlencoded({ extended: true })); // 使用 express 内置的 urlencoded 解析
app.use(cookieParser()); // 解析cookie
app.use(express.static(path.join(__dirname, 'public'))); // 静态资源
// http://localhost:8081/images/01.png

// 提供静态文件服务
app.use('/avatars', express.static('E://files/avatar')); 
// http://localhost:8081/avatars/01.png


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
