const express = require("express");
const router = express.Router();
const { sendEmail, ResetPassword } = require("../controllers/mail.controller");

router.post("/", sendEmail);
router.post("/reset", ResetPassword);

module.exports = router;
