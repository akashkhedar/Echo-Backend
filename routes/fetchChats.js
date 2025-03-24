const { Router } = require("express");

const router = Router();

router.get("/fetch/chats/:id", require("../controllers/fetchChats"));

module.exports = router;
