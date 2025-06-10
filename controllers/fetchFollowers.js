const User = require("../models/user");

const fetchFollowing = async (req, res) => {
  try {
    const { userId } = req.user;
    const { follower } = await User.findById({ _id: userId })
      .populate("follower")
      .limit(20);

    res.status(200).json(follower);
  } catch (error) {
    return res.staus(500).json({ error: "Internal Server Error" });
  }
};

module.exports = fetchFollowing;
