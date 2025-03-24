const Message = require("../models/message");
const Conversation = require("../models/conversation");

const ChatList = async (req, res) => {
  const { userId } = req.user;
  const conversations = await Conversation.find({ participants: userId })
    .populate("participants", "fullname username profileImage")
    .select("_id participants")
    .lean();

  const filteredConversations = conversations.map((convo) => {
    const user = convo.participants.find((p) => p._id.toString() !== userId);
    return {
      _id: convo._id,
      user,
    };
  });

  res.status(200).json(filteredConversations);
};

module.exports = ChatList;
