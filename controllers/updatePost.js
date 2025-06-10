const Post = require("../models/post");

const updatePost = async (req, res) => {
  try {
    const { userId } = req.user;
    const { id } = req.params;
    const updatedFields = req.body;
    const allowedFields = ["caption", "tag"];

    const fieldsToUpdate = Object.keys(updatedFields)
      .filter((field) => allowedFields.includes(field))
      .reduce((obj, key) => {
        obj[key] = updatedFields[key];
        return obj;
      }, {});

    const updatedPost = await Post.findOneAndUpdate(
      { _id: id, userId },
      { $set: fieldsToUpdate },
      { returnDocument: "after" }
    );
    if (!updatePost) {
      return res
        .status(401)
        .json({ message: "Post not found/User unauthorized" });
    }
    res.status(200).json({ message: "Post updated" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = updatePost;
