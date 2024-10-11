const videoController = require('../../controllers/web/videoController');
const jwtMiddleware = require('../../middleware/admin-auth');
var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload = multer(); // 创建 multer 实例

router.get('/list', jwtMiddleware, videoController.getVideoFiles);
router.get('/:filename', videoController.serveVideoFiles);
router.post('/upload', videoController.uploadVideo);

module.exports = router;