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
        const comment = new Comment(req.body);
        comment.save((err) => {
            if (err) {
                throw err
            }

            const token = TokenGenerator.jsonwebtoken(req.user_id)
            res.status(201).json({ message: "OK", token: token });
        })
    }
}

module.exports = CommentsController;