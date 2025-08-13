const Conversation = require("../../models/conversation");
const { decryptMessage } = require("../../Utils/encryptdecryptMsg");

const fetchChats = async (req, res) => {
  try {
    const { userId } = req.user;
    const { id } = req.params; // ✅ Corrected

    const conversation = await Conversation.findById(id).populate("messages"); // ✅ No destructuring here
    if (!conversation || !conversation.messages) {
      return res
        .status(404)
        .json({ message: "No messages found for this chat" });
    }

    const decryptedMessages = conversation.messages.map((msg) => {
      const decrypted = decryptMessage(msg.message, msg.iv);
      return {
        ...msg.toObject(),
        message: decrypted,
      };
    });

    res.status(200).json(decryptedMessages); // ✅ Access messages after checking
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = fetchChats;
