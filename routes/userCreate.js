const { Router } = require("express");

const router = Router();

router.post("/user/create", require("../controllers/userRegister"));

module.exports = router;
