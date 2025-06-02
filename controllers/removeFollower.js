const mongoose = require("mongoose");
const User = require("../models/user");

const removeFollower = async (req, res) => {
  try {
    const currentUserId = new mongoose.Types.ObjectId(req.user.userId);
    const targetUserId = new mongoose.Types.ObjectId(req.params.userIdToRemove);

    const [currentUser, targetUser] = await Promise.all([
      User.findById(currentUserId),
      User.findById(targetUserId),
    ]);

    if (!currentUser || !targetUser) {
      return res.status(404).json({ message: "User not found" });
    }

    await Promise.all([
      User.updateOne(
        { _id: currentUserId },
        { $pull: { follower: targetUserId } }
      ),
      User.updateOne(
        { _id: targetUserId },
        { $pull: { following: currentUserId } }
      ),
    ]);

    return res.status(200).json({ message: "Follower removed successfully" });
  } catch (error) {
    console.error("Remove follower error:", error);
    return res
      .status(500)
      .json({ error: error.message || "Internal server error" });
  }
};

module.exports = removeFollower;
