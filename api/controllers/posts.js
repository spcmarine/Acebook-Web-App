const Post = require("../models/post");
const TokenGenerator = require("../lib/token_generator");

const PostsController = {
  Index: (req, res) => {
    Post.find((err, posts) => {
      if (err) {
        throw err;
      }
      const token = TokenGenerator.jsonwebtoken(req.user_id)
      res.status(200).json({ posts: posts, token: token });
    });
  },
  Create: (req, res) => {
    const post = new Post(req.body);
    post.save((err) => {
      if (err) {
        throw err;
      }

      const token = TokenGenerator.jsonwebtoken(req.user_id)
      res.status(201).json({ message: 'OK', token: token });
    });
  },

  upVote: (req, res) => {
    console.log(req.body.likedPost.postObject)
    const filter = req.body.likedPost.postObject.likes
    Post.updateOne(filter, {$inc: {likes: 1}})

    console.log(req.body.likedPost.postObject)
    const token = TokenGenerator.jsonwebtoken(req.user_id)
    res.status(201).json({ message: 'OK', token: token });
  }
};

module.exports = PostsController;

// access individiual ids from posts
// use id to find individual post we want to update
// use update/updateOne to increment the likes property by one (use $set / $inc ? )