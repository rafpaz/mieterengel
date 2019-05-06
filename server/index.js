const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;
const multer = require('multer');
const imagesToPdf = require('images-to-pdf');
const nodemailer = require('nodemailer');
const fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// SET STORAGE
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
});

const upload = multer({ storage: storage });

// API calls
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

const mailProperties = {
  user: 'mieterengelrafael@gmail.com',
  pass: 'HometaskCamera1!',
};
const mailTo = 'refaelypaz@gmail.com';

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

app.post('/uploadImage', upload.single('myImage'), async (req, res, next) => {
  const file = req.file;

  if (!file) {
    const error = new Error('Please upload a file');
    error.httpStatusCode = 400;
    return next(error);
  }

  await imagesToPdf([file.path], `${file.path}.pdf`);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: mailProperties,
  });

  const mailOptions = {
    from: mailProperties.user,
    to: mailTo,
    subject: 'Testing Image',
    attachments: [{
      path: `${file.path}.pdf`
    }],
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err)
      console.log(err);
    else
      console.log(info);
    fs.unlinkSync(file.path);
    fs.unlinkSync(`${file.path}.pdf`);
  });

  res.send(file)
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, '../client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}
app.listen(port, () => console.log(`Listening on port ${port}`));
