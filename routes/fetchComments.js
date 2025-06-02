const { Router } = require("express");

const router = Router();

router.get("/fetch/comments/:id", require("../controllers/fetchComments"));

module.exports = router;
