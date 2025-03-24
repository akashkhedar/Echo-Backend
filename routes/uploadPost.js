const { Router } = require("express");

const router = Router();

router.post("/upload/post", require("../controllers/uploadPost"));

module.exports = router;
