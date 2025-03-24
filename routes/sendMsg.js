const { Router } = require("express");

const router = Router();

router.post("/send/msg/:id", require("../controllers/SendMsg"));

module.exports = router;
