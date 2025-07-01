const User = require("../../models/user");
const { createAccessToken, createRefreshToken } = require("../../Utils/cookie");
const { storeRefreshToken, verifyCode } = require("../../Utils/redis");
const cache = require("../../Utils/cache");
const { addUser } = require("../../Utils/meilisearchConnect");

const verifyUser = async (req, res) => {
  try {
    const { code } = req.body;
    const email = await verifyCode(code);
    if (!email) {
      res.status(401).json("Verification code invalid. Try again!");
      return;
    }
    const newUser = await User.create({
      email: email,
      username: email,
      isVerified: true,
    });
    const userInfo = {
      userId: newUser._id,
      profileImage: newUser.profileImage,
      profileStatus: false,
    };
    const accessToken = createAccessToken(userInfo);
    const refreshToken = await createRefreshToken();
    await storeRefreshToken(refreshToken, userInfo);
    cache.set(accessToken, userInfo, 3600);
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 3600000,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 604800000,
    });
    res.status(200).json({ message: "Email verified" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = verifyUser;
