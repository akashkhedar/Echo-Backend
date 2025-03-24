const Post = require("../models/post");

const deletePost = async (req, res) => {
  const { userId } = req.user;
  const { id } = req.params;
  const post = await Post.findOneAndDelete({ _id: id, userId });
  if (!post) {
    return res
      .status(401)
      .json({ message: "Post not found/User unauthorized" });
  }
  res.status(200).json({ message: "Post deleted successfully" });
};

module.exports = deletePost;
