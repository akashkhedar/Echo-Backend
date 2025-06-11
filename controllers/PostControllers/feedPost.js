const Post = require("../../models/post");
const User = require("../../models/user");

const feedPost = async (req, res) => {
  try {
    const { userId } = req.user;
    const { following } = await User.findById({ _id: userId });

    const allPost = await Post.find({ userId: { $in: following } })
      .populate("userId")
      .sort({
        createdAt: -1,
      });
    res.status(200).json({ data: allPost });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = feedPost;
