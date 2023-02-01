const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/upload");
const diagnoseController = require("../controllers/diagnose");
const deleteFiles = require("../controllers/deletFiles");


let routes = (app) => {
  // router.get("/", homeController.getHome);
  router.post("/multiple-upload", uploadController.multipleUpload);
  router.post("/refresh", );
  router.get("/diagnose", diagnoseController);
  router.post("/delete", deleteFiles);
  return app.use("/", router);
};

module.exports = routes;
