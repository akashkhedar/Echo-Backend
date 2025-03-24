const { deleteRefreshtoken } = require("../Utils/redis");
const cache = require("../Utils/cache");

const userLogout = async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;
  const accessToken = req.cookies?.accessToken;
  await deleteRefreshtoken(refreshToken);
  cache.del(accessToken);
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: false,
    sameSite: "None",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: false,
    sameSite: "None",
  });
  res.status(200).json({ message: "Logged Out!" });
};

module.exports = userLogout;
