const User = require("../../models/user");

const followUser = async (req, res) => {
  try {
    const currentUserId = req.user.userId;
    const targetUserId = req.params.id;

    const user = await User.findOneAndUpdate();
    const currentUserUpdate = User.updateOne(
      { _id: currentUserId },
      { $addToSet: { following: targetUserId } }
    );

    // Update target user's 'follower'
    const targetUserUpdate = User.updateOne(
      { _id: targetUserId },
      { $addToSet: { follower: currentUserId } }
    );

    await Promise.all([currentUserUpdate, targetUserUpdate]);

    return res.status(200).json({ message: "Followed user successfully." });
  } catch (error) {
    console.error("Follow error:", error);
    res.status(500).json({ message: "Server error." });
  }
};

module.exports = followUser;
