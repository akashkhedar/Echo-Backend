const User = require("../models/user");
const cache = require("../Utils/cache");
const { createAccessToken, createRefreshToken } = require("../Utils/cookie");
const { storeRefreshToken } = require("../Utils/redis");

const updateProfile = async (req, res) => {
  try {
    const { userId } = req.user;
    const updatedFields = req.body;
    const allowedFields = [
      "username",
      "fullname",
      "dob",
      "gender",
      "bio",
      "interests",
      "website",
      "profileImage",
    ];

    const fieldsToUpdate = Object.keys(updatedFields)
      .filter((field) => allowedFields.includes(field))
      .reduce((obj, key) => {
        obj[key] = updatedFields[key];
        return obj;
      }, {});

    const existingUser = await User.findOne({
      username: fieldsToUpdate.username,
    });

    if (existingUser && existingUser._id.toString() !== userId) {
      return res.status(409).json({ message: "Username already taken." });
    }

    const user = await User.findOneAndUpdate(
      { _id: userId },
      { $set: fieldsToUpdate },
      { returnDocument: "after" }
    );

    if (!user) {
      return res.status(401).json({ message: "User not found!" });
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
    res.status(200).json({ user: user });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = updateProfile;
