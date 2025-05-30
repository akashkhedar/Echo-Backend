const { Router } = require("express");

const router = Router();

router.get("/fetch/posts", require("../controllers/fetchPosts"));

module.exports = router;
