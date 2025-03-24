const { verifyToken } = require("../Utils/cookie");
const User = require("../models/user");
const { storeRefreshToken } = require("../Utils/redis");
const { createAccessToken, createRefreshToken } = require("../Utils/cookie");
const cache = require("../Utils/cache");

const userProfile = async (req, res) => {
  const { password, username, fullname, dob, gender, pic_url } = req.body;
  const { userId } = req.user;
  const user = await User.findOneAndUpdate(
    { _id: userId },
    {
      password: password,
      username: username,
      fullname: fullname,
      dob: dob,
      gender: gender,
      profileImage: pic_url,
    },
    { returnDocument: "after" }
  );
  if (!user) {
    res.status(401).json({ message: "User not found" });
  }
  const userInfo = {
    userId: user._id,
    username: user.username,
    fullname: user.fullname,
    profileImage: user.profileImage,
  };
  const accessToken = createAccessToken(userInfo);
  const refreshToken = await createRefreshToken();
  await storeRefreshToken(refreshToken, userInfo);
  cache.set(accessToken, userInfo, 3600);
  const info = cache.get(accessToken);
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "None",
    maxAge: 3600000,
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "None",
    maxAge: 604800000,
  });
  res.status(200).json({ user: user });
};

module.exports = userProfile;
