const User = require("../models/user");
const bcrypt = require("bcrypt");

const updatePassword = async (req, res) => {
  const { password } = req.body;
  const { email } = req.user;
  const user = await User.findOne({
    email: { $regex: new RegExp(email, "i") },
  });
  if (!user) {
    res.staus(401).json({ message: "User not found" });
  }
  const match = await bcrypt.compare(password, user.password);
  if (match) {
    return res.status(401).json({ message: "Enter a new password" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  user.password = hashedPassword;
  await user.save();
  res.status(200).json({ message: "Password Updated!" });
};

module.exports = updatePassword;
