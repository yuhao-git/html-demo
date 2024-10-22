const imageController = require('../../controllers/web/imageController');
const jwtMiddleware = require('../../middleware/admin-auth');
var express = require('express');
var router = express.Router();

router.get('/:avatarId', imageController.getAvatar);
router.post('/upload', imageController.uploadAvatar);

module.exports = router;