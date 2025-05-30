const mongoose = require("mongoose");
const user = require("./user");
const Message = require("./message");

const ConversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: user,
        required: true,
      },
    ],
    roomId: {
      type: String,
    },
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Message,
      },
    ],
  },
  { timestamps: true }
);

const conversation = mongoose.model("conversation", ConversationSchema);

module.exports = conversation;
