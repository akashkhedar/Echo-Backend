const { Router } = require("express");

const router = Router();

router.delete("/delete/post/:id", require("../controllers/deletePost"));

module.exports = router;
