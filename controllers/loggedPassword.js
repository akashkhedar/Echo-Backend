const User = require("../models/user");
const bcrypt = require("bcrypt");

const loggedPassword = async (req, res) => {
  try {
    const userId = req.user.userId;
    const currentPassword = req.body.currentPassword;
    const newPassword = req.body.newPassword;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Incorrect current password" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.save();
    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = loggedPassword;
