const { Router } = require("express");

const router = Router();

router.put(
  "/user/unfollow/:userIdToRemove",
  require("../controllers/unfollowUser")
);

module.exports = router;
