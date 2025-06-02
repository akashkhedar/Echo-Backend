const { Router } = require("express");

const router = Router();

router.put("/user/follow/:id", require("../controllers/followUser"));

module.exports = router;
