const { Router } = require("express");

const router = Router();

router.put(
  "/user/remove/:userIdToRemove",
  require("../controllers/removeFollower")
);

module.exports = router;
