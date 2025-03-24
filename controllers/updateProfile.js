const User = require("../models/user");
const cache = require("../Utils/cache");

const updateProfile = async (req, res) => {
  const { email } = req.user;
  const updatedFields = req.body;
  const allowedFields = [
    "username",
    "fullname",
    "dob",
    "gender",
    "bio",
    "profileImage",
  ];

  const fieldsToUpdate = Object.keys(updatedFields)
    .filter((field) => allowedFields.includes(field))
    .reduce((obj, key) => {
      obj[key] = updatedFields[key];
      return obj;
    }, {});
  const user = await User.findOneAndUpdate(
    { email: email },
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
  res.status(200).json({ message: "Profile updated" });
};

module.exports = updateProfile;
