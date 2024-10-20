const videoController = require('../../controllers/web/videoController');
const jwtMiddleware = require('../../middleware/admin-auth');
var express = require('express');
var router = express.Router();
const multer = require('multer');

router.get('/list', jwtMiddleware, videoController.getVideoFiles);
router.get('/:filename', videoController.serveVideoFiles);
router.post('/upload', videoController.uploadVideo);
router.post('/delete', videoController.deleteVideoFile);


module.exports = router;