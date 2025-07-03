const User = require("../../models/user");
const bcrypt = require("bcrypt");
const { createAccessToken, createRefreshToken } = require("../../Utils/cookie");
const { storeRefreshToken } = require("../../Utils/redis");
const cache = require("../../Utils/cache");

const userLogin = async (req, res) => {
  try {
    const { user, userPassword } = req.body;
    const profile = await User.findOne({
      $or: [{ username: user }, { email: user }],
    });
    if (!profile) {
      return res.status(401).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(userPassword, profile.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Wrong Password" });
    }
    const userInfo = {
      userId: profile._id,
      username: profile.username,
      fullname: profile.fullname,
      profileImage: profile.profileImage,
    };
    const accessToken = createAccessToken(userInfo);
    const refreshToken = await createRefreshToken();
    await storeRefreshToken(refreshToken, userInfo);
    cache.set(accessToken, userInfo, 3600);
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Lax",
      maxAge: 3600000,
      domain: ".echo.linkpc.net",
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Lax",
      maxAge: 604800000,
      domain: ".echo.linkpc.net",
    });
    res.status(200).json({ user: profile });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = userLogin;
