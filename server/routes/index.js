const upload = require('../utils/multer');
const express = require('express');
const router = express.Router();

const { imageHandler } = require('../controllers');

router.post('/uploadImage', upload.single('myImage'), imageHandler.uploadImage);

module.exports = router;

