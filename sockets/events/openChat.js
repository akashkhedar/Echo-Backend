const getRoomId = require("../../Utils/getRoomId");
const { checkSocketId } = require("../../Utils/redis");

const openChat = async (senderId, receiverId) => {
  const roomId = getRoomId(senderId, receiverId);
  console.log(senderId, receiverId);

  const senderSocket = await checkSocketId(senderId);
  const receiverSocket = await checkSocketId(receiverId);
  console.log(senderSocket, receiverSocket);
};

module.exports = openChat;
