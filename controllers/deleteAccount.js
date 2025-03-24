const User = require("../models/user");
const { deleteRefreshtoken } = require("../Utils/redis");
const cache = require("../Utils/cache");

const deleteAccount = async (req, res) => {
  const { email } = req.user;
  const refreshCookie = req.cookies?.refreshToken;
  const accessToken = req.cookies?.accessToken;
  await deleteRefreshtoken(refreshCookie);
  cache.del(accessToken);
  const user = await User.findOneAndDelete({ email: email });
  if (!user) {
    res.status(401).end("Error");
  }
  res.status(200).json({ message: "Success" });
};

module.exports = deleteAccount;
