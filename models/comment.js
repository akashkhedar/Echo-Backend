const mongoose = require("mongoose");
const User = require("./user");
const Post = require("./post");

const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    likedBy: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "user",
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timeStamps: true }
);

const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;
