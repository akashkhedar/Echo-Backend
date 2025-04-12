const Message = require("../../models/message");
const { checkSocketId } = require("../../Utils/redis");

const readMsg = async (socket, io, msgId, chatId, roomId) => {
  const message = await Message.findByIdAndUpdate(msgId, { read: true });
  console.log(message);
  const senderId = message.sender.toString();
  const senderSocketId = await checkSocketId(senderId);

  io.to(senderSocketId).emit("receiverRead", message._id);
};

module.exports = readMsg;
