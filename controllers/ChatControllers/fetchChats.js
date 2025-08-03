// controllers/chatController.js
const Conversation = require("../../models/conversation");

const fetchChats = async (req, res) => {
  try {
    const { id } = req.params;
    const skip = parseInt(req.query.skip) || 0;
    const limit = parseInt(req.query.limit) || 30;

    const { messages } = await Conversation.findById(id).populate({
      path: "messages",
      options: {
        sort: { createdAt: -1 },
        skip,
        limit,
      },
    });

    res.status(200).json(messages.reverse()); // reverse to get oldest-to-newest order
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = fetchChats;
