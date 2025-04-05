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
    console.log("Redis client connected successfully!");
  } catch (error) {
    console.error("Error connecting to Redis:", error);
  }
};

initializeRedis();

const storeRefreshToken = async (token, data) => {
  await client.set(token, JSON.stringify(data), { EX: 604800 });
};

const validateRefreshToken = async (refreshToken) => {
  const userData = await client.get(refreshToken);
  if (!userData) {
    return false;
  }
  return JSON.parse(userData);
};

const deleteRefreshtoken = async (token) => {
  await client.del(token);
  return;
};

const storeSocketId = async (userId, socketId) => {
  await client.set(userId, socketId);
};

const checkSocketId = async (userId) => {
  const socketId = await client.get(userId);
  return socketId;
};

const deleteSocketId = async (userId) => {
  console.log(userId);
  await client.del(userId);
  return;
};

module.exports = {
  storeRefreshToken,
  validateRefreshToken,
  deleteRefreshtoken,
  storeSocketId,
  checkSocketId,
  deleteSocketId,
};
