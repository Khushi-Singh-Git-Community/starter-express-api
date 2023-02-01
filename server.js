const express = require("express");
const app = express();
const initRoutes = require("./routes/web");
const multer = require('multer')
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({ extended: true }));
initRoutes(app);

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./upload");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});

const upload = multer({ storage: fileStorageEngine });

let port = 4000;
app.get("/", (req, res) => {
  res.send("server running");
});

app.post("/single", upload.single("image"), (req, res) => {
  console.log(req.file);
  res.send("Single file upload success");
});


app.post("/multiple" , upload.array('images' , 10) , (req , res) => {
  console.log(req.files)
  res.send(JSON.stringify({status:"ök"}))
  //res.send()
});



app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
  // res.send("Diagnose server running")
});
