const server = process.env.REACT_APP_HOST_URL;
// const cyclichost = 'https://blogsitee.cyclic.app/api/v1';

// USER

export const getUser = async () => {
  try {
    const response = await fetch(`${server}/users`, {
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

export const getUserById = async (user_id) => {
  try {
    const response = await fetch(`${server}/users/getUser/${user_id}`, {
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

export const getUserPosts = async () => {
  try {
    const response = await fetch(`${server}/users/posts`, {
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

export const getPosts = async () => {
  try {
    const response = await fetch(`${server}/posts`, {
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

export const getPostById = async (post_id) => {
  try {
    const response = await fetch(`${server}/posts/managePosts/${post_id}`, {
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

export const getRecentPosts = async () => {
  try {
    const response = await fetch(`${server}/posts/recentPosts`, {
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

export const getPostLikes = async (post_id) => {
  try {
    const response = await fetch(
      `${server}/posts/postReactions/likes/${post_id}`,
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

export const getPostsCategories = async () => {
  try {
    const response = await fetch(`${server}/posts/categories`, {
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

export const getPostsByCategory = async (category_id) => {
  try {
    const response = await fetch(`${server}/posts/categories/${category_id}`, {
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

export const countPostsByCategory = async () => {
  try {
    const response = await fetch(`${server}/posts/categoriesCount`, {
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

export const getPopularPosts = async () => {
  try {
    const response = await fetch(`${server}/posts/popularPosts`, {
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

export const getPostComments = async (post_id) => {
  try {
    const response = await fetch(
      `${server}/posts/postReactions/comments/${post_id}`,
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

export const countPostComments = async (post_id) => {
  try {
    const response = await fetch(
      `${server}/posts/postReactions/commentsCount/${post_id}`,
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

export const searchPosts = async (query) => {
  try {
    const response = await fetch(
      `${server}/posts/search?query=${encodeURIComponent(query)}`,
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

// module.exports = {
//   getUser,
//   getUserById,
//   getUserPosts,
//   getPosts,
//   getPostById,
//   getRecentPosts,
//   getPostLikes,
//   getPostsCategories,
//   getPostsByCategory,
//   countPostsByCategory,
//   getPopularPosts,
//   getPostComments,
//   countPostComments,
//   searchPosts,
// };
