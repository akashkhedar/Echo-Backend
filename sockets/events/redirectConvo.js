const Conversation = require("../../models/conversation");
const getRoomId = require("../../Utils/getRoomId");
const { checkSocketId } = require("../../Utils/redis");

const redirectConvo = async (sender, receiver, socket, io) => {
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

    await newConvo.populate("participants", "fullname username profileImage");

    const user = newConvo.participants.find((p) => p._id.toString() !== sender);

    const isOnline = await checkSocketId(receiver);

    const formattedconvo = {
      _id: newConvo._id,
      roomId: newConvo.roomId,
      unread: false,
      user: {
        ...user._doc,
        isOnline: !!isOnline,
      },
    };

    io.to(socket.id).emit("newConvo", formattedconvo);
    return;
  }

  io.to(socket.id).emit("redirectConvo", conversation._id);
};
module.exports = redirectConvo;
