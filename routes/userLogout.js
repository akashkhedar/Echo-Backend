const { Router } = require("express");

const router = Router();

router.post("/user/logout", require("../controllers/userLogout"));

module.exports = router;
