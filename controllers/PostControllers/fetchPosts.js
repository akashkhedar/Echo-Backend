// controllers/fetchPosts.js
const Post = require("../../models/post");

const fetchPosts = async (req, res) => {
  try {
    const { userId } = req.user;
    const { cursor } = req.query;
    const limit = 30;

    const query = { userId: userId };

    if (cursor) {
      query.createdAt = { $lt: new Date(cursor) };
    }

    const posts = await Post.find(query)
      .populate("userId")
      .sort({ createdAt: -1 })
      .limit(limit + 1); // Fetch one extra to check if there's more

    const hasMore = posts.length > limit;
    const results = hasMore ? posts.slice(0, -1) : posts;

    res.status(200).json({
      posts: results,
      nextCursor: hasMore ? results[results.length - 1].createdAt : null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = fetchPosts;
