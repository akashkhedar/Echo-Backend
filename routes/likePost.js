const { Router } = require("express");

const router = Router();

router.put("/like/post/:id", require("../controllers/likePost"));

module.exports = router;
