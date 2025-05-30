const user = require("../models/user");

const fetchFollowing = async (req, res) => {
  const { userId } = req.user;
  const { follower } = await user.findById({ _id: userId });

  console.log(follower);

  res.status(200).json(follower);
};

module.exports = fetchFollowing;
