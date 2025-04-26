const Conversation = require("../../models/conversation");
const getRoomId = require("../../Utils/getRoomId");

const newConversations = async (sender, receiver, socket, io) => {
  const conversation = await Conversation.findOne({
    participants: { $all: [sender, receiver] },
  });
  if (!conversation) {
    const room = getRoomId(sender, receiver);
    const newConvo = await Conversation.create({
      participants: [sender, receiver],
      messages: [],
      roomId: room,
    });
    return;
  }
  io.to(socket.id).emit("redirectConvo", conversation);
};
module.exports = newConversations;
