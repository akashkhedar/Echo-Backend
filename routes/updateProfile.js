const { Router } = require("express");

const router = Router();

router.post("/update/profile", require("../controllers/updateProfile"));

module.exports = router;
