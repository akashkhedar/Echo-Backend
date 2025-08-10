const User = require("../../models/user");

const userAbout = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await User.findById(userId).select(
      "-password -isVerified -profileStatus -follower -following"
    );

    console.log(user);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = userAbout;
