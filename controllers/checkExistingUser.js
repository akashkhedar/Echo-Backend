const User = require("../models/user");
const { existingUser } = require("../Utils/meilisearchConnect");

const checkExistingUser = async (req, res) => {
  const username = req.query.username;
  const { userId } = req.user;
  if (!username) return res.status(400).json({ message: "Username required" });

  const result = await existingUser(username, userId);

  if (result) {
    return res.status(409).json({ message: "username unavailable" });
  }
  return res.status(200).json({ message: "username available" });
};

module.exports = checkExistingUser;
