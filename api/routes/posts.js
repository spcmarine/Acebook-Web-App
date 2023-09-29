const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.Index);
router.post("/", PostsController.Create);
router.put("/", PostsController.upVote);
router.delete("/", PostsController.Delete);
router.put("/posts", PostsController.Edit);

module.exports = router;
