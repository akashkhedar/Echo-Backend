const mongoose = require("mongoose");
const User = require("./user");

const messageModel = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
      maxlength: 1000,
      trim: true,
    },
    roomId: {
      type: String,
    },
    message: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageModel);

module.exports = Message;
