const Post = require("../../models/post");
const User = require("../../models/user");

const feedPost = async (req, res) => {
  try {
    const { userId } = req.user;

    const { following } = await User.findById(userId).select("following");

    const posts = await Post.find({ userId: { $in: following } })
      .populate("userId")
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching feed posts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = feedPost;
