const { verifyAccessToken } = require("../Utils/cookie");
const User = require("../models/user");

const updateForgetPass = async (req, res) => {
  const { newPassword } = req.body;
  const { code } = req.params;
  const { email } = verifyAccessToken(code);
  const user = await User.findOneAndUpdate(
    { email: { $regex: new RegExp(email, "i") } },
    { password: newPassword },
    { returnDocument: "after" }
  );
  if (!user) {
    res.status(401).json({ message: "User not found" });
  }
  res.status(200).json({ message: "Password updated" });
};

module.exports = updateForgetPass;
