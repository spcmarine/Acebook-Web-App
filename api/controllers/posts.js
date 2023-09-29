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
        likes: 0,
        image_url: req.body.url
      })
    post.save((err) => {
      if (err) {
        res.status(400).json({ message: 'Bad request' });
      } else {
          const token = TokenGenerator.jsonwebtoken(req.user_id)
          res.status(201).json({ message: "OK", token: token });
        }
      })
  },
  upVote: (req, res) => {
    const filter = req.body.likedPost._id
    console.log(filter)
    Post.updateOne({ _id: filter }, { $inc: {likes: 1} })
    .then(post => {
      const token = TokenGenerator.jsonwebtoken(req.user_id)
      res.status(201).json({ message: 'OK', token: token });
    })
  },
  Delete: (req, res) => {
    const filter = req.body.post._id
    console.log(filter)
    Post.deleteOne({ _id: filter })
    .then(post => {
      const token = TokenGenerator.jsonwebtoken(req.user_id)
      res.status(201).json({ message: 'OK', token: token });
    })
  },
  Edit: (req, res) => {
    const filter = req.body.post._id
    const newMessage = req.body.message
    if (newMessage === '') {
      res.status(400).json({ message: 'Bad Request' })
    } else {
      Post.updateOne({ _id: filter }, { message: newMessage })
      .then(post => {
          const token = TokenGenerator.jsonwebtoken(req.user_id)
          res.status(201).json({ message: 'OK', token: token })
      })
    }
  }
};

module.exports = PostsController;
