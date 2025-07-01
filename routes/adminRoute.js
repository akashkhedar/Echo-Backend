const { Router } = require("express");

const router = Router();

router.get("/upload/all", require("../controllers/AdminController/uploadAll"));

module.exports = router;
