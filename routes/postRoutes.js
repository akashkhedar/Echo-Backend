const { Router } = require("express");

const router = Router();

router.post("/upload", require("../controllers/PostControllers/uploadPost"));
router.delete(
  "/delete/:id",
  require("../controllers/PostControllers/deletePost")
);
router.get("/feed", require("../controllers/PostControllers/feedPost"));
router.get("/fetch", require("../controllers/PostControllers/fetchPosts"));
router.put("/like/:id", require("../controllers/PostControllers/likePost"));
router.get(
  "/fetch/comments/:id",
  require("../controllers/PostControllers/fetchComments")
);
router.post(
  "/comment/:id",
  require("../controllers/PostControllers/postComment")
);

module.exports = router;
