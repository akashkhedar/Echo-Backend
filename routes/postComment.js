const { Router } = require("express");

const router = Router();

router.post("/post/comment/:id", require("../controllers/postComment"));

module.exports = router;
