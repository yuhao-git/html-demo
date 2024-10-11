var express = require('express');
var router = express.Router();
var adminCategoryController = require('../../controllers/admin/categoryController');
/* GET home page. */
router.post('/list', adminCategoryController.list);
router.post('/query', adminCategoryController.getByName);
router.post('/create', adminCategoryController.create);
router.post('/update', adminCategoryController.update);
router.post('/delete', adminCategoryController.delete);

module.exports = router;
