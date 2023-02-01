const fs = require("fs");
const path = require("path");

const directory = "upload";

const deleteFiles = async (req, res) => {
  try {
    fs.readdir(directory, (err, files) => {
      if (err) throw err;

      for (const file of files) {
        fs.unlink(path.join(directory, file), (err) => {
          if (err) throw err;
        });
      }
    });
  } catch (error) {
    console.log("error in deleting files", error);
  } finally {
    res.json("ready for new data input");
  }
};

module.exports = deleteFiles;
