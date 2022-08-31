const express = require("express");
const router = express.Router();

const TokensController = require("../controllers/tokens");

router.post("/", TokensController.Create);
router.delete("/", TokensController.Destroy);

module.exports = router;
