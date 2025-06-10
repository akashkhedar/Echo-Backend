const Post = require("../models/post");

const likePost = async (req, res) => {
  try {
    const userId = req.user.userId;
    const postId = req.params.id;
    const targetPost = await Post.findById(postId);
    if (!targetPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    const hasLiked = targetPost.likes.includes(userId);

    await Post.findByIdAndUpdate(
      postId,
      hasLiked ? { $pull: { likes: userId } } : { $addToSet: { likes: userId } }
    );

    res.status(200).json("Post liked");
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = likePost;
