const { Router } = require("express");

const router = Router();

router.post("/user/profile", require("../controllers/userProfile"));

module.exports = router;
