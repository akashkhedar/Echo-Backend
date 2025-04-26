const { deleteOfflineMessages } = require("../../Utils/redis");

const removeOfflineMessages = async (userId, convoId) => {
  await deleteOfflineMessages(userId, convoId);
};

module.exports = removeOfflineMessages;
