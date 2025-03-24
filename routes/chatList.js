const { Router } = require("express");

const router = Router();

router.get("/chat/list", require("../controllers/chatList"));

module.exports = router;
