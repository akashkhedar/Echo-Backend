const { Router } = require("express");

const router = Router();

router.post("/deleteaccount", require("../controllers/deleteAccount"));

module.exports = router;
