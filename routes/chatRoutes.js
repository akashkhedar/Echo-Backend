const { Router } = require("express");

const router = Router();

router.get("/list", require("../controllers/ChatControllers/chatList"));
router.get(
  "/fetch/msg/:id",
  require("../controllers/ChatControllers/fetchChats")
);

module.exports = router;
