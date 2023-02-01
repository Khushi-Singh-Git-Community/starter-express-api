const upload = require("../middleware/upload");


const multipleUpload = async (req, res) => {
  try {
    console.log("this is the request")
    console.log(req.files)
    await upload(req, res);
    console.log(req.files);
    if (req.files.length <= 0) {
      return res.json("Please select at least one file.");
    }

    return res.json("Files have been uploaded.");
  } catch (error) {
    console.log(error);
    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.send("Too many files to upload.");
    }
    return res.send(`Error when trying upload many files: ${error}`);
  }
};

module.exports = {
  multipleUpload: multipleUpload
};