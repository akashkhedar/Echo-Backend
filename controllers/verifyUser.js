const Code = require("../models/code");
const User = require("../models/user");
const { createAccessToken, createRefreshToken } = require("../Utils/cookie");
const { storeRefreshToken } = require("../Utils/redis");
const cache = require("../Utils/cache");
const { addUser } = require("../Utils/meilisearchConnect");

const verifyUser = async (req, res) => {
  const { code } = req.body;
  const user = await Code.findOne({ verificationCode: code }).populate("email");
  if (!user) {
    res.status(401).json("Verification code invalid. Try again!");
    return;
  }
  const updatedUser = await User.findOneAndUpdate(
    { _id: user.email._id },
    { isVerified: true },
    { returnDocument: "after" }
  );
  const userInfo = {
    userId: updatedUser._id,
    fullname: updatedUser.fullname,
    username: updatedUser.username,
    profileImage: updatedUser.profileImage,
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
  addUser(updatedUser);
};

module.exports = verifyUser;
