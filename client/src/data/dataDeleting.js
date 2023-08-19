const server = process.env.REACT_APP_HOST_URL;

export const deletePost = async (post_id) => {
  try {
    const response = await fetch(`${server}/posts/managePosts/${post_id}`, {
      method: 'DELETE',
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

export const deletePostComment = async (comment_id) => {
  try {
    const response = await fetch(
      `${server}/posts/postReactions/comments/${comment_id}`,
      {
        method: 'DELETE',
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
//   deletePost,
// };
