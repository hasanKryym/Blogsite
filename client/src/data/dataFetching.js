const localhost = 'http://localhost:5000/api/v1';
const cyclichost = 'https://blogsitee.cyclic.app/api/v1';

// USER

const getUser = async () => {
  try {
    const response = await fetch(`${cyclichost}/users`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const parseRes = await response.json();
    return parseRes;
  } catch (err) {
    console.log(err);
  }
};

const getUserById = async (user_id) => {
  try {
    const response = await fetch(`${cyclichost}/users/getUser/${user_id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const parseRes = await response.json();
    return parseRes;
  } catch (err) {
    console.log(err);
  }
};

const getUserPosts = async () => {
  try {
    const response = await fetch(`${cyclichost}/users/posts`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const parseRes = await response.json();
    return parseRes;
  } catch (err) {
    console.log(err);
  }
};

// POSTS

const getPosts = async () => {
  try {
    const response = await fetch(`${cyclichost}/posts`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const parseRes = await response.json();
    return parseRes;
  } catch (err) {
    console.log(err);
  }
};

const getPostById = async (post_id) => {
  try {
    const response = await fetch(`${cyclichost}/posts/managePosts/${post_id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const parseRes = await response.json();
    return parseRes;
  } catch (err) {
    console.log(err);
  }
};

const getRecentPosts = async () => {
  try {
    const response = await fetch(`${cyclichost}/posts/recentPosts`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const parseRes = await response.json();
    return parseRes;
  } catch (err) {
    console.log(err);
  }
};

const getPostLikes = async (post_id) => {
  try {
    const response = await fetch(
      `${cyclichost}/posts/postReactions/likes/${post_id}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    const parseRes = await response.json();
    return parseRes;
  } catch (err) {
    console.log(err);
  }
};

const getPostsCategories = async () => {
  try {
    const response = await fetch(`${cyclichost}/posts/categories`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const parseRes = await response.json();
    return parseRes;
  } catch (err) {
    console.log(err);
  }
};

const getPostsByCategory = async (category_id) => {
  try {
    const response = await fetch(
      `${cyclichost}/posts/categories/${category_id}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    const parseRes = await response.json();
    return parseRes;
  } catch (err) {
    console.log(err);
  }
};

const countPostsByCategory = async () => {
  try {
    const response = await fetch(`${cyclichost}/posts/categoriesCount`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const parseRes = await response.json();
    return parseRes;
  } catch (err) {
    console.log(err);
  }
};

const getPopularPosts = async () => {
  try {
    const response = await fetch(`${cyclichost}/posts/popularPosts`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const parseRes = await response.json();
    return parseRes;
  } catch (err) {
    console.log(err);
  }
};

const getPostComments = async (post_id) => {
  try {
    const response = await fetch(
      `${cyclichost}/posts/postReactions/comments/${post_id}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    const parseRes = await response.json();
    return parseRes;
  } catch (err) {
    console.log(err);
  }
};

const countPostComments = async (post_id) => {
  try {
    const response = await fetch(
      `${cyclichost}/posts/postReactions/commentsCount/${post_id}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    const parseRes = await response.json();
    return parseRes;
  } catch (err) {
    console.log(err);
  }
};

const searchPosts = async (query) => {
  try {
    const response = await fetch(
      `${cyclichost}/posts/search?query=${encodeURIComponent(query)}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    const parseRes = await response.json();
    return parseRes;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getUser,
  getUserById,
  getUserPosts,
  getPosts,
  getPostById,
  getRecentPosts,
  getPostLikes,
  getPostsCategories,
  getPostsByCategory,
  countPostsByCategory,
  getPopularPosts,
  getPostComments,
  countPostComments,
  searchPosts,
};
