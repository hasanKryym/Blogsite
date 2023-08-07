const localhost = 'http://localhost:5000/api/v1';
const cyclichost = 'https://blogsitee.cyclic.app/api/v1';

// USER

export const editUser = async (inputs) => {
  try {
    const body = inputs;
    const response = await fetch(`${cyclichost}/users/edit`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const parseRes = await response.json();

    return parseRes;
  } catch (err) {
    console.log(err);
  }
};

// POSTS

export const addPost = async (inputs) => {
  try {
    const body = inputs;
    const response = await fetch(`${cyclichost}/posts/`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const parseRes = await response.json();
    return parseRes;
  } catch (err) {
    console.log(err);
  }
};

export const managePostLikes = async (post_id) => {
  try {
    const response = await fetch(
      `${cyclichost}/posts/postReactions/likes/${post_id}`,
      {
        method: 'POST',
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

export const managePostViews = async (post_id) => {
  try {
    const response = await fetch(
      `${cyclichost}/posts/postReactions/views/${post_id}`,
      {
        method: 'POST',
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

export const addPostComment = async (post_id, comment_content) => {
  try {
    const body = { comment_content };
    const response = await fetch(
      `${cyclichost}/posts/postReactions/comments/${post_id}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );
    const parseRes = await response.json();
    return parseRes;
  } catch (err) {
    console.log(err);
  }
};

// module.exports = {
//   editUser,
//   addPost,
//   managePostLikes,
//   managePostViews,
//   addPostComment,
// };
