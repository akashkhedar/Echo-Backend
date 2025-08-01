const User = require("../../models/user");
const mailService = require("../../Utils/mail");
const { createResetTkn } = require("../../Utils/redis");

const forgetPassword = async (req, res) => {
  try {
    const userInfo = req.body.userInfo;

    const user = await User.findOne({
      $or: [{ username: userInfo }, { email: userInfo }],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const token = await createResetTkn(user.email);
    mailService(user.email, token, req.path);
    res
      .status(200)
      .json({ message: "Check your mail for password reset link" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = forgetPassword;
