const nodemailer = require('nodemailer');
const fs = require('fs');
const util = require('util');
const config = require('../../config');

const FILE_SUFFIX = 'pdf';

class NodeMail {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });
    this.mailOptions = {
      from: process.env.MAIL_USER,
      to: config.mailTo,
      subject: 'Mail with Image',
    };
    this.mailSender = util.promisify(this.transporter.sendMail.bind(this.transporter));
  }

  async sendMail(file) {
    const fileName = `${file.path}.${FILE_SUFFIX}`;
    const attachment = {
      attachments: [{
        path: fileName,
      }],
    };
    const options = { ...this.mailOptions, ...attachment };

    try {
      await this.mailSender(options);
    } catch (e) {
      console.log(e);
    }
    fs.unlinkSync(file.path);
    fs.unlinkSync(fileName);
  }
}

module.exports = NodeMail;
