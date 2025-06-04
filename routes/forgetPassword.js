const { Router } = require("express");

const router = Router();

router.post("/forget-password", require("../controllers/forgetPassword"));

module.exports = router;
