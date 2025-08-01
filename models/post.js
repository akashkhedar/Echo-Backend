const mongoose = require("mongoose");
const User = require("./user");
const Comment = require("./comment");

const { Schema } = mongoose;

const postSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    caption: {
      type: String,
    },
    media: {
      type: String,
      required: true,
    },
    ratio: {
      type: String,
      required: true,
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "user",
    },
    comments: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "comment",
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("post", postSchema);

module.exports = Post;
