const Conversation = require("../../models/conversation");
const Message = require("../../models/message");
const getRoomId = require("../../Utils/getRoomId");
const { getIO } = require("../../Utils/io");
const { checkSocketId } = require("../../Utils/redis");

const sendMessage = async (socket, senderId, receiverId, message, io) => {
  try {
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    const usersInRoom = Array.from(
      io.sockets.adapter.rooms.get(conversation.roomId) || []
    );
    console.log(usersInRoom);
    if (!conversation) {
      const roomId = getRoomId(senderId, receiverId);
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
        roomId: roomId,
        messages: [],
      });
      const newMessage = new Message({
        sender: senderId,
        receiver: receiverId,
        roomId: roomId,
        message: message,
      });
      if (newMessage) {
        await newMessage.save();
        conversation.messages.push(newMessage._id);
        await conversation.save();
        io.to(roomId).emit("receiveMsg", { message: "message" });
      }
    } else {
      const newMessage = new Message({
        sender: senderId,
        receiver: receiverId,
        roomId: conversation.roomId,
        message: message,
      });
      await newMessage.save();
      conversation.messages.push(newMessage._id);
      await conversation.save();
      io.to(conversation.roomId).emit("receiveMsg", { message: "message" });
    }
  } catch (error) {
    console.log(error);
    // io.to(conversation.roomId).emit("errorSending", { message: error });
  }
};

module.exports = sendMessage;
