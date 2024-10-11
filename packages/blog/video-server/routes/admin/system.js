const express = require('express');
const router = express.Router();
const systemController = require('../../controllers/admin/systemController');

router.post('/shutdown', systemController.shutdownSystem);

module.exports = router;