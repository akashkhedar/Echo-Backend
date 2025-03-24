const User = require("../models/user");
const mailService = require("../Utils/mail");
const { createAccessToken } = require("../Utils/cookie");

const forgetPassword = async (req, res) => {
  const { providedValue } = req.body;
  const user = await User.findOne({
    $or: [
      { username: { $regex: new RegExp(providedValue, "i") } },
      { email: { $regex: new RegExp(providedValue, "i") } },
    ],
  });
  if (!user) {
    return res.status(401).json({ message: "Invalid user!" });
  }
  const token = createAccessToken({ email: user.email });
  mailService(user.username, token, req.path);
  res.status(200).json({ message: "Check your mail for password reset link" });
};

module.exports = forgetPassword;
