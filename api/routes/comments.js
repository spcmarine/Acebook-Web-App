const express = require("express");
const router = express.Router();

const CommentsController = require("../controllers/comments");

router.get("/", CommentsController.Index);
router.post("/", CommentsController.Create);
router.put("/", CommentsController.upVote);
router.delete("/", CommentsController.Delete);
router.put('/comments', CommentsController.Edit);


module.exports = router;