const mongoose = require("mongoose");
const user = require("./user");

const { Schema } = mongoose;

const postSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: user,
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
      ref: user,
    },
    comments: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: user,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timeStamps: true }
);

const post = mongoose.model("posts", postSchema);

module.exports = post;
