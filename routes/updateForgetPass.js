const { Router } = require("express");

const router = Router();

router.post(
  "/forgetpassword/update/:code",
  require("../controllers/updateForgetPass")
);

module.exports = router;
