const User = require("../models/user");

const fetchFollowing = async (req, res) => {
  const { userId } = req.user;
  const { follower } = await User.findById({ _id: userId }).populate("User");

  res.status(200).json(follower);
};

module.exports = fetchFollowing;
