const mongoose = require("mongoose");
const User = require("./user");
const Message = require("./message");

const ConversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
    ],
    roomId: {
      type: String,
    },
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "message",
      },
    ],
  },
  { timestamps: true }
);

const Conversation = mongoose.model("conversation", ConversationSchema);

module.exports = Conversation;
