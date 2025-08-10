const User = require("../../models/user");
const { storeRefreshToken } = require("../../Utils/redis");
const { createAccessToken, createRefreshToken } = require("../../Utils/cookie");
const cache = require("../../Utils/cache");
const { addUser } = require("../../Utils/meilisearchConnect");

const userProfile = async (req, res) => {
  try {
    const isProduction = process.env.NODE_ENV === "production";
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
        profileStatus: true,
      },
      { returnDocument: "after" }
    );
    if (!user) {
      res.status(401).json({ message: "User not found" });
    }
    await addUser(user);
    const userInfo = {
      userId: user._id,
      username: user.username,
      fullname: user.fullname,
      profileImage: user.profileImage,
      profileStatus: true,
    };
    const accessToken = createAccessToken(userInfo);
    const refreshToken = await createRefreshToken();
    await storeRefreshToken(refreshToken, userInfo);
    cache.set(accessToken, userInfo, 3600);
    const info = cache.get(accessToken);
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
    res.status(200).json({ user: user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = userProfile;
