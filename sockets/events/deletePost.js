const User = require("../../models/user");
const { checkSocketId } = require("../../Utils/redis");

const deletePost = async (postId, io, userId) => {
  const { follower } = await User.findById(userId);
  follower.forEach(async (id) => {
    const targetSocketId = await checkSocketId(id); // assuming you store this somewhere
    if (targetSocketId) {
      io.to(targetSocketId).emit("postDeleted", postId);
    }
  });
};

module.exports = deletePost;
