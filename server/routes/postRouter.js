const router = require("express").Router();
const postController = require("../controllers/postController");
const auth = require("../middleware/authPosts");

router
    .route("/posts")
    .post(auth, postController.createPost)
    .get(auth, postController.getPosts);

router
    .route("/post/:id")
    .patch(auth, postController.updatePost)
    .get(auth, postController.getPost)
    .delete(auth, postController.deletePost);

router.patch("/post/:id/like", auth, postController.likePost);

router.patch("/post/:id/unlike", auth, postController.unLikePost);

router.get("/user_posts/:id", auth, postController.getUserPosts);

// router.patch('/savePost/:id', auth, postController.savePost)

// router.patch('/unSavePost/:id', auth, postController.unSavePost)

// router.get('/getSavePosts', auth, postController.getSavePosts)

module.exports = router;
