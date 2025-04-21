const { deleteOfflineMessages } = require("../../Utils/redis");

const removeOfflineMessages = async (userId, convoId, socket, io) => {
  await deleteOfflineMessages(userId, convoId);
};

module.exports = removeOfflineMessages;
