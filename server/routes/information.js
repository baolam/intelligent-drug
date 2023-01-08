const express = require("express");
const Router = express.Router();
const upload = require("../config/save-file");
const InformationController = require("../controller/InformationController");

const multipartUpload = upload.fields([
  { name : "image-1" },
  { name : "image-2" },
  { name : "image-3" },
  { name : "image-4" }
]);

Router.get("/", (req, res) => InformationController.get(req, res));
Router.put("/", multipartUpload ,(req, res) => InformationController.update(req, res));
Router.get("/create_temp", (req, res) => InformationController.create(req, res));

module.exports = Router;