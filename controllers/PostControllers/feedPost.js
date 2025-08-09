// controllers/feedPost.js
const Post = require("../../models/post");
const User = require("../../models/user");

const feedPost = async (req, res) => {
  try {
    const { userId } = req.user;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10; // default 10 posts per page
    const skip = (page - 1) * limit;

    const { following } = await User.findById(userId).select("following");

    const totalPosts = await Post.countDocuments({
      userId: { $in: following },
    });

    const posts = await Post.find({ userId: { $in: following } })
      .populate("userId")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      data: posts,
      hasMore: skip + posts.length < totalPosts, // whether more pages exist
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = feedPost;
