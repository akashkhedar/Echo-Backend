const Conversation = require("../../models/conversation");
const Message = require("../../models/message");
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
      if (!receiverSocket) {
        const newMessage = new Message({
          sender: senderId,
          receiver: receiverId,
          roomId: roomId,
          conversationId: conversation._id,
          message: message,
          sent: true,
        });
        await newMessage.save();
        conversation.messages.push(newMessage._id);
        const { _id } = await conversation.save();
        await storeOfflineMessages(receiverId, _id, username);
        io.to(socket.id).emit("receiveMsg", { msg: newMessage });
      } else {
        const newMessage = new Message({
          sender: senderId,
          receiver: receiverId,
          roomId: roomId,
          conversationId: conversation._id,
          message: message,
          sent: true,
          delivered: true,
        });
        await newMessage.save();
        conversation.messages.push(newMessage._id);
        const { _id } = await conversation.save();
        io.to(roomId).emit("receiveMsg", { msg: newMessage });
      }
      return;
    } else {
      const usersInRoom = Array.from(
        io.sockets.adapter.rooms.get(conversation.roomId) || []
      );
      if (!usersInRoom.includes(socket.id)) {
        socket.join(conversation.roomId);
      }
      const receiverSocket = await checkSocketId(receiverId);
      if (!receiverSocket) {
        const newMessage = new Message({
          sender: senderId,
          receiver: receiverId,
          roomId: conversation.roomId,
          conversationId: conversation._id,
          message: message,
          sent: true,
        });
        await newMessage.save();
        conversation.messages.push(newMessage._id);
        await conversation.save();
        await storeOfflineMessages(receiverId, conversation._id, username);
        io.timeout(200)
          .to(socket.id)
          .emit("receiveMsg", newMessage, (err, response) => {
            if (err) {
              console.log(err);
              return;
            }
            if (response[0].status !== "ok") {
              io.to(socket.id).emit("notify", username);
              return;
            }
          });

        return;
      }
      const newMessage = new Message({
        sender: senderId,
        receiver: receiverId,
        roomId: conversation.roomId,
        conversationId: conversation._id,
        message: message,
        delivered: true,
        sent: true,
      });
      await newMessage.save();
      conversation.messages.push(newMessage._id);
      await conversation.save();
      io.timeout(200)
        .to(conversation.roomId)
        .emit("receiveMsg", newMessage, username);
      return;
    }
  } catch (error) {
    io.emit("errorSending", { message: error });
  }
};

module.exports = sendMessage;
