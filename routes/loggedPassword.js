const { Router } = require("express");

const router = Router();

router.post(
  "/update/logged/password",
  require("../controllers/loggedPassword")
);

module.exports = router;
