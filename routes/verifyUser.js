const { Router } = require("express");

const router = Router();

router.post("/user/verify", require("../controllers/verifyUser"));

module.exports = router;
