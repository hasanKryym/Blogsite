const express = require('express');
const { getUser } = require('../controllers/users');
const {
  addPost,
  getPosts,
  deletePost,
  getRecentPosts,
  getPostById,
  managePostLikes,
  getPostLikes,
  getPostsCategories,
  managePostViews,
  getPostsByCategory,
  countPostsByCategory,
  getPopularPosts,
  addPostComment,
  getPostComments,
  countPostComments,
  searchPosts,
  deletePostComment,
} = require('../controllers/posts');
const router = express.Router();

router.route('/').get(getPosts).post(addPost);
router.route('/search').get(searchPosts);
router.route('/popularPosts').get(getPopularPosts);
router.route('/categories').get(getPostsCategories);
router.route('/categories/:id').get(getPostsByCategory);
router.route('/categoriesCount').get(countPostsByCategory);
router.route('/recentPosts').get(getRecentPosts);
router.route('/managePosts/:id').get(getPostById).delete(deletePost);
router
  .route('/postReactions/likes/:id')
  .get(getPostLikes)
  .post(managePostLikes);

router.route('/postReactions/views/:id').post(managePostViews);

router
  .route('/postReactions/comments/:id')
  .post(addPostComment)
  .get(getPostComments)
  .delete(deletePostComment);

router.route('/postReactions/commentsCount/:id').get(countPostComments);

module.exports = router;
