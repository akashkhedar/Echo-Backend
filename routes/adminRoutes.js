const { Router } = require("express");

const router = Router();

router.get("/upload/all", require("../controllers/AdminControllers/uploadAll"));

module.exports = router;
