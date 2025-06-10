const { Router } = require("express");
const limiter = require("../middlewares/limiter");

const router = Router();

router.post(
  "/create",
  limiter,
  require("../controllers/AuthControllers/userRegister")
);
router.post("/verify", require("../controllers/AuthControllers/verifyUser"));
router.post(
  "/login",
  limiter,
  require("../controllers/AuthControllers/userLogin")
);
router.post("/logout", require("../controllers/AuthControllers/userLogout"));
router.post(
  "/forget-password",
  require("../controllers/AuthControllers/forgetPassword")
);
router.get(
  "/verify-reset-token/:token",
  require("../controllers/AuthControllers/verifyResetToken")
);
router.post(
  "/update-password/:token",
  require("../controllers/AuthControllers/updatePassword")
);
router.post(
  "/update/logged/password",
  require("../controllers/AuthControllers/loggedPassword")
);

module.exports = router;
