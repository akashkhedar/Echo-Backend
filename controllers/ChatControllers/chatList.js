const Message = require("../../models/message");
const Conversation = require("../../models/conversation");
const { checkSocketId, getOfflineMessages } = require("../../Utils/redis");

const ChatList = async (req, res) => {
  try {
    const { userId } = req.user;
    const conversations = await Conversation.find({ participants: userId })
      .populate("participants", "fullname username profileImage")
      .select("_id roomId participants")
      .lean();
    const offlineMessages = await getOfflineMessages(userId);

    const filteredConversations = await Promise.all(
      conversations.map(async (convo) => {
        const currentUserId = userId.toString();
        const user = convo.participants.find(
          (p) => p._id.toString() !== currentUserId
        );

        const isOnline = await checkSocketId(user._id);

        return {
          _id: convo._id,
          roomId: convo.roomId,
          unread: offlineMessages.includes(convo._id.toString()),
          user: {
            ...user,
            isOnline: !!isOnline,
          },
        };
      })
    );

    res.status(200).json(filteredConversations);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = ChatList;
