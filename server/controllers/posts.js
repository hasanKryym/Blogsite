const pool = require('../db/connect');

const getPosts = async (req, res) => {
  try {
    const user_id = req.user;
    const posts = await pool.query(
      'SELECT * from posts WHERE user_id != $1 ORDER BY lastmodified DESC',
      [user_id]
    );
    posts.rows.map(async (post, i) => {
      let user_name = await pool.query(
        'SELECT user_name FROM users WHERE user_id = $1',
        [post.user_id]
      );
      user_name = user_name.rows[0].user_name;
      post.user_name = user_name;

      let category_name = await pool.query(
        'SELECT category_name from category WHERE category_id = $1',
        [post.category_id]
      );
      category_name = category_name.rows[0].category_name;
      post.category_name = category_name;

      let views = await pool.query(
        'SELECT COUNT(user_id) FROM posts_views WHERE post_id = $1',
        [post.post_id]
      );

      views = views.rows[0].count;
      post.post_views = views;
      await pool.query('UPDATE posts SET post_views = $1 WHERE post_id = $2', [
        views,
        post.post_id,
      ]);

      if (i === posts.rows.length - 1) return res.status(200).json(posts.rows);
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send('server error');
  }
};

const addPost = async (req, res) => {
  try {
    const user_id = req.user;
    let { post_title, post_desc, post_image, post_date, category_id } =
      req.body;

    post_desc = post_desc.substring(3, post_desc.length - 4);
    let date = new Date();
    date = date.toDateString();
    post_date = date;

    await pool.query(
      'INSERT INTO posts (post_title, post_desc, post_image, post_date, user_id, category_id) VALUES ($1, $2, $3, $4, $5, $6)',
      [post_title, post_desc, post_image, post_date, user_id, category_id]
    );

    return res
      .status(201)
      .json({ success: true, msg: 'post created successfully' });
  } catch (err) {
    console.log(err);
    return res.status(500).send('server error');
  }
};

const deletePost = async (req, res) => {
  try {
    const { id: post_id } = req.params;
    await pool.query('DELETE FROM posts WHERE post_id = $1', [post_id]);
    return res
      .status(200)
      .json({ success: true, msg: 'post deleted successfully' });
  } catch (err) {
    console.log(err);
    return res.status(500).send('server error');
  }
};

const getPostById = async (req, res) => {
  try {
    const { id: post_id } = req.params;
    const post = await pool.query('SELECT * FROM posts WHERE post_id = $1', [
      post_id,
    ]);
    if (post.rows !== 0) {
      const user_id = post.rows[0].user_id;
      let user_name = await pool.query(
        'SELECT user_name from users WHERE user_id = $1',
        [user_id]
      );
      user_name = user_name.rows[0].user_name;
      post.rows[0].user_name = user_name;
      return res.status(200).json(post.rows[0]);
    }
    return res.status(404).json({ success: false, msg: 'post not found' });
  } catch (err) {
    console.log(err);
    return res.status(500).send('server error');
  }
};

const getRecentPosts = async (req, res) => {
  const user_id = req.user;

  const recentPosts = await pool.query(
    'SELECT * from posts WHERE user_id != $1 ORDER BY lastmodified DESC LIMIT 4',
    [user_id]
  );

  recentPosts.rows.map(async (post, i) => {
    let user_name = await pool.query(
      'SELECT user_name FROM users WHERE user_id = $1',
      [post.user_id]
    );
    user_name = user_name.rows[0].user_name;
    post.user_name = user_name;

    if (i === recentPosts.rows.length - 1)
      return res.status(200).json(recentPosts.rows);
  });
  try {
  } catch (err) {
    console.log(err);
    return res.status(500).send('server error');
  }
};

// POSTS REACTIONS

const getPostLikes = async (req, res) => {
  try {
    const { id: post_id } = req.params;
    const user_id = req.user;
    let isLiked = false;
    const user = await pool.query(
      'SELECT * FROM posts_likes where user_id = $1 AND post_id = $2',
      [user_id, post_id]
    );

    if (user.rows.length !== 0) isLiked = true;

    let postLikes = await pool.query(
      'SELECT COUNT(user_id) FROM posts_likes WHERE post_id = $1',
      [post_id]
    );
    postLikes = postLikes.rows[0].count;
    return res.status(200).json({ isLiked, postLikes });
  } catch (err) {
    console.log(err);
    return res.status(500).send('server error');
  }
};

const managePostLikes = async (req, res) => {
  try {
    const { id: post_id } = req.params;
    const user_id = req.user;

    const user = await pool.query(
      'SELECT * FROM posts_likes where user_id = $1 AND post_id = $2',
      [user_id, post_id]
    );
    if (user.rows.length === 0) {
      await pool.query(
        'INSERT INTO posts_likes (post_id, user_id) VALUES ($1, $2)',
        [post_id, user_id]
      );
      return res
        .status(200)
        .json({ success: true, msg: 'like added successfully' });
    } else {
      await pool.query(
        'DELETE FROM posts_likes WHERE user_id = $1 AND post_id = $2',
        [user_id, post_id]
      );
      return res
        .status(200)
        .json({ success: true, msg: 'like removed successfully' });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send('server error');
  }
};

const managePostViews = async (req, res) => {
  try {
    const { id: post_id } = req.params;
    const user_id = req.user;

    let postUser_id = await pool.query(
      'SELECT user_id FROM posts WHERE post_id = $1',
      [post_id]
    );

    postUser_id = postUser_id.rows[0].user_id;

    if (user_id === postUser_id)
      return res.status(200).json({ msg: 'post owner' });

    let isInViews = await pool.query(
      'SELECT * FROM posts_views WHERE user_id = $1 AND post_id = $2',
      [user_id, post_id]
    );

    if (isInViews.rows.length !== 0)
      return res.status(200).json({ msg: 'post already viewed' });

    await pool.query(
      'INSERT INTO posts_views (post_id, user_id) VALUES ($1, $2)',
      [post_id, user_id]
    );

    return res
      .status(200)
      .json({ success: true, msg: 'view added successfully' });
  } catch (err) {
    console.log(err);
    return res.status(500).send('server error');
  }
};

// POSTS CATEGORIES
const getPostsCategories = async (req, res) => {
  try {
    const categories = await pool.query(
      'SELECT * FROM category ORDER BY category_name'
    );
    return res.status(200).json(categories.rows);
  } catch (err) {
    console.log(err);
    return res.status(500).send('server error');
  }
};

const getPostsByCategory = async (req, res) => {
  try {
    const { id: category_id } = req.params;
    let posts = await pool.query('SELECT * FROM posts WHERE category_id = $1', [
      category_id,
    ]);
    if (posts.rows.length === 0)
      return res
        .status(404)
        .json({ success: false, msg: 'no Posts from this category' });
    posts.rows.map(async (post, i) => {
      let user_name = await pool.query(
        'SELECT user_name FROM users WHERE user_id = $1',
        [post.user_id]
      );
      user_name = user_name.rows[0].user_name;
      post.user_name = user_name;

      let category_name = await pool.query(
        'SELECT category_name from category WHERE category_id = $1',
        [post.category_id]
      );
      category_name = category_name.rows[0].category_name;
      post.category_name = category_name;

      let views = await pool.query(
        'SELECT COUNT(user_id) FROM posts_views WHERE post_id = $1',
        [post.post_id]
      );

      views = views.rows[0].count;

      post.post_views = views;

      if (i === posts.rows.length - 1) {
        posts = posts.rows;
        return res.status(200).json({ success: true, posts });
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send('server error');
  }
};

const countPostsByCategory = async (req, res) => {
  try {
    const categoriesCount = await pool.query(
      'SELECT category_id, COUNT(category_id) FROM posts GROUP BY category_id'
    );
    return res.status(200).json(categoriesCount.rows);
  } catch (err) {
    console.log(err);
    return res.status(500).send('server error');
  }
};

const getPopularPosts = async (req, res) => {
  try {
    const user_id = req.user;
    const popularPosts = await pool.query(
      'SELECT * FROM posts WHERE user_id != $1 ORDER BY post_views DESC LIMIT 6',
      [user_id]
    );
    return res.status(200).json(popularPosts.rows);
  } catch (err) {
    console.log(err);
    return res.status(500).send('server error');
  }
};

const addPostComment = async (req, res) => {
  try {
    const user_id = req.user;
    const { id: post_id } = req.params;
    const { comment_content } = req.body;

    await pool.query(
      'INSERT INTO posts_comments (post_id, user_id, comment_content) VALUES ($1, $2, $3)',
      [post_id, user_id, comment_content]
    );

    return res
      .status(200)
      .json({ success: true, msg: 'comment added successfully' });
  } catch (err) {
    console.log(err);
    return res.status(500).send('server error');
  }
};

const getPostComments = async (req, res) => {
  try {
    const { id: post_id } = req.params;

    const comments = await pool.query(
      'SELECT * FROM posts_comments WHERE post_id = $1',
      [post_id]
    );

    if (comments.rows.length === 0) return res.status(200).json(comments.rows);

    comments.rows.map(async (comment, i) => {
      const userData = await pool.query(
        'SELECT user_name, user_image FROM users WHERE user_id = $1',
        [comment.user_id]
      );

      const user_name = userData.rows[0].user_name;
      comment.user_name = user_name;

      const user_image = userData.rows[0].user_image;
      comment.user_image = user_image;

      if (i === comments.rows.length - 1)
        return res.status(200).json(comments.rows);
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send('server error');
  }
};

const deletePostComment = async (req, res) => {
  const { id: comment_id } = req.params;

  await pool.query('DELETE FROM posts_comments WHERE comment_id = $1', [
    comment_id,
  ]);

  return res
    .status(200)
    .json({ success: true, msg: 'comment deleted successfully' });
};

const countPostComments = async (req, res) => {
  try {
    const { id: post_id } = req.params;
    let count = await pool.query(
      'SELECT COUNT(comment_id) AS comments_count FROM posts_comments WHERE post_id = $1',
      [post_id]
    );
    count = count.rows[0].comments_count;

    return res.status(200).json(count);
  } catch (err) {
    console.log(err);
    return res.status(500).send('server error');
  }
};

const searchPosts = async (req, res) => {
  try {
    if (!req.query.query) return res.status(200).json([]);
    const posts = await pool.query(
      'SELECT post_title, post_id FROM posts WHERE post_title ILIKE $1',
      [`${req.query.query}%`]
    );
    return res.status(200).json(posts.rows);

    console.log(posts.rows);
  } catch (err) {
    console.log(err);
    return res.status(500).send('server error');
  }
};

module.exports = {
  getPosts,
  addPost,
  deletePost,
  getPostById,
  getRecentPosts,
  getPostLikes,
  managePostLikes,
  managePostViews,
  getPostsCategories,
  getPostsByCategory,
  countPostsByCategory,
  getPopularPosts,
  addPostComment,
  getPostComments,
  deletePostComment,
  countPostComments,
  searchPosts,
};
