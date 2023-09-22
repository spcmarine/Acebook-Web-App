const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.Index);
router.post("/", PostsController.Create);

//new put route to edit likes property on individual posts
router.put("/", PostsController.upVote);

module.exports = router;
