const imagesToPdf = require('images-to-pdf');

module.exports = file => imagesToPdf([file.path], `${file.path}.pdf`);
