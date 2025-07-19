const User = require("../../models/user");
const cache = require("../../Utils/cache");
const { createAccessToken, createRefreshToken } = require("../../Utils/cookie");
const mailService = require("../../Utils/mail");
const {
  storeVerificationCode,
  storeRefreshToken,
} = require("../../Utils/redis");

const createUser = async (req, res) => {
  try {
    const isProduction = process.env.NODE_ENV === "production";

    const { email } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      if (user.isVerified) {
        if (user.profileStatus) {
          return res.status(409).json({ message: "Email already in-use!" });
        }
        const userInfo = {
          userId: user._id,
          profileImage: user.profileImage,
          email: user.email,
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
        return res.status(401).json({ message: "Profile incomplete!" });
      }
      await user.deleteOne();
    }
    const verificationCode = Math.floor(100000 + Math.random() * 900000);
    await storeVerificationCode(email, verificationCode);
    mailService(email, verificationCode, req.path);
    res.status(200).json({ message: "Check mail for verification code" });
    return;
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = createUser;
