const { Router } = require("express");

const router = Router();

router.get("/feed/post", require("../controllers/feedPost"));

module.exports = router;
