const User = require("../models/user");
const { existingUser } = require("../Utils/meilisearchConnect");

const checkExistingUser = async (req, res) => {
  const username = req.query.username;
  const { userId } = req.user;
  console.log(username, userId);

  if (!username) return res.status(400).json({ message: "Username required" });

  const result = await existingUser(username);
  console.log(result.hits[0]._id);
  if (result.hits.length > 0 && result.hits[0]._id !== userId) {
    return res.status(409).json({ message: "Username already taken" });
  }

  return res.status(200).json({ message: "Username available" });
};

module.exports = checkExistingUser;
