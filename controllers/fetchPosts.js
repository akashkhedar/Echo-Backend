const Post = require("../models/post");

const fetchPosts = async (req, res) => {
  const { userId } = req.user;

  const posts = await Post.find({ userId: userId })
    .populate("userId")
    .sort({ createdAt: -1 });

  res.status(200).json(posts);
};

module.exports = fetchPosts;
