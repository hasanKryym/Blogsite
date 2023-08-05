const express = require('express');
const {
  getUser,
  getUserPosts,
  getUserById,
  editUser,
} = require('../controllers/users');
const router = express.Router();

router.route('/').get(getUser);
router.route('/getUser/:id').get(getUserById);
router.route('/posts').get(getUserPosts);
router.route('/edit').patch(editUser);

module.exports = router;
