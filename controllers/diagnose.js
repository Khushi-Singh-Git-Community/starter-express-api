// const { upload } = require("@testing-library/user-event/dist/upload");

const diagnose = async (req, res) => {
  const { spawn } = require("child_process");
  const python = spawn("python", ["script2.py"]);
  var dataToSend = "data";

  await python.stdout.on("data", function (data) {
    console.log("Pipe data from python script ...");
    dataToSend = data.toString();
  });
  // in close event we are sure that stream from child process is closed
  python.on("close", (code) => {
    console.log(`child process close all stdio with code ${code}`);
    console.log(dataToSend);
    res.json(dataToSend);
  });
};

module.exports = diagnose;
