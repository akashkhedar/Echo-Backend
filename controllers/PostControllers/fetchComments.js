const Comment = require("../models/comment");

const fetchComments = async (req, res) => {
  try {
    const id = req.params.id;
    const comments = await Comment.find({ post: id }).populate(
      "user",
      "username profileImage"
    );

    if (!comments) {
      return res.status(500).json({ message: "Error fetching comments" });
    }
    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = fetchComments;
