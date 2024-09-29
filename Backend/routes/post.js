const express = require("express");
const { createPost,likeAndUnlikePost,deletePost} = require("../controllers/post.js");
const {isAuthenticated} = require("../middleware/auth.js");
const router = express.Router();
router.route("/post/upload").post(isAuthenticated,createPost);
router.route("/post/:id").get(isAuthenticated,likeAndUnlikePost).delete(isAuthenticated,deletePost);
module.exports = router;
