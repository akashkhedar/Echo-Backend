const { Router } = require("express");

const router = Router();

router.post("/profile", require("../controllers/UserControllers/userProfile"));
router.post(
  "/update/profile",
  require("../controllers/UserControllers/updateProfile")
);
router.post(
  "/delete-account",
  require("../controllers/UserControllers/deleteAccount")
);
router.get(
  "/fetch/followers/:id",
  require("../controllers/UserControllers/fetchFollowers")
);
router.get(
  "/fetch/following/:id",
  require("../controllers/UserControllers/fetchFollowing")
);
router.get("/search", require("../controllers/UserControllers/searchUser"));
router.get(
  "/check/username",
  require("../controllers/UserControllers/checkExistingUser")
);
router.put(
  "/remove/:userIdToRemove",
  require("../controllers/UserControllers/removeFollower")
);
router.put(
  "/unfollow/:userIdToRemove",
  require("../controllers/UserControllers/unfollowUser")
);
router.put("/follow/:id", require("../controllers/UserControllers/followUser"));

module.exports = router;
