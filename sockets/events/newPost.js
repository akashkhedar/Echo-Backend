const User = require("../../models/user");
const { checkSocketId } = require("../../Utils/redis");

const newPost = async (post, socket, io) => {
  const { follower } = await User.findById(post.userId);
  socket.emit("newPostMade", post);
  follower.forEach(async (id) => {
    const targetSocketId = await checkSocketId(id); // assuming you store this somewhere
    if (targetSocketId) {
      io.to(targetSocketId).emit("getNewPost", post);
    }
  });
};

module.exports = newPost;
