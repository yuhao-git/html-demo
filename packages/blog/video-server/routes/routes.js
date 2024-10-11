var express = require('express');
var router = express.Router();

const jwtMiddleware = require('../middleware/admin-auth');
var indexRouter = require('./index');
var adminUserRouter = require('./admin/user');
var adminCategoryRouter = require('./admin/category');
var adminArticleRouter = require('./admin/article');
var videoRouter = require('./web/video');
var systemRouter = require("./admin/system")

router.use('/', indexRouter);
router.use('/admin/user', adminUserRouter);
router.use('/admin/system', jwtMiddleware, systemRouter);
router.use('/admin/category', jwtMiddleware, adminCategoryRouter);
router.use('/admin/article', jwtMiddleware, adminArticleRouter);
router.use('/video', videoRouter);
module.exports = router;