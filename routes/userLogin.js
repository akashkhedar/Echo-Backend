const { Router } = require("express");

const router = Router();

router.post("/user/login", require("../controllers/userLogin"));

module.exports = router;
