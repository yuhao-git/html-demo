const imageController = require('../../controllers/web/imageController');
const jwtMiddleware = require('../../middleware/admin-auth');
var express = require('express');
var router = express.Router();
const upload = require('../../middleware/file-upload');

router.get('/:userId/:avatarId', imageController.getAvatar);
router.post('/upload', upload.single('avatar'), imageController.uploadAvatar);

module.exports = router;