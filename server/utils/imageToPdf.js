const imagesToPdf = require('images-to-pdf');

module.exports = function(file) {
  return imagesToPdf([file.path], `${file.path}.pdf`);
};
