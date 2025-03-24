const Post = require("../models/post");

const uploadPost = async (req, res) => {
  const postBody = req.body;
  const { userId } = req.user;

  const allowedFields = ["media", "caption", "tags", "mentions"];

  if (postBody.tags) {
    tags = (str) => {
      return str.match(/#\w+/g) || []; // Extract hashtags
    };
  }

  if (postBody.mentions) {
    postBody.mentions = (str) => {
      return str.match(/@\w+/g) || []; // Extract mentions
    };
  }

  const fieldsToUpdate = Object.keys(postBody)
    .filter((field) => allowedFields.includes(field))
    .reduce((obj, key) => {
      obj[key] = postBody[key];
      return obj;
    }, {});

  const post = await Post.create({
    userId: userId,
    ...fieldsToUpdate,
  });
  res.status(200).json({ message: post });
};

module.exports = uploadPost;
