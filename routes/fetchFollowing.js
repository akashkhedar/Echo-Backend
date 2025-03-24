const { Router } = require("express");

const router = Router();

router.get("/fetch/following/:id", require("../controllers/fetchFollowing"));

module.exports = router;
