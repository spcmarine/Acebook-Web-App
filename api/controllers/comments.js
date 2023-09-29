const Comment = require("../models/comment");
const TokenGenerator = require("../lib/token_generator");

const CommentsController = {
    Index: (req, res) => {
        Comment.find((err, comments) => {
            if (err) {
                throw err;
            }
            const token = TokenGenerator.jsonwebtoken(req.user_id)
            res.status(200).json({ comments: comments, token: token });
        })
    },
    Create: (req, res) => {
        const comment = new Comment({
            message: req.body.message, post_id: req.body.post_id, user_id: req.user_id});
        comment.save((err) => {
            if (err) {
                res.status(400).json({ message: 'Bad request' });
            } else {
                const token = TokenGenerator.jsonwebtoken(req.user_id)
                res.status(201).json({ message: "OK", token: token });
            }
        })
    },
    upVote: (req, res) => {
        const filter = req.body.likedComment._id
        console.log(filter)
        Comment.updateOne({ _id: filter }, { $inc: {likes: 1} })
        .then(comment => {
            const token = TokenGenerator.jsonwebtoken(req.user_id)
            res.status(201).json({ message: 'OK', token: token });
        })
    },
    Delete: (req, res) => {
        const filter = req.body.comment._id
        console.log(filter)
        Comment.deleteOne({ _id: filter })
        .then(comment => {
            const token = TokenGenerator.jsonwebtoken(req.user_id)
            res.status(201).json({ message: 'OK', token: token });
        })
    },
    Edit: (req, res) => {
        const filter = req.body.comment._id
        const newMessage = req.body.message
        if (newMessage === '') {
            res.status(400).json({ message: 'Bad Request' })
        } else {
            Comment.updateOne({ _id: filter }, { message: newMessage })
            .then(comment => {
                const token = TokenGenerator.jsonwebtoken(req.user_id)
                res.status(201).json({ message: 'OK', token: token })
            })
        }
    }
}

module.exports = CommentsController;