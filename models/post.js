const mongoose = require("mongoose");
const User = require("./user");

const { Schema } = mongoose;

const postSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    caption: {
      type: String,
    },
    media: {
      type: [String],
      required: true,
    },
    tags: {
      type: [String],
    },
    mentions: {
      type: [String],
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: User,
    },
    comments: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: User,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timeStamps: true }
);

const Post = mongoose.model("posts", postSchema);

module.exports = Post;
