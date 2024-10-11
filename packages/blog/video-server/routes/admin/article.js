var express = require('express');
var router = express.Router();
var adminArticleController = require('../../controllers/admin/articleController');
/* GET home page. */
router.post('/list', adminArticleController.list);
router.post('/query', adminArticleController.getByName);
router.post('/create', adminArticleController.create);
router.post('/update', adminArticleController.update);
router.post('/delete', adminArticleController.delete);

module.exports = router;
