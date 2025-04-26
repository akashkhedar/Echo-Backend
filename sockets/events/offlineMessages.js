const { storeOfflineMessages } = require("../../Utils/redis");

const offlineMessages = async (receiver, convoId) => {
  await storeOfflineMessages(receiver, convoId);
};

module.exports = offlineMessages;
