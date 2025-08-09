// controllers/chatController.js
const Conversation = require("../../models/conversation");

const fetchChats = async (req, res) => {
  try {
    const { id } = req.params;
    const skip = parseInt(req.query.skip) || 0;
    const limit = parseInt(req.query.limit) || 30;

    const convo = await Conversation.findById(id).populate({
      path: "messages",
      options: {
        sort: { createdAt: -1 }, // newest first
        skip,
        limit,
      },
    });

    const messages = convo?.messages || [];
    res.status(200).json(messages.reverse()); // oldest first for UI
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = fetchChats;
