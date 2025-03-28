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

    if (!conversation) {
      const roomId = getRoomId(senderId, receiverId);
      socket.join(roomId);
      const usersInRoom = Array.from(
        io.sockets.adapter.rooms.get(conversation.roomId) || []
      );
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
        io.to(roomId).emit("receiveMsg", { message: newMessage });
      }
    } else {
      const usersInRoom = Array.from(
        io.sockets.adapter.rooms.get(conversation.roomId) || []
      );
      if (usersInRoom.includes(socket.id) === false) {
        socket.join(conversation.roomId);
      }
      const newMessage = new Message({
        sender: senderId,
        receiver: receiverId,
        roomId: conversation.roomId,
        message: message,
      });
      await newMessage.save();
      conversation.messages.push(newMessage._id);
      await conversation.save();
      io.to(conversation.roomId).emit("receiveMsg", { message: newMessage });
    }
  } catch (error) {
    io.emit("errorSending", { message: error });
  }
};

module.exports = sendMessage;
