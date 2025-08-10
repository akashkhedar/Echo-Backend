const Post = require("../../models/post");

const fetchPosts = async (req, res) => {
  try {
    const { userId } = req.user;

    const posts = await Post.find({ userId })
      .populate("userId")
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching user posts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = fetchPosts;
