const { Router } = require("express");

const router = Router();

router.get("/fetch/followers/:id", require("../controllers/fetchFollowers"));

module.exports = router;
