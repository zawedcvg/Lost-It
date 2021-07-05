const router = require("express").Router();
const postController = require("../server/controllers/postController");
const authPosts = require("../server/middleware/authPostss");

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

router.patch('/savePost/:id', authPosts, postController.savePost)

router.patch('/unSavePost/:id', authPosts, postController.unSavePost)

router.get('/getSavePosts', authPosts, postController.getSavePosts)

module.exports = router;
