const User = require("../models/user");
const { deleteRefreshtoken } = require("../Utils/redis");
const cache = require("../Utils/cache");
const bcrypt = require("bcrypt");

const deleteAccount = async (req, res) => {
  try {
    const { email } = req.user;
    const password = req.body.password;
    const user = await User.findOne({ email: email });
    console.log(user);
    if (!user) {
      res.status(401).end("Error");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Password" });
    }
    const refreshCookie = req.cookies?.refreshToken;
    const accessToken = req.cookies?.accessToken;
    await deleteRefreshtoken(refreshCookie);
    cache.del(accessToken);
    await user.deleteOne();
    res.status(200).json({ message: "Success" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = deleteAccount;
