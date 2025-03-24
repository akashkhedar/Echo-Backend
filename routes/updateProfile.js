const { Router } = require("express");

const router = Router();

router.post("/updateprofile", require("../controllers/updateProfile"));

module.exports = router;
