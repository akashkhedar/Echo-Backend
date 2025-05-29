const { Router } = require("express");

const router = Router();

router.get("/check/username", require("../controllers/checkExistingUser"));

module.exports = router;
