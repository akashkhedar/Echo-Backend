const { storeOfflineMessages } = require("../../Utils/redis");

const offlineMessages = async (receiver, convoId, socket, io) => {
  await storeOfflineMessages(receiver, convoId);
};

module.exports = offlineMessages;
