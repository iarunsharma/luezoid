const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const mainController = require("../controllers/mainController");

router.post("/login", userController.login);

router.post("/website", mainController.website);

router.post("/article", mainController.article);

router.post("/subscription", mainController.subscription);

router.get("/getEmail", mainController.getEmail);

router.post("/sendEmail", mainController.sendEmail);

module.exports = router;
