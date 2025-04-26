const fetchFollowing = async (req, res) => {
  const { _id } = req.user;
  const { followers } = await User.findById(_id);
  res.status(200).json({ followers });
};

module.exports = fetchFollowing;
