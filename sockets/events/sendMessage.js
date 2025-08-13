const Conversation = require("../../models/conversation");
const Message = require("../../models/message");
const {
  encryptMessage,
  decryptMessage,
} = require("../../Utils/encryptdecryptMsg");
const getRoomId = require("../../Utils/getRoomId");
const { getIO } = require("../../Utils/io");
const { checkSocketId, storeOfflineMessages } = require("../../Utils/redis");

const sendMessage = async (
  socket,
  senderId,
  receiverId,
  message,
  username,
  io
) => {
  try {
    const { encrypted, iv } = encryptMessage(message);
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      const roomId = getRoomId(senderId, receiverId);
      socket.join(roomId);
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
        roomId: roomId,
        messages: [],
      });

      const receiverSocket = await checkSocketId(receiverId);
      const newMessage = new Message({
        sender: senderId,
        receiver: receiverId,
        roomId: roomId,
        conversationId: conversation._id,
        message: encrypted,
        iv: iv,
        sent: true,
        delivered: !!receiverSocket,
      });

      await newMessage.save();
      conversation.messages.push(newMessage._id);
      await conversation.save();

      // Decrypt the message for the frontend
      const decryptedMsg = decryptMessage(newMessage.message, newMessage.iv);
      const messageForFrontend = {
        ...newMessage.toObject(),
        message: decryptedMsg,
      };

      if (!receiverSocket) {
        await storeOfflineMessages(receiverId, conversation._id, username);
        io.to(socket.id).emit("receiveMsg", messageForFrontend, username);
      } else {
        io.to(roomId).emit("receiveMsg", messageForFrontend, username);
      }
      return;
    }

    // Existing conversation case
    const usersInRoom = Array.from(
      io.sockets.adapter.rooms.get(conversation.roomId) || []
    );
    if (!usersInRoom.includes(socket.id)) {
      socket.join(conversation.roomId);
    }

    const receiverSocket = await checkSocketId(receiverId);
    const newMessage = new Message({
      sender: senderId,
      receiver: receiverId,
      roomId: conversation.roomId,
      conversationId: conversation._id,
      message: encrypted,
      iv: iv,
      sent: true,
      delivered: !!receiverSocket,
    });

    await newMessage.save();
    conversation.messages.push(newMessage._id);
    await conversation.save();

    // Decrypt the message for the frontend
    const decryptedMsg = decryptMessage(newMessage.message, newMessage.iv);
    const messageForFrontend = {
      ...newMessage.toObject(),
      message: decryptedMsg,
    };

    if (!receiverSocket) {
      await storeOfflineMessages(receiverId, conversation._id, username);
      io.to(socket.id).emit("receiveMsg", messageForFrontend, username);
    } else {
      io.to(conversation.roomId).emit(
        "receiveMsg",
        messageForFrontend,
        username
      );
    }
  } catch (error) {
    io.emit("errorSending", { message: error });
  }
};

module.exports = sendMessage;
