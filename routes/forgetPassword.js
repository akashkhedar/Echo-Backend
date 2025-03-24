const { Router } = require("express");

const router = Router();

router.post("/forgetpassword", require("../controllers/forgetPassword"));

module.exports = router;
