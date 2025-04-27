const { Router } = require("express");

const router = Router();

router.get("/search", require("../controllers/searchUser"));

module.exports = router;
