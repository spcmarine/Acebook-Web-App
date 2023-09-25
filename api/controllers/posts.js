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
    const post = new Post(
      {
        message: req.body.message,
        user: req.user_id,
        likes: 0
      })
    post.save((err) => {
      if (err) {
        throw err;
      }

      const token = TokenGenerator.jsonwebtoken(req.user_id)
      res.status(201).json({ message: 'OK', token: token });
    });
  },

  upVote: (req, res) => {
    const filter = req.body.likedPost._id
    console.log(filter)
    Post.findByIdAndUpdate(filter, { $inc: {likes: 1} })
    .then(post => {
      post.save()
      const token = TokenGenerator.jsonwebtoken(req.user_id)
      res.status(201).json({ message: 'OK', token: token });
    })
  }
};

module.exports = PostsController;

// access individiual ids from posts
// use id to find individual post we want to update
// use update/updateOne to increment the likes property by one (use $set / $inc ? )