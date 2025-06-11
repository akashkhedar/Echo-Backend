const User = require("../../models/user");

const fetchFollowing = async (req, res) => {
  try {
    const { userId } = req.user;
    const { following } = await User.findById({ _id: userId })
      .populate("following")
      .limit(20);

    res.status(200).json(following);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = fetchFollowing;
