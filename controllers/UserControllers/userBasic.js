const User = require("../../models/user");

const getBasicUserProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select(
      "username profileImage follower following"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching basic profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = getBasicUserProfile;
