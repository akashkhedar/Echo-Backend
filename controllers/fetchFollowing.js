const User = require("../models/user");

const fetchFollowing = async (req, res) => {
  const { userId } = req.user;
  const { following } = await User.findById({ _id: userId })
    .populate("following")
    .limit(20);

  res.status(200).json(following);
};

module.exports = fetchFollowing;
