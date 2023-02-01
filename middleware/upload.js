const util = require("util");
const path = require("path");
var multer  =   require('multer');  



var storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(`${__dirname}/../../upload`));
  },
  filename: (req, file, callback) => {
    if (file.mimetype != "audio/wav") {
      var message = `${file.originalname} is invalid. Only accept wav.`;
      return callback(message,null);
    }
    var filename = `${file.originalname}`;
    callback(null,filename);
  }
});

var uploadFiles = multer({ storage: storage }).array("multi-files", 10);
var uploadFilesMiddleware = util.promisify(uploadFiles);
module.exports = uploadFilesMiddleware;
