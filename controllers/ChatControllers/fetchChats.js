const Conversation = require("../../models/conversation");

const fetchChats = async (req, res) => {
  try {
    const { id } = req.params;
    const { messages } = await Conversation.findById({ _id: id })
      .sort({ createdAt: -1 })
      .populate("messages");
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = fetchChats;
