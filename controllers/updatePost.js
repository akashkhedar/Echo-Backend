const Post = require("../models/post");

const updatePost = async (req, res) => {
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
  console.log(id, userId);

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
  console.log(updatePost);

  res.status(200).json({ message: "Post updated" });
};

module.exports = updatePost;
