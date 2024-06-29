const express = require("express");
const router = express.Router();
const mailController = require("../controllers/mailController");

router.post("/mail", mailController.sendEmail);

module.exports = router;
