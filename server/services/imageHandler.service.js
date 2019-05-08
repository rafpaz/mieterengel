const imageToPdf = require('../utils/imageToPdf');
const NodeMail = require('../utils/nodemailer');

const mail = new NodeMail();

const uploadImage = async (image) => {
  try {
    await imageToPdf(image);
    await mail.sendMail(image);
    return Promise.resolve();
  } catch (e) {
    console.log(e);
    return Promise.reject(e);
  }
};

module.exports = {
  uploadImage,
};
