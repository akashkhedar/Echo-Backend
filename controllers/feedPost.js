const Post = require("../models/post");
const User = require("../models/user");

const feedPost = async (req, res) => {
  const { userId } = req.user;
  const user = await User.findById(userId);
  const { following } = await User.findById({ _id: userId });

  const allPost = await Post.find({ userId: { $in: following } })
    .populate("userId")
    .sort({
      createdAt: -1,
    });
  res.status(200).json({ data: allPost });
};

module.exports = feedPost;
