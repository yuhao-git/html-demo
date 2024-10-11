const express = require('express');
const router = express.Router();
const userController = require('../../controllers/admin/userController');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/getUser', userController.getUser);

module.exports = router;