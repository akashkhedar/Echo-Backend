const { Router } = require("express");

const router = Router();

router.get(
  "/auth/verify-reset-token/:token",
  require("../controllers/verifyResetToken")
);

module.exports = router;
