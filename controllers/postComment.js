const Comment = require("../models/comment");
const Post = require("../models/post");

const postComment = async (req, res) => {
  const userId = req.user.userId;
  const targetPost = req.params.id;
  const { comment } = req.body;
  try {
    const post = await Post.findById(targetPost);
    if (!post) {
      return res.status(404).json("Post not found!");
    }
    const newComment = new Comment({
      user: userId,
      post: targetPost,
      comment: comment,
    });
    const savedComment = await newComment.save();

    const returnComment = await savedComment.populate(
      "user",
      "username profileImage"
    );
    post.comments.push(savedComment._id);
    await post.save();
    res.status(200).json(returnComment);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = postComment;
