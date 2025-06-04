const User = require("../models/user");
const bcrypt = require("bcrypt");
const { verifyResetTkn } = require("../Utils/redis");

const updatePassword = async (req, res) => {
  try {
    const token = req.params.token;
    const { newPassword } = req.body;

    const email = await verifyResetTkn(token);
    console.log(email);
    const user = await User.findOne({
      email: { $regex: new RegExp(email, "i") },
    });
    if (!user) {
      res.staus(401).json({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ message: "Password Updated!" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = updatePassword;
