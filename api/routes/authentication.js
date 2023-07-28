const express = require("express");
const router = express.Router();

const AuthenticationController = require("../controllers/authentication");

router.post("/", AuthenticationController.Authenticate);

module.exports = router;
