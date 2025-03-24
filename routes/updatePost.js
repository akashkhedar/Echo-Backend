const { Router } = require("express");

const router = Router();

router.patch("/update/post/:id", require("../controllers/updatePost"));

module.exports = router;
