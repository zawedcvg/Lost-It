const router = require("express").Router();
const postController = require("../controllers/postController");
const authPosts = require("../middleware/authPosts");

router
    .route("/posts")
    .post(authPosts, postController.createPost)
    .get(authPosts, postController.getPosts);

router
    .route("/post/:id")
    .patch(authPosts, postController.updatePost)
    .get(authPosts, postController.getPost)
    .delete(authPosts, postController.deletePost);

router.patch("/post/:id/like", authPosts, postController.likePost);

router.patch("/post/:id/unlike", authPosts, postController.unLikePost);

router.get("/user_posts/:id", authPosts, postController.getUserPosts);

router.patch("/savepost/:id", authPosts, postController.savePost);

router.patch("/unsavepost/:id", authPosts, postController.unsavePost);

router.get("/getsavedposts", authPosts, postController.getSavedPosts);

module.exports = router;
