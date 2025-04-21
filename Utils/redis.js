const { createClient } = require("redis");
require("dotenv").config();

const client = createClient({
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: "redis-17244.c212.ap-south-1-1.ec2.redns.redis-cloud.com",
    port: 17244,
  },
});

client.on("error", (err) => {
  if (err.code === "ECONNREFUSED" || err.code === "CONNECTION_TIMEOUT") {
    console.log("Retrying Redis connection...");
    setTimeout(() => client.connect(), 5000);
  } else {
    console.error("Unexpected Redis Error:", err);
  }
});

const initializeRedis = async () => {
  try {
    await client.connect();
    console.log("Redis Connected!");
  } catch (error) {
    console.error("Error connecting to Redis:", error);
  }
};

initializeRedis();

const storeRefreshToken = async (token, data) => {
  await client.set(`refreshTk:${token}`, JSON.stringify(data), { EX: 604800 });
};

const validateRefreshToken = async (refreshToken) => {
  const userData = await client.get(`refreshTk:${refreshToken}`);
  if (!userData) {
    return false;
  }
  return JSON.parse(userData);
};

const deleteRefreshtoken = async (token) => {
  await client.del(`refreshTk:${token}`);
  return;
};

const storeSocketId = async (userId, socketId) => {
  await client.set(`online:${userId}`, socketId);
};

const checkSocketId = async (userId) => {
  const socketId = await client.get(`online:${userId}`);
  return socketId;
};

const deleteSocketId = async (userId) => {
  await client.del(`online:${userId}`);
  return;
};

const storeOfflineMessages = async (userId, convoId) => {
  const offlineMessages = await client.get(`offlineMsgs:${userId}`);
  let parsedMessages = JSON.parse(offlineMessages);
  if (parsedMessages) {
    if (!parsedMessages.includes(convoId)) {
      parsedMessages.push(convoId);
    }
    return;
  } else {
    parsedMessages = [convoId];
    await client.set(`offlineMsgs:${userId}`, JSON.stringify(parsedMessages));
  }
  return;
};

const getOfflineMessages = async (userId) => {
  const offlineMessages = await client.get(`offlineMsgs:${userId}`);
  const parsedMessages = offlineMessages ? JSON.parse(offlineMessages) : [];
  return parsedMessages;
};

const deleteOfflineMessages = async (userId) => {
  const offlineMessages = await client.del(`offlineMsgs:${userId}`);
  let parsedMessages = offlineMessages ? JSON.parse(offlineMessages) : [];
  if (!parsedMessages.length === 0) {
    if (parsedMessages.includes(convoId)) {
      const updated = arr.filter((item) => item !== "b");
      return;
    }
  }

  return;
};

module.exports = {
  storeRefreshToken,
  validateRefreshToken,
  deleteRefreshtoken,
  storeSocketId,
  checkSocketId,
  deleteSocketId,
  storeOfflineMessages,
  getOfflineMessages,
  deleteOfflineMessages,
};
