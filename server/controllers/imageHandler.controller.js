const imageHandler = require('../services/imageHandler.service');

const uploadImage = async (req, res, next) => {
  const file = req.file;

  if (!file) {
    const error = new Error('Please upload a file');
    error.httpStatusCode = 400;
    return next(error);
  }
  await imageHandler.uploadImage(file);
  res.send(file);
};

module.exports = {
  uploadImage,
};
