const User = require("../../models/user");

const userAbout = async (req, res) => {
  try {
    const { userId } = req.user;

    const user = await User.findById(userId)
      .select("-password -isVerified -profileStatus -follower -following")
      .lean();

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ data: user });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = userAbout;
