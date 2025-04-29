const Message = require("../../models/message");
const { checkSocketId } = require("../../Utils/redis");

const readMsg = async (io, msgId) => {
  try {
    console.log(msgId);
    const message = await Message.findByIdAndUpdate(
      { _id: msgId },
      { read: true }
    );
    if (!message) return;

    const senderId = message.sender.toString();
    const senderSocketId = await checkSocketId(senderId);
    if (!senderSocketId) return;

    io.to(senderSocketId).emit("receiverRead", message._id);
  } catch (err) {
    console.error("Error in readMsg socket handler:", err);
  }
};

module.exports = readMsg;
