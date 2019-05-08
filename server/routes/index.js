const express = require('express');

const router = express.Router();

const { imageHandler } = require('../controllers');

router.post('/uploadImage', imageHandler.uploadImage);

module.exports = router;
