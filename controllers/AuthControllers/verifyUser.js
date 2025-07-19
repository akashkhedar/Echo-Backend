const User = require("../../models/user");
const { createAccessToken, createRefreshToken } = require("../../Utils/cookie");
const { storeRefreshToken, verifyCode } = require("../../Utils/redis");
const cache = require("../../Utils/cache");
const { addUser } = require("../../Utils/meilisearchConnect");

const verifyUser = async (req, res) => {
  try {
    const isProduction = process.env.NODE_ENV === "production";
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
      secure: isProduction,
      sameSite: isProduction ? "None" : "Lax",
      maxAge: 3600000,
      domain: isProduction ? ".echo.linkpc.net" : undefined,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "None" : "Lax",
      maxAge: 604800000,
      domain: isProduction ? ".echo.linkpc.net" : undefined,
    });
    res.status(200).json({ message: "Email verified" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = verifyUser;
